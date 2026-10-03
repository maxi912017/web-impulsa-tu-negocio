import { Star } from "lucide-react";
import "./neon-landing.css";

const reviews = [
  {
    name: "Martín R.",
    role: "Servicios Técnicos & Climatización",
    stars: 5,
    highlight: "Más presupuestos cerrados en menos tiempo",
    comment:
      "Antes perdía clientes por pasar presupuestos tarde en notas de audio. Con la web y el botón directo a WhatsApp, la gente ve mis trabajos anteriores y me escribe decidida. Un cambio total en la imagen de mi negocio.",
  },
  {
    name: "Dra. Valeria S.",
    role: "Centro de Estética & Bienestar",
    stars: 5,
    highlight: "Agenda completa desde Instagram",
    comment:
      "La landing page conectada con mis historias y anuncios de Instagram aumentó un montón las reservas de turnos. Se ve impecable, elegante y transmite la confianza que mi centro necesitaba.",
  },
  {
    name: "Gonzalo M.",
    role: "Emprendimiento Gastronómico & Eventos",
    stars: 5,
    highlight: "Ahorro de horas de atención diaria",
    comment:
      "El diseño digital y la carta interactiva nos ahorraron horas de responder mensajes repetitivos en WhatsApp. La atención de Maxi fue súper cercana, rápida y atenta a cada detalle.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="neon-reviews-section neon-container">
      <div className="neon-reviews-header">
        <span className="neon-mono-label neon-accent-label">OPINIONES DE CLIENTES</span>
        <h2 className="neon-section-title">
          Lo que dicen quienes ya <span>confiaron en su presencia digital.</span>
        </h2>
        <p className="neon-reviews-intro">
          Resultados medibles: más consultas por WhatsApp, agendas organizadas y clientes que
          reconocen la calidad del servicio.
        </p>
      </div>

      <div className="neon-reviews-grid">
        {reviews.map((rev, idx) => (
          <article
            key={idx}
            className="neon-review-card"
            itemScope
            itemType="https://schema.org/Review"
            data-ai-chunk="client-testimonial"
          >
            <div
              className="neon-review-stars"
              role="img"
              aria-label={`Calificación: ${rev.stars} de 5 estrellas`}
            >
              {Array.from({ length: rev.stars }).map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  fill="#d7fe3b"
                  color="#d7fe3b"
                  aria-hidden="true"
                />
              ))}
            </div>
            <div
              itemProp="reviewRating"
              itemScope
              itemType="https://schema.org/Rating"
              style={{ display: "none" }}
            >
              <meta itemProp="ratingValue" content={String(rev.stars)} />
              <meta itemProp="bestRating" content="5" />
            </div>
            <div
              itemProp="itemReviewed"
              itemScope
              itemType="https://schema.org/ProfessionalService"
              style={{ display: "none" }}
            >
              <meta itemProp="name" content="Estudio Digital Impulsa Tu Negocio" />
              <meta itemProp="url" content="https://www.impulsatunegocio.digital/" />
              <meta itemProp="image" content="https://www.impulsatunegocio.digital/favicon.png" />
              <meta itemProp="telephone" content="+5492664484918" />
              <meta itemProp="priceRange" content="$$" />
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <meta itemProp="addressLocality" content="San Luis" />
                <meta itemProp="addressRegion" content="San Luis" />
                <meta itemProp="addressCountry" content="AR" />
              </div>
            </div>
            <strong className="neon-review-highlight">"{rev.highlight}"</strong>
            <p className="neon-review-comment" itemProp="reviewBody">
              {rev.comment}
            </p>
            <div
              className="neon-review-author"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="neon-review-author-avatar" aria-hidden="true">
                {rev.name.charAt(0)}
              </div>
              <div>
                <span className="neon-review-name" itemProp="name">
                  {rev.name}
                </span>
                <span className="neon-review-role">{rev.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
