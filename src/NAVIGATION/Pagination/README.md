# Pagination

Navegacion entre paginas de contenido paginado. Soporta modo controlado y no controlado, tres variantes visuales, dos formas de boton, tres tamanos, cinco colores y calculo automatico del rango visible con elipsis.

## Importacion

```tsx
import Pagination from '@/components/NAVIGATION/Pagination/Pagination';
```

## Uso basico

```tsx
<Pagination count={10} onChange={(_e, page) => console.log(page)} />
```

## Modo controlado

```tsx
const [page, setPage] = useState(1);

<Pagination
  count={20}
  page={page}
  onChange={(_e, p) => setPage(p)}
/>
```

## Modo no controlado

```tsx
<Pagination count={10} defaultPage={3} onChange={(_e, p) => console.log(p)} />
```

## Variantes

```tsx
<Pagination count={10} variant="text" />       {/* default: sin borde ni fondo */}
<Pagination count={10} variant="outlined" />   {/* borde en cada item */}
<Pagination count={10} variant="contained" />  {/* fondo en items */}
```

## Formas

```tsx
<Pagination count={10} shape="rounded" />   {/* bordes redondeados, default */}
<Pagination count={10} shape="circular" />  {/* botones circulares */}
```

## Tamanos

```tsx
<Pagination count={10} size="sm" />  {/* 28px */}
<Pagination count={10} size="md" />  {/* 34px, default */}
<Pagination count={10} size="lg" />  {/* 42px */}
```

## Colores

```tsx
<Pagination count={10} color="primary" />    {/* default */}
<Pagination count={10} color="secondary" />
<Pagination count={10} color="success" />
<Pagination count={10} color="warning" />
<Pagination count={10} color="danger" />
```

## Botones de primera y ultima pagina

```tsx
<Pagination
  count={20}
  page={page}
  onChange={(_e, p) => setPage(p)}
  showFirstButton
  showLastButton
/>
```

## Control de siblings y boundaries

`siblingCount` controla cuantas paginas se muestran a cada lado de la pagina activa. `boundaryCount` controla cuantas se muestran al inicio y al final:

```tsx
<Pagination
  count={50}
  page={page}
  onChange={(_e, p) => setPage(p)}
  siblingCount={2}   {/* default: 1 */}
  boundaryCount={2}  {/* default: 1 */}
/>
```

## CSS Custom Properties

```css
.mi-paginacion-custom {
  --w3f-pgn-active-bg: #8b5cf6;
  --w3f-pgn-active-color: #ffffff;
  --w3f-pgn-hover-bg: rgba(139, 92, 246, 0.08);
  --w3f-pgn-color: #64748b;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-pgn-gap` | `4px` | Espacio entre items |
| `--w3f-pgn-color` | `on-surface` | Color de texto e iconos |
| `--w3f-pgn-font-weight` | `500` | Peso de fuente |
| `--w3f-pgn-transition` | `150ms ease-out` | Transicion de hover |
| `--w3f-pgn-focus-color` | `primary` | Color del anillo de foco |
| `--w3f-pgn-disabled-opacity` | `0.5` | Opacidad de la paginacion deshabilitada |
| `--w3f-pgn-disabled-item-opacity` | `0.38` | Opacidad de items de nav deshabilitados |
| `--w3f-pgn-ellipsis-color` | `gray-400` | Color de los puntos suspensivos |
| `--w3f-pgn-sm-size` | `28px` | Tamano de items en `sm` |
| `--w3f-pgn-sm-font` | `0.75rem` | Fuente en `sm` |
| `--w3f-pgn-md-size` | `34px` | Tamano de items en `md` |
| `--w3f-pgn-md-font` | `0.875rem` | Fuente en `md` |
| `--w3f-pgn-lg-size` | `42px` | Tamano de items en `lg` |
| `--w3f-pgn-active-bg` | per color | Fondo del item activo |
| `--w3f-pgn-active-color` | per color | Color del texto activo |
| `--w3f-pgn-hover-bg` | per color | Fondo en hover |
| `--w3f-pgn-outline-color` | per color | Color de borde en variante outlined |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `count` | `number` | `1` | Total de paginas |
| `page` | `number` | — | Pagina activa (modo controlado) |
| `defaultPage` | `number` | `1` | Pagina inicial (modo no controlado) |
| `onChange` | `(e, page) => void` | — | Callback al cambiar pagina |
| `variant` | `PaginationVariant` | `'text'` | Variante visual |
| `shape` | `PaginationShape` | `'rounded'` | Forma de los botones |
| `size` | `PaginationSize` | `'md'` | Tamano |
| `color` | `PaginationColor` | `'primary'` | Color del item activo |
| `disabled` | `boolean` | `false` | Deshabilita toda la paginacion |
| `siblingCount` | `number` | `1` | Paginas adyacentes a la activa |
| `boundaryCount` | `number` | `1` | Paginas en los extremos |
| `showFirstButton` | `boolean` | `false` | Muestra boton de primera pagina |
| `showLastButton` | `boolean` | `false` | Muestra boton de ultima pagina |
| `hideNextButton` | `boolean` | `false` | Oculta el boton siguiente |
| `hidePrevButton` | `boolean` | `false` | Oculta el boton anterior |
| `className` | `string` | `''` | Clases CSS adicionales |

## API

#### Entrada de datos

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Controlado | `page` | `number` | Pagina actual gestionada por el padre |
| No controlado | `defaultPage` | `number` | Estado interno sin control externo |
| Configuracion | `count`, `siblingCount`, `boundaryCount` | `number` | Parametros del algoritmo de paginas |

#### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(e: MouseEvent<HTMLButtonElement>, page: number) => void` | Al hacer clic en cualquier boton de pagina habilitado |

El valor de `page` emitido esta siempre en el rango `[1, count]`. El componente no emite el evento si la pagina resultante estaria fuera del rango.

#### Comunicacion con otros componentes

La Paginacion no usa ni expone ningun Context. Es un componente completamente autocontenido:

```
Pagination
  ├── usePaginationPage → currentPage, handlePageChange
  ├── buildPages() → [1, 'ellipsis-left', 4, 5, 6, 'ellipsis-right', 10]
  └── <nav> → <ul> → <li> → <button> (por cada pagina/nav)
```

**Integracion tipica con datos:**

```tsx
const [page, setPage] = useState(1);
const { data, total } = useFetch(`/api/items?page=${page}&limit=20`);
const totalPages = Math.ceil(total / 20);

<>
  <ItemList items={data} />
  <Pagination count={totalPages} page={page} onChange={(_e, p) => setPage(p)} />
</>
```

#### Accesibilidad

| Atributo | Elemento | Valor | Descripcion |
|---|---|---|---|
| `aria-label` | `<nav>` | `"paginacion"` | Region de navegacion |
| `aria-current` | `<button>` activo | `"page"` | Indica la pagina actual |
| `aria-label` | botones de nav | `"Primera pagina"` etc. | Texto descriptivo para flechas |
| `disabled` | `<button>` | atributo HTML | Deshabilita botones de extremos |

#### Patron de uso recomendado

```tsx
// 1. Tabla con paginacion controlada
const [page, setPage] = useState(1);

<DataTable data={pageData} />
<Pagination
  count={Math.ceil(total / pageSize)}
  page={page}
  onChange={(_e, p) => setPage(p)}
  variant="outlined"
  shape="circular"
  color="primary"
  showFirstButton
  showLastButton
/>

// 2. Galeria con estado en URL
const [searchParams, setSearchParams] = useSearchParams();
const page = Number(searchParams.get('page') ?? 1);

<Pagination
  count={totalPages}
  page={page}
  onChange={(_e, p) => setSearchParams({ page: String(p) })}
  variant="contained"
  color="primary"
/>
```

## Estructura de archivos

```
Pagination/
  Pagination.tsx          Componente principal
  Pagination.types.ts     Interfaces TypeScript
  Pagination.constants.ts Clases CSS y defaults
  Pagination.utils.ts     buildPages(), buildPaginationClasses()
  Pagination.hooks.ts     usePaginationPage
  README.md               Esta documentacion
```

CSS: `src/w3fussion/NAVIGATION/_pagination.css`
