import { type FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import "./neon-landing.css";
import { trackQuoteRequest, trackWhatsAppClick, trackEvent } from "../lib/analytics";

const WHATSAPP_PHONE = "5492664484918";

export const PROJECT_TYPES = [
  "Landing Page",
  "Web Institucional",
  "Tienda E-commerce",
  "App / SaaS a medida",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type ContactChannel = "whatsapp" | "email";

export {
  sanitizeText,
  sanitizePhone,
  sanitizeEmail,
  sanitizeMessage,
  isValidPhone,
  isValidName,
} from "../lib/validation";
import {
  sanitizeText,
  sanitizePhone,
  sanitizeEmail,
  sanitizeMessage,
  isValidPhone,
  isValidName,
} from "../lib/validation";

export function buildWhatsAppMessage(data: {
  projectType: string;
  name?: string;
  whatsapp?: string;
  email?: string;
  message?: string;
  isDirect?: boolean;
}) {
  const parts: string[] = [];
  const cleanName = sanitizeText(data.name || "");
  const cleanProjectType = sanitizeText(data.projectType || "Web");
  const cleanPhone = sanitizePhone(data.whatsapp || "");
  const cleanEmail = sanitizeEmail(data.email || "");
  const cleanMsg = sanitizeMessage(data.message || "");

  parts.push("¡Hola Maxi de Impulsa Tu Negocio! 👋");

  if (cleanName) {
    parts.push(`Mi nombre es *${cleanName}*.`);
  }

  parts.push(`🚀 *Proyecto de interés:* ${cleanProjectType}`);

  if (cleanMsg) {
    parts.push(`📝 *Detalle del objetivo o funciones que necesito:*\n"${cleanMsg}"`);
  }

  const contacts: string[] = [];
  if (cleanPhone) contacts.push(`WhatsApp: ${cleanPhone}`);
  if (cleanEmail) contacts.push(`Email: ${cleanEmail}`);

  if (contacts.length > 0) {
    parts.push(`📌 *Mis datos de contacto:*\n${contacts.join("\n")}`);
  }

  if (data.isDirect) {
    parts.push("Te escribo directamente para consultar por presupuesto y asesoramiento.");
  } else {
    parts.push("Quisiera conocer presupuesto y próximos pasos para avanzar. ¡Muchas gracias!");
  }

  return parts.join("\n\n");
}

export function buildEmailMailto(data: {
  projectType: string;
  name?: string;
  whatsapp?: string;
  email?: string;
  message?: string;
}) {
  const cleanName = sanitizeText(data.name || "");
  const cleanProjectType = sanitizeText(data.projectType || "Web");
  const cleanPhone = sanitizePhone(data.whatsapp || "");
  const cleanEmail = sanitizeEmail(data.email || "");
  const cleanMsg = sanitizeMessage(data.message || "");

  const subject = `Solicitud de cotización: ${cleanProjectType}${cleanName ? ` - ${cleanName}` : ""}`;
  const body = `¡Hola Maxi de Impulsa Tu Negocio!

Me pongo en contacto para solicitar una cotización:

- Proyecto: ${cleanProjectType}
- Nombre: ${cleanName || "No especificado"}
- WhatsApp: ${cleanPhone || "No especificado"}
- Email: ${cleanEmail || "No especificado"}

Detalle del objetivo o funciones que necesito:
${cleanMsg || "Por favor, contáctame para coordinar una propuesta."}

¡Saludos!`;

  return `mailto:contacto@impulsatunegocio.digital?cc=estudiodigital.dev@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [projectType, setProjectType] = useState<ProjectType>("Web Institucional");
  const [channel, setChannel] = useState<ContactChannel>("whatsapp");
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
    website: "", // Campo Honeypot trampa para bots
  });
  const [formMountedAt] = useState<number>(() => Date.now());
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    whatsapp?: string;
    email?: string;
    message?: string;
  }>({});
  const [validationAlert, setValidationAlert] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [lastSubmittedChannel, setLastSubmittedChannel] = useState<ContactChannel>("whatsapp");

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value;
    // Solo permitir números, espacios, guiones, paréntesis y '+'
    val = val.replace(/[^0-9+\s\-()]/g, "");
    if (val.includes("+")) {
      val = (val.startsWith("+") ? "+" : "") + val.slice(1).replace(/\+/g, "");
    }
    setForm((prev) => ({ ...prev, whatsapp: val }));
    if (fieldErrors.whatsapp) {
      setFieldErrors((prev) => ({ ...prev, whatsapp: undefined }));
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setForm((prev) => ({ ...prev, name: val }));
    if (fieldErrors.name) {
      setFieldErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  // Validación de datos completos para solicitar cotización formal
  const validateForm = () => {
    const cleanName = sanitizeText(form.name);
    const cleanEmail = sanitizeEmail(form.email);
    const cleanMsg = sanitizeMessage(form.message);

    const errors: {
      name?: string;
      whatsapp?: string;
      email?: string;
      message?: string;
    } = {};

    const nameCheck = isValidName(cleanName);
    if (!nameCheck.valid) {
      errors.name = nameCheck.error || "Ingresá un nombre válido";
    }

    const phoneCheck = isValidPhone(form.whatsapp);
    if (!phoneCheck.valid) {
      errors.whatsapp = phoneCheck.error || "Ingresá un teléfono válido";
    }

    // Correo requerido con formato básico válido
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail) {
      errors.email = "Ingresá tu correo electrónico";
    } else if (!emailRegex.test(cleanEmail)) {
      errors.email = "Ingresá un correo electrónico válido";
    }

    if (!cleanMsg || cleanMsg.length < 5) {
      errors.message = "Describí brevemente qué necesitás (mínimo 5 letras)";
    }

    setFieldErrors(errors);

    const errorValues = Object.values(errors).filter(Boolean);
    if (errorValues.length > 0) {
      const msg = errorValues[0] || "Por favor revisá los datos ingresados.";
      setValidationAlert(msg);
      toast.error(msg);
      return false;
    }

    setValidationAlert(null);
    return true;
  };

  // Acción: Solicitar cotización (por WhatsApp o por Correo según el canal seleccionado)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. FILTRO ANTI-SPAM: Honeypot y detección de envíos instantáneos automáticos
    const isHoneypotTriggered = Boolean(form.website && form.website.trim().length > 0);
    const isInstantBot = Date.now() - formMountedAt < 750; // Envío sobrehumano menor a 750ms

    if (isHoneypotTriggered || isInstantBot) {
      console.warn("[Anti-Spam] Bot neutralizado por Honeypot.");
      setSending(true);
      // Fingimos éxito visual para engañar al bot sin ejecutar llamadas reales ni abrir enlaces
      setTimeout(() => {
        setSending(false);
        setSent(true);
        if (channel === "whatsapp") {
          toast.success("¡Datos verificados! Redirigiendo a WhatsApp...");
        } else {
          toast.success("¡Tu solicitud de cotización fue enviada por correo con éxito!");
        }
      }, 650);
      return;
    }

    if (!validateForm() || sending) {
      return;
    }

    setSending(true);
    setValidationAlert(null);
    setLastSubmittedChannel(channel);

    // Sanitización estricta de todos los campos reales
    const cleanName = sanitizeText(form.name);
    const cleanPhone = sanitizePhone(form.whatsapp);
    const cleanEmail = sanitizeEmail(form.email);
    const cleanMsg = sanitizeMessage(form.message);

    trackQuoteRequest(projectType, channel, "form_submit");

    const waText = buildWhatsAppMessage({
      projectType,
      name: cleanName,
      whatsapp: cleanPhone,
      email: cleanEmail,
      message: cleanMsg,
    });
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;

    try {
      // Registramos la solicitud en el backend a través de /api/send-email (Nodemailer)
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          whatsapp: cleanPhone,
          email: cleanEmail,
          message: cleanMsg,
          projectType,
          website: form.website, // Se envía el honeypot (vacío para humanos)
        }),
      });

      const resData = await response.json().catch(() => null);

      if (response.ok && resData?.ok) {
        setSent(true);
        if (channel === "whatsapp") {
          toast.success("¡Datos verificados! Redirigiendo a WhatsApp...");
          window.open(waUrl, "_blank");
        } else {
          toast.success("¡Tu solicitud de cotización fue enviada por correo con éxito!");
        }
      } else {
        // Fallback para correo o si Nodemailer no está configurado aún en Vercel
        if (channel === "whatsapp") {
          setSent(true);
          toast.success("¡Datos listos! Redirigiendo a WhatsApp...");
          window.open(waUrl, "_blank");
        } else {
          const mailtoUrl = buildEmailMailto({
            projectType,
            name: cleanName,
            whatsapp: cleanPhone,
            email: cleanEmail,
            message: cleanMsg,
          });
          setSent(true);
          toast.info("Abriendo tu correo para enviar la consulta...");
          window.location.href = mailtoUrl;
        }
      }
    } catch (err) {
      console.error("Error enviando email:", err);
      setSent(true);
      if (channel === "whatsapp") {
        window.open(waUrl, "_blank");
      } else {
        const mailtoUrl = buildEmailMailto({
          projectType,
          name: cleanName,
          whatsapp: cleanPhone,
          email: cleanEmail,
          message: cleanMsg,
        });
        window.location.href = mailtoUrl;
      }
    } finally {
      setSending(false);
    }
  };

  // Acción: Contacto directo por WhatsApp SIN necesidad de completar el formulario
  const handleDirectWhatsApp = () => {
    trackWhatsAppClick("contact_section_direct_button", projectType);
    const waText = buildWhatsAppMessage({
      projectType,
      name: sanitizeText(form.name),
      whatsapp: sanitizePhone(form.whatsapp),
      email: sanitizeEmail(form.email),
      message: sanitizeMessage(form.message),
      isDirect: true,
    });
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;
    toast.info("Abriendo WhatsApp para contacto directo...");
    window.open(waUrl, "_blank");
  };

  return (
    <motion.div
      className="neon-form-column"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="neon-form-card">
        <span className="neon-form-glow" aria-hidden="true" />
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              className="neon-form"
              key="form"
              onSubmit={handleSubmit}
              noValidate
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Encabezado de la tarjeta */}
              <div className="neon-form-heading">
                <div>
                  <span className="neon-mono-label">PEDÍ TU COTIZACIÓN</span>
                  <h3>Hagamos que te elijan.</h3>
                </div>
                <span className="neon-reply">
                  <Clock3 size={12} /> respuesta rápida
                </span>
              </div>
              <p className="neon-form-intro">
                Contame qué necesitás cotizar y te respondo con una propuesta concreta.
              </p>

              {/* Subtítulo y selector de tipo de proyecto */}
              <h4 className="neon-form-subheading">
                ¿No estás seguro de qué necesitas? ¡Hagámoslo simple!
              </h4>
              <label className="neon-form-group-label">Qué estás buscando? *</label>
              <div
                className="neon-topic-list"
                role="radiogroup"
                aria-label="Qué estás buscando?"
              >
                {PROJECT_TYPES.map((type) => {
                  const isSelected = projectType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`neon-topic ${isSelected ? "active" : ""}`}
                      onClick={() => {
                        setProjectType(type);
                        trackEvent("select_project_type", { project_type: type });
                      }}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>

              {/* Campo trampa Honeypot: invisible para humanos y lectores de pantalla, pero visible para bots */}
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "-9999px",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                  pointerEvents: "none",
                  overflow: "hidden",
                }}
                aria-hidden="true"
                tabIndex={-1}
              >
                <label htmlFor="form_website_hp">Website (no completar si eres humano)</label>
                <input
                  id="form_website_hp"
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  value={form.website}
                  onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
                />
              </div>

              {/* Campos en dos columnas: Nombre y WhatsApp/Teléfono */}
              <div className="neon-form-grid">
                <div>
                  <input
                    className={`neon-input ${fieldErrors.name ? "neon-input-error" : ""}`}
                    placeholder="Tu nombre completo *"
                    aria-label="Tu nombre completo"
                    value={form.name}
                    onChange={handleNameChange}
                  />
                  {fieldErrors.name && (
                    <span className="neon-field-error-msg">{fieldErrors.name}</span>
                  )}
                </div>

                <div>
                  <input
                    className={`neon-input ${fieldErrors.whatsapp ? "neon-input-error" : ""}`}
                    type="tel"
                    placeholder="WhatsApp o celular (ej: 266 448-4918 o +54 9...)"
                    aria-label="Número de WhatsApp o teléfono"
                    value={form.whatsapp}
                    onChange={handlePhoneChange}
                  />
                  {fieldErrors.whatsapp && (
                    <span className="neon-field-error-msg">{fieldErrors.whatsapp}</span>
                  )}
                </div>
              </div>

              {/* Correo electrónico */}
              <div style={{ marginTop: "14px" }}>
                <input
                  className={`neon-input ${fieldErrors.email ? "neon-input-error" : ""}`}
                  type="email"
                  placeholder="Tu correo electrónico *"
                  aria-label="Tu correo electrónico"
                  value={form.email}
                  onChange={(event) => {
                    setForm({ ...form, email: event.target.value });
                    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                {fieldErrors.email && (
                  <span className="neon-field-error-msg">{fieldErrors.email}</span>
                )}
              </div>

              {/* Textarea para descripción del objetivo o funciones */}
              <div style={{ marginTop: "14px" }}>
                <textarea
                  className={`neon-input neon-textarea ${fieldErrors.message ? "neon-input-error" : ""}`}
                  rows={3}
                  placeholder="Describe el objetivo, referencias visuales o funciones clave *"
                  aria-label="Describe el objetivo, referencias visuales o funciones clave"
                  value={form.message}
                  onChange={(event) => {
                    setForm({ ...form, message: event.target.value });
                    if (fieldErrors.message)
                      setFieldErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                />
                {fieldErrors.message && (
                  <span className="neon-field-error-msg">{fieldErrors.message}</span>
                )}
              </div>

              {/* Selector de medio para la cotización */}
              <div className="neon-channel-selector">
                <label className="neon-form-group-label">
                  ¿Por qué medio preferís recibir tu cotización? *
                </label>
                <div className="neon-channel-options">
                  <button
                    type="button"
                    className={`neon-channel-btn ${channel === "whatsapp" ? "active" : ""}`}
                    onClick={() => setChannel("whatsapp")}
                  >
                    <MessageCircle size={15} />
                    <span>Por WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    className={`neon-channel-btn ${channel === "email" ? "active" : ""}`}
                    onClick={() => setChannel("email")}
                  >
                    <Mail size={15} />
                    <span>Por Correo Electrónico</span>
                  </button>
                </div>
              </div>

              {/* Aviso si faltan datos */}
              {validationAlert && (
                <div className="neon-validation-alert">
                  <AlertCircle size={16} />
                  <span>{validationAlert}</span>
                </div>
              )}

              {/* Botón principal integrado según el canal elegido */}
              <button
                className="neon-submit"
                type="submit"
                disabled={sending}
                style={sending ? { opacity: 0.7 } : undefined}
              >
                <span>
                  {sending
                    ? "Procesando…"
                    : channel === "whatsapp"
                      ? "Solicitar cotización por WhatsApp"
                      : "Solicitar cotización por Correo"}
                </span>
                <Send size={15} />
              </button>

              {/* Opción sutil y limpia de contacto directo sin formulario */}
              <div className="neon-direct-contact-wrapper">
                <button
                  type="button"
                  className="neon-direct-link-btn"
                  onClick={handleDirectWhatsApp}
                  title="Escribir directo a WhatsApp sin completar campos"
                >
                  <MessageCircle size={14} />
                  <span>¿Preferís no completar el formulario? Hablá directo por WhatsApp</span>
                </button>
              </div>

              <p className="neon-form-footer-note">
                Sin spam. Te responderemos por WhatsApp o email en menos de 2 horas hábiles.
              </p>
            </motion.form>
          ) : (
            <motion.div
              className="neon-success"
              key="success"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="neon-success-icon">
                <CheckCircle2 size={32} />
              </span>
              <span className="neon-mono-label">SOLICITUD REGISTRADA</span>
              <h3>¡Excelente, {sanitizeText(form.name).split(" ")[0] || "gracias"}!</h3>
              <p>
                {lastSubmittedChannel === "whatsapp"
                  ? `Preparamos tu consulta para ${projectType} en WhatsApp con todos los datos que ingresaste para que puedas enviarla en un toque.`
                  : `Recibimos tu solicitud para ${projectType}. Te contactaremos a tu WhatsApp (${sanitizePhone(form.whatsapp)}) y a tu correo (${sanitizeEmail(form.email)}) a la brevedad.`}
              </p>

              <button
                className="neon-reset"
                type="button"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", whatsapp: "", message: "", website: "" });
                  setFieldErrors({});
                  setValidationAlert(null);
                }}
              >
                Enviar otra consulta
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const faqs = [
  {
    question: "¿Landing page, sitio web o aplicación web?",
    answer:
      "Una landing concentra una campaña o servicio en una sola acción directa. Un sitio completo funciona como la casa digital del negocio con múltiples secciones y SEO. Y una app web permite automatizar procesos diarios como turnos online, reservas, presupuestos por WhatsApp o gestión de clientes.",
  },
  {
    question: "¿Cómo funciona la integración con WhatsApp?",
    answer:
      "Podés solicitar tu cotización por WhatsApp con todos los datos precargados, o bien contactarnos de forma directa en un clic sin llenar el formulario.",
  },
  {
    question: "¿Qué necesito para arrancar?",
    answer:
      "Solo una idea y ganas de ordenar el próximo paso. Entendemos tu negocio, tu público y tu objetivo antes de recomendarte una solución.",
  },
  {
    question: "¿La web ayuda a aparecer en Google y en buscadores con IA?",
    answer:
      "Construimos una base de SEO honesta: estructura clara, contenido útil, velocidad, accesibilidad y datos organizados. Eso ayuda a que Google y los asistentes entiendan mejor tu negocio, sin prometer posiciones garantizadas.",
  },
  {
    question: "¿Puedo empezar simple y sumar funciones después?",
    answer:
      "Sí, 100%. Podés arrancar con una landing o sitio base y más adelante incorporar un sistema de reservas, portal de clientes o catálogo autogestionable a medida que tu negocio crezca.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="neon-faq" itemScope itemType="https://schema.org/FAQPage">
      <span className="neon-mono-label">ANTES DE ESCRIBIR · RESPUESTAS RÁPIDAS</span>
      <div className="neon-faq-list">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div
              className="neon-faq-item"
              key={faq.question}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                type="button"
                id={`faq-question-${index}`}
                aria-controls={`faq-answer-${index}`}
                className="neon-faq-question"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span itemProp="name">{faq.question}</span>
                <ChevronDown
                  className={isOpen ? "neon-faq-chevron open" : "neon-faq-chevron"}
                  size={16}
                  aria-hidden="true"
                />
              </button>
              <motion.div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className="neon-faq-answer"
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{
                  overflow: "hidden",
                }}
              >
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">{faq.answer}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
