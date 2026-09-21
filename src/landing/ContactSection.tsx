import { type FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, Clock3, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import './neon-landing.css';

const faqs = [
  {
    question: '¿Landing page, sitio web o aplicación web?',
    answer:
      'Una landing concentra una campaña o servicio en una sola acción directa. Un sitio completo funciona como la casa digital del negocio con múltiples secciones y SEO. Y una app web permite automatizar procesos diarios como turnos online, reservas, presupuestos por WhatsApp o gestión de clientes.',
  },
  {
    question: '¿Cómo funciona la integración con WhatsApp?',
    answer:
      'Conectamos los botones y formularios para que las solicitudes, reservas o consultas lleguen directamente a tu chat de WhatsApp con un mensaje prearmado y ordenado, sin intermediarios ni demoras.',
  },
  {
    question: '¿Qué necesito para arrancar?',
    answer:
      'Solo una idea y ganas de ordenar el próximo paso. Entendemos tu negocio, tu público y tu objetivo antes de recomendarte una solución.',
  },
  {
    question: '¿La web ayuda a aparecer en Google y en buscadores con IA?',
    answer:
      'Construimos una base de SEO honesta: estructura clara, contenido útil, velocidad, accesibilidad y datos organizados. Eso ayuda a que Google y los asistentes entiendan mejor tu negocio, sin prometer posiciones garantizadas.',
  },
  {
    question: '¿Puedo empezar simple y sumar funciones después?',
    answer:
      'Sí, 100%. Podés arrancar con una landing o sitio base y más adelante incorporar un sistema de reservas, portal de clientes o catálogo autogestionable a medida que tu negocio crezca.',
  },
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', message: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.whatsapp || !form.message || sending) return;
    setSending(true);
    setError(null);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        setError('No pudimos enviar tu solicitud. Probá de nuevo o escribinos por WhatsApp.');
        return;
      }
      setSent(true);
      toast.success('Tu solicitud de cotización fue enviada con éxito');
    } catch (err) {
      console.error(err);
      setError('No pudimos enviar tu solicitud. Probá de nuevo o escribinos por WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      className="neon-form-column"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
    >
      <div className="neon-form-card">
        <span className="neon-form-glow" aria-hidden="true" />
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              className="neon-form"
              key="form"
              onSubmit={handleSubmit}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="neon-form-heading">
                <div>
                  <span className="neon-mono-label">PEDÍ TU COTIZACIÓN</span>
                  <h3>Hagamos que te elijan.</h3>
                </div>
                <span className="neon-reply"><Clock3 size={12} /> respuesta rápida</span>
              </div>
              <p className="neon-form-intro">Contame qué necesitás cotizar y te respondo con una propuesta concreta.</p>
              <div className="neon-form-grid">
                <input
                  className="neon-input"
                  placeholder="Tu nombre completo *"
                  aria-label="Tu nombre completo"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                />
                <input
                  className="neon-input"
                  type="tel"
                  placeholder="Número de WhatsApp *"
                  aria-label="Número de WhatsApp"
                  required
                  value={form.whatsapp}
                  onChange={(event) => setForm({ ...form, whatsapp: event.target.value })}
                />
              </div>
              <input
                className="neon-input"
                type="email"
                placeholder="Tu correo electrónico *"
                aria-label="Tu correo electrónico"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              <textarea
                className="neon-input neon-textarea"
                rows={4}
                placeholder="Detalle de lo que necesitás cotizar *"
                aria-label="Detalle de lo que necesitás cotizar"
                required
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
              />
              <button className="neon-submit" type="submit" disabled={sending} style={sending ? { opacity: 0.7 } : undefined}>
                <span>{sending ? 'Enviando…' : 'Solicitar cotización'}</span> <Send size={16} />
              </button>
              {error ? (
                <small className="neon-form-note" style={{ color: '#fca5a5' }}>{error}</small>
              ) : (
                <small className="neon-form-note">Sin spam. Te responderemos directamente para coordinar.</small>
              )}
            </motion.form>
          ) : (
            <motion.div
              className="neon-success"
              key="success"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="neon-success-icon"><CheckCircle2 size={30} /></span>
              <span className="neon-mono-label">SOLICITUD RECIBIDA</span>
               <h3>¡Perfecto! Ya dimos el primer paso.</h3>
              <p>Gracias, {form.name.split(' ')[0] || 'por escribir'}. Tu solicitud de cotización fue enviada con éxito. Te contactaremos a tu WhatsApp <strong>{form.whatsapp}</strong> o a tu correo para ordenar la propuesta.</p>
              <div style={{ marginTop: '16px' }}>
                <a
                  href={`https://wa.me/5492664484918?text=Hola%20Maxi%2C%20soy%20${encodeURIComponent(form.name)}%2C%20acabo%20de%20enviar%20una%20solicitud%20de%20cotizaci%C3%B3n%20desde%20la%20web`}
                  target="_blank"
                  rel="noreferrer"
                  className="neon-portfolio-yellow-button"
                  style={{ display: 'inline-flex', padding: '0 20px', minHeight: '44px', fontSize: '13px' }}
                >
                  <MessageCircle size={16} />
                  <span>O abrir WhatsApp ahora</span>
                </a>
              </div>
              <button className="neon-reset" type="button" onClick={() => { setSent(false); setForm({ name: '', email: '', whatsapp: '', message: '' }); }}>Enviar otra consulta</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <FAQ />
    </motion.div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="neon-faq">
      <span className="neon-mono-label">ANTES DE ESCRIBIR · RESPUESTAS RÁPIDAS</span>
      <div className="neon-faq-list">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div className="neon-faq-item" key={faq.question}>
              <button
                type="button"
                className="neon-faq-question"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown className={isOpen ? 'neon-faq-chevron open' : 'neon-faq-chevron'} size={16} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="neon-faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
