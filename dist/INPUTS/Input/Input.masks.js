function applyMask(value, mask) {
  const clean = value.replace(/[^a-zA-Z0-9]/g, "");
  let result = "";
  let ci = 0;
  for (let mi = 0; mi < mask.length && ci < clean.length; mi++) {
    const m = mask[mi];
    if (m === "#") {
      if (/\d/.test(clean[ci])) result += clean[ci++];
      else break;
    } else if (m === "A") {
      if (/[a-zA-Z]/.test(clean[ci])) result += clean[ci++];
      else break;
    } else if (m === "*") {
      result += clean[ci++];
    } else {
      result += m;
    }
  }
  return result;
}
function stripNonDigits(v) {
  return v.replace(/\D/g, "");
}
function formatCurrency(v) {
  const digits = stripNonDigits(v);
  if (!digits) return "";
  const num = parseInt(digits, 10) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(num);
}
function cleanCurrency(v) {
  const digits = stripNonDigits(v);
  if (!digits) return "";
  return (parseInt(digits, 10) / 100).toFixed(2);
}
const PREDEFINED_MASKS = {
  phone: {
    name: "Phone",
    mask: "(###) ###-####",
    placeholder: "(555) 123-4567",
    cleanValue: stripNonDigits,
    format: (v) => applyMask(v, "(###) ###-####"),
    validate: /^\(\d{3}\) \d{3}-\d{4}$/,
    maxLength: 14
  },
  date: {
    name: "Date",
    mask: "##/##/####",
    placeholder: "DD/MM/YYYY",
    cleanValue: stripNonDigits,
    format: (v) => applyMask(v, "##/##/####"),
    validate: /^\d{2}\/\d{2}\/\d{4}$/,
    maxLength: 10
  },
  currency: {
    name: "Currency",
    placeholder: "$0.00",
    cleanValue: cleanCurrency,
    format: formatCurrency,
    maxLength: 15
  },
  "credit-card": {
    name: "Credit Card",
    mask: "#### #### #### ####",
    placeholder: "1234 5678 9012 3456",
    cleanValue: stripNonDigits,
    format: (v) => applyMask(v, "#### #### #### ####"),
    validate: /^\d{4} \d{4} \d{4} \d{4}$/,
    maxLength: 19
  },
  "zip-code": {
    name: "ZIP Code",
    mask: "#####",
    placeholder: "12345",
    cleanValue: stripNonDigits,
    format: (v) => applyMask(v, "#####"),
    validate: /^\d{5}$/,
    maxLength: 5
  },
  cuit: {
    name: "CUIT",
    mask: "##-########-#",
    placeholder: "20-12345678-9",
    cleanValue: stripNonDigits,
    format: (v) => applyMask(v, "##-########-#"),
    validate: /^\d{2}-\d{8}-\d$/,
    maxLength: 13
  }
};
function resolveMask(mask) {
  if (typeof mask === "string") {
    return PREDEFINED_MASKS[mask] ?? null;
  }
  return mask;
}
export {
  PREDEFINED_MASKS,
  resolveMask
};
//# sourceMappingURL=Input.masks.js.map
