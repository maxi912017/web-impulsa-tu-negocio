import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
const OWNER_EMAIL = "maxi.91.2017@gmail.com";

const b64url = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64url(v)}?=`);

const topicLabels: Record<string, string> = {
  landing: "Landing page",
  sitio: "Sitio web completo",
  seo: "SEO / aparecer en Google",
  otro: "Otra consulta",
};

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        name: z.string().trim().min(1).max(120),
        phone: z.string().trim().min(1).max(40),
        email: z.string().trim().max(160).optional().or(z.literal("")),
        message: z.string().trim().min(1).max(4000),
        topic: z.string().trim().max(40).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
    if (!lovableKey || !gmailKey) {
      console.error("Missing LOVABLE_API_KEY or GOOGLE_MAIL_API_KEY");
      return { ok: false as const, error: "Servicio de email no configurado" };
    }

    const topic = topicLabels[data.topic ?? ""] ?? data.topic ?? "Consulta";
    const subject = `Nueva consulta web: ${data.name} — ${topic}`;
    const body = [
      `Nueva consulta desde el formulario de impulsatunegocio.`,
      ``,
      `Nombre: ${data.name}`,
      `Teléfono / WhatsApp: ${data.phone}`,
      `Email: ${data.email || "(no informado)"}`,
      `Busca: ${topic}`,
      ``,
      `Mensaje:`,
      data.message,
    ].join("\n");

    const raw = b64url(
      [
        `To: ${OWNER_EMAIL}`,
        `Subject: ${header(subject)}`,
        "MIME-Version: 1.0",
        'Content-Type: text/plain; charset="UTF-8"',
        "",
        body,
      ].join("\r\n"),
    );

    const response = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Gmail send failed [${response.status}]: ${errorBody}`);
      return { ok: false as const, error: "No se pudo enviar el correo" };
    }

    return { ok: true as const };
  });
