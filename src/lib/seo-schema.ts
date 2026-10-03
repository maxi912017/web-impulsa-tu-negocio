/**
 * Esquema de datos estructurados Schema.org (JSON-LD) optimizado para AI SEO,
 * motores de búsqueda generativa (Perplexity, ChatGPT, Claude, Gemini) y Google Rich Results.
 */
export const SITE_URL = "https://www.impulsatunegocio.digital";
export const SITE_EMAIL = "contacto@impulsatunegocio.digital";

/**
 * Esquema de datos estructurados enfocado en desarrollo de software y servicios profesionales en San Luis.
 */
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Estudio Digital Impulsa Tu Negocio",
  "alternateName": [
    "Estudio Digital Impulsa Tu Negocio.DEV",
    "Impulsa Tu Negocio",
    "impulsa tu negocio.dev",
    "impulsatunegocio.digital"
  ],
  "url": "https://www.impulsatunegocio.digital",
  "email": "contacto@impulsatunegocio.digital",
  "description": "Servicios profesionales de desarrollo web, diseño de aplicaciones móviles y soluciones digitales a medida en San Luis, Argentina.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San Luis",
    "addressRegion": "San Luis",
    "addressCountry": "AR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-33.30805",
    "longitude": "-66.357584"
  },
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "3",
    "bestRating": "5",
    "worstRating": "1"
  },
  "areaServed": [
    {
      "@type": "AdministrativeArea",
      "name": "San Luis"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Juana Koslay"
    },
    {
      "@type": "AdministrativeArea",
      "name": "La Punta"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/impulsatunegocio.dev?stkn=MTFyczcxbGM2cGY0Mg%3D%3D",
    "https://wa.me/5492664484918",
    "https://impulsatunegocio.digital",
    "https://impulsa-tu-negociodev.vercel.app"
  ]
};

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": `${SITE_URL}/`,
      "name": "Impulsa Tu Negocio",
      "alternateName": [
        "Estudio Digital Impulsa Tu Negocio",
        "impulsa tu negocio.dev",
        "impulsatunegocio.digital",
        "ImpulsaTuNegocio",
        "Impulsa Tu Negocio Estudio Digital"
      ],
      "description":
        "Estudio digital especializado en diseño y desarrollo web de alto impacto, landing pages de alta conversión, sistemas de gestión y web apps a medida.",
      "inLanguage": "es",
      "publisher": {
        "@id": `${SITE_URL}/#organization`
      }
    },
    {
      "@type": ["ProfessionalService", "Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      "name": "Impulsa Tu Negocio",
      "alternateName": [
        "Estudio Digital Impulsa Tu Negocio",
        "impulsa tu negocio.dev",
        "impulsatunegocio.digital"
      ],
      "url": `${SITE_URL}/`,
      "logo": `${SITE_URL}/favicon.png`,
      "image": `${SITE_URL}/og-image.png`,
      "telephone": "+5492664484918",
      "email": "contacto@impulsatunegocio.digital",
      "priceRange": "$$",
      "currenciesAccepted": "ARS, USD",
      "paymentAccepted": "Transferencia bancaria, Mercado Pago, Efectivo",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "3",
        "bestRating": "5",
        "worstRating": "1"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AR"
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "Argentina"
        },
        {
          "@type": "AdministrativeArea",
          "name": "América Latina"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/impulsatunegocio.dev?stkn=MTFyczcxbGM2cGY0Mg%3D%3D",
        "https://wa.me/5492664484918",
        "https://impulsatunegocio.digital",
        "https://impulsa-tu-negociodev.vercel.app"
      ],
      "knowsAbout": [
        "Desarrollo Web Fullstack",
        "Landing Pages de Alta Conversión",
        "Web Apps y SaaS a Medida",
        "Cálculos Técnicos y Presupuestadores con IA",
        "Integración con WhatsApp y Pasarelas de Pago",
        "SEO Técnico y Accesibilidad Web"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catálogo de Soluciones Digitales y Desarrollo Web",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Landing pages de alta conversión",
              "description":
                "Una página con una sola acción principal orientada a que te escriban o consulten por WhatsApp. Ideal para campañas publicitarias, servicios puntuales y lanzamientos.",
              "provider": {
                "@id": `${SITE_URL}/#organization`
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sitios web completos e institucionales",
              "description":
                "La casa digital de tu negocio con múltiples secciones para contar quién sos, qué hacés y por qué elegirte. Diseñados con SEO honesto para posicionar en buscadores.",
              "provider": {
                "@id": `${SITE_URL}/#organization`
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web apps y sistemas SaaS a medida",
              "description":
                "Aplicaciones web interactivas para automatizar procesos de trabajo: presupuestos técnicos con cálculos normativos, integración de Inteligencia Artificial, turnos online y control de clientes.",
              "provider": {
                "@id": `${SITE_URL}/#organization`
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Identidad digital y visibilidad en Google",
              "description":
                "Bases sólidas de posicionamiento orgánico (SEO), presencia optimizada en motores de búsqueda de IA, velocidad de carga óptima y diseño responsive móvil.",
              "provider": {
                "@id": `${SITE_URL}/#organization`
              }
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Landing page, sitio web o aplicación web?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Una landing concentra una campaña o servicio en una sola acción directa. Un sitio completo funciona como la casa digital del negocio con múltiples secciones y SEO. Y una app web permite automatizar procesos diarios como turnos online, reservas, presupuestos por WhatsApp o gestión de clientes."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo funciona la integración con WhatsApp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Podés solicitar tu cotización por WhatsApp con todos los datos precargados, o bien contactarnos de forma directa en un clic sin llenar el formulario."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué necesito para arrancar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Solo una idea y ganas de ordenar el próximo paso. Entendemos tu negocio, tu público y tu objetivo antes de recomendarte una solución."
          }
        },
        {
          "@type": "Question",
          "name": "¿La web ayuda a aparecer en Google y en buscadores con IA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Construimos una base de SEO honesta: estructura clara, contenido útil, velocidad, accesibilidad y datos organizados. Eso ayuda a que Google y los asistentes de Inteligencia Artificial entiendan mejor tu negocio, sin prometer posiciones garantizadas."
          }
        },
        {
          "@type": "Question",
          "name": "¿Puedo empezar simple y sumar funciones después?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Sí, 100%. Podés arrancar con una landing o sitio base y más adelante incorporar un sistema de reservas, portal de clientes o catálogo autogestionable a medida que tu negocio crezca."
          }
        }
      ]
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#portfolio-items`,
      "name": "Casos de éxito y proyectos desarrollados por Impulsa Tu Negocio",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": "SaaS integral para electricistas e instaladores matriculados (Instalaciones Eléctricas Pampa)",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "description":
              "Cálculos técnicos AEA desde cero según el Reglamento Argentino, creación de listas con IA pegando notas de WhatsApp y presupuestos en PDF con logo propio, ajuste por IPC y cotización del Dólar Blue en tiempo real."
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "WebSite",
            "name": "Landing inmobiliaria con catálogo de propiedades y reservas",
            "description":
              "Catálogo de inmuebles con fotos de alta resolución, fichas técnicas, buscador por zona y rango de precio, y panel de consultas con seguimiento hasta concretar la reserva."
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Web app médica para kinesiólogos y traumatología deportiva",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web",
            "description":
              "Sistema de reservas de turnos online sincronizado con Google Calendar, fichas kinesiológicas con evolución del paciente y recordatorios automatizados por WhatsApp."
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Sistema web para taller mecánico y turnos de service",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "description":
              "Agenda de turnos online por tipo de service, historial de mantenimiento por patente del vehículo y notificación automática al cliente cuando el vehículo está listo para retirar."
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "WebSite",
            "name": "Sitio corporativo y cotizador para imprenta digital",
            "description":
              "Muestrario de impresiones, folletería y cartelería, cotizador interactivo en tiempo real según tipo de papel, tirada y acabados, y carga directa de originales por WhatsApp."
          }
        }
      ]
    }
  ]
};
