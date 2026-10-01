# Publicar en Vercel

Esta guía deja funcionando **dos canales distintos**: el formulario envía un
correo a Gmail y los botones de WhatsApp abren una conversación directa. Enviar
el formulario **no manda automáticamente un mensaje a WhatsApp**.

## 1. Importar el repo

En Vercel: **Add New → Project → Import** el repositorio de GitHub.
No hace falta elegir framework: el archivo `vercel.json` ya define el build
(`npm run build`) y la app se compila para Vercel automáticamente.

## 2. Variables de entorno (obligatorio para el formulario)

El formulario de cotización envía correos con Nodemailer usando tu cuenta de
Gmail. En Vercel: **Project → Settings → Environment Variables**, agregá estas
dos para los entornos _Production_ y _Preview_:

| Nombre               | Para qué sirve                                       |
| -------------------- | ---------------------------------------------------- |
| `GMAIL_USER`         | Tu correo de Gmail (maxi.91.2017@gmail.com)          |
| `GMAIL_APP_PASSWORD` | Contraseña de aplicación de Gmail (no tu contraseña) |

### Cómo obtener la contraseña de aplicación (gratis, 2 minutos)

1. Activá la verificación en dos pasos en tu cuenta de Google
   (myaccount.google.com → Seguridad).
2. Entrá a https://myaccount.google.com/apppasswords
3. Creá una contraseña de aplicación llamada, por ejemplo, "Web Vercel".
4. Google te da una clave de 16 letras: pegala como `GMAIL_APP_PASSWORD`.

Guardá esa clave solo en Vercel, nunca en el repositorio. Después de agregar o
cambiar variables de entorno, ejecutá un **Redeploy** para que la publicación
use los valores nuevos. Si tu cuenta no permite generar contraseñas de
aplicación, este envío con Gmail no funcionará hasta habilitar esa opción.

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

## 4. WhatsApp de consultas

Los botones y el globo flotante abren `wa.me/5492664484918` (número en formato
internacional: 54 Argentina + 9 móvil + 2664484918) con un texto sugerido. El
visitante tiene que pulsar **Enviar** dentro de WhatsApp; abrir el chat no envía
el mensaje por sí solo. Este canal funciona sin contraseñas, Gmail ni variables
de entorno. Para cambiar el número más adelante, actualizá los enlaces de
WhatsApp de la portada, la confirmación del formulario y el botón flotante.

## 5. Prueba después de publicar

1. Abrí la web publicada en Vercel y completá los cuatro campos obligatorios
   con datos de prueba reales. Enviá una sola consulta.
2. Comprobá el aviso **“Tu solicitud de cotización fue enviada con éxito”** y
   que llegue un correo a `GMAIL_USER`; revisá Spam si no aparece. En el mensaje
   comprobá el nombre, correo, detalle y enlace de WhatsApp del cliente. Probá
   **Responder** y confirmá que el destinatario sea el correo del cliente.
3. Abrí el globo de WhatsApp y el botón de la sección de contacto, y comprobá
   que ambos abran el chat del número correcto. No hace falta enviar un mensaje
   real para validar el enlace.
4. Si el formulario muestra un error, revisá que las variables estén asignadas
   al entorno correcto en Vercel y volvé a desplegar. Revisá los registros de
   la función en **Vercel → Project → Logs** para distinguir falta de
   configuración de un rechazo de acceso de Gmail. La vista previa local no
   garantiza que Gmail envíe: la comprobación definitiva es en Vercel.
