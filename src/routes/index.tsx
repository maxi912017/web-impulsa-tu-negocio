import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/landing/NeonLanding";
import { SITE_URL } from "@/lib/seo-schema";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Impulsa Tu Negocio | Webs y Apps que hacen crecer negocios" },
      {
        name: "description",
        content:
          "Estudio digital de diseño y desarrollo web de alto impacto, landing pages de alta conversión, web apps y sistemas de gestión con IA a medida en Argentina.",
      },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        property: "og:title",
        content: "Impulsa Tu Negocio | Webs y Apps que hacen crecer negocios",
      },
      {
        property: "og:description",
        content:
          "Sitios web, landing pages y web apps a medida para verte profesional, generar confianza y atraer más clientes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:secure_url", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Impulsa Tu Negocio - Webs y Apps que hacen crecer negocios",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
      {
        name: "twitter:title",
        content: "Impulsa Tu Negocio | Webs y Apps que hacen crecer negocios",
      },
      {
        name: "twitter:description",
        content:
          "Sitios web, landing pages y web apps a medida para verte profesional, generar confianza y atraer más clientes.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

function Index() {
  return <Landing />;
}
