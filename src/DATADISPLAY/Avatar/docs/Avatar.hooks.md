# Avatar.hooks.ts

**Ruta:** `src/components/DATADISPLAY/Avatar/Avatar.hooks.ts`

---

## Finalidad

Provee la integración del componente Avatar con el sistema de formularios del framework
W3F (`Form` y `LiveForm`). Encapsula el acceso a `FormContext` de manera segura:
si el Avatar no está dentro de un formulario, o si no se le pasa `name`, todas las
operaciones retornan `undefined` / no-op sin lanzar errores.

---

## Dependencias

```ts
import { useContext, useCallback } from 'react';
import { FormContext } from '../../INPUTS/Form/Form';
```

- `useContext` — hook nativo de React para leer el contexto
- `FormContext` — contexto creado en `Form.tsx` que expone valores, errores y setters del formulario

> **Importante:** se importa `FormContext` directamente (no `useFormContext`), porque
> `useFormContext` lanza un error cuando se usa fuera de un formulario. El Avatar
> puede existir tanto dentro como fuera de `<Form>`, así que necesita la versión
> silenciosa que retorna `null` cuando no hay contexto.

---

## Exports

### `useAvatarForm`

```ts
function useAvatarForm(name?: string): {
  isFormControlled: boolean;
  formValue:        string | undefined;
  setFormValue:     (value: string) => void;
}
```

#### Parámetro

| Parámetro | Tipo | Descripción |
|---|---|---|
| `name` | `string \| undefined` | Nombre del campo en el formulario. Si está ausente, el hook opera en modo pasivo. |

#### Retorno

| Campo | Tipo | Descripción |
|---|---|---|
| `isFormControlled` | `boolean` | `true` si hay `FormContext` activo **y** se proporcionó `name`. |
| `formValue` | `string \| undefined` | Valor actual del campo en el formulario. `undefined` si no hay control. |
| `setFormValue` | `(value: string) => void` | Escribe el valor en el formulario. No-op si no hay control. |

---

## Lógica interna

```ts
export function useAvatarForm(name?: string) {
  // 1. Intenta leer el contexto del formulario (null si no existe)
  const formContext = useContext(FormContext);

  // 2. Solo está controlado si AMBAS condiciones se cumplen
  const isFormControlled = !!(formContext && name);

  // 3. Lee el valor actual del campo (o undefined si no está controlado)
  const formValue = isFormControlled
    ? (formContext!.values[name!] as string | undefined)
    : undefined;

  // 4. Setter estabilizado con useCallback para evitar re-renders innecesarios
  const setFormValue = useCallback(
    (value: string) => {
      if (isFormControlled && formContext && name) {
        formContext.setFieldValue(name, value);
      }
    },
    [isFormControlled, formContext, name],
  );

  return { isFormControlled, formValue, setFormValue };
}
```

### Paso 1 — Lectura del contexto

`useContext(FormContext)` retorna el objeto `FormContextValue` si el Avatar está
dentro de un `<Form>` o `<LiveForm>`, o `null` en caso contrario.
Este es el patrón correcto para componentes opcionales en el sistema de formularios.

### Paso 2 — Determinación del modo controlado

El Avatar solo entra en modo "controlado por formulario" si:
- Existe un contexto de formulario (`formContext !== null`)
- Se pasa un nombre de campo (`name !== undefined`)

Si falta cualquiera de las dos, `isFormControlled = false` y el hook devuelve
comportamiento pasivo.

### Paso 3 — Lectura del valor

```ts
formContext!.values[name!] as string | undefined
```

Accede al mapa de valores del formulario usando la clave `name`. El casting a
`string | undefined` refleja que el campo puede no estar inicializado.

### Paso 4 — Setter estabilizado

```ts
useCallback((value: string) => {
  if (isFormControlled && formContext && name) {
    formContext.setFieldValue(name, value);
  }
}, [isFormControlled, formContext, name])
```

- `useCallback` evita que `setFormValue` cambie de referencia en cada render, lo que
  impediría memorizar el handler de `FileReader` en `Avatar.tsx`.
- La verificación interna es una guarda extra, aunque `isFormControlled` ya la engloba.

---

## Flujo completo de upload con Form

```
Usuario hace clic en Avatar
  └─ handleClick() en Avatar.tsx
       └─ fileInputRef.current.click()  → abre el selector de archivos del SO

Usuario selecciona un archivo
  └─ handleFileChange() en Avatar.tsx
       └─ FileReader.readAsDataURL(file)
            └─ reader.onloadend
                 ├─ setFormValue(dataUrl)  ← llama a useAvatarForm.setFormValue
                 │    └─ FormContext.setFieldValue(name, dataUrl)
                 │         └─ El Form/LiveForm actualiza su estado interno
                 │              └─ Re-render: Avatar recibe formValue = dataUrl
                 │                   └─ effectiveSrc = dataUrl → muestra la imagen
                 └─ onChange?.(dataUrl)    ← callback externo opcional
```

---

## Escenarios de uso

### Dentro de un Form (controlado)

```tsx
<Form initialValues={{ foto: '' }}>
  <Avatar name="foto" uploadable size="xlarge" />
  {/* isFormControlled = true, formValue = '' (inicial) */}
</Form>
```

Al seleccionar imagen → `formContext.values.foto` = `'data:image/jpeg;base64,...'`

### Fuera de un Form (libre)

```tsx
<Avatar
  uploadable
  onChange={(dataUrl) => setMiFoto(dataUrl)}
  size="large"
/>
{/* isFormControlled = false, formValue = undefined */}
{/* El onChange actúa como canal alternativo de notificación */}
```

### Con name pero sin Form (silencioso)

```tsx
{/* Fuera de cualquier Form/LiveForm */}
<Avatar name="foto" uploadable size="large" />
{/* isFormControlled = false → no lanza error, comportamiento neutro */}
```

---

## Interacción con otros archivos

| Archivo | Relación |
|---|---|
| `Form.tsx` / `Form.jsx` | Provee `FormContext` y `setFieldValue` |
| `LiveForm.tsx` | Comparte el mismo `FormContext` (misma instancia) |
| `Avatar.tsx` | Consume el hook; usa `formValue` como `effectiveSrc` y `setFormValue` en `handleFileChange` |
