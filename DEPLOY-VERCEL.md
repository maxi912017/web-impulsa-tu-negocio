# Publicar en Vercel

## 1. Importar el repo

En Vercel: **Add New → Project → Import** el repositorio de GitHub.
No hace falta elegir framework: el archivo `vercel.json` ya define el build
(`npm run build`) y la app se compila para Vercel automáticamente.

## 2. Variables de entorno (obligatorio para el formulario)

El formulario de cotización envía correos con Nodemailer usando tu cuenta de
Gmail. En Vercel: **Project → Settings → Environment Variables**, agregá estas
dos para los entornos *Production* y *Preview*:

| Nombre                | Para qué sirve                                        |
| --------------------- | ----------------------------------------------------- |
| `GMAIL_USER`          | Tu correo de Gmail (maxi.91.2017@gmail.com)           |
| `GMAIL_APP_PASSWORD`  | Contraseña de aplicación de Gmail (no tu contraseña)  |

### Cómo obtener la contraseña de aplicación (gratis, 2 minutos)

1. Activá la verificación en dos pasos en tu cuenta de Google
   (myaccount.google.com → Seguridad).
2. Entrá a https://myaccount.google.com/apppasswords
3. Creá una contraseña de aplicación llamada, por ejemplo, "Web Vercel".
4. Google te da una clave de 16 letras: pegala como `GMAIL_APP_PASSWORD`.

Sin estas dos variables el formulario muestra el aviso de error y no envía
el correo.

## 3. Cómo llegan los mensajes

El formulario envía los datos a `/api/send-email`, una función del propio
servidor de la web (misma URL de Vercel, sin servicios externos):

- Se manda un correo HTML a `GMAIL_USER` con nombre, correo (como reply-to,
  así respondés directo al cliente), WhatsApp con enlace clickeable de
  wa.me y el detalle de la cotización.
- El cliente ve un aviso de éxito en pantalla.

Si alguna vez cambia el dominio, no hay que tocar nada: las llamadas son
relativas al dominio donde esté publicada la web.
