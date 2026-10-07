import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { isValidName, isValidPhone } from "../../lib/validation";

const payloadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .refine((val) => isValidName(val).valid, {
      message: "Nombre inválido",
    }),
  email: z.string().trim().email().max(160),
  whatsapp: z
    .string()
    .trim()
    .min(1)
    .max(40)
    .refine((val) => isValidPhone(val).valid, {
      message: "Número de WhatsApp o teléfono inválido",
    }),
  message: z.string().trim().min(1).max(4000),
  projectType: z.string().trim().max(100).optional(),
  website: z.string().optional(), // Campo Honeypot trampa
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// wa.me solo acepta dígitos: quitamos +, espacios, guiones y paréntesis.
const waDigits = (value: string) => value.replace(/\D/g, "");

export const Route = createFileRoute("/api/send-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Cuerpo inválido" }, { status: 400 });
        }

        const parsed = payloadSchema.safeParse(body);
        if (!parsed.success) {
          const firstErr = parsed.error.issues[0]?.message || "Datos incompletos o inválidos";
          return Response.json(
            { ok: false, error: firstErr },
            { status: 400 },
          );
        }
        const { name, email, whatsapp, message, projectType, website } = parsed.data;

        // 1. Verificación Honeypot: si el campo trampa invisible contiene texto, es un bot automatizado
        if (website && website.trim().length > 0) {
          console.warn("[Anti-Spam Server] Bot bloqueado por Honeypot:", { email, website });
          // Respondemos 200 fingido para no alertar al bot de la trampa
          return Response.json({ ok: true, spamFiltered: true });
        }

        // 2. Sanitización estricta de todos los campos
        const rawCleanName = name.replace(/<[^>]*>/g, "").trim().slice(0, 100);
        const rawCleanEmail = email.trim().toLowerCase().slice(0, 140);
        const rawCleanWhatsapp = whatsapp.replace(/[^\d+ ()-]/g, "").trim().slice(0, 30);
        const rawCleanMessage = message.replace(/<[^>]*>/g, "").trim().slice(0, 3000);
        const rawCleanProjectType = (projectType || "Web").replace(/<[^>]*>/g, "").trim().slice(0, 80);

        const cleanName = escapeHtml(rawCleanName);
        const cleanEmail = escapeHtml(rawCleanEmail);
        const cleanWhatsapp = escapeHtml(rawCleanWhatsapp);
        const cleanMessage = escapeHtml(rawCleanMessage);
        const cleanProjectType = escapeHtml(rawCleanProjectType);

        const gmailUser = process.env["GMAIL_USER"];
        const gmailAppPassword = process.env["GMAIL_APP_PASSWORD"];
        if (!gmailUser || !gmailAppPassword) {
          console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD");
          return Response.json(
            { ok: false, error: "Servicio de email no configurado" },
            { status: 500 },
          );
        }

        const waNumber = waDigits(rawCleanWhatsapp);
        const waLink = waNumber ? `https://wa.me/${waNumber}` : null;

        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0b0f0a; color: #f1f5f0; border-radius: 12px; overflow: hidden;">
            <div style="background: #d7fe3b; padding: 20px 28px;">
              <h1 style="margin: 0; font-size: 18px; color: #0b0f0a;">Nueva solicitud de cotización</h1>
            </div>
            <div style="padding: 24px 28px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #9fb49a; width: 130px; vertical-align: top;">Qué busca</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #d7fe3b;">${cleanProjectType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9fb49a; width: 130px; vertical-align: top;">Nombre</td>
                  <td style="padding: 8px 0; font-weight: bold;">${cleanName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9fb49a; vertical-align: top;">Correo</td>
                  <td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: #d7fe3b;">${cleanEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9fb49a; vertical-align: top;">WhatsApp</td>
                  <td style="padding: 8px 0;">${
                    waLink
                      ? `<a href="${waLink}" style="color: #d7fe3b; font-weight: bold;">${cleanWhatsapp} · Abrir chat</a>`
                      : cleanWhatsapp
                  }</td>
                </tr>
              </table>
              <div style="margin-top: 18px; padding: 16px; background: #131a12; border: 1px solid #243020; border-radius: 10px;">
                <p style="margin: 0 0 8px; color: #9fb49a; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Solicitud de cotización</p>
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</p>
              </div>
              <p style="margin: 18px 0 0; font-size: 12px; color: #6f826b;">
                Respondé directo a este correo: va con reply-to al cliente (${cleanEmail}).<br/>
                Notificación enviada a: contacto@impulsatunegocio.digital y estudiodigital.dev@gmail.com
              </p>
            </div>
          </div>
        `;

        try {
          const nodemailer = (await import("nodemailer")).default;
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: gmailUser, pass: gmailAppPassword },
          });

          // Notificar tanto al correo oficial del dominio como al de respaldo y al remitente
          const primaryRecipient = "contacto@impulsatunegocio.digital";
          const backupRecipient = "estudiodigital.dev@gmail.com";
          const recipients = Array.from(
            new Set([primaryRecipient, backupRecipient, gmailUser]),
          ).filter(Boolean) as string[];

          await transporter.sendMail({
            from: `"Estudio Digital Impulsa Tu Negocio" <${gmailUser}>`,
            to: recipients.join(", "),
            replyTo: rawCleanEmail,
            subject: `Nueva cotización [${rawCleanProjectType}]: ${rawCleanName}`,
            html,
          });

          return Response.json({ ok: true });
        } catch (error) {
          console.error("Nodemailer send failed:", error);
          return Response.json(
            { ok: false, error: "No se pudo enviar el correo" },
            { status: 502 },
          );
        }
      },
    },
  },
});
