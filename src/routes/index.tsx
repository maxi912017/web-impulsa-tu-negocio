import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/landing/NeonLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Impulsa Tu Negocio | Webs que hacen crecer negocios" },
      {
        name: "description",
        content:
          "Diseñamos sitios web y landing pages para que tu negocio se vea profesional, genere confianza y atraiga más clientes.",
      },
      {
        property: "og:title",
        content: "Impulsa Tu Negocio | Webs que hacen crecer negocios",
      },
      {
        property: "og:description",
        content:
          "Sitios web y landing pages para verte profesional, generar confianza y atraer más clientes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Impulsa Tu Negocio - Webs y Apps que hacen crecer negocios",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.png" },
      {
        name: "twitter:title",
        content: "Impulsa Tu Negocio | Webs que hacen crecer negocios",
      },
      {
        name: "twitter:description",
        content:
          "Sitios web y landing pages para verte profesional, generar confianza y atraer más clientes.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Landing />;
}
