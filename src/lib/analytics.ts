declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GA_MEASUREMENT_ID) ||
  "G-1GSNZRHS56";

/**
 * Registra un evento personalizado en Google Analytics 4 (GA4).
 */
export function trackEvent(action: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && GA_MEASUREMENT_ID) {
    window.gtag("event", action, params);
  }
}

/**
 * Registra clics hacia WhatsApp con la ubicación y origen del usuario.
 */
export function trackWhatsAppClick(location: string, label?: string) {
  trackEvent("whatsapp_click", {
    event_category: "Conversion",
    event_label: label || location,
    click_location: location,
  });
}

/**
 * Registra el envío o solicitud de cotización por WhatsApp o correo.
 */
export function trackQuoteRequest(projectType: string, channel: string, source: string = "form") {
  trackEvent("generate_lead", {
    event_category: "Lead",
    project_type: projectType,
    preferred_channel: channel,
    submission_source: source,
  });
}

/**
 * Registra los filtros de categorías que los usuarios tocan para saber qué servicios interesan más.
 */
export function trackPortfolioFilter(category: string) {
  trackEvent("portfolio_filter_click", {
    event_category: "Engagement",
    category_id: category,
  });
}

/**
 * Registra qué proyectos abren en detalle para conocer la demanda de rubros.
 */
export function trackProjectModalView(projectId: string, projectTitle: string) {
  trackEvent("view_item", {
    event_category: "Portfolio",
    item_id: projectId,
    item_name: projectTitle,
  });
}
