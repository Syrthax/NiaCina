const STORAGE_KEY = "hiresume:resume:v1";
const TOKEN_KEY = "hiresume:github-token";
// Keys from before the rename to HiResume; data is moved over on first load.
const LEGACY_STORAGE_KEYS = { [STORAGE_KEY]: "niacina:resume:v1", [TOKEN_KEY]: "niacina:github-token" };

const TEMPLATES = ["modern", "classic", "compact", "sidebar"];
const DEFAULT_ACCENT = "#1e3a8a";
const LEGACY_DEFAULT_ACCENT = "#4f46e5";

const ICONS = {
  x: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>',
  up: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M4 7l4-4 4 4" /></svg>',
  down: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M4 9l4 4 4-4" /></svg>',
  left: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3.5L5.5 8l4.5 4.5" /></svg>',
  right: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5L10.5 8 6 12.5" /></svg>',
  lock: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="6.5" rx="1" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" /></svg>',
  alert: '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5l6 10.5H2z" /><path d="M8 7v2.5M8 11.2v.1" /></svg>',
};
const PROJECTS_PER_PAGE = 8;
const SKILLS_PER_PAGE = 30;

// GitHub languages and topics mapped to how they should read on a resume.
// Topics listed here are treated as skills; other topics are offered but unticked.
const SKILL_NAMES = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  kotlin: "Kotlin",
  swift: "Swift",
  go: "Go",
  golang: "Go",
  rust: "Rust",
  c: "C",
  cpp: "C++",
  "c++": "C++",
  csharp: "C#",
  "c#": "C#",
  php: "PHP",
  ruby: "Ruby",
  dart: "Dart",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  shell: "Shell",
  bash: "Bash",
  "jupyter notebook": "Jupyter",
  react: "React",
  reactjs: "React",
  nextjs: "Next.js",
  vue: "Vue.js",
  vuejs: "Vue.js",
  svelte: "Svelte",
  sveltekit: "SvelteKit",
  angular: "Angular",
  nodejs: "Node.js",
  node: "Node.js",
  express: "Express",
  expressjs: "Express",
  tailwindcss: "Tailwind CSS",
  tailwind: "Tailwind CSS",
  threejs: "Three.js",
  vite: "Vite",
  webgl: "WebGL",
  fastapi: "FastAPI",
  django: "Django",
  flask: "Flask",
  tauri: "Tauri",
  electron: "Electron",
  android: "Android",
  "jetpack-compose": "Jetpack Compose",
  flutter: "Flutter",
  "react-native": "React Native",
  docker: "Docker",
  kubernetes: "Kubernetes",
  aws: "AWS",
  gcp: "Google Cloud",
  firebase: "Firebase",
  supabase: "Supabase",
  mongodb: "MongoDB",
  postgresql: "PostgreSQL",
  postgres: "PostgreSQL",
  mysql: "MySQL",
  sqlite: "SQLite",
  redis: "Redis",
  graphql: "GraphQL",
  "cloudflare-workers": "Cloudflare Workers",
  "github-actions": "GitHub Actions",
  opencv: "OpenCV",
  pytorch: "PyTorch",
  tensorflow: "TensorFlow",
  "machine-learning": "Machine Learning",
  llm: "LLMs",
  ollama: "Ollama",
  openai: "OpenAI API",
  mediapipe: "MediaPipe",
  "chrome-extension": "Chrome Extensions",
  "vscode-extension": "VS Code Extensions",
  git: "Git",
  linux: "Linux",
};

const PROFILE_FIELDS = [
  "fullName",
  "headline",
  "email",
  "phone",
  "location",
  "website",
  "linkedin",
  "githubUsername",
  "summary",
  "languages",
];

// Values older versions prefilled into the form. Saved data still holding them is cleared
// once on load so the placeholders show instead of text the user has to delete.
const LEGACY_DEFAULTS = {
  fullName: "Your Name",
  headline: "Frontend Developer",
  email: "you@example.com",
  phone: "+00 123 456 7890",
  location: "Remote",
  summary:
    "Write a short summary that highlights your strengths, preferred technologies, and the value you bring to a team.",
  skills: "JavaScript, TypeScript, React, HTML, CSS, Node.js",
};

const LEGACY_SAMPLE_ENTRIES = {
  experience: (entry) => entry.role === "Frontend Developer Intern" && entry.company === "Company Name",
  education: (entry) => entry.school === "University Name" && entry.degree === "B.Tech, Computer Science",
};

const elements = {
  ...Object.fromEntries(
    [
      ...PROFILE_FIELDS,
      "skillChips",
      "skillInput",
      "skillSuggestList",
      "skillEditor",
      "skillsCount",
      "importSkillsButton",
      "projectsCount",
      "selectedProjects",
      "openProjectsButton",
      "openCustomProjectButton",
      "projectStatus",
      "loadProjectsButton",
      "publicMode",
      "tokenMode",
      "githubToken",
      "connectTokenButton",
      "rememberToken",
      "disconnectTokenButton",
      "projectDialog",
      "projectDialogSummary",
      "projectSearch",
      "projectFilter",
      "projectList",
      "projectPager",
      "customProjectDialog",
      "futureProjectForm",
      "skillDialog",
      "skillImportStatus",
      "skillSearch",
      "toggleAllSkills",
      "skillSuggestions",
      "skillPager",
      "addSkillsButton",
      "previewFullName",
      "previewHeadline",
      "previewContact",
      "previewSummary",
      "previewSummarySection",
      "previewSkills",
      "previewSkillsSection",
      "previewLanguages",
      "previewLanguagesSection",
      "previewProjects",
      "previewProjectsSection",
      "templatePicker",
      "colorPicker",
      "customAccent",
      "resumePreview",
      "printResumeButton",
      "exportButton",
      "importInput",
      "resetButton",
      "saveStatus",
    ].map((id) => [id, document.getElementById(id)]),
  ),
  privateWarnings: document.querySelectorAll("[data-private-warning]"),
  githubModeInputs: document.querySelectorAll('input[name="githubMode"]'),
};

// Offline fallback for @Syrthax when the GitHub API can't be reached.
const bundledGithubProjects = [
  ["NiaCina", "A resume project selector so that you dont need to type new resume everytime for different project showcase", "", "https://github.com/Syrthax/NiaCina"],
  ["mosie", "Your smart health assistant", "", "https://github.com/Syrthax/mosie"],
  ["Syrthax", "✨special ✨", "", "https://github.com/Syrthax/Syrthax"],
  ["bimi", "image for bimi record", "HTML", "https://github.com/Syrthax/bimi"],
  ["pocket-server", "A mobile application to launch minecraft server from your pocket, your phone is the server", "", "https://github.com/Syrthax/pocket-server"],
  ["Kiosk", "A clean, modern, open-source PDF reader designed to bring simplicity and polish to every platform — web, desktop, mobile, and browser extensions.", "Kotlin", "https://github.com/Syrthax/Kiosk"],
  ["CFAP", "", "TypeScript", "https://github.com/Syrthax/CFAP"],
  ["DragonFruitPetOnTerminal", "A pet dragon fruit staying in your terminal", "Python", "https://github.com/Syrthax/DragonFruitPetOnTerminal"],
  ["ezpush", "vscode extension that just pushes to github", "TypeScript", "https://github.com/Syrthax/ezpush"],
  ["NutriScan", "NutriScan turns any phone into a smart nutrition scanner. Just point, scan, and instantly see calories, ingredients, NutriScore, veg/non-veg markers, and more — powered by the OpenFoodFacts global database.", "Kotlin", "https://github.com/Syrthax/NutriScan"],
  ["itak", "Itak – AI Manual Assistant for factory workers (Next.js 15 + Tailwind v4)", "TypeScript", "https://github.com/Syrthax/itak"],
  ["Embark-Ai", "A Minecraft bot that thinks, defends itself, and gets things done. Built with Mineflayer + local LLM via Ollama. No cloud, no TypeScript, no databases.", "JavaScript", "https://github.com/Syrthax/Embark-Ai"],
  ["syrthax.github.io", "Interactive portfolio with a Three.js 3D narrative engine, Svelte and progressive 2D fallback. Built as a static site for performance and simplicity.", "TypeScript", "https://github.com/Syrthax/syrthax.github.io"],
  ["soura", "a chrome extension through which you can download image with a simple drag and drop gesture", "CSS", "https://github.com/Syrthax/soura"],
  ["Election-Process-Education", "An initiative for google prompt-wars virtual", "JavaScript", "https://github.com/Syrthax/Election-Process-Education"],
  ["IBM-orchestrate", "", "Python", "https://github.com/Syrthax/IBM-orchestrate"],
  ["balancer", "an ai biased decision identifier ", "Python", "https://github.com/Syrthax/balancer"],
  ["dsa", "", "", "https://github.com/Syrthax/dsa"],
  ["auto-bill", "a website that scans barcode of products and adds it to the cart and does billing within the website", "JavaScript", "https://github.com/Syrthax/auto-bill"],
  ["Game-Dev-Persistent-NPC-Intelligence", "NPC system that remember interactions and evolve behavior over time. Dynamic World Driven by External Signals Create a game world that changes dynamically based on real-world or external inputs. Multi-Agent Game Ecosystem Design a game where autonomous agents interact to produce emergent gameplay.", "JavaScript", "https://github.com/Syrthax/Game-Dev-Persistent-NPC-Intelligence"],
  ["meow", "NPC system that remember interactions and evolve behavior over time. Dynamic World Driven by External Signals Create a game world that changes dynamically based on real-world or external inputs. Multi-Agent Game Ecosystem Design a game where autonomous agents interact to produce emergent gameplay.", "", "https://github.com/Syrthax/meow"],
  ["FairCase", "", "TypeScript", "https://github.com/Syrthax/FairCase"],
  ["E-com", "This is a website having admin panel and customer files", "HTML", "https://github.com/Syrthax/E-com"],
  ["Loading-tips", "Small insights from projects, code, and curiosity.", "HTML", "https://github.com/Syrthax/Loading-tips"],
  ["ido", "A minimalist, open-source productivity tool designed to help you track tasks effortlessly. ido focuses on simplicity, speed, and clean architecture — built for developers who want a no-nonsense to-do flow that just works.", "Kotlin", "https://github.com/Syrthax/ido"],
  ["arcraft", "A block game using Augmented Reality, made coz 50% of the syllabus for tomorrow's exam is done and  I need some rest", "Python", "https://github.com/Syrthax/arcraft"],
  ["Playground", "A simple react based portfolio website using reactbits, not production grade just my playground", "JavaScript", "https://github.com/Syrthax/Playground"],
  ["Student-management-portal", "Well the faculty was absent today so i made this in the meantime coz i was bored", "CSS", "https://github.com/Syrthax/Student-management-portal"],
  ["portfolio-contact-relay", "CI-driven email relay system for static portfolios. Uses GitHub Issues as event triggers and Actions for secure mail delivery.", "CSS", "https://github.com/Syrthax/portfolio-contact-relay"],
  ["gravity-sim", "", "C", "https://github.com/Syrthax/gravity-sim"],
  ["Vesper", "A calm, intentional focus app that locks distractions using QR-based triggers and location awareness. Built for classrooms, libraries, and deep work.", "", "https://github.com/Syrthax/Vesper"],
].map(([name, description, tech, url]) => ({
  id: `github-${name.toLowerCase()}`,
  name,
  description,
  tech,
  language: tech,
  topics: [],
  url,
  private: false,
  selected: false,
  source: "github",
}));
const ENTRY_SECTIONS = {
  experience: {
    noun: "experience",
    fields: [
      { key: "role", label: "Role / title", placeholder: "Software Engineer Intern" },
      { key: "company", label: "Company", placeholder: "Acme Corp" },
      { key: "location", label: "Location", placeholder: "Bengaluru · Remote" },
      { key: "start", label: "Start", placeholder: "Jun 2024" },
      { key: "end", label: "End", placeholder: "Leave blank for Present" },
      {
        key: "highlights",
        label: "Highlights (one per line)",
        type: "textarea",
        placeholder: "Built X that improved Y by Z%\nLed migration of ... to ...",
      },
    ],
    titleKeys: ["role", "company"],
    render: (entry) =>
      entryPreview({
        title: entry.role,
        subtitle: [entry.company, entry.location],
        date: formatRange(entry.start, entry.end, "Present"),
        bullets: splitLines(entry.highlights),
      }),
  },
  education: {
    noun: "education",
    fields: [
      { key: "school", label: "School / university", placeholder: "State University" },
      { key: "degree", label: "Degree & field", placeholder: "B.Tech, Computer Science" },
      { key: "location", label: "Location", placeholder: "City, Country" },
      { key: "score", label: "GPA / percentage", placeholder: "8.9 CGPA" },
      { key: "start", label: "Start", placeholder: "2022" },
      { key: "end", label: "End", placeholder: "2026 (expected)" },
      {
        key: "details",
        label: "Details (one per line)",
        type: "textarea",
        placeholder: "Relevant coursework: Data Structures, Operating Systems\nClub lead, Coding Society",
      },
    ],
    titleKeys: ["degree", "school"],
    render: (entry) =>
      entryPreview({
        title: entry.degree || entry.school,
        subtitle: [entry.degree ? entry.school : "", entry.location, entry.score],
        date: formatRange(entry.start, entry.end),
        bullets: splitLines(entry.details),
      }),
  },
  certifications: {
    noun: "certification",
    fields: [
      { key: "name", label: "Certification", placeholder: "AWS Certified Cloud Practitioner" },
      { key: "issuer", label: "Issuer", placeholder: "Amazon Web Services" },
      { key: "date", label: "Date", placeholder: "Mar 2025" },
      { key: "url", label: "Credential link", type: "url", placeholder: "https://..." },
    ],
    titleKeys: ["name", "issuer"],
    render: (entry) =>
      entryPreview({
        title: entry.name,
        subtitle: [entry.issuer],
        date: entry.date,
        url: entry.url,
      }),
  },
  achievements: {
    noun: "achievement",
    fields: [
      { key: "title", label: "Achievement", placeholder: "1st place, Smart India Hackathon" },
      { key: "date", label: "Date", placeholder: "2025" },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        placeholder: "What you did and why it mattered.",
      },
    ],
    titleKeys: ["title"],
    render: (entry) =>
      entryPreview({
        title: entry.title,
        date: entry.date,
        text: entry.description,
      }),
  },
};

const state = {
  template: TEMPLATES[0],
  accent: DEFAULT_ACCENT,
  hidePrivateLinks: false,
  skills: [],
  projects: [],
  // Selections from saves made before project data was stored; resolved once repos load.
  legacySelectedUrls: new Set(),
  entries: {
    experience: [createEntry()],
    education: [createEntry()],
    certifications: [],
    achievements: [],
  },
  github: { mode: "public", token: "", loading: null },
  projectDialog: { page: 1 },
  skillImport: { suggestions: [], selected: new Set(), page: 1 },
};

function createEntry(values = {}) {
  return {
    id: `entry-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    include: true,
    ...values,
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normaliseList(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitLines(value) {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.replace(/^\s*[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function normaliseUrl(value) {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "";
  } catch (error) {
    return "";
  }
}

function displayUrl(url) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function formatRange(start, end, openLabel = "") {
  const from = (start || "").trim();
  const to = (end || "").trim() || (from ? openLabel : "");
  return [from, to].filter(Boolean).join(" – ");
}

function plural(count, singular, pluralForm = `${singular}s`) {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

function paginate(items, page, perPage) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    page: current,
    totalPages,
    items: items.slice((current - 1) * perPage, current * perPage),
  };
}

function renderPager(container, page, totalPages) {
  container.hidden = totalPages <= 1;
  container.innerHTML = `
    <button type="button" class="ghost small" data-page="${page - 1}" ${page <= 1 ? "disabled" : ""}>${ICONS.left} Prev</button>
    <span>Page ${page} of ${totalPages}</span>
    <button type="button" class="ghost small" data-page="${page + 1}" ${page >= totalPages ? "disabled" : ""}>Next ${ICONS.right}</button>
  `;
}

function entryPreview({ title, subtitle = [], date, bullets = [], text, url }) {
  const safeUrl = normaliseUrl(url);
  const subtitleText = subtitle.map((part) => (part || "").trim()).filter(Boolean).join(" · ");

  return `
    <article class="entry-preview">
      <div class="entry-preview-head">
        <div>
          <h3>${escapeHtml(title || "Untitled")}</h3>
          ${subtitleText ? `<p class="entry-sub">${escapeHtml(subtitleText)}</p>` : ""}
        </div>
        ${date ? `<span class="entry-date">${escapeHtml(date)}</span>` : ""}
      </div>
      ${bullets.length ? `<ul class="bullets">${bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      ${text ? `<p class="entry-text">${escapeHtml(text)}</p>` : ""}
      ${safeUrl ? `<p class="entry-text"><a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayUrl(safeUrl))}</a></p>` : ""}
    </article>
  `;
}

function entryHasContent(section, entry) {
  return ENTRY_SECTIONS[section].fields.some((field) => String(entry[field.key] ?? "").trim());
}

// ---------------------------------------------------------------------------
// Preview
// ---------------------------------------------------------------------------

function renderContactLine() {
  const email = elements.email.value.trim();
  const website = normaliseUrl(elements.website.value.trim());
  const linkedin = normaliseUrl(elements.linkedin.value.trim());
  const github = elements.githubUsername.value.trim();

  const parts = [
    email && `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`,
    elements.phone.value.trim() && escapeHtml(elements.phone.value.trim()),
    elements.location.value.trim() && escapeHtml(elements.location.value.trim()),
    website && `<a href="${escapeHtml(website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayUrl(website))}</a>`,
    linkedin && `<a href="${escapeHtml(linkedin)}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayUrl(linkedin))}</a>`,
    github &&
      `<a href="https://github.com/${encodeURIComponent(github)}" target="_blank" rel="noopener noreferrer">github.com/${escapeHtml(github)}</a>`,
  ].filter(Boolean);

  elements.previewContact.innerHTML = parts.map((part) => `<span>${part}</span>`).join("");
}

function renderEntryPreviews() {
  Object.entries(ENTRY_SECTIONS).forEach(([section, config]) => {
    const key = section[0].toUpperCase() + section.slice(1);
    const container = document.getElementById(`preview${key}`);
    const wrapper = document.getElementById(`preview${key}Section`);
    const visible = state.entries[section].filter((entry) => entry.include && entryHasContent(section, entry));

    container.innerHTML = visible.map(config.render).join("");
    wrapper.hidden = !visible.length;

    const badge = document.querySelector(`.entry-section[data-section="${section}"] [data-count]`);
    badge.textContent = visible.length ? `${visible.length} on resume` : "";
  });
}

function renderProjectPreviews() {
  const selectedProjects = state.projects.filter((project) => project.selected);
  elements.previewProjectsSection.hidden = !selectedProjects.length;

  elements.previewProjects.innerHTML = selectedProjects
    .map((project) => {
      const techStack = project.tech ? `<p><strong>Tech:</strong> ${escapeHtml(project.tech)}</p>` : "";
      const safeUrl = project.private && state.hidePrivateLinks ? "" : normaliseUrl(project.url);
      const link = safeUrl
        ? `<p><strong>Link:</strong> <a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayUrl(safeUrl))}</a></p>`
        : "";
      const privateFlag = project.private
        ? '<span class="private-flag screen-only" title="Private on GitHub. The link won\'t open for recruiters.">Private repo</span>'
        : "";

      return `
        <article class="resume-project">
          <h3>${escapeHtml(project.name)} ${privateFlag}</h3>
          ${project.description ? `<p>${escapeHtml(project.description)}</p>` : ""}
          ${techStack}
          ${link}
        </article>
      `;
    })
    .join("");
}

let lastWarningHtml = null;

function renderPrivateWarnings() {
  const privateProjects = state.projects.filter((project) => project.selected && project.private);
  const count = privateProjects.length;
  const names = privateProjects.map((project) => `<strong>${escapeHtml(project.name)}</strong>`).join(", ");
  const html = count
    ? `
      <p class="private-warning-title">${ICONS.alert} ${plural(count, "private repository", "private repositories")} on your resume</p>
      <p>${names} ${count === 1 ? "is" : "are"} private on GitHub, so anyone who opens the link gets a 404 page. Make ${count === 1 ? "it" : "them"} public, or hide the link.</p>
      <label class="checkbox">
        <input type="checkbox" data-hide-private-links ${state.hidePrivateLinks ? "checked" : ""} />
        Hide links to private repositories on the resume
      </label>
    `
    : "";

  if (html === lastWarningHtml) {
    return;
  }
  lastWarningHtml = html;
  elements.privateWarnings.forEach((warning) => {
    warning.hidden = !count;
    warning.innerHTML = html;
  });
}

function updatePreview() {
  const name = elements.fullName.value.trim();
  elements.previewFullName.textContent = name || "Your Name";
  elements.previewFullName.classList.toggle("is-placeholder", !name);

  const headline = elements.headline.value.trim();
  elements.previewHeadline.textContent = headline;
  elements.previewHeadline.hidden = !headline;
  renderContactLine();

  const summary = elements.summary.value.trim();
  elements.previewSummary.textContent = summary;
  elements.previewSummarySection.hidden = !summary;

  elements.previewSkills.innerHTML = state.skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join("");
  elements.previewSkillsSection.hidden = !state.skills.length;

  const languages = normaliseList(elements.languages.value);
  elements.previewLanguages.textContent = languages.join(" · ");
  elements.previewLanguagesSection.hidden = !languages.length;

  renderEntryPreviews();
  renderProjectPreviews();
  renderPrivateWarnings();
  scheduleSave();
}

// ---------------------------------------------------------------------------
// Template and color
// ---------------------------------------------------------------------------

function applyTemplate(template) {
  state.template = TEMPLATES.includes(template) ? template : TEMPLATES[0];
  TEMPLATES.forEach((name) => elements.resumePreview.classList.toggle(`template-${name}`, name === state.template));
  elements.templatePicker.querySelector(`input[value="${state.template}"]`).checked = true;
}

function applyAccent(color) {
  state.accent = /^#[0-9a-f]{6}$/i.test(color) ? color.toLowerCase() : DEFAULT_ACCENT;
  elements.resumePreview.style.setProperty("--accent", state.accent);
  elements.resumePreview.style.setProperty("--accent-soft", `color-mix(in srgb, ${state.accent} 12%, white)`);

  let matchedSwatch = false;
  elements.colorPicker.querySelectorAll('input[name="accent"]').forEach((input) => {
    input.checked = input.value === state.accent;
    matchedSwatch ||= input.checked;
  });
  elements.customAccent.value = state.accent;
  elements.customAccent.closest("label").classList.toggle("is-active", !matchedSwatch);
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

function renderSkills() {
  elements.skillChips.innerHTML = state.skills
    .map(
      (skill, index) => `
        <li class="chip">
          ${escapeHtml(skill)}
          <button type="button" data-remove-skill="${index}" aria-label="Remove ${escapeHtml(skill)}">${ICONS.x}</button>
        </li>
      `,
    )
    .join("");
  elements.skillsCount.textContent = state.skills.length ? plural(state.skills.length, "skill") : "";
}

function addSkills(values) {
  const existing = new Set(state.skills.map((skill) => skill.toLowerCase()));
  values
    .map((value) => value.trim())
    .filter(Boolean)
    .forEach((skill) => {
      if (!existing.has(skill.toLowerCase())) {
        existing.add(skill.toLowerCase());
        state.skills.push(skill);
      }
    });
  renderSkills();
  updatePreview();
}

function removeSkill(index) {
  state.skills.splice(index, 1);
  renderSkills();
  updatePreview();
}

function commitSkillInput() {
  const pending = elements.skillInput.value;
  elements.skillInput.value = "";
  closeSkillAutocomplete();
  addSkills(normaliseList(pending).map(canonicalSkill));
}

// ---------------------------------------------------------------------------
// Skill autocomplete (catalog lives in skills.js)
// ---------------------------------------------------------------------------

const MAX_SKILL_SUGGESTIONS = 8;

const SKILL_INDEX = SKILL_CATALOG.map(([name, category, aliases = []], order) => ({
  name,
  category,
  order,
  lower: name.toLowerCase(),
  words: name.toLowerCase().split(/[\s./&+-]+/).filter(Boolean),
  aliases: aliases.map((alias) => alias.toLowerCase()),
}));

const skillAutocomplete = { items: [], active: -1, query: "" };

// Typed text that exactly matches a catalog skill or alias uses the catalog spelling ("js" -> "JavaScript").
function canonicalSkill(value) {
  const lower = value.trim().toLowerCase();
  const match = SKILL_INDEX.find((skill) => skill.lower === lower || skill.aliases.includes(lower));
  return match ? match.name : value.trim();
}

// Lower is better; -1 means no match.
function rankSkill(skill, query) {
  if (skill.lower === query) return 0;
  if (skill.aliases.includes(query)) return 1;
  if (skill.lower.startsWith(query)) return 2;
  if (skill.aliases.some((alias) => alias.startsWith(query))) return 3;
  if (skill.words.some((word) => word.startsWith(query))) return 4;
  if (skill.lower.includes(query)) return 5;
  return -1;
}

function highlightMatch(name, query) {
  const index = name.toLowerCase().indexOf(query);
  if (!query || index < 0) {
    return escapeHtml(name);
  }
  return (
    escapeHtml(name.slice(0, index)) +
    `<mark>${escapeHtml(name.slice(index, index + query.length))}</mark>` +
    escapeHtml(name.slice(index + query.length))
  );
}

function updateSkillAutocomplete() {
  const query = elements.skillInput.value.trim().toLowerCase();
  const existing = new Set(state.skills.map((skill) => skill.toLowerCase()));

  skillAutocomplete.query = query;
  skillAutocomplete.active = -1;
  skillAutocomplete.items = query
    ? SKILL_INDEX.filter((skill) => !existing.has(skill.lower))
        .map((skill) => ({ skill, rank: rankSkill(skill, query) }))
        .filter(({ rank }) => rank >= 0)
        .sort((a, b) => a.rank - b.rank || a.skill.order - b.skill.order)
        .slice(0, MAX_SKILL_SUGGESTIONS)
        .map(({ skill }) => skill)
    : [];
  renderSkillAutocomplete();
}

function renderSkillAutocomplete() {
  const { items, active, query } = skillAutocomplete;
  const open = items.length > 0;

  elements.skillSuggestList.hidden = !open;
  elements.skillInput.setAttribute("aria-expanded", String(open));
  if (active >= 0) {
    elements.skillInput.setAttribute("aria-activedescendant", `skill-option-${active}`);
  } else {
    elements.skillInput.removeAttribute("aria-activedescendant");
  }

  elements.skillSuggestList.innerHTML = items
    .map(
      (skill, index) => `
        <li id="skill-option-${index}" role="option" data-index="${index}" aria-selected="${index === active}" class="${index === active ? "is-active" : ""}">
          <span class="suggest-name">${highlightMatch(skill.name, query)}</span>
          <span class="suggest-category">${escapeHtml(skill.category)}</span>
        </li>
      `,
    )
    .join("");
}

function closeSkillAutocomplete() {
  skillAutocomplete.items = [];
  skillAutocomplete.active = -1;
  renderSkillAutocomplete();
}

function moveSkillSuggestion(step) {
  const count = skillAutocomplete.items.length;
  if (!count) return;
  const { active } = skillAutocomplete;
  skillAutocomplete.active = step > 0 ? (active + 1) % count : active <= 0 ? count - 1 : active - 1;
  renderSkillAutocomplete();
}

function chooseSkillSuggestion(index) {
  const skill = skillAutocomplete.items[index];
  if (!skill) return;
  elements.skillInput.value = "";
  closeSkillAutocomplete();
  addSkills([skill.name]);
}

function skillDisplayName(raw, isLanguage) {
  const known = SKILL_NAMES[raw.toLowerCase()];
  if (known || isLanguage) {
    return { name: known || raw, known: true };
  }
  const name = raw
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return { name, known: false };
}

function collectGithubSkills() {
  const existing = new Set(state.skills.map((skill) => skill.toLowerCase()));
  const found = new Map();

  const add = (raw, isLanguage) => {
    if (!raw) {
      return;
    }
    const { name, known } = skillDisplayName(raw, isLanguage);
    const key = name.toLowerCase();
    if (existing.has(key)) {
      return;
    }
    const entry = found.get(key) || { name, known, count: 0 };
    entry.known ||= known;
    entry.count += 1;
    found.set(key, entry);
  };

  state.projects
    .filter((project) => project.source === "github")
    .forEach((project) => {
      add(project.language, true);
      (project.topics || []).forEach((topic) => add(topic, false));
    });

  return [...found.values()].sort((a, b) => b.known - a.known || b.count - a.count || a.name.localeCompare(b.name));
}

function filteredSkillSuggestions() {
  const query = elements.skillSearch.value.trim().toLowerCase();
  return state.skillImport.suggestions.filter((skill) => !query || skill.name.toLowerCase().includes(query));
}

function renderSkillSuggestions() {
  const { suggestions, selected } = state.skillImport;
  const filtered = filteredSkillSuggestions();
  const { items, page, totalPages } = paginate(filtered, state.skillImport.page, SKILLS_PER_PAGE);
  state.skillImport.page = page;

  elements.skillSuggestions.innerHTML = items.length
    ? items
        .map(
          (skill) => `
            <label class="skill-chip">
              <input type="checkbox" value="${escapeHtml(skill.name)}" ${selected.has(skill.name) ? "checked" : ""} />
              ${escapeHtml(skill.name)}
              <span class="skill-count" title="Used in ${plural(skill.count, "repository", "repositories")}">${skill.count}</span>
            </label>
          `,
        )
        .join("")
    : `<p class="empty-state">${suggestions.length ? "No skills match that filter." : "Nothing new to import."}</p>`;

  renderPager(elements.skillPager, page, totalPages);

  const allFilteredSelected = filtered.length && filtered.every((skill) => selected.has(skill.name));
  elements.toggleAllSkills.textContent = allFilteredSelected ? "Clear all" : "Select all";
  elements.toggleAllSkills.hidden = !filtered.length;
  elements.addSkillsButton.disabled = !selected.size;
  elements.addSkillsButton.textContent = selected.size ? `Add ${plural(selected.size, "skill")}` : "Add selected";
}

async function openSkillImport() {
  state.skillImport = { suggestions: [], selected: new Set(), page: 1 };
  elements.skillSearch.value = "";
  elements.skillImportStatus.textContent = "Reading languages and topics from your repositories…";
  elements.skillSuggestions.innerHTML = '<p class="empty-state">Loading…</p>';
  elements.skillPager.hidden = true;
  elements.addSkillsButton.disabled = true;
  elements.toggleAllSkills.hidden = true;
  elements.skillDialog.showModal();

  await loadGithubProjects();

  const suggestions = collectGithubSkills();
  state.skillImport.suggestions = suggestions;
  state.skillImport.selected = new Set(suggestions.filter((skill) => skill.known).map((skill) => skill.name));

  const githubCount = state.projects.filter((project) => project.source === "github").length;
  elements.skillImportStatus.textContent = !githubCount
    ? "No repositories loaded. Add your GitHub username in Basics or connect a token."
    : suggestions.length
      ? `${plural(suggestions.length, "skill")} found across ${plural(githubCount, "repository", "repositories")} that you haven't listed yet. Languages and recognised tech are pre-selected. The number shows how many repos use each one.`
      : "Every language and topic in your repositories is already in your skills.";
  renderSkillSuggestions();
}

function addImportedSkills() {
  const { suggestions, selected } = state.skillImport;
  addSkills(suggestions.filter((skill) => selected.has(skill.name)).map((skill) => skill.name));
  elements.skillDialog.close();
}

// ---------------------------------------------------------------------------
// Entry sections (experience, education, ...)
// ---------------------------------------------------------------------------

function entryCardTitle(section, entry) {
  const title = ENTRY_SECTIONS[section].titleKeys
    .map((key) => (entry[key] || "").trim())
    .filter(Boolean)
    .join(" · ");
  return title || `New ${ENTRY_SECTIONS[section].noun}`;
}

function renderEntryEditor(section) {
  const config = ENTRY_SECTIONS[section];
  const list = document.querySelector(`.entry-section[data-section="${section}"] .entry-list`);
  const entries = state.entries[section];

  if (!entries.length) {
    list.innerHTML = `<p class="empty-state">No ${config.noun} added yet.</p>`;
    return;
  }

  list.innerHTML = entries
    .map((entry, index) => {
      const fields = config.fields
        .map((field) => {
          const id = `${entry.id}-${field.key}`;
          const value = escapeHtml(entry[field.key] ?? "");
          const control =
            field.type === "textarea"
              ? `<textarea id="${id}" data-field="${field.key}" rows="3" placeholder="${escapeHtml(field.placeholder)}">${value}</textarea>`
              : `<input id="${id}" data-field="${field.key}" type="${field.type || "text"}" value="${value}" placeholder="${escapeHtml(field.placeholder)}" />`;
          return `<label class="${field.type === "textarea" ? "wide" : ""}" for="${id}">${escapeHtml(field.label)}${control}</label>`;
        })
        .join("");

      return `
        <article class="entry-card${entry.include ? "" : " is-excluded"}${entry.collapsed ? " is-collapsed" : ""}" data-id="${entry.id}">
          <div class="entry-card-header">
            <input type="checkbox" data-field="include" ${entry.include ? "checked" : ""} title="Show on resume" aria-label="Show on resume" />
            <button type="button" class="entry-card-title" data-action="toggle" aria-expanded="${!entry.collapsed}"><span class="entry-card-title-text">${escapeHtml(entryCardTitle(section, entry))}</span></button>
            <span class="entry-grammar" hidden></span>
            <div class="entry-actions">
              <button type="button" class="icon-button" data-action="up" aria-label="Move up" ${index === 0 ? "disabled" : ""}>${ICONS.up}</button>
              <button type="button" class="icon-button" data-action="down" aria-label="Move down" ${index === entries.length - 1 ? "disabled" : ""}>${ICONS.down}</button>
              <button type="button" class="icon-button danger" data-action="remove" aria-label="Remove entry">${ICONS.x}</button>
            </div>
          </div>
          <div class="form-grid entry-fields">${fields}</div>
        </article>
      `;
    })
    .join("");

  list.querySelectorAll("textarea").forEach(renderGrammarHints);
}

function setupEntrySection(section) {
  const container = document.querySelector(`.entry-section[data-section="${section}"]`);

  container.querySelector(".add-entry").addEventListener("click", () => {
    const entry = createEntry();
    state.entries[section].forEach((item) => {
      item.collapsed = entryHasContent(section, item);
    });
    state.entries[section].push(entry);
    renderEntryEditor(section);
    updatePreview();
    container.querySelector(`[data-id="${entry.id}"] .entry-fields input`)?.focus();
  });

  container.addEventListener("input", (event) => {
    const field = event.target.dataset.field;
    const card = event.target.closest(".entry-card");
    const entry = card && state.entries[section].find((item) => item.id === card.dataset.id);
    if (!field || !entry) {
      return;
    }

    if (field === "include") {
      entry.include = event.target.checked;
      card.classList.toggle("is-excluded", !entry.include);
    } else {
      entry[field] = event.target.value;
      card.querySelector(".entry-card-title-text").textContent = entryCardTitle(section, entry);
    }
    updatePreview();
  });

  container.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    const card = button?.closest(".entry-card");
    if (!card) {
      return;
    }

    const entries = state.entries[section];
    const index = entries.findIndex((item) => item.id === card.dataset.id);
    const action = button.dataset.action;

    if (action === "toggle") {
      const entry = entries[index];
      entry.collapsed = !entry.collapsed;
      card.classList.toggle("is-collapsed", entry.collapsed);
      button.setAttribute("aria-expanded", String(!entry.collapsed));
      return;
    }

    if (action === "remove") {
      if (entryHasContent(section, entries[index]) && !window.confirm(`Remove this ${ENTRY_SECTIONS[section].noun} entry?`)) {
        return;
      }
      entries.splice(index, 1);
    } else {
      const target = action === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= entries.length) {
        return;
      }
      [entries[index], entries[target]] = [entries[target], entries[index]];
    }

    renderEntryEditor(section);
    updatePreview();
  });
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

function renderSelectedProjects() {
  const selected = state.projects.filter((project) => project.selected);
  elements.projectsCount.textContent = selected.length ? `${selected.length} on resume` : "";

  elements.selectedProjects.innerHTML = selected.length
    ? `<ul class="chip-list">${selected
        .map(
          (project) => `
            <li class="chip${project.private ? " chip-private" : ""}">
              ${project.private ? `<span class="chip-icon" title="Private repository">${ICONS.lock}</span>` : ""}
              ${escapeHtml(project.name)}
              <button type="button" data-deselect-project="${escapeHtml(project.id)}" aria-label="Remove ${escapeHtml(project.name)} from resume">${ICONS.x}</button>
            </li>
          `,
        )
        .join("")}</ul>`
    : '<p class="empty-state">No projects on your resume yet. Pick from your GitHub repositories or add a custom one.</p>';
}

function projectMatches(project, query, filter) {
  if (filter === "selected" && !project.selected) return false;
  if (filter === "public" && (project.private || project.source !== "github")) return false;
  if (filter === "private" && !project.private) return false;
  if (filter === "manual" && project.source !== "manual") return false;
  if (!query) return true;
  return [project.name, project.description, project.tech].some((value) => String(value || "").toLowerCase().includes(query));
}

function renderProjectDialog() {
  const query = elements.projectSearch.value.trim().toLowerCase();
  const filter = elements.projectFilter.value;
  const filtered = state.projects.filter((project) => projectMatches(project, query, filter));
  const { items, page, totalPages } = paginate(filtered, state.projectDialog.page, PROJECTS_PER_PAGE);
  state.projectDialog.page = page;

  const selectedCount = state.projects.filter((project) => project.selected).length;
  elements.projectDialogSummary.textContent = `${selectedCount} selected · ${plural(state.projects.length, "project")} available`;

  if (!state.projects.length) {
    elements.projectList.innerHTML =
      '<p class="empty-state">No repositories loaded yet. Add your GitHub username in Basics, or connect a token to include private repos.</p>';
  } else if (!items.length) {
    elements.projectList.innerHTML = '<p class="empty-state">No projects match your search.</p>';
  } else {
    elements.projectList.innerHTML = items
      .map(
        (project) => `
          <div class="project-option${project.selected ? " is-selected" : ""}">
            <label class="project-option-main">
              <input type="checkbox" data-project-id="${escapeHtml(project.id)}" ${project.selected ? "checked" : ""} />
              <span class="project-option-body">
                <span class="project-option-title">
                  ${escapeHtml(project.name)}
                  ${project.private ? `<span class="tag tag-private">${ICONS.lock} Private</span>` : ""}
                  ${project.source === "manual" ? '<span class="tag">Custom</span>' : ""}
                </span>
                <span class="project-option-desc">${escapeHtml(project.description || "No description.")}</span>
                ${project.tech ? `<span class="project-meta">${escapeHtml(project.tech)}</span>` : ""}
              </span>
            </label>
            ${
              project.source === "manual"
                ? `<button type="button" class="icon-button danger" data-remove-project="${escapeHtml(project.id)}" aria-label="Delete ${escapeHtml(project.name)}">${ICONS.x}</button>`
                : ""
            }
          </div>
        `,
      )
      .join("");
  }

  renderPager(elements.projectPager, page, totalPages);
}

function renderProjects() {
  renderSelectedProjects();
  if (elements.projectDialog.open) {
    renderProjectDialog();
  }
  updatePreview();
}

function setProjectSelected(id, selected) {
  const project = state.projects.find((entry) => entry.id === id);
  if (project) {
    project.selected = selected;
    renderProjects();
  }
}

function mergeProjects(newProjects) {
  const previous = new Map(
    state.projects.filter((project) => project.source === "github").map((project) => [project.url, project]),
  );
  const fetchedUrls = new Set(newProjects.map((project) => project.url));
  // Keep selected repos that this load can't see (e.g. private ones without a token) so the resume doesn't lose them.
  const unseenSelected = [...previous.values()].filter((project) => project.selected && !fetchedUrls.has(project.url));

  state.projects = [
    ...newProjects.map((project) => ({
      ...project,
      selected: previous.get(project.url)?.selected ?? state.legacySelectedUrls.has(project.url),
    })),
    ...unseenSelected,
    ...state.projects.filter((project) => project.source === "manual"),
  ];
  renderProjects();
}

function addFutureProject(event) {
  event.preventDefault();

  const projectName = document.getElementById("futureProjectName").value.trim();
  if (!projectName) {
    return;
  }

  state.projects.push({
    id: `manual-${Date.now()}`,
    name: projectName,
    description: document.getElementById("futureProjectDescription").value.trim(),
    tech: document.getElementById("futureProjectTech").value.trim(),
    url: normaliseUrl(document.getElementById("futureProjectLink").value.trim()),
    private: false,
    selected: true,
    source: "manual",
  });

  elements.futureProjectForm.reset();
  elements.customProjectDialog.close();
  renderProjects();
}

// ---------------------------------------------------------------------------
// GitHub
// ---------------------------------------------------------------------------

function setGithubMode(mode) {
  state.github.mode = mode === "token" ? "token" : "public";
  elements.githubModeInputs.forEach((input) => {
    input.checked = input.value === state.github.mode;
  });
  elements.publicMode.hidden = state.github.mode !== "public";
  elements.tokenMode.hidden = state.github.mode !== "token";
  elements.disconnectTokenButton.hidden = !state.github.token;
}

async function githubFetch(url, token) {
  const headers = { Accept: "application/vnd.github+json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const error = new Error(`GitHub returned ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

function setGithubBusy(busy) {
  [elements.loadProjectsButton, elements.connectTokenButton, elements.importSkillsButton].forEach((button) => {
    button.disabled = busy;
  });
}

function loadGithubProjects() {
  // Share one in-flight request between callers (startup, skill import, buttons).
  state.github.loading ||= fetchGithubProjects().finally(() => {
    state.github.loading = null;
  });
  return state.github.loading;
}

async function fetchGithubProjects() {
  const token = state.github.mode === "token" ? state.github.token : "";
  const username = elements.githubUsername.value.trim();

  if (!token && !username) {
    elements.projectStatus.textContent =
      state.github.mode === "token"
        ? "Paste a token and press Connect to list your private repositories."
        : "Add your GitHub username in Basics to load your public repositories.";
    return;
  }

  setGithubBusy(true);
  elements.projectStatus.textContent = token
    ? "Loading repositories with your token…"
    : `Loading public repositories for @${username}…`;

  try {
    let login = username;
    let endpoint = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated`;

    if (token) {
      login = (await githubFetch("https://api.github.com/user", token)).login;
      endpoint = "https://api.github.com/user/repos?sort=updated&affiliation=owner,collaborator,organization_member";
      if (!username) {
        elements.githubUsername.value = login;
      }
    }

    const repositories = [];
    for (let page = 1; ; page += 1) {
      const pageRepositories = await githubFetch(`${endpoint}&per_page=100&page=${page}`, token);
      repositories.push(...pageRepositories);
      if (pageRepositories.length < 100) {
        break;
      }
    }

    const projects = repositories
      .filter((repository) => !repository.fork)
      .map((repository) => ({
        id: `github-${repository.id}`,
        name:
          repository.owner?.login && repository.owner.login.toLowerCase() !== login.toLowerCase()
            ? repository.full_name
            : repository.name,
        description: repository.description || "",
        tech: repository.language || "",
        language: repository.language || "",
        topics: Array.isArray(repository.topics) ? repository.topics : [],
        url: repository.html_url,
        private: Boolean(repository.private),
        selected: false,
        source: "github",
      }));

    mergeProjects(projects);
    const privateCount = projects.filter((project) => project.private).length;
    elements.projectStatus.textContent =
      `Loaded ${plural(projects.length, "repository", "repositories")}` +
      (token ? ` (${privateCount} private)` : "") +
      ` for @${login}.` +
      (state.github.mode === "token" && !token ? " Connect a token to include private ones." : "");
  } catch (error) {
    const hasGithubProjects = state.projects.some((project) => project.source === "github");
    if (token && error.status === 401) {
      elements.projectStatus.textContent = "GitHub rejected this token. Check it hasn't expired or been revoked.";
    } else if (!token && error.status === 404) {
      elements.projectStatus.textContent = `GitHub has no user called @${username}.`;
    } else if (error.status === 403) {
      elements.projectStatus.textContent = "GitHub refused the request (rate limit or missing permission). Try again later or connect a token.";
    } else if (!token && username.toLowerCase() === "syrthax" && !hasGithubProjects) {
      mergeProjects(bundledGithubProjects);
      elements.projectStatus.textContent = "GitHub is unreachable, so the bundled project list for @Syrthax is shown.";
    } else {
      elements.projectStatus.textContent = "Couldn't reach GitHub. Keeping the current project list.";
    }
  } finally {
    setGithubBusy(false);
  }
}

// Reads a key, moving data saved under the pre-rename (NiaCina) key across the first time.
function readStorage(key) {
  const current = localStorage.getItem(key);
  if (current !== null) {
    return current;
  }
  const legacy = localStorage.getItem(LEGACY_STORAGE_KEYS[key]);
  if (legacy !== null) {
    localStorage.setItem(key, legacy);
    localStorage.removeItem(LEGACY_STORAGE_KEYS[key]);
  }
  return legacy;
}

function readStoredToken() {
  try {
    return readStorage(TOKEN_KEY) || "";
  } catch (error) {
    return "";
  }
}

function storeToken() {
  try {
    if (elements.rememberToken.checked && state.github.token) {
      localStorage.setItem(TOKEN_KEY, state.github.token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch (error) {
    // Storage blocked: the token simply lasts for this page session.
  }
}

function connectToken() {
  const token = elements.githubToken.value.trim();
  if (!token) {
    elements.projectStatus.textContent = "Paste a token first.";
    elements.githubToken.focus();
    return;
  }
  state.github.token = token;
  storeToken();
  setGithubMode("token");
  scheduleSave();
  loadGithubProjects();
}

function disconnectToken() {
  state.github.token = "";
  elements.githubToken.value = "";
  storeToken();
  setGithubMode("public");
  scheduleSave();
  loadGithubProjects();
}

// ---------------------------------------------------------------------------
// Persistence: this browser's localStorage, plus JSON export/import for backups.
// The GitHub token is stored separately and never exported.
// ---------------------------------------------------------------------------

function snapshot() {
  const legacyUnresolved = [...state.legacySelectedUrls].filter(
    (url) => !state.projects.some((project) => project.url === url),
  );

  return {
    version: 2,
    template: state.template,
    accent: state.accent,
    hidePrivateLinks: state.hidePrivateLinks,
    githubMode: state.github.mode,
    profile: {
      ...Object.fromEntries(PROFILE_FIELDS.map((field) => [field, elements[field].value])),
      skills: state.skills.join(", "),
    },
    entries: Object.fromEntries(
      Object.entries(state.entries).map(([section, entries]) => [
        section,
        entries.map(({ collapsed, ...entry }) => entry),
      ]),
    ),
    manualProjects: state.projects.filter((project) => project.source === "manual"),
    selectedGithubProjects: state.projects
      .filter((project) => project.source === "github" && project.selected)
      .map(({ id, name, description, tech, language, topics, url, private: isPrivate }) => ({
        id,
        name,
        description,
        tech,
        language,
        topics,
        url,
        private: isPrivate,
      })),
    selectedGithubUrls: legacyUnresolved,
  };
}

function applySnapshot(data, { dropLegacyDefaults = false } = {}) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid resume data");
  }

  const profile = data.profile && typeof data.profile === "object" ? data.profile : {};
  const legacyValue = (field) =>
    dropLegacyDefaults && profile[field] === LEGACY_DEFAULTS[field] ? "" : profile[field];

  if (typeof data.template === "string") state.template = data.template;
  if (typeof data.accent === "string") {
    state.accent = dropLegacyDefaults && data.accent === LEGACY_DEFAULT_ACCENT ? DEFAULT_ACCENT : data.accent;
  }
  if (typeof data.hidePrivateLinks === "boolean") state.hidePrivateLinks = data.hidePrivateLinks;
  if (typeof data.githubMode === "string") state.github.mode = data.githubMode;

  PROFILE_FIELDS.forEach((field) => {
    if (typeof profile[field] === "string") {
      elements[field].value = legacyValue(field);
    }
  });
  if (typeof profile.skills === "string") {
    state.skills = normaliseList(legacyValue("skills"));
  }

  Object.keys(ENTRY_SECTIONS).forEach((section) => {
    const saved = data.entries?.[section];
    if (!Array.isArray(saved)) {
      return;
    }
    const isLegacySample = (dropLegacyDefaults && LEGACY_SAMPLE_ENTRIES[section]) || (() => false);
    const entries = saved
      .filter((entry) => entry && typeof entry === "object" && !isLegacySample(entry))
      .map((entry) => createEntry({ ...entry, include: entry.include !== false }));
    entries.forEach((entry) => {
      entry.collapsed = entryHasContent(section, entry);
    });
    // Keep an empty starter card for the main sections so the fields are visible.
    state.entries[section] = entries.length || !["experience", "education"].includes(section) ? entries : [createEntry()];
  });

  const toProject = (project, index, source) => ({
    id: typeof project.id === "string" ? project.id : `${source}-${Date.now()}-${index}`,
    name: project.name,
    description: String(project.description ?? ""),
    tech: String(project.tech ?? ""),
    language: String(project.language ?? project.tech ?? ""),
    topics: Array.isArray(project.topics) ? project.topics : [],
    url: normaliseUrl(project.url),
    private: Boolean(project.private),
    selected: source === "github" ? true : project.selected !== false,
    source,
  });
  const valid = (list) => (Array.isArray(list) ? list.filter((project) => project && typeof project.name === "string") : []);

  state.legacySelectedUrls = new Set(Array.isArray(data.selectedGithubUrls) ? data.selectedGithubUrls : []);
  state.projects = [
    ...valid(data.selectedGithubProjects).map((project, index) => toProject(project, index, "github")),
    ...valid(data.manualProjects).map((project, index) => toProject(project, index, "manual")),
  ];
}

let saveTimer;

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot()));
      elements.saveStatus.textContent = "Saved";
    } catch (error) {
      elements.saveStatus.textContent = "Autosave unavailable. Use Export to keep a copy.";
    }
  }, 300);
}

function loadSaved() {
  try {
    const raw = readStorage(STORAGE_KEY);
    if (raw) {
      applySnapshot(JSON.parse(raw), { dropLegacyDefaults: true });
    }
  } catch (error) {
    elements.saveStatus.textContent = "Couldn't restore saved data, starting fresh.";
  }

  state.github.token = readStoredToken();
  elements.rememberToken.checked = Boolean(state.github.token);
  elements.githubToken.value = state.github.token;
}

function renderAll() {
  applyTemplate(state.template);
  applyAccent(state.accent);
  setGithubMode(state.github.mode);
  lastWarningHtml = null;
  renderSkills();
  Object.keys(ENTRY_SECTIONS).forEach(renderEntryEditor);
  renderProjects();
}

function exportJson() {
  const blob = new Blob([JSON.stringify(snapshot(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const slug = (elements.fullName.value.trim() || "resume").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  link.href = url;
  link.download = `${slug}-hiresume.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function importJson(event) {
  const [file] = event.target.files;
  event.target.value = "";
  if (!file) {
    return;
  }

  try {
    applySnapshot(JSON.parse(await file.text()));
    renderAll();
    elements.saveStatus.textContent = `Imported ${file.name}`;
    loadGithubProjects();
  } catch (error) {
    elements.saveStatus.textContent = `Couldn't import ${file.name}: not a HiResume file.`;
  }
}

function resetAll() {
  if (!window.confirm("Clear all saved resume data (and any remembered GitHub token) from this browser?")) {
    return;
  }
  clearTimeout(saveTimer);
  try {
    [STORAGE_KEY, TOKEN_KEY, ...Object.values(LEGACY_STORAGE_KEYS)].forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    // Nothing stored or storage blocked; the reload still restores defaults.
  }
  window.location.reload();
}

// ---------------------------------------------------------------------------
// Grammar check
//
// Harper (https://writewithharper.com) runs entirely in the browser, in a web
// worker, so resume text never leaves the device. The engine (~8 MB, cached by
// the browser) loads lazily from jsDelivr the first time a text area is used.
//
// Every text area in the editor is checked line by line, since bullet lists are
// one item per line and would otherwise read as a single run-on sentence.
// ---------------------------------------------------------------------------

const HARPER_URL = "https://cdn.jsdelivr.net/npm/harper.js@2.10.0/dist/";
const GRAMMAR_DELAY_MS = 600;
const SUGGESTION_KIND = { replace: 0, remove: 1, insertAfter: 2 };

const grammar = {
  linter: null,
  loading: null,
  knownWords: new Set(),
  // field id -> { text, issues: [{ lint, lineText, lineStart }] }
  results: new Map(),
  timers: new Map(),
};

function isGrammarField(element) {
  return element instanceof HTMLTextAreaElement && Boolean(element.id) && Boolean(element.closest(".editor"));
}

function loadGrammarEngine() {
  grammar.loading ||= (async () => {
    const [{ WorkerLinter }, { binary }] = await Promise.all([
      import(`${HARPER_URL}index.js`),
      import(`${HARPER_URL}binary.js`),
    ]);
    const linter = new WorkerLinter({ binary });
    await linter.setup();
    grammar.linter = linter;
    return linter;
  })().catch((error) => {
    // Offline or CDN blocked: the editor keeps working without suggestions.
    console.warn("Grammar check unavailable:", error);
    return null;
  });
  return grammar.loading;
}

// Names, companies, projects and tech terms from the resume, so they aren't flagged as typos.
function resumeVocabulary() {
  const words = new Set();
  const add = (text) =>
    String(text || "")
      .split(/[^\p{L}\p{N}+#'.-]+/u)
      .map((word) => word.replace(/^[.'-]+|[.'-]+$/g, ""))
      .filter((word) => word.length > 1)
      .forEach((word) => words.add(word));

  SKILL_CATALOG.forEach(([name]) => add(name));
  state.skills.forEach(add);
  ["fullName", "headline", "location", "githubUsername", "languages"].forEach((field) => add(elements[field].value));
  Object.values(state.entries)
    .flat()
    .forEach((entry) => ["role", "company", "school", "degree", "issuer", "name", "location", "title"].forEach((key) => add(entry[key])));
  state.projects.forEach((project) => {
    add(project.name);
    add(project.tech);
  });
  return [...words];
}

async function teachVocabulary(linter) {
  const fresh = resumeVocabulary().filter((word) => !grammar.knownWords.has(word));
  if (fresh.length) {
    fresh.forEach((word) => grammar.knownWords.add(word));
    await linter.importWords(fresh);
  }
}

// Spelling hints on capitalised words are almost always proper nouns or acronyms on a resume.
function isUsefulLint(lint) {
  return !(lint.lint_kind() === "Spelling" && /\p{Lu}/u.test(lint.get_problem_text()));
}

async function checkGrammar(fieldId) {
  const linter = await loadGrammarEngine();
  const field = document.getElementById(fieldId);
  if (!linter || !field) return;

  const text = field.value;
  const issues = [];
  if (text.trim()) {
    await teachVocabulary(linter);
    let lineStart = 0;
    for (const lineText of text.split("\n")) {
      if (lineText.trim()) {
        const lints = await linter.lint(lineText, { language: "plaintext" });
        lints.filter(isUsefulLint).forEach((lint) => issues.push({ lint, lineText, lineStart }));
      }
      // Harper spans count Unicode code points, not UTF-16 units.
      lineStart += Array.from(lineText).length + 1;
    }
  }

  // The user kept typing while this ran; the newer check will render.
  if (document.getElementById(fieldId)?.value !== text) return;
  grammar.results.set(fieldId, { text, issues });
  renderGrammarHints(document.getElementById(fieldId));
}

function scheduleGrammarCheck(fieldId) {
  clearTimeout(grammar.timers.get(fieldId));
  grammar.timers.set(fieldId, setTimeout(() => checkGrammar(fieldId), GRAMMAR_DELAY_MS));
}

function grammarContext(text, start, end) {
  const chars = Array.from(text);
  const before = chars.slice(Math.max(0, start - 28), start).join("");
  const problem = chars.slice(start, end).join("");
  const after = chars.slice(end, end + 28).join("");
  const shown = problem.trim() ? escapeHtml(problem) : "␣".repeat(Math.max(1, problem.length));
  return (
    (start > 28 ? "…" : "") +
    escapeHtml(before) +
    `<mark class="grammar-problem">${shown}</mark>` +
    escapeHtml(after) +
    (end + 28 < chars.length ? "…" : "")
  );
}

function suggestionLabel(suggestion, problem) {
  const replacement = suggestion.get_replacement_text();
  if (suggestion.kind() === SUGGESTION_KIND.remove || !replacement.trim()) {
    return problem.trim() ? `Remove “${problem.trim()}”` : "Remove space";
  }
  if (suggestion.kind() === SUGGESTION_KIND.insertAfter) {
    return `Add “${replacement}”`;
  }
  return replacement;
}

function renderGrammarHints(field) {
  if (!isGrammarField(field)) return;
  const result = grammar.results.get(field.id);
  const issues = result && result.text === field.value ? result.issues : [];
  let box = document.getElementById(`grammar-${field.id}`);

  if (!issues.length) {
    box?.remove();
  } else {
    if (!box) {
      box = document.createElement("div");
      box.id = `grammar-${field.id}`;
      box.className = "grammar-hints";
      box.dataset.field = field.id;
      box.setAttribute("aria-live", "polite");
      (field.closest("label") || field).after(box);
    }
    box.classList.remove("is-stale");
    box.innerHTML =
      `<p class="grammar-title">${plural(issues.length, "writing suggestion")}</p>` +
      issues
        .map(({ lint, lineText }, index) => {
          const { start, end } = lint.span();
          const problem = lint.get_problem_text();
          const fixes = lint
            .suggestions()
            .slice(0, 3)
            .map(
              (suggestion, suggestionIndex) =>
                `<button type="button" class="grammar-fix" data-issue="${index}" data-suggestion="${suggestionIndex}">${escapeHtml(suggestionLabel(suggestion, problem))}</button>`,
            )
            .join("");
          const message = escapeHtml(lint.message()).replace(/`([^`]+)`/g, "<code>$1</code>");
          return `
            <div class="grammar-issue">
              <p class="grammar-context">${grammarContext(lineText, start, end)}</p>
              <p class="grammar-message">${message}</p>
              <div class="grammar-actions">
                ${fixes}
                <button type="button" class="grammar-ignore" data-issue="${index}">Ignore</button>
              </div>
            </div>
          `;
        })
        .join("");
  }

  const card = field.closest(".entry-card");
  if (card) {
    const total = [...card.querySelectorAll("textarea")].reduce((sum, textarea) => {
      const cardResult = grammar.results.get(textarea.id);
      return sum + (cardResult && cardResult.text === textarea.value ? cardResult.issues.length : 0);
    }, 0);
    const badge = card.querySelector(".entry-grammar");
    badge.hidden = !total;
    badge.textContent = total ? plural(total, "suggestion") : "";
  }
}

function applyGrammarFix(fieldId, issueIndex, suggestionIndex) {
  const field = document.getElementById(fieldId);
  const result = grammar.results.get(fieldId);
  const issue = result?.issues[issueIndex];
  if (!field || !issue || field.value !== result.text) {
    scheduleGrammarCheck(fieldId);
    return;
  }

  const suggestion = issue.lint.suggestions()[suggestionIndex];
  const { start, end } = issue.lint.span();
  const from = issue.lineStart + start;
  const to = issue.lineStart + end;
  const chars = Array.from(field.value);
  const replacement = Array.from(suggestion.get_replacement_text());

  if (suggestion.kind() === SUGGESTION_KIND.remove) {
    chars.splice(from, to - from);
  } else if (suggestion.kind() === SUGGESTION_KIND.insertAfter) {
    chars.splice(to, 0, ...replacement);
  } else {
    chars.splice(from, to - from, ...replacement);
  }

  field.value = chars.join("");
  // Runs the normal input handling: state, preview, autosave and a fresh check.
  field.dispatchEvent(new Event("input", { bubbles: true }));
  clearTimeout(grammar.timers.get(fieldId));
  checkGrammar(fieldId);
}

async function ignoreGrammarIssue(fieldId, issueIndex) {
  const issue = grammar.results.get(fieldId)?.issues[issueIndex];
  if (!issue || !grammar.linter) return;
  await grammar.linter.ignoreLint(issue.lineText, issue.lint);
  checkGrammar(fieldId);
}

function setupGrammarCheck() {
  const editor = document.querySelector(".editor");

  editor.addEventListener("input", (event) => {
    if (!isGrammarField(event.target)) return;
    document.getElementById(`grammar-${event.target.id}`)?.classList.add("is-stale");
    scheduleGrammarCheck(event.target.id);
  });
  // Start downloading the engine as soon as someone heads for a text area.
  editor.addEventListener("focusin", (event) => {
    if (isGrammarField(event.target)) loadGrammarEngine();
  });
  editor.addEventListener("click", (event) => {
    const button = event.target.closest(".grammar-fix, .grammar-ignore");
    const fieldId = button?.closest(".grammar-hints")?.dataset.field;
    if (!fieldId) return;
    const issueIndex = Number(button.dataset.issue);
    if (button.classList.contains("grammar-fix")) {
      applyGrammarFix(fieldId, issueIndex, Number(button.dataset.suggestion));
    } else {
      ignoreGrammarIssue(fieldId, issueIndex);
    }
  });

  // Returning users already have text: check it once the page has settled.
  const filled = [...editor.querySelectorAll("textarea")].filter((textarea) => textarea.value.trim());
  if (filled.length) {
    setTimeout(() => filled.forEach((textarea) => checkGrammar(textarea.id)), 1500);
  }
}

// ---------------------------------------------------------------------------
// Elastic overscroll: pulling past the top or bottom stretches the content,
// then a spring pulls it back. Native bounce is turned off in CSS so every
// browser behaves the same.
//
// The stretch is a spring simulated every animation frame. Wheel input pushes
// against the spring, so the moment input stops (including the trailing
// momentum events a trackpad sends) the content settles back smoothly
// instead of waiting on a timer. Touch drags follow the finger directly.
// ---------------------------------------------------------------------------

const OVERSCROLL_MAX = 120;
const SPRING_STIFFNESS = 380;
// Critically damped: returns as fast as possible without wobbling.
const SPRING_DAMPING = 2 * Math.sqrt(SPRING_STIFFNESS);

// iOS-style rubber band: resistance grows smoothly as the pull gets longer.
function rubberBand(distance) {
  return OVERSCROLL_MAX * (1 - 1 / ((distance * 0.55) / OVERSCROLL_MAX + 1));
}

function setupElasticOverscroll({ target, eventSource, getBounds, ignore = () => false }) {
  let offset = 0;
  let velocity = 0;
  let frame = 0;
  let lastTime = 0;
  let touch = null;

  const render = () => {
    if (!offset) {
      target.style.transform = "";
      target.style.willChange = "";
      return;
    }
    target.style.willChange = "transform";
    target.style.transformOrigin = offset > 0 ? "50% 0" : "50% 100%";
    target.style.transform = `translateY(${(offset * 0.4).toFixed(2)}px) scaleY(${(1 + Math.abs(offset) / 1000).toFixed(4)})`;
  };

  const step = (time) => {
    const dt = Math.min(0.032, (time - lastTime) / 1000) || 1 / 60;
    lastTime = time;

    if (!touch?.pulling) {
      velocity += (-SPRING_STIFFNESS * offset - SPRING_DAMPING * velocity) * dt;
      offset += velocity * dt;
      if (Math.abs(offset) < 0.1 && Math.abs(velocity) < 1) {
        offset = 0;
        velocity = 0;
      }
    }

    render();
    frame = offset || touch?.pulling ? requestAnimationFrame(step) : 0;
  };

  const animate = () => {
    if (!frame) {
      lastTime = performance.now();
      frame = requestAnimationFrame(step);
    }
  };

  const pushingPastEdge = (delta) => {
    const { atTop, atBottom } = getBounds();
    return (delta < 0 && atTop) || (delta > 0 && atBottom);
  };

  eventSource.addEventListener(
    "wheel",
    (event) => {
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : 1);
      if (event.ctrlKey || ignore(event) || !pushingPastEdge(delta)) {
        return;
      }
      const resistance = (1 - Math.min(1, Math.abs(offset) / OVERSCROLL_MAX)) ** 2;
      offset = Math.max(-OVERSCROLL_MAX, Math.min(OVERSCROLL_MAX, offset - delta * 0.6 * resistance));
      velocity = 0;
      animate();
    },
    { passive: true },
  );

  eventSource.addEventListener(
    "touchstart",
    (event) => {
      touch = ignore(event) ? null : { lastY: event.touches[0].clientY, pulling: false, distance: 0 };
    },
    { passive: true },
  );

  eventSource.addEventListener(
    "touchmove",
    (event) => {
      if (!touch) return;
      const y = event.touches[0].clientY;
      const delta = touch.lastY - y;
      touch.lastY = y;

      if (!touch.pulling) {
        if (!pushingPastEdge(delta)) return;
        touch.pulling = true;
        touch.distance = 0;
      }

      // Distance pulled past the edge: positive past the top, negative past the bottom.
      touch.distance -= delta;
      if ((offset > 0 && touch.distance < 0) || (offset < 0 && touch.distance > 0)) {
        touch.distance = 0;
      }
      offset = Math.sign(touch.distance) * rubberBand(Math.abs(touch.distance));
      velocity = 0;
      animate();
    },
    { passive: true },
  );

  const endTouch = () => {
    touch = null;
    if (offset) animate();
  };
  eventSource.addEventListener("touchend", endTouch);
  eventSource.addEventListener("touchcancel", endTouch);
}

function setupOverscrollEffects() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const previewPane = document.querySelector(".preview-pane");
  const previewScrolls = () => getComputedStyle(previewPane).overflowY === "auto";
  const edge = (el) => ({
    atTop: el.scrollTop <= 0,
    atBottom: Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight,
  });

  setupElasticOverscroll({
    target: document.querySelector(".layout"),
    eventSource: window,
    getBounds: () => edge(document.scrollingElement),
    ignore: (event) =>
      Boolean(document.querySelector("dialog[open]")) ||
      (previewScrolls() && event.target instanceof Node && previewPane.contains(event.target)),
  });

  setupElasticOverscroll({
    target: previewPane.querySelector(".page"),
    eventSource: previewPane,
    getBounds: () => edge(previewPane),
    ignore: () => !previewScrolls(),
  });
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

PROFILE_FIELDS.forEach((field) => elements[field].addEventListener("input", updatePreview));

elements.skillInput.addEventListener("keydown", (event) => {
  if (event.isComposing) return;
  const { items, active } = skillAutocomplete;

  if ((event.key === "ArrowDown" || event.key === "ArrowUp") && items.length) {
    event.preventDefault();
    moveSkillSuggestion(event.key === "ArrowDown" ? 1 : -1);
  } else if (event.key === "Enter") {
    event.preventDefault();
    // A highlighted suggestion wins; otherwise add exactly what was typed.
    if (active >= 0) chooseSkillSuggestion(active);
    else commitSkillInput();
  } else if (event.key === "Tab" && active >= 0) {
    chooseSkillSuggestion(active);
  } else if (event.key === ",") {
    event.preventDefault();
    commitSkillInput();
  } else if (event.key === "Escape" && items.length) {
    event.preventDefault();
    closeSkillAutocomplete();
  } else if (event.key === "Backspace" && !elements.skillInput.value && state.skills.length) {
    removeSkill(state.skills.length - 1);
  }
});
elements.skillInput.addEventListener("input", () => {
  // Pasting "a, b, c" adds everything before the last comma straight away.
  const value = elements.skillInput.value;
  if (value.includes(",")) {
    const parts = value.split(",");
    elements.skillInput.value = parts.pop().trimStart();
    addSkills(parts.map(canonicalSkill));
  }
  updateSkillAutocomplete();
});
elements.skillInput.addEventListener("focus", updateSkillAutocomplete);
elements.skillInput.addEventListener("blur", commitSkillInput);
// mousedown (not click) so the input keeps focus and blur doesn't commit the half-typed text first.
elements.skillSuggestList.addEventListener("mousedown", (event) => {
  event.preventDefault();
  const option = event.target.closest("[data-index]");
  if (option) chooseSkillSuggestion(Number(option.dataset.index));
});
elements.skillSuggestList.addEventListener("mousemove", (event) => {
  const index = Number(event.target.closest("[data-index]")?.dataset.index ?? -1);
  if (index >= 0 && index !== skillAutocomplete.active) {
    skillAutocomplete.active = index;
    renderSkillAutocomplete();
  }
});
elements.skillEditor.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-skill]");
  if (removeButton) {
    removeSkill(Number(removeButton.dataset.removeSkill));
  } else if (event.target === elements.skillEditor || event.target === elements.skillChips) {
    elements.skillInput.focus();
  }
});

elements.importSkillsButton.addEventListener("click", openSkillImport);
elements.addSkillsButton.addEventListener("click", addImportedSkills);
elements.skillSearch.addEventListener("input", () => {
  state.skillImport.page = 1;
  renderSkillSuggestions();
});
elements.skillSuggestions.addEventListener("change", (event) => {
  const { selected } = state.skillImport;
  if (event.target.checked) {
    selected.add(event.target.value);
  } else {
    selected.delete(event.target.value);
  }
  renderSkillSuggestions();
});
elements.toggleAllSkills.addEventListener("click", () => {
  const { selected } = state.skillImport;
  const filtered = filteredSkillSuggestions();
  const selectAll = !filtered.every((skill) => selected.has(skill.name));
  filtered.forEach((skill) => (selectAll ? selected.add(skill.name) : selected.delete(skill.name)));
  renderSkillSuggestions();
});
elements.skillPager.addEventListener("click", (event) => {
  const page = event.target.closest("[data-page]")?.dataset.page;
  if (page) {
    state.skillImport.page = Number(page);
    renderSkillSuggestions();
  }
});

Object.keys(ENTRY_SECTIONS).forEach(setupEntrySection);

elements.openProjectsButton.addEventListener("click", () => {
  state.projectDialog.page = 1;
  elements.projectSearch.value = "";
  elements.projectFilter.value = "all";
  renderProjectDialog();
  elements.projectDialog.showModal();
});
elements.openCustomProjectButton.addEventListener("click", () => {
  elements.customProjectDialog.showModal();
  document.getElementById("futureProjectName").focus();
});
elements.projectSearch.addEventListener("input", () => {
  state.projectDialog.page = 1;
  renderProjectDialog();
});
elements.projectFilter.addEventListener("change", () => {
  state.projectDialog.page = 1;
  renderProjectDialog();
});
elements.projectList.addEventListener("change", (event) => {
  if (event.target.dataset.projectId) {
    setProjectSelected(event.target.dataset.projectId, event.target.checked);
  }
});
elements.projectList.addEventListener("click", (event) => {
  const id = event.target.closest("[data-remove-project]")?.dataset.removeProject;
  if (id) {
    state.projects = state.projects.filter((project) => project.id !== id);
    renderProjects();
  }
});
elements.projectPager.addEventListener("click", (event) => {
  const page = event.target.closest("[data-page]")?.dataset.page;
  if (page) {
    state.projectDialog.page = Number(page);
    renderProjectDialog();
  }
});
elements.selectedProjects.addEventListener("click", (event) => {
  const id = event.target.closest("[data-deselect-project]")?.dataset.deselectProject;
  if (id) {
    setProjectSelected(id, false);
  }
});
elements.futureProjectForm.addEventListener("submit", addFutureProject);

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-hide-private-links]")) {
    state.hidePrivateLinks = event.target.checked;
    lastWarningHtml = null;
    updatePreview();
  }
});

elements.githubModeInputs.forEach((input) =>
  input.addEventListener("change", () => {
    setGithubMode(input.value);
    scheduleSave();
    if (state.github.mode === "public" || state.github.token) {
      loadGithubProjects();
    } else {
      elements.projectStatus.textContent = "Paste a token and press Connect to list your private repositories.";
      elements.githubToken.focus();
    }
  }),
);
elements.loadProjectsButton.addEventListener("click", loadGithubProjects);
elements.connectTokenButton.addEventListener("click", connectToken);
elements.githubToken.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    connectToken();
  }
});
elements.rememberToken.addEventListener("change", storeToken);
elements.disconnectTokenButton.addEventListener("click", disconnectToken);

// Close dialogs from any [data-close] button or a click on the backdrop.
document.querySelectorAll("dialog.modal").forEach((dialog) =>
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest("[data-close]")) {
      dialog.close();
    }
  }),
);

elements.colorPicker.addEventListener("input", (event) => {
  applyAccent(event.target.value);
  scheduleSave();
});
elements.templatePicker.addEventListener("change", (event) => {
  applyTemplate(event.target.value);
  scheduleSave();
});

elements.exportButton.addEventListener("click", exportJson);
elements.importInput.addEventListener("change", importJson);
elements.resetButton.addEventListener("click", resetAll);
elements.printResumeButton.addEventListener("click", () => window.print());

loadSaved();
renderAll();
setupOverscrollEffects();
setupGrammarCheck();
loadGithubProjects();
