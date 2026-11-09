/* Muhammed Emin Çimen - Portfolyo
   Web Grafik Tasarım-1 Ara Sınav Projesi (Kodlama)
   Etkileşim: JavaScript (beceri çubukları, sekmeler, proje filtresi, resim büyütme) */

/* ====== EDIT YOUR CONTENT HERE ====== */
const skills = [
  { ad: "Unreal Engine 5", yuzde: 95 },
  { ad: "Blender", yuzde: 90 },
  { ad: "Adobe Substance Painter", yuzde: 82 },
  { ad: "Adobe Illustrator", yuzde: 65 }
];

const yapabildiklerim = [
  { ad: "Unreal Engine 5", metin: "I work with Unreal Engine 5, using Nanite for high-detail geometry, Lumen for dynamic global illumination, and MetaHuman for realistic characters. I also handle the technical side of level production: lighting setup, post-process volumes, nav mesh configuration, and large-world management with World Partition and Level Streaming, along with performance optimization through cull distance volumes. On the visual side, I build materials in the Material Editor and use Custom Stencil for post-process effects and object masking." },
  { ad: "3D Modeling", metin: "I create game-ready 3D models in Blender, from props to environment assets. I also do retopology, turning high-poly sculpts into clean, optimized low-poly meshes with good edge flow for animation and real-time use. I bake high-poly details into normal, ambient occlusion and other maps, then texture the assets in Substance Painter with clean UVs and PBR materials." },
  { ad: "Game Programming", metin: "I program gameplay in Unreal Engine mainly with Blueprints, and I know key nodes well, such as Event Dispatchers, Custom Events and Cast To. I build Animation Blueprints, Actor Components, and AI systems with Behavior Trees and AI Controllers. I'm also obsessed with optimization, keeping my Blueprints and systems lean and performant, so my designs actually run and feel right." },
  { ad: "Game Designer", metin: "Backed by 10 years of experience as a gamer and the knowledge I gained at university, I design game mechanics and player experience, with a strong focus on level design and narrative. I take an idea from the first prototype to the final balance and polish." },
  { ad: "Environment Designer", metin: "I build atmospheric game worlds in Unreal Engine, shaping terrain with Landscape and setting the mood with post-process effects and ambience such as Volumetric Fog. I combine modeling, lighting and composition to guide the player and tell a story through the space." }
];

/* category: "Games", "3D Models" ya da "Environment Design"  |  img: images klasöründeki resim  |  link: proje adresi ("#" ise resim büyütülür) */
const projeler = [
  { ad: "Project Mountain", category: "Games", ekip: "Abraham_Stinson, Yusuf Anık, Cagitt", link: "https://ibrahim-gumusdal.itch.io/project-mountain", img: "images/project-mountain.jpg" },
  { ad: "Church", category: "3D Models", link: "#", img: "images/church.jpg" },
  { ad: "Misty Mountain", category: "Environment Design", link: "#", img: "images/misty-mountain.jpg" },
  { ad: "Snow Camp", category: "Environment Design", link: "#", img: "images/snow-camp.jpg" },
  { ad: "Lava Cave", category: "Environment Design", link: "#", img: "images/lava-cave.jpg" },
  { ad: "Low-Poly Forest", category: "Environment Design", link: "#", img: "images/low-poly-forest.jpg" }
];
/* ==================================== */

/* Skills */
document.getElementById("skills").innerHTML = skills.map(s => `
  <div class="skill"><b>${s.ad}</b><div class="bar"><i data-w="${s.yuzde}"></i></div></div>`).join("");
const fill = () => document.querySelectorAll(".bar i").forEach(i => i.style.width = i.dataset.w + "%");
if ("IntersectionObserver" in window) {
  new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { fill(); o.disconnect(); } }, { threshold: .3 }).observe(document.getElementById("skills"));
} else fill();

/* What Can I Do: hover or click */
const tabs = document.getElementById("tabs"), detail = document.getElementById("detail"), notch = document.getElementById("notch");
yapabildiklerim.forEach((y, i) => {
  const b = document.createElement("button");
  b.textContent = y.ad; b.setAttribute("role", "tab"); b.dataset.i = i;
  b.addEventListener("mouseenter", () => sec(i));
  b.addEventListener("focus", () => sec(i));
  b.addEventListener("click", () => sec(i));
  tabs.appendChild(b);
});
function sec(i) {
  const butonlar = tabs.querySelectorAll("button");
  butonlar.forEach((b, k) => b.setAttribute("aria-selected", k === i));
  const y = yapabildiklerim[i];
  detail.innerHTML = `<h3>${y.ad}</h3><p>${y.metin}</p>`;
  const b = butonlar[i];
  notch.style.transform = `translateY(${b.offsetTop + b.offsetHeight / 2 - 14}px)`;
}
sec(0);
window.addEventListener("resize", () => sec(+tabs.querySelector('[aria-selected="true"]').dataset.i));

/* Projects + filter */
document.getElementById("cards").innerHTML = projeler.map(p => `
  <a class="card" href="${p.link}" data-cat="${p.category}"${p.link.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}${p.link === "#" && p.img ? ' data-lb="' + p.img + '" aria-label="View ' + p.ad + '"' : ""}>
    ${p.img ? `<img src="${p.img}" alt="">` : ""}
    <span>${p.ad}<em>${p.category}${p.ekip ? " · " + p.ekip : ""}</em></span>
  </a>`).join("");
document.getElementById("filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  document.querySelectorAll("#filters button").forEach(x => x.setAttribute("aria-pressed", x === b));
  document.querySelectorAll(".card").forEach(c => c.hidden = b.dataset.f !== "all" && c.dataset.cat !== b.dataset.f);
});

/* Lightbox: resmi büyük göster */
const lb = document.getElementById("lb");
function lbKapat() { lb.hidden = true; }
document.getElementById("cards").addEventListener("click", e => {
  const c = e.target.closest(".card[data-lb]"); if (!c) return;
  e.preventDefault();
  document.getElementById("lbimg").src = c.dataset.lb;
  document.getElementById("lbcap").textContent = c.querySelector("span").firstChild.textContent;
  lb.hidden = false;
  document.getElementById("lbx").focus();
});
lb.addEventListener("click", lbKapat);
document.addEventListener("keydown", e => { if (e.key === "Escape") lbKapat(); });
