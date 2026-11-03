# Invitación web · Diego & Mariela

Invitación de boda estática (HTML + CSS + JS, sin dependencias), lista para GitHub Pages.

## Qué incluye
- Sobre de apertura con puertas y sello de cera (se abre al tocar el sello)
- Portada con arco para la foto de la pareja
- Calendario con el día marcado, cuenta regresiva y botón para agendar (Google o archivo .ics para Apple/Outlook)
- Lugar con botón "Cómo llegar", programa del día y código de vestimenta
- Datos de cuenta para regalos con botón de copiar
- Confirmación de asistencia que envía un mensaje armado por WhatsApp
- Música de boda que empieza al romper el sello: Canon en Re de Pachelbel (obra de dominio público), en un arreglo propio para arpa y cuerdas incluido en `assets/musica.mp3`. Para usar otra canción, reemplaza ese archivo con el mismo nombre, siempre que tengas permiso para usarla.

## Personalizar
Todo se edita en **`js/config.js`**: nombres, fecha y hora, lugar, enlace de Google Maps,
programa, colores sugeridos, datos bancarios, número de WhatsApp y hashtag.

Fotos y música (opcional): copia los archivos a `assets/` y escribe su ruta en `config.js`:
```js
fotoPareja: "assets/pareja.jpg",     // vertical, ideal 900×1100 px
lugar: { ..., foto: "assets/lugar.jpg" },
musica: "assets/musica.mp3",
```
Si quedan vacías, se muestran ilustraciones (monograma y paisaje) y el botón de sonido se oculta.
Comprime las fotos (por ejemplo con squoosh.app) para que cargue rápido en el celular.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo en GitHub (por ejemplo `boda`).
2. Sube **el contenido** de esta carpeta (que `index.html` quede en la raíz del repositorio).
3. Ve a **Settings → Pages**, en *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
4. En uno o dos minutos estará en `https://TU-USUARIO.github.io/boda/`.

Para probarla en tu computadora basta con abrir `index.html` en el navegador.
