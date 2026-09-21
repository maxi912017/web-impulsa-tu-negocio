import { Star } from 'lucide-react';
import './neon-landing.css';

const reviews = [
  {
    name: 'Martín R.',
    role: 'Servicios Técnicos & Climatización',
    stars: 5,
    highlight: 'Más presupuestos cerrados en menos tiempo',
    comment:
      'Antes perdía clientes por pasar presupuestos tarde en notas de audio. Con la web y el botón directo a WhatsApp, la gente ve mis trabajos anteriores y me escribe decidida. Un cambio total en la imagen de mi negocio.',
  },
  {
    name: 'Dra. Valeria S.',
    role: 'Centro de Estética & Bienestar',
    stars: 5,
    highlight: 'Agenda completa desde Instagram',
    comment:
      'La landing page conectada con mis historias y anuncios de Instagram aumentó un montón las reservas de turnos. Se ve impecable, elegante y transmite la confianza que mi centro necesitaba.',
  },
  {
    name: 'Gonzalo M.',
    role: 'Emprendimiento Gastronómico & Eventos',
    stars: 5,
    highlight: 'Ahorro de horas de atención diaria',
    comment:
      'El diseño digital y la carta interactiva nos ahorraron horas de responder mensajes repetitivos en WhatsApp. La atención de Maxi fue súper cercana, rápida y atenta a cada detalle.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="neon-reviews-section neon-container" id="testimonios">
      <div className="neon-reviews-header">
        <span className="neon-mono-label neon-accent-label">OPINIONES DE CLIENTES</span>
        <h2 className="neon-section-title">
          Lo que dicen quienes ya <span>confiaron en su presencia digital.</span>
        </h2>
        <p className="neon-reviews-intro">
          Resultados medibles: más consultas por WhatsApp, agendas organizadas y clientes que reconocen la calidad del servicio.
        </p>
      </div>

      <div className="neon-reviews-grid">
        {reviews.map((rev, idx) => (
          <div key={idx} className="neon-review-card">
            <div className="neon-review-stars">
              {Array.from({ length: rev.stars }).map((_, i) => (
                <Star key={i} size={15} fill="#d7fe3b" color="#d7fe3b" />
              ))}
            </div>
            <strong className="neon-review-highlight">"{rev.highlight}"</strong>
            <p className="neon-review-comment">{rev.comment}</p>
            <div className="neon-review-author">
              <div className="neon-review-author-avatar">{rev.name.charAt(0)}</div>
              <div>
                <span className="neon-review-name">{rev.name}</span>
                <span className="neon-review-role">{rev.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
