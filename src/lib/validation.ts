/**
 * Módulo de validación y sanitización para formularios de contacto y presupuestos.
 */

/**
 * Sanitiza texto general: elimina tags HTML, caracteres de control invisibles y recorta longitud.
 */
export function sanitizeText(value: string, maxLength = 120): string {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitiza número de teléfono o WhatsApp: conserva únicamente números y el prefijo '+'.
 */
export function sanitizePhone(value: string): string {
  if (!value) return "";
  const trimmed = value.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return hasPlus ? `+${digits.slice(0, 16)}` : digits.slice(0, 16);
}

/**
 * Sanitiza email: pasa a minúsculas, recorta y filtra caracteres anómalos.
 */
export function sanitizeEmail(value: string): string {
  if (!value) return "";
  return value
    .replace(/[^\w.@+-]/g, "")
    .trim()
    .toLowerCase()
    .slice(0, 160);
}

/**
 * Sanitiza mensaje multilínea: elimina scripts/tags y caracteres de control pero preserva saltos de línea.
 */
export function sanitizeMessage(value: string, maxLength = 3000): string {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    .trim()
    .slice(0, maxLength);
}

/**
 * Valida un número de teléfono / WhatsApp:
 * 1. Solo permite números, espacios, guiones, paréntesis y opcional '+' al inicio.
 * 2. Rechaza caracteres extraños como puntos (.), letras o barras.
 * 3. Requiere entre 8 y 15 dígitos reales (estándar internacional ITU-T E.164).
 * 4. Detecta patrones falsos: secuencias triviales (12345678), números repetidos (111111, 333333232) o prefijos 0000.
 */
export function isValidPhone(value: string): { valid: boolean; error?: string } {
  if (!value || typeof value !== "string") {
    return { valid: false, error: "Ingresá tu número de teléfono o WhatsApp" };
  }
  const trimmed = value.trim();

  // 1. Caracteres permitidos: solo números, espacios, guiones, paréntesis y opcional '+' al inicio
  if (!/^\+?[0-9\s\-()]+$/.test(trimmed)) {
    return {
      valid: false,
      error: "Ingresá solo números y código de área (sin puntos ni letras)",
    };
  }

  const digits = trimmed.replace(/\D/g, "");

  // 2. Longitud estándar E.164 (en Argentina son 10 dígitos o 12-13 con +54; internacional 8-15)
  if (digits.length < 8) {
    return {
      valid: false,
      error: "El número es muy corto (mínimo 8 dígitos con código de área)",
    };
  }
  if (digits.length > 15) {
    return {
      valid: false,
      error: "El número es demasiado largo (máximo 15 dígitos)",
    };
  }

  // 3. Prefijos inválidos
  if (digits.startsWith("0000")) {
    return { valid: false, error: "Ingresá un número de teléfono válido" };
  }

  // 4. Mismo dígito repetido 5 o más veces consecutivas (ej: 33333, 00000)
  if (/(.)\1{4,}/.test(digits)) {
    return { valid: false, error: "El número ingresado no parece ser real" };
  }

  // 5. Un solo dígito no puede representar el 65% o más del total de dígitos (ej: 3.3.3.3..3.3232)
  const counts: Record<string, number> = {};
  for (const d of digits) {
    counts[d] = (counts[d] || 0) + 1;
  }
  const maxFreq = Math.max(...Object.values(counts));
  if (maxFreq / digits.length >= 0.65) {
    return { valid: false, error: "Por favor ingresá un número de teléfono real" };
  }

  // 6. Secuencias consecutivas ascendentes o descendentes obvias
  if ("0123456789012".includes(digits) || "987654321098".includes(digits)) {
    return { valid: false, error: "Por favor ingresá un número de teléfono real" };
  }

  return { valid: true };
}

/**
 * Valida un nombre personal:
 * - Al menos 2 caracteres y máximo 80.
 * - Solo letras (incluyendo acentos, ñ, ü), espacios, apóstrofes y guiones.
 * - Filtra cadenas tipo spam de teclado (asdasd, qwerty, zxcv, aaaa).
 */
export function isValidName(value: string): { valid: boolean; error?: string } {
  if (!value || typeof value !== "string") {
    return { valid: false, error: "Ingresá tu nombre" };
  }
  const trimmed = value.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: "El nombre debe tener al menos 2 letras" };
  }
  if (trimmed.length > 80) {
    return { valid: false, error: "El nombre es demasiado largo" };
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(trimmed)) {
    return { valid: false, error: "Ingresá un nombre válido (solo letras)" };
  }

  const lower = trimmed.toLowerCase().replace(/\s+/g, "");
  // 3 letras idénticas consecutivas (aaa, zzz)
  if (/(.)\1{2,}/.test(lower)) {
    return { valid: false, error: "Ingresá un nombre real" };
  }

  const keyboardSpam = ["asdasd", "asdfgh", "qwerty", "zxcvbn", "qwer"];
  if (keyboardSpam.some((k) => lower.includes(k))) {
    return { valid: false, error: "Ingresá un nombre real" };
  }

  return { valid: true };
}
