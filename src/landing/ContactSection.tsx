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

const WHATSAPP_PHONE = "5492664484918";

export const PROJECT_TYPES = [
  "Landing Page",
  "Web Institucional",
  "Tienda E-commerce",
  "App / SaaS a medida",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type ContactChannel = "whatsapp" | "email";

export function buildWhatsAppMessage(data: {
  projectType: string;
  name?: string;
  whatsapp?: string;
  email?: string;
  message?: string;
  isDirect?: boolean;
}) {
  const parts: string[] = [];

  parts.push("¡Hola Maxi de Impulsa Tu Negocio! 👋");

  if (data.name?.trim()) {
    parts.push(`Mi nombre es *${data.name.trim()}*.`);
  }

  parts.push(`🚀 *Proyecto de interés:* ${data.projectType}`);

  if (data.message?.trim()) {
    parts.push(`📝 *Detalle del objetivo o funciones que necesito:*\n"${data.message.trim()}"`);
  }

  const contacts: string[] = [];
  if (data.whatsapp?.trim()) contacts.push(`WhatsApp: ${data.whatsapp.trim()}`);
  if (data.email?.trim()) contacts.push(`Email: ${data.email.trim()}`);

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
  const subject = `Solicitud de cotización: ${data.projectType}${data.name ? ` - ${data.name}` : ""}`;
  const body = `¡Hola Maxi de Impulsa Tu Negocio!

Me pongo en contacto para solicitar una cotización:

- Proyecto: ${data.projectType}
- Nombre: ${data.name || "No especificado"}
- WhatsApp: ${data.whatsapp || "No especificado"}
- Email: ${data.email || "No especificado"}

Detalle del objetivo o funciones que necesito:
${data.message || "Por favor, contáctame para coordinar una propuesta."}

¡Saludos!`;

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [projectType, setProjectType] = useState<ProjectType>("Web Institucional");
  const [channel, setChannel] = useState<ContactChannel>("whatsapp");
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<{
    name?: boolean;
    whatsapp?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});
  const [validationAlert, setValidationAlert] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [lastSubmittedChannel, setLastSubmittedChannel] = useState<ContactChannel>("whatsapp");

  // Validación de datos completos para solicitar cotización formal
  const validateForm = () => {
    const errors: { name?: boolean; whatsapp?: boolean; email?: boolean; message?: boolean } = {};
    let missingInfo = false;

    if (!form.name.trim()) {
      errors.name = true;
      missingInfo = true;
    }

    // Número de teléfono / WhatsApp requerido
    const phoneClean = form.whatsapp.replace(/\D/g, "");
    if (!form.whatsapp.trim() || phoneClean.length < 6) {
      errors.whatsapp = true;
      missingInfo = true;
    }

    // Correo requerido con formato básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      errors.email = true;
      missingInfo = true;
    }

    if (!form.message.trim()) {
      errors.message = true;
      missingInfo = true;
    }

    setFieldErrors(errors);

    if (missingInfo) {
      const msg =
        "Por favor completá tus datos y tu número de teléfono para solicitar la cotización.";
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

    if (!validateForm() || sending) {
      return;
    }

    setSending(true);
    setValidationAlert(null);
    setLastSubmittedChannel(channel);

    const waText = buildWhatsAppMessage({
      projectType,
      name: form.name,
      whatsapp: form.whatsapp,
      email: form.email,
      message: form.message,
    });
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;

    try {
      // Registramos la solicitud en el backend a través de /api/send-email (Nodemailer)
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, projectType }),
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
        // Si el backend no tiene configuradas aún las credenciales de Nodemailer (GMAIL_USER / GMAIL_APP_PASSWORD):
        if (channel === "whatsapp") {
          setSent(true);
          toast.success("¡Datos listos! Redirigiendo a WhatsApp...");
          window.open(waUrl, "_blank");
        } else {
          // Fallback para correo: abre el cliente de correo del usuario con el mensaje redactado
          const mailtoUrl = buildEmailMailto({
            projectType,
            name: form.name,
            whatsapp: form.whatsapp,
            email: form.email,
            message: form.message,
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
          name: form.name,
          whatsapp: form.whatsapp,
          email: form.email,
          message: form.message,
        });
        window.location.href = mailtoUrl;
      }
    } finally {
      setSending(false);
    }
  };

  // Acción: Contacto directo por WhatsApp SIN necesidad de completar el formulario
  const handleDirectWhatsApp = () => {
    const waText = buildWhatsAppMessage({
      projectType,
      name: form.name,
      whatsapp: form.whatsapp,
      email: form.email,
      message: form.message,
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
                      onClick={() => setProjectType(type)}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>

              {/* Campos en dos columnas: Nombre y WhatsApp/Teléfono */}
              <div className="neon-form-grid">
                <div>
                  <input
                    className={`neon-input ${fieldErrors.name ? "neon-input-error" : ""}`}
                    placeholder="Tu nombre completo *"
                    aria-label="Tu nombre completo"
                    value={form.name}
                    onChange={(event) => {
                      setForm({ ...form, name: event.target.value });
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: false });
                    }}
                  />
                  {fieldErrors.name && (
                    <span className="neon-field-error-msg">Ingresá tu nombre</span>
                  )}
                </div>

                <div>
                  <input
                    className={`neon-input ${fieldErrors.whatsapp ? "neon-input-error" : ""}`}
                    type="tel"
                    placeholder="Número de WhatsApp o teléfono *"
                    aria-label="Número de WhatsApp o teléfono"
                    value={form.whatsapp}
                    onChange={(event) => {
                      setForm({ ...form, whatsapp: event.target.value });
                      if (fieldErrors.whatsapp)
                        setFieldErrors({ ...fieldErrors, whatsapp: false });
                    }}
                  />
                  {fieldErrors.whatsapp && (
                    <span className="neon-field-error-msg">Ingresá tu teléfono</span>
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
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: false });
                  }}
                />
                {fieldErrors.email && (
                  <span className="neon-field-error-msg">Ingresá un correo válido</span>
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
                      setFieldErrors({ ...fieldErrors, message: false });
                  }}
                />
                {fieldErrors.message && (
                  <span className="neon-field-error-msg">
                    Describí brevemente qué necesitás
                  </span>
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
              <h3>¡Excelente, {form.name.split(" ")[0]}!</h3>
              <p>
                {lastSubmittedChannel === "whatsapp"
                  ? `Preparamos tu consulta para ${projectType} en WhatsApp con todos los datos que ingresaste para que puedas enviarla en un toque.`
                  : `Recibimos tu solicitud para ${projectType}. Te contactaremos a tu WhatsApp (${form.whatsapp}) y a tu correo (${form.email}) a la brevedad.`}
              </p>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                  maxWidth: "340px",
                }}
              >
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                    buildWhatsAppMessage({
                      projectType,
                      name: form.name,
                      whatsapp: form.whatsapp,
                      email: form.email,
                      message: form.message,
                    })
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="neon-submit"
                  style={{ textDecoration: "none", margin: 0 }}
                >
                  <MessageCircle size={18} />
                  <span>Abrir WhatsApp con mi cotización</span>
                </a>
              </div>

              <button
                className="neon-reset"
                type="button"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", whatsapp: "", message: "" });
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
