// Thunk! WebGL build yüklendiğinde true yap (play/ klasörü)
const GAME_READY = true;

const EN = {
  status: "Open to new opportunities · Izmir",
  role: "Full Stack Developer",
  tagline: "I build scalable .NET microservices and fast React interfaces for banking and fintech, and make games in my spare time.",
  cv: "Download CV",
  contactBtn: "Get in touch",
  "nav.about": "About",
  "nav.exp": "Experience",
  "nav.projects": "Projects",
  "nav.skills": "Skills",
  "nav.refs": "References",
  "nav.contact": "Contact",
  "about.p1": "I'm a <strong>Full Stack Developer</strong> with 3+ years of experience architecting high-scale financial systems in Agile teams. I took part in migrating a legacy banking monolith to microservices, implemented the <strong>Saga pattern</strong> for distributed transactions, and significantly reduced payment latency, failure rates and page load times.",
  "about.p2": "My core expertise spans <strong>.NET and React</strong>, with a focus on microservices architecture, CI/CD automation, database optimization and web security. Outside of work I build mobile games with Unity and experiment with AI agents.",
  "about.p3": "B.Sc. in Computer Engineering, Dokuz Eylul University (2018–2024).",
  brands: "Brands I've worked with",
  "exp1.date": "Feb 2025 — Present",
  "exp1.loc": "Ankara · Remote",
  "exp1.b1": "<b>Linktera E-Wallet Platform</b> — Architected backend services handling high-volume daily transactions; implemented the Saga pattern to keep distributed transactions ACID-compliant and improved payment latency and query performance.",
  "exp1.b2": "<b>AktifBank Workflow Management</b> — Built a React/Next.js frontend and .NET Core backend; replaced manual approval bottlenecks and containerized services with Docker for Kubernetes.",
  "exp1.b3": "<b>Intertech · Monolith to Microservices</b> — Designed an event-driven architecture with RabbitMQ while splitting a legacy banking monolith into independent services; applied Infrastructure as Code principles.",
  "exp1.b4": "<b>CI/CD &amp; Quality</b> — Shortened release cycles with Jenkins pipelines, set code-quality standards with SonarQube and mentored junior developers.",
  "exp2.date": "Jul 2023 — Feb 2025",
  "exp2.loc": "Izmir · On-site",
  "exp2.b1": "<b>Yaşar Holding · Payment Systems</b> — Built a secure payment gateway with PCI-DSS awareness; reduced payment failures through robust validation and integrated multiple payment processors.",
  "exp2.b2": "<b>Arkas Holding · Web Performance</b> — Redesigned arkaslojistik.com.tr and shipeedy.com; improved Lighthouse scores, cut bundle sizes and added real-time shipment tracking.",
  "exp2.b3": "<b>Arkas Sanat · Booking &amp; Ticketing</b> — Built an end-to-end reservation system with real-time ticket confirmation and event-driven notification services.",
  "exp2.b4": "<b>Architecture &amp; Testing</b> — Scalable .NET Core microservices, Swagger-documented REST APIs, a reusable UI component library; xUnit and SonarQube quality gates.",
  "edu.title": "Computer Engineering · <span class=\"accent\">Dokuz Eylul University</span>",
  "edu.desc": "Bachelor's degree · Izmir",
  fullCv: "View full résumé",
  "game.eyebrow": "Mobile game · Unity 6",
  "game.desc": "A reflex-driven arcade game about timing your throws into a spinning target. Built with Unity 6 and URP; currently in release review for Android.",
  "game.play": "Play in browser",
  "game.store": "Google Play · Coming soon",
  "p.ai": "A multi-agent system of 13 specialized AI agents that evaluate a project idea step by step: market research, competitors, technical architecture, revenue model and roadmap.",
  "p.core": "A security-focused, reusable enterprise backend core built with ASP.NET Core Identity, JWT authentication, PostgreSQL and Serilog.",
  "p.tefas": "A service exposing Turkey's electronic fund information system (TEFAS) as a REST API: live and historical fund prices, portfolio analysis, Swagger docs.",
  "p.chat.t": "Real-Time Messaging",
  "p.chat": "An event-driven, JWT-secured messaging backend that scales with RabbitMQ queues and Redis caching.",
  "p.longway": "A logistics platform connecting cargo owners with drivers: job postings, Google Maps location services, email verification and an admin panel.",
  "p.ent.t": "Enterprise Next.js Dashboards",
  "p.ent": "TypeScript enterprise admin dashboards (IKABS, AVBI) talking to .NET backends, along with their service layers.",
  more: "Other work",
  "p.getir": "Grocery delivery app (React Native)",
  "p.ezan": "Prayer times Android app",
  "p.krila": "Order integration service",
  allRepos: "See all repositories on GitHub",
  "sk.arch": "Architecture",
  "sk.data": "Data",
  "sk.game": "Games",
  "sk.langs": "Turkish (native) · English (upper intermediate)",
  mentor: "/ Mentor",
  "refs.note": "Contact details available on request.",
  "contact.big": "A new project, a role, or just a hello — I'm always happy to talk.",
  "c.mail": "Email",
  "c.phone": "Phone",
  foot: "Hand-built with plain HTML, CSS & JS · GitHub Pages"
};

const nodes = [...document.querySelectorAll("[data-i18n]")];
const TR = {};
nodes.forEach(n => { TR[n.dataset.i18n] ??= n.innerHTML; });

function setLang(lang) {
  const dict = lang === "en" ? EN : TR;
  nodes.forEach(n => { const v = dict[n.dataset.i18n]; if (v != null) n.innerHTML = v; });
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-lang]").forEach(b => b.classList.toggle("on", b.dataset.lang === lang));
  try { localStorage.setItem("lang", lang); } catch (e) {}
}
document.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
let saved = null;
try { saved = localStorage.getItem("lang"); } catch (e) {}
if (saved === "en") setLang("en");

// theme
document.getElementById("themeBtn").addEventListener("click", () => {
  const root = document.documentElement;
  const cur = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = cur === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// game button
if (!GAME_READY) {
  const b = document.getElementById("playBtn");
  b.classList.add("disabled");
  b.removeAttribute("href");
  b.setAttribute("aria-disabled", "true");
}

// spotlight + card glow
const fine = matchMedia("(pointer: fine)").matches;
if (fine) {
  addEventListener("pointermove", e => {
    document.body.style.setProperty("--mx", e.clientX + "px");
    document.body.style.setProperty("--my", e.clientY + "px");
  }, { passive: true });
  document.querySelectorAll(".card").forEach(c => c.addEventListener("pointermove", e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--cx", e.clientX - r.left + "px");
    c.style.setProperty("--cy", e.clientY - r.top + "px");
  }));
}

// active nav
const links = [...document.querySelectorAll(".nav a")];
const io = new IntersectionObserver(es => {
  es.forEach(en => {
    if (en.isIntersecting) links.forEach(l => l.classList.toggle("on", l.getAttribute("href") === "#" + en.target.id));
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach(s => io.observe(s));

// reveal
const rv = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("in"); rv.unobserve(en.target); }
}), { threshold: 0.08 });
document.querySelectorAll(".job, .card, .game, .brands, .ref, .skills > div").forEach(el => { el.classList.add("reveal"); rv.observe(el); });

document.getElementById("yr").textContent = new Date().getFullYear();
