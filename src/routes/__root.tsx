import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { siteStructuredData, professionalServiceSchema, SITE_URL } from "../lib/seo-schema";
import { GA_MEASUREMENT_ID } from "../lib/analytics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
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
        name: "googlebot",
        content:
          "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        name: "bingbot",
        content:
          "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        name: "keywords",
        content:
          "desarrollo web argentina, diseño web profesional, landing pages alta conversión, software a medida, web apps para profesionales, sistemas de presupuestos con IA, impulsa tu negocio dev",
      },
      { name: "author", content: "Impulsa Tu Negocio" },
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
      { property: "og:site_name", content: "Impulsa Tu Negocio" },
      { property: "og:locale", content: "es_AR" },
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
      { name: "referrer", content: "strict-origin-when-cross-origin" },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "image",
        type: "image/webp",
        href: "/assets/brand-isologo-dark.webp",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/archivo-latin-800.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        id: "site-fonts",
        media: "print",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png?v=3", type: "image/png" },
      { rel: "shortcut icon", href: "/favicon.png?v=3", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png?v=3" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        {GA_MEASUREMENT_ID ? (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });`,
              }}
            />
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
          </>
        ) : null}
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const fontStylesheet = document.querySelector<HTMLLinkElement>("#site-fonts");
    if (!fontStylesheet) return;

    const enableFonts = () => {
      fontStylesheet.media = "all";
    };
    const idleId = window.requestIdleCallback?.(enableFonts);
    const timeoutId = window.setTimeout(enableFonts, 1200);

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster position="bottom-center" richColors />
    </QueryClientProvider>
  );
}
