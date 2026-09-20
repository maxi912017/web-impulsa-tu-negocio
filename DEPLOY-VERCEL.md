# Publicar en Vercel

## 1. Importar el repo

En Vercel: **Add New → Project → Import** el repositorio de GitHub.
No hace falta elegir framework: el archivo `vercel.json` ya define el build
(`npm run build`) y la app se compila para Vercel automáticamente.

## 2. Variables de entorno (obligatorio para el formulario)

En Vercel: **Project → Settings → Environment Variables**, agregá estas dos
para los entornos *Production* y *Preview*:

| Nombre                 | Para qué sirve                          |
| ---------------------- | --------------------------------------- |
| `LOVABLE_API_KEY`      | Autoriza el envío de correos            |
| `GOOGLE_MAIL_API_KEY`  | Conexión con tu cuenta de Gmail         |

Los valores son los mismos que ya usa el proyecto en Lovable (se ven en
Project Settings → Secrets / Connectors). Sin estas dos variables el formulario
sigue abriendo WhatsApp, pero no envía el correo y muestra el aviso de error.

## 3. Cómo llegan los mensajes

El formulario envía los datos al propio servidor de la web (misma URL de
Vercel, sin servicios externos):

- Se manda un correo a `maxi.91.2017@gmail.com`.
- Se abre WhatsApp con el mensaje ya armado.

Si alguna vez cambia el dominio, no hay que tocar nada: las llamadas son
relativas al dominio donde esté publicada la web.
