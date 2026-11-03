/* ==========================================================
   CONFIGURACIÓN DE LA INVITACIÓN
   Edita estos datos y la invitación se actualiza sola.
   ========================================================== */
window.INVITACION = {
  novio: "Diego",
  novia: "Mariela",

  // Fecha y hora de la boda (formato ISO con zona horaria de Paraguay, UTC-3)
  fecha: "2027-03-20T17:00:00-03:00",
  duracionHoras: 7, // duración del evento en el calendario

  frase: "Hay encuentros que cambian una vida entera. El nuestro llegó sin aviso, y hoy queremos celebrarlo contigo.",

  lugar: {
    nombre: "Estancia Los Olivos",
    direccion: "Ruta PY02, km 28, Capiatí, Paraguay",
    mapa: "https://maps.google.com/?q=Capiat%C3%AD+Paraguay", // pega aquí tu enlace de Google Maps
    foto: "assets/lugar.jpg" // vacío = ilustración
  },

  // Foto de la pareja para el arco de la portada (vacío = monograma ilustrado)
  fotoPareja: "assets/pareja.jpg",

  // Foto que acompaña la frase "Y ahora, para siempre" (vacío = sin foto)
  fotoFrase: "assets/anillos.jpg",

  // Carrusel de fotos (se pasan solas). Agrega o quita rutas a gusto.
  galeria: [
    "assets/galeria-1.jpg",
    "assets/galeria-2.jpg",
    "assets/galeria-3.jpg",
    "assets/galeria-4.jpg"
  ],
  galeriaSegundos: 4,

  // Foto del cierre, antes de los nombres (vacío = sin foto)
  fotoCierre: "assets/galeria-4.jpg",

  // Música de fondo (vacío = se oculta el botón de sonido)
  musica: "assets/musica.mp3", // Canon en Re de Pachelbel (arreglo para arpa y cuerdas)

  programa: [
    { hora: "17:00", titulo: "Ceremonia", detalle: "Bajo los olivos del jardín" },
    { hora: "18:30", titulo: "Cóctel de bienvenida", detalle: "En la galería de arcos" },
    { hora: "20:00", titulo: "Cena", detalle: "En el salón principal" },
    { hora: "22:00", titulo: "Fiesta", detalle: "Hasta que el cuerpo aguante" }
  ],

  vestimenta: {
    ellos: "Traje arena, beige o verde oscuro",
    ellas: "Vestido largo o midi en tonos tierra",
    tonos: [
      { nombre: "Verde oliva", color: "#9aa85a" },
      { nombre: "Verde musgo", color: "#6f7d3e" },
      { nombre: "Arena", color: "#e4d6b4" },
      { nombre: "Terracota suave", color: "#c99577" }
    ],
    nota: "Telas ligeras y zapatos cómodos para el jardín.",
    notaFinal: "El blanco se lo dejamos a la novia."
  },

  regalo: {
    texto: "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, aquí tienes nuestra cuenta. También habrá un buzón para la lluvia de sobres.",
    datos: [
      { etiqueta: "Banco", valor: "Banco Ejemplo S.A." },
      { etiqueta: "Titular", valor: "Mariela Ejemplo" },
      { etiqueta: "N.º de cuenta", valor: "000-1234567-8" },
      { etiqueta: "C.I.", valor: "1.234.567" },
      { etiqueta: "Alias", valor: "diegoymariela" }
    ]
  },

  confirmacion: {
    fechaLimite: "15 de febrero de 2027",
    whatsapp: "595973111807" // número con código de país, sin + ni espacios
  },

  hashtag: "#DiegoYMariela2027"
};
