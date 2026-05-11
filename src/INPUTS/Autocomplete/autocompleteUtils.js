// src/components/Autocomplete/autocompleteUtils.js

/**
 * Construye las clases CSS para el elemento input del Autocomplete.
 *
 * @param {object} props - Propiedades de estilo.
 * @param {string} props.variant - Variante visual ('outline', 'filled', 'flushed').
 * @param {string} props.size - Tamaño del input ('sm', 'md', 'lg').
 * @param {boolean} props.error - Si es true, aplica estilos de error.
 * @param {boolean} props.round - Si es true, aplica bordes completamente redondeados.
 * @param {string} props.className - Clases adicionales manuales.
 * @returns {string} Cadena de clases CSS.
 */
export const buildInputClassNames = ({
  variant = 'outline',
  size = 'md',
  error = false,
  round = false,
  hasIcon = false, // <--- Nuevo parámetro
  className,
}) => {
  // Clase base obligatoria definida en _autocomplete.css
  const classes = ['w3f-autocomplete-input'];

  // 1. Variantes visuales
  const variants = {
    outline: '', // Por defecto (ya definido en la base)
    filled: 'w3f-input-filled',
    flushed: 'w3f-input-flushed',
  };
  if (variants[variant]) classes.push(variants[variant]);

  // 2. Tamaños
  const sizes = {
    sm: 'w3f-input-sm',
    md: '', // Por defecto
    lg: 'w3f-input-lg',
  };
  if (sizes[size]) classes.push(sizes[size]);

  // 3. Estados (Error)
  if (error) classes.push('w3f-input-error');

  // 4. Redondeo (Pill shape)
  if (round) classes.push('w3f-round-pill');

  // 1. Ajuste de Padding para el Icono
  if (hasIcon) classes.push('w3f-input-has-icon');

  // 5. Clases extra pasadas por el usuario
  if (className) classes.push(className);

  return classes.filter(Boolean).join(' ');
};