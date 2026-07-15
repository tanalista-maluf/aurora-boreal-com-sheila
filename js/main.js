/* =========================================================
   AURORA BOREAL com SHEILA MELLO — main.js
   ---------------------------------------------------------
   >>> CONFIGURAÇÃO RÁPIDA (edite apenas o bloco SITE abaixo) <<<
   ========================================================= */

const SITE = {
  /* WhatsApp — número no formato internacional, só dígitos:
     55 (Brasil) + DDD + número.  Ex.: "5511999999999"          */
  whatsapp: "5551997704587",                       // +55 51 99770-4587
  whatsappMsg: "Olá! Quero me inscrever e garantir minha vaga na expedição Aurora Boreal com Sheila Mello (14–28/nov/2026).",

  /* E-mail de contato (usado no rodapé)                         */
  email: "quero@auroracomsheila.com.br"
};

/* ---------- Cronograma oficial (cronograma.jpg) ---------- */
const ROTEIRO = [
  ["14/11","Saída de GRU à tarde","Voo Guarulhos (GRU) → Reykjavik (KEF)"],
  ["15/11","Chegada em Reykjavík","Início da expedição no ártico. Chegada na capital mais ao norte do mundo."],
  ["16/11","Blue Lagoon","Manhã nas águas geotermais da Blue Lagoon; tarde e noite em Reykjavík."],
  ["17/11","Península","Península de Snæfellsnes, a 'Islândia em miniatura' → Selfoss."],
  ["18/11","Círculo Dourado","Golden Circle: Þingvellir, Geysir e Gullfoss → Selfoss."],
  ["19/11","Sul da ilha","Seljalandsfoss e Skógafoss → Vík."],
  ["20/11","Glaciares e icebergs","Vatnajökull → laguna glacial de Jökulsárlón → Diamond Beach → Skaftafell."],
  ["21/11","Reykjavík","De Skaftafell a Reykjavik. Tarde e noite na capital"],
  ["22/11","Voo para Tromsø","Voo para Tromsø, via Oslo."],
  ["23/11","Tromsø","A capital do ártico norueguês entre fiordes e montanhas."],
  ["24/11","Tromsø","Catedral Ártica e teleférico com vista panorâmica."],
  ["25/11","Ice Hotel","Tromsø → Kiruna, na Lapônia sueca: a experiência do lendário Ice Hotel."],
  ["26/11","Trenó com Huskies","Kiruna → Kittilä → Inari, na Lapônia finlandesa."],
  ["27/11","Cultura Sámi","Inari: imersão na cultura Sámi."],
  ["28/11","Retorno para o Brasil","Fim do roteiro — voos Ivalo → Helsinki → Guarulhos."]
];

/* ========================================================= */
const smoothScroll = (target, duration = 800) => {
  const start = window.scrollY;
  const rect = target.getBoundingClientRect();
  const end = start + rect.top - 100;
  const distance = end - start;
  let position = start;
  const startTime = performance.now();

  const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  const scroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    position = start + distance * easeInOutCubic(progress);
    window.scrollTo(0, position);
    if (progress < 1) requestAnimationFrame(scroll);
  };

  requestAnimationFrame(scroll);
};

document.addEventListener("DOMContentLoaded", () => {

  /* --- Links de WhatsApp --- */
  const waHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMsg)}`;
  document.querySelectorAll("[data-wa]").forEach(a => { a.href = waHref; });
  document.querySelectorAll("[data-email]").forEach(a => {
    a.href = `mailto:${SITE.email}`; a.textContent = SITE.email;
  });

  /* --- Mini-header + logo do hero encolhendo ao rolar --- */
  const miniheader = document.getElementById("miniheader");
  const heroLogo = document.getElementById("heroLogo");
  const rootStyle = document.documentElement.style;
  const onScroll = () => {
    const y = window.scrollY;
    if (miniheader) miniheader.classList.toggle("show", y > 300);
    if (heroLogo) {
      const t = Math.min(y / 340, 1);               // progresso 0→1 nos primeiros 340px
      heroLogo.style.transform = `scale(${(1 - t * 0.5).toFixed(3)})`;
      heroLogo.style.opacity = (1 - t * 0.9).toFixed(3);
    }
    // Fundo aurora reativo: gira o matiz para tons árticos conforme a página rola
    const bgMax = document.documentElement.scrollHeight - window.innerHeight;
    const bp = bgMax > 0 ? Math.min(y / bgMax, 1) : 0;
    rootStyle.setProperty("--bg-hue", (bp * 15).toFixed(1) + "deg");
    rootStyle.setProperty("--bg-shift", (bp * 40).toFixed(1) + "px");
  };
  onScroll(); window.addEventListener("scroll", onScroll, { passive:true });

  /* --- Menu mobile dropdown --- */
  const menuBtn = document.getElementById("menuBtn");
  const menuDropdown = document.getElementById("menuDropdown");
  if (menuBtn && menuDropdown) {
    menuBtn.addEventListener("click", () => {
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", !isOpen);
      menuDropdown.classList.toggle("show");
    });
    menuDropdown.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuBtn.setAttribute("aria-expanded", "false");
        menuDropdown.classList.remove("show");
      });
    });
  }

  /* --- Smooth scroll para âncoras --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href !== "#") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          smoothScroll(target, 400);
        }
      }
    });
  });

  /* --- Roteiro dinâmico --- */
  const line = document.getElementById("roteiroLine");
  if (line) {
    line.innerHTML = ROTEIRO.map(([date, title, desc]) => `
      <div class="rday">
        <div class="rday__date">${date}</div>
        <div style="display:flex;gap:16px;align-items:flex-start">
          <span class="rday__dot"></span>
          <div class="rday__body"><h4>${title}</h4><p>${desc}</p></div>
        </div>
      </div>`).join("");
  }

  /* --- Reveal on scroll --- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold:0.12, rootMargin:"0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* --- FAQ acordeão --- */
  document.querySelectorAll("#faqList .faq__item").forEach(item => {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll("#faqList .faq__item").forEach(i => {
        i.classList.remove("open"); i.querySelector(".faq__a").style.maxHeight = null;
      });
      if (!open){ item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* --- Galeria: lightbox --- */
  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector("img");
  document.querySelectorAll("#gallery img").forEach(img => {
    img.addEventListener("click", () => {
      lbImg.src = img.src; lbImg.alt = img.alt; lb.classList.add("open");
    });
  });
  const closeLb = () => lb.classList.remove("open");
  lb.addEventListener("click", e => { if (e.target !== lbImg) closeLb(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

  /* --- Vídeo de depoimento do hero (janela) --- */
  const heroVideo = document.getElementById("heroVideo");
  const heroMuteBtn = document.getElementById("heroVideoMute");
  const heroPlayBtn = document.getElementById("heroVideoPlay");
  if (heroVideo && heroMuteBtn && heroPlayBtn) {
    heroMuteBtn.addEventListener("click", () => {
      heroVideo.muted = !heroVideo.muted;
      heroMuteBtn.setAttribute("aria-pressed", String(!heroVideo.muted));
      heroMuteBtn.setAttribute("aria-label", heroVideo.muted ? "Ativar som" : "Desativar som");
    });
    heroPlayBtn.addEventListener("click", () => {
      if (heroVideo.paused) heroVideo.play(); else heroVideo.pause();
    });
    heroVideo.addEventListener("play", () => {
      heroPlayBtn.setAttribute("aria-pressed", "true");
      heroPlayBtn.setAttribute("aria-label", "Pausar vídeo");
    });
    heroVideo.addEventListener("pause", () => {
      heroPlayBtn.setAttribute("aria-pressed", "false");
      heroPlayBtn.setAttribute("aria-label", "Tocar vídeo");
    });
    /* Toca uma única vez; ao terminar, volta a mostrar a capa (sem loop) */
    heroVideo.addEventListener("ended", () => {
      heroVideo.load();
    });
  }

  /* --- Slider da Destino Incomum --- */
  const slider = document.getElementById("operadoraSlider");
  if (slider) {
    const items = slider.querySelectorAll(".operadora__slider-item");
    let currentIndex = 0;
    setInterval(() => {
      items[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % items.length;
      items[currentIndex].classList.add("active");
    }, 2500);
  }
});
