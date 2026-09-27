# Optimización de rendimiento y accesibilidad

## Objetivo

Mejorar la aparición inmediata de la portada, reducir trabajo y descargas al inicio, evitar lecturas repetidas durante el desplazamiento y corregir los problemas de contraste y jerarquía de encabezados señalados por PageSpeed.

## Cambios

- Mantener las conexiones anticipadas a Google Fonts y `display=swap`, y corregir la precarga para priorizar Archivo, la fuente del título principal, sin duplicar descargas.
- Separar los estilos mínimos de la cabecera y la primera pantalla de los estilos del contenido inferior; cargar estos últimos junto con sus secciones diferidas para que no retrasen el primer renderizado.
- Renderizar el título principal como HTML visible desde el primer instante, eliminando su estado inicial transparente, desplazamiento y demora de animación. También quitar la demora del texto introductorio.
- Conservar el fraccionamiento actual y reforzarlo: portfolio, testimonios y formulario/preguntas tendrán límites de carga independientes, y el contenido pesado bajo la primera pantalla se montará al aproximarse al área visible, reservando espacio para evitar saltos.
- Reducir el JavaScript inicial del portfolio removiendo imports y estilos antiguos que ya no corresponden a elementos activos.
- Sustituir el seguimiento continuo del desplazamiento del botón de WhatsApp por una actualización pasiva agrupada con `requestAnimationFrame`, evitando lecturas y escrituras repetidas en el mismo cuadro.
- Aumentar el contraste de la hora y batería de los teléfonos simulados sobre su fondo oscuro hasta cumplir WCAG AA.
- Cambiar los tres `h5` de los mockups a `h4` y ajustar los encabezados internos del detalle para mantener una secuencia coherente `h2 → h3 → h4` sin saltos.

## Verificación

- Comprobar en escritorio y móvil que el título sea visible inmediatamente, no haya saltos de contenido y todas las secciones carguen al desplazarse.
- Confirmar que la hoja de Google Fonts conserve `display=swap`, las conexiones anticipadas estén presentes y Archivo quede priorizada.
- Auditar el DOM final: sin `h5`, encabezados en orden y contraste suficiente para hora/batería.
- Revisar errores de consola, solicitudes fallidas y funcionamiento de filtros, modal, formulario, preguntas y WhatsApp.
- Ejecutar las comprobaciones de tipos y una medición local de carga para comparar el contenido inicial y el trabajo del hilo principal.

## Detalles técnicos

- No existen rutas secundarias de contenido en esta aplicación; el ahorro se aplicará a las secciones pesadas de la única página.
- La auditoría no encontró `offsetWidth`, `getBoundingClientRect` ni otras lecturas geométricas en efectos de la landing. La única lectura frecuente relevante es `scrollY`; se optimizará sin introducir observadores ni cálculos innecesarios.
- Se respetará `prefers-reduced-motion` y se mantendrán dimensiones estables en los espacios diferidos para proteger CLS.
