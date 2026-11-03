(function () {
  "use strict";
  const C = window.INVITACION;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ZONA = "America/Asuncion";

  /* ---------------- Utilidades de fecha ---------------- */
  const fecha = new Date(C.fecha);
  const partes = (d, opts) => Object.fromEntries(
    new Intl.DateTimeFormat("es-PY", { timeZone: ZONA, ...opts }).formatToParts(d).map(p => [p.type, p.value])
  );
  const p = partes(fecha, { year: "numeric", month: "long", day: "numeric", weekday: "long", hour: "numeric", minute: "2-digit", hour12: false });
  const dia = +p.day, anio = +p.year;
  const mesNombre = p.month.charAt(0).toUpperCase() + p.month.slice(1);
  const diaSemana = p.weekday.charAt(0).toUpperCase() + p.weekday.slice(1);
  const mesIdx = +partes(fecha, { month: "numeric" }).month - 1;
  const horaTexto = (() => {
    const h = +p.hour, m = p.minute;
    const h12 = h % 12 || 12;
    const franja = h < 12 ? "de la mañana" : h < 20 ? "de la tarde" : "de la noche";
    return `${h12}:${m} ${franja}`;
  })();

  /* ---------------- Ramas de olivo (SVG generado) ---------------- */
  function rama({ hojas = 9, olivas = 3, modo = "relleno" } = {}) {
    const P0 = [182, 238], P1 = [60, 210], P2 = [28, 22];
    const pt = t => [0, 1].map(i => (1 - t) ** 2 * P0[i] + 2 * (1 - t) * t * P1[i] + t * t * P2[i]);
    const tg = t => [0, 1].map(i => 2 * (1 - t) * (P1[i] - P0[i]) + 2 * t * (P2[i] - P1[i]));
    const id = "r" + Math.random().toString(36).slice(2, 8);
    const linea = modo === "linea";
    const trazo = linea ? `fill="none" stroke="url(#${id}o)" stroke-width="1.1"` : "";
    let out = "";
    let tallo = `M${P0} Q${P1} ${P2}`;
    out += `<path d="${tallo}" fill="none" stroke="${linea ? `url(#${id}o)` : "#7d8a4e"}" stroke-width="${linea ? 1.4 : 2}" stroke-linecap="round"/>`;
    const forma = "M0 0 C12 -10 40 -11 60 0 C40 11 12 10 0 0Z";
    for (let i = 0; i < hojas; i++) {
      const t = 0.08 + (i / (hojas - 1)) * 0.9;
      const [x, y] = pt(t), [dx, dy] = tg(t);
      const base = Math.atan2(dy, dx) * 180 / Math.PI;
      const lado = i % 2 ? 1 : -1;
      const ang = base + lado * (38 - t * 10);
      const esc = 1.05 - t * 0.45;
      const relleno = linea ? "" : `fill="url(#${id}${i % 3})"`;
      out += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${esc.toFixed(2)})">
        <path d="${forma}" ${linea ? trazo : relleno}/>
        <path d="M3 0 L54 0" stroke="${linea ? `url(#${id}o)` : "rgba(255,255,255,.35)"}" stroke-width="${linea ? .7 : .8}" fill="none"/>
      </g>`;
    }
    out += `<g transform="translate(${pt(1)[0]} ${pt(1)[1]}) rotate(${(Math.atan2(...tg(1).reverse()) * 180 / Math.PI).toFixed(1)}) scale(.55)"><path d="${forma}" ${linea ? trazo : `fill="url(#${id}1)"`}/></g>`;
    for (let k = 0; k < olivas; k++) {
      const t = 0.25 + k * (0.5 / Math.max(olivas - 1, 1));
      const [x, y] = pt(t), [dx, dy] = tg(t);
      const n = Math.hypot(dx, dy), lado = k % 2 ? 1 : -1;
      const ox = x + (-dy / n) * 12 * lado, oy = y + (dx / n) * 12 * lado;
      out += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} L${ox.toFixed(1)} ${oy.toFixed(1)}" stroke="${linea ? `url(#${id}o)` : "#7d8a4e"}" stroke-width="1"/>`;
      out += linea
        ? `<ellipse cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" rx="5.2" ry="7" fill="url(#${id}g)" stroke="url(#${id}o)" stroke-width=".8"/>`
        : `<ellipse cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" rx="6.5" ry="8.5" fill="url(#${id}v)"/><ellipse cx="${(ox - 2).toFixed(1)}" cy="${(oy - 3).toFixed(1)}" rx="1.8" ry="2.4" fill="#fff" opacity=".45"/>`;
    }
    const defs = `<defs>
      <linearGradient id="${id}o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e3b6"/><stop offset=".5" stop-color="#e9cf9a"/><stop offset="1" stop-color="#fff3d6"/></linearGradient>
      <radialGradient id="${id}g" cx=".35" cy=".3"><stop offset="0" stop-color="#fff6de"/><stop offset="1" stop-color="#d9bd85"/></radialGradient>
      <linearGradient id="${id}0" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#a5b07a"/><stop offset="1" stop-color="#6f7d48"/></linearGradient>
      <linearGradient id="${id}1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c3c9a0"/><stop offset="1" stop-color="#8b9765"/></linearGradient>
      <linearGradient id="${id}2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#b6bd8c"/><stop offset="1" stop-color="#7c8855"/></linearGradient>
      <radialGradient id="${id}v" cx=".35" cy=".3"><stop offset="0" stop-color="#d6e07a"/><stop offset=".7" stop-color="#9fb03c"/><stop offset="1" stop-color="#7d8f2c"/></radialGradient>
    </defs>`;
    return `<svg viewBox="0 0 210 250" xmlns="http://www.w3.org/2000/svg">${defs}${out}</svg>`;
  }
  $$("[data-rama]").forEach(el => { el.innerHTML = rama(JSON.parse(el.dataset.rama)); });

  /* ---------------- Borde de papel artesanal ---------------- */
  function deckle(el, lados = { t: 1, r: 1, b: 1, l: 1 }) {
    const n = 46, amp = 2.6, pts = [];
    const r = () => (Math.random() * amp).toFixed(1);
    for (let i = 0; i <= n; i++) pts.push(`${(i / n * 100).toFixed(2)}% ${lados.t ? r() : 0}px`);
    for (let i = 1; i <= n; i++) pts.push(`calc(100% - ${lados.r ? r() : 0}px) ${(i / n * 100).toFixed(2)}%`);
    for (let i = n - 1; i >= 0; i--) pts.push(`${(i / n * 100).toFixed(2)}% calc(100% - ${lados.b ? r() : 0}px)`);
    for (let i = n - 1; i > 0; i--) pts.push(`${lados.l ? r() : 0}px ${(i / n * 100).toFixed(2)}%`);
    el.style.clipPath = `polygon(${pts.join(",")})`;
  }
  $$(".deckle").forEach(el => {
    if (el.closest(".puerta--izq")) deckle(el, { t: 1, r: 0, b: 1, l: 1 });
    else if (el.closest(".puerta--der")) deckle(el, { t: 1, r: 1, b: 1, l: 0 });
    else deckle(el);
  });

  /* ---------------- Ilustraciones de respaldo ---------------- */
  const monograma = () => `
    <svg viewBox="0 0 300 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Monograma de ${C.novio} y ${C.novia}">
      <defs>
        <linearGradient id="mFondo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe3c9"/><stop offset=".55" stop-color="#eef0e0"/><stop offset="1" stop-color="#f7f3e6"/></linearGradient>
        <radialGradient id="mSol" cx=".5" cy=".42" r=".5"><stop offset="0" stop-color="#fffaf0" stop-opacity=".95"/><stop offset="1" stop-color="#fffaf0" stop-opacity="0"/></radialGradient>
        <linearGradient id="mOro" x1="0" x2="1"><stop offset="0" stop-color="#9c7a3a"/><stop offset=".45" stop-color="#d8b671"/><stop offset="1" stop-color="#a98543"/></linearGradient>
      </defs>
      <rect width="300" height="370" fill="url(#mFondo)"/>
      <circle cx="150" cy="160" r="150" fill="url(#mSol)"/>
      <path d="M0 290 C60 262 110 276 160 262 S260 240 300 252 L300 370 L0 370Z" fill="#cdd3ae" opacity=".7"/>
      <path d="M0 320 C80 296 150 312 210 300 S280 292 300 296 L300 370 L0 370Z" fill="#b9c193" opacity=".75"/>
      <circle cx="150" cy="168" r="76" fill="none" stroke="url(#mOro)" stroke-width="1.2"/>
      <circle cx="150" cy="168" r="70" fill="none" stroke="url(#mOro)" stroke-width=".6"/>
      <text x="150" y="190" text-anchor="middle" font-family="Pinyon Script, cursive" font-size="64" fill="url(#mOro)">${C.novio[0]}<tspan font-size="36" dy="-6">&amp;</tspan><tspan dy="6">${C.novia[0]}</tspan></text>
    </svg>`;

  const ilustracionLugar = () => `
    <svg viewBox="0 0 400 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de ${C.lugar.nombre}">
      <defs>
        <linearGradient id="lCielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb3d9"/><stop offset=".7" stop-color="#d7e5ef"/><stop offset="1" stop-color="#f2efe4"/></linearGradient>
        <linearGradient id="lPasto" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9bbd4f"/><stop offset="1" stop-color="#6f9a32"/></linearGradient>
        <linearGradient id="lMuro" x1="0" x2="1"><stop offset="0" stop-color="#e9d9bf"/><stop offset="1" stop-color="#d6c3a1"/></linearGradient>
        <radialGradient id="lCopa" cx=".4" cy=".35"><stop offset="0" stop-color="#b9c78f"/><stop offset="1" stop-color="#7c8f55"/></radialGradient>
      </defs>
      <rect width="400" height="460" fill="url(#lCielo)"/>
      <ellipse cx="290" cy="120" rx="70" ry="14" fill="#fff" opacity=".7"/>
      <path d="M90 250 L170 150 L220 195 L280 130 L400 230 L400 280 L90 280Z" fill="#7f97a8" opacity=".75"/>
      <path d="M150 270 L230 200 L300 240 L360 205 L400 235 L400 290 L150 290Z" fill="#8ea486"/>
      <path d="M120 285 L400 270 L400 300 L120 300Z" fill="#c8b89a"/>
      <path d="M190 300 L400 300 L400 460 L300 460 Z" fill="url(#lPasto)"/>
      <path d="M150 300 L190 300 L300 460 L180 460 Z" fill="#e8dcc6"/>
      <g fill="url(#lCopa)">
        <ellipse cx="270" cy="200" rx="60" ry="32"/><ellipse cx="320" cy="180" rx="50" ry="30"/><ellipse cx="300" cy="222" rx="48" ry="22"/>
        <ellipse cx="360" cy="90" rx="50" ry="36"/><ellipse cx="390" cy="60" rx="40" ry="30"/>
      </g>
      <path d="M300 300 C298 270 290 250 280 228 M300 300 C304 262 318 240 322 208" stroke="#6e5a40" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M392 460 C386 360 380 250 370 120" stroke="#6e5a40" stroke-width="10" fill="none"/>
      <path d="M0 20 L160 60 L160 70 L0 40Z" fill="#b96d43"/>
      <path d="M0 40 L160 70 L160 360 L0 460Z" fill="url(#lMuro)"/>
      <g fill="#7a6a52" opacity=".55">
        <path d="M10 140 q20 -40 40 0 v170 h-40z"/><path d="M68 150 q18 -34 36 0 v130 h-36z"/><path d="M118 158 q15 -28 30 0 v100 h-30z"/>
      </g>
      <g fill="#d9c4a0"><rect x="52" y="120" width="14" height="220"/><rect x="104" y="132" width="12" height="170"/><rect x="146" y="140" width="10" height="140"/></g>
      <g fill="#8fa96a"><ellipse cx="40" cy="430" rx="60" ry="30"/><ellipse cx="150" cy="380" rx="34" ry="14"/><ellipse cx="200" cy="330" rx="24" ry="9"/></g>
    </svg>`;

  /* ---------------- Contenido ---------------- */
  $("#n1").textContent = C.novio;
  $("#n2").textContent = C.novia;
  $$(".n1").forEach(e => e.textContent = C.novio);
  $$(".n2").forEach(e => e.textContent = C.novia);
  document.title = `${C.novio} & ${C.novia} · Nos casamos`;

  $("#fechaCorta").innerHTML = `<span>${dia}</span><i></i><span>${p.month}</span><i></i><span>${anio}</span>`;
  $("#textoFrase").textContent = C.frase;
  if (C.fotoFrase) {
    const fig = $("#fotoFrase"), img = new Image();
    img.alt = `${C.novio} y ${C.novia} mostrando sus anillos`;
    img.loading = "lazy"; img.src = C.fotoFrase;
    img.onerror = () => { fig.hidden = true; };
    fig.appendChild(img); fig.hidden = false;
  }

  const arco = $("#arco");
  if (C.fotoPareja) {
    const img = new Image();
    img.alt = `${C.novio} y ${C.novia}`;
    img.src = C.fotoPareja;
    img.style.objectPosition = "center 18%";
    img.onerror = () => { arco.innerHTML = monograma(); };
    arco.appendChild(img);
  } else arco.innerHTML = monograma();

  // Calendario
  (function calendario() {
    const primero = new Date(Date.UTC(anio, mesIdx, 1));
    const offset = (primero.getUTCDay() + 6) % 7; // lunes primero
    const diasMes = new Date(Date.UTC(anio, mesIdx + 1, 0)).getUTCDate();
    let celdas = ["L", "M", "M", "J", "V", "S", "D"].map(d => `<span class="dia-sem">${d}</span>`).join("");
    for (let i = 0; i < offset; i++) celdas += "<span></span>";
    for (let d = 1; d <= diasMes; d++) {
      celdas += d === dia
        ? `<span class="es-boda" aria-label="${d} de ${p.month}, el día de la boda">${d}</span>`
        : `<span>${d}</span>`;
    }
    $("#calendario").innerHTML = `
      <div class="cal__cabeza"><span class="cal__mes">${mesNombre}</span><span class="cal__anio">${anio}</span></div>
      <div class="cal__grilla">${celdas}</div>
      <p class="cal__pie">${diaSemana}, ${horaTexto}</p>`;
  })();

  // Cuenta regresiva
  const unidades = Object.fromEntries($$("#cuenta [data-u]").map(e => [e.dataset.u, e]));
  function tic() {
    let s = Math.max(0, Math.floor((fecha - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    unidades.d.textContent = d;
    unidades.h.textContent = String(h).padStart(2, "0");
    unidades.m.textContent = String(m).padStart(2, "0");
    unidades.s.textContent = String(s).padStart(2, "0");
  }
  tic(); setInterval(tic, 1000);

  // Agendar
  const fin = new Date(fecha.getTime() + C.duracionHoras * 3600e3);
  const utc = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const tituloEvento = `Boda de ${C.novio} y ${C.novia}`;
  $("#agendarGoogle").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(tituloEvento)}&dates=${utc(fecha)}/${utc(fin)}` +
    `&location=${encodeURIComponent(C.lugar.nombre + ", " + C.lugar.direccion)}` +
    `&details=${encodeURIComponent("¡Te esperamos! " + location.href)}`;

  // Lugar
  const partesNombre = C.lugar.nombre.split(" ");
  const mitad = Math.ceil(partesNombre.length / 2);
  $("#lugarNombre").innerHTML = partesNombre.length > 1
    ? `${partesNombre.slice(0, mitad - (partesNombre.length > 2 ? 1 : 0)).join(" ")}<span>${partesNombre.slice(mitad - (partesNombre.length > 2 ? 1 : 0)).join(" ")}</span>`
    : C.lugar.nombre;
  $("#lugarDireccion").textContent = C.lugar.direccion;
  $("#lugarMapa").href = C.lugar.mapa;
  const fotoLugar = $("#fotoLugar");
  if (C.lugar.foto) {
    const img = new Image(); img.alt = C.lugar.nombre; img.loading = "lazy"; img.src = C.lugar.foto;
    img.onerror = () => { fotoLugar.innerHTML = ilustracionLugar(); };
    fotoLugar.appendChild(img);
  } else fotoLugar.innerHTML = ilustracionLugar();

  // Programa
  $("#programa").innerHTML = C.programa.map(e =>
    `<li class="revela"><time>${e.hora}</time><div><h3>${e.titulo}</h3><p>${e.detalle}</p></div></li>`).join("");

  // Vestimenta
  $("#ellos").textContent = C.vestimenta.ellos;
  $("#ellas").textContent = C.vestimenta.ellas;
  $("#tonos").innerHTML = C.vestimenta.tonos.map(t => `<li><i style="background:${t.color}"></i>${t.nombre}</li>`).join("");
  $("#notaVestimenta").innerHTML = `${C.vestimenta.nota}<em>${C.vestimenta.notaFinal}</em>`;

  // Regalo
  $("#textoRegalo").textContent = C.regalo.texto;
  const iconoCopiar = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`;
  $("#datosCuenta").innerHTML = C.regalo.datos.map(d =>
    `<div class="fila"><dt>${d.etiqueta}</dt><dd>${d.valor}<button type="button" class="copiar" data-copiar="${d.valor}" aria-label="Copiar ${d.etiqueta}">${iconoCopiar}</button></dd></div>`).join("");
  const modal = $("#modalCuenta");
  $("#verCuenta").addEventListener("click", () => modal.showModal ? modal.showModal() : modal.setAttribute("open", ""));
  modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
  $("#datosCuenta").addEventListener("click", async e => {
    const b = e.target.closest("[data-copiar]"); if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copiar); aviso("Copiado"); }
    catch { aviso("No se pudo copiar; mantén presionado el texto"); }
  });

  // Confirmación
  $("#fechaLimite").textContent = C.confirmacion.fechaLimite;
  const form = $("#formRsvp");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    if (!nombre) { $("#errorRsvp").textContent = "Escribe tu nombre para que sepamos quién responde."; form.nombre.focus(); return; }
    $("#errorRsvp").textContent = "";
    const va = (e.submitter && e.submitter.value) !== "no";
    const txt = va
      ? `¡Hola ${C.novio} y ${C.novia}! Soy ${nombre} y confirmo mi asistencia a su boda. ✅`
      : `¡Hola ${C.novio} y ${C.novia}! Soy ${nombre}. Lamentablemente no podré acompañarlos, ¡les deseo lo mejor! 💛`;
    window.open(`https://wa.me/${C.confirmacion.whatsapp}?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
  });

  /* ---------------- Carrusel ---------------- */
  (function carrusel() {
    const fotos = C.galeria || [];
    const caja = $("#carrusel"), pista = $("#pista"), puntos = $("#puntos");
    if (!fotos.length) { caja.closest("section").remove(); return; }
    pista.innerHTML = fotos.map((src, i) =>
      `<figure class="carrusel__foto${i === 0 ? " activa" : ""}" aria-roledescription="foto" aria-label="${i + 1} de ${fotos.length}">
        <img src="${src}" alt="${C.novio} y ${C.novia}, foto ${i + 1}" ${i ? 'loading="lazy"' : ""}>
      </figure>`).join("");
    puntos.innerHTML = fotos.map((_, i) =>
      `<button role="tab" aria-label="Ver foto ${i + 1}" aria-selected="${i === 0}"></button>`).join("");
    const slides = $$(".carrusel__foto", pista), dots = $$("button", puntos);
    let actual = 0, timer = null;
    const ms = (C.galeriaSegundos || 4) * 1000;
    function ir(n) {
      slides[actual].classList.remove("activa"); dots[actual].setAttribute("aria-selected", "false");
      actual = (n + slides.length) % slides.length;
      slides[actual].classList.add("activa"); dots[actual].setAttribute("aria-selected", "true");
    }
    const play = () => { clearInterval(timer); timer = setInterval(() => ir(actual + 1), ms); };
    const pausa = () => clearInterval(timer);
    $("#sig").addEventListener("click", () => { ir(actual + 1); play(); });
    $("#ant").addEventListener("click", () => { ir(actual - 1); play(); });
    dots.forEach((d, i) => d.addEventListener("click", () => { ir(i); play(); }));
    let x0 = null;
    caja.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; pausa(); }, { passive: true });
    caja.addEventListener("touchend", e => {
      if (x0 !== null) { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1)); }
      x0 = null; play();
    });
    document.addEventListener("visibilitychange", () => document.hidden ? pausa() : play());
    play();
  })();

  $("#hashtag").textContent = C.hashtag;
  if (C.fotoCierre) {
    const fig = $("#fotoCierre"), img = new Image();
    img.alt = `${C.novio} y ${C.novia}`; img.loading = "lazy"; img.src = C.fotoCierre;
    img.onerror = () => { fig.hidden = true; };
    fig.prepend(img); fig.hidden = false;
  }

  /* ---------------- Aviso ---------------- */
  let tAviso;
  function aviso(t) {
    const el = $("#aviso"); el.textContent = t; el.classList.add("ver");
    clearTimeout(tAviso); tAviso = setTimeout(() => el.classList.remove("ver"), 1800);
  }

  /* ---------------- Música ---------------- */
  const audio = $("#audio"), btnMusica = $("#musica");
  if (C.musica) { audio.src = C.musica; audio.preload = "auto"; }
  function ponerMusica(on) {
    if (!C.musica) return;
    if (on) {
      audio.volume = 0;
      audio.play().then(() => {
        btnMusica.classList.add("sonando");
        const sube = setInterval(() => {            // entrada suave del volumen
          audio.volume = Math.min(.75, audio.volume + .05);
          if (audio.volume >= .75) clearInterval(sube);
        }, 120);
      }).catch(() => {});
    }
    else { audio.pause(); btnMusica.classList.remove("sonando"); }
    btnMusica.setAttribute("aria-label", on ? "Silenciar música" : "Activar música");
  }
  btnMusica.addEventListener("click", () => ponerMusica(audio.paused));


  /* ---------------- Destellos mágicos al abrir ---------------- */
  function destellos(origen) {
    const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cv = document.createElement("canvas");
    cv.className = "magia";
    cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = innerWidth, H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.scale(dpr, dpr);

    const colores = ["#e2b65e", "#d19c3c", "#f6dc9a", "#ffffff", "#c99436", "#f0cf7f", "#b8c46a"];
    const azar = (a, b) => a + Math.random() * (b - a);
    const ps = [];
    const total = reducido ? 40 : 170;

    // estallido desde el sello
    for (let i = 0; i < total; i++) {
      const ang = Math.random() * Math.PI * 2, vel = azar(1.5, 9);
      ps.push({
        x: origen.x, y: origen.y,
        vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel - azar(0, 2.5),
        r: azar(1.2, 4), vida: 0, max: azar(70, 150),
        c: colores[i % colores.length], estrella: Math.random() < .35,
        giro: azar(0, Math.PI), vg: azar(-.15, .15), titila: azar(0, 6)
      });
    }
    // polvo brillante que cae suavemente por toda la pantalla
    const lluvia = reducido ? 0 : 90;
    for (let i = 0; i < lluvia; i++) {
      ps.push({
        x: azar(0, W), y: azar(-H * .3, H * .6),
        vx: azar(-.3, .3), vy: azar(.4, 1.4),
        r: azar(.8, 2.6), vida: -azar(10, 70), max: azar(110, 200),
        c: colores[i % colores.length], estrella: Math.random() < .5,
        giro: 0, vg: azar(-.05, .05), titila: azar(0, 6), polvo: true
      });
    }

    function estrella(x, y, r, giro) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(giro);
      ctx.beginPath();
      for (let k = 0; k < 4; k++) {
        ctx.lineTo(0, -r * 3.2);
        ctx.rotate(Math.PI / 4);
        ctx.lineTo(0, -r * .7);
        ctx.rotate(Math.PI / 4);
      }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }

    let destello = 1; // halo inicial
    function cuadro() {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      if (destello > 0) {
        const g = ctx.createRadialGradient(origen.x, origen.y, 0, origen.x, origen.y, 260 * (1.4 - destello));
        g.addColorStop(0, `rgba(255,240,200,${.85 * destello})`);
        g.addColorStop(1, "rgba(255,230,170,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        destello -= .025;
      }
      ctx.globalCompositeOperation = "source-over";

      let vivos = 0;
      for (const p of ps) {
        p.vida++;
        if (p.vida < 0 || p.vida > p.max) { if (p.vida <= p.max) vivos++; continue; }
        vivos++;
        p.x += p.vx; p.y += p.vy;
        if (!p.polvo) { p.vx *= .965; p.vy = p.vy * .965 + .045; }
        p.giro += p.vg;
        const t = p.vida / p.max;
        const a = Math.sin(t * Math.PI) * (.55 + .45 * Math.sin(p.vida * .3 + p.titila));
        ctx.globalAlpha = Math.max(0, a);
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c; ctx.shadowBlur = p.r * 6;
        if (p.estrella) estrella(p.x, p.y, p.r, p.giro);
        else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      if (vivos > 0 || destello > 0) requestAnimationFrame(cuadro);
      else cv.remove();
    }
    requestAnimationFrame(cuadro);
  }

  /* ---------------- Abrir el sobre ---------------- */
  const sobre = $("#sobre");
  function abrir() {
    if (sobre.classList.contains("abierto")) return;
    const s = $("#sello").getBoundingClientRect();
    destellos({ x: s.left + s.width / 2, y: s.top + s.height / 2 });
    sobre.classList.add("abierto");
    document.body.classList.remove("bloqueado");
    document.body.classList.add("listo");
    if (C.musica) { btnMusica.hidden = false; ponerMusica(true); }
    setTimeout(() => sobre.remove(), 2200);
  }
  $("#sello").addEventListener("click", abrir);
  sobre.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") abrir(); });

  /* ---------------- Revelado al hacer scroll ---------------- */
  const io = "IntersectionObserver" in window && new IntersectionObserver(entradas => {
    entradas.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visto"); io.unobserve(en.target); } });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".revela").forEach(el => io ? io.observe(el) : el.classList.add("visto"));
})();
