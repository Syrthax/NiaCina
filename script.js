const STORAGE_KEY = "niacina:resume:v1";

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
  "skills",
  "languages",
];

const elements = {
  ...Object.fromEntries(PROFILE_FIELDS.map((field) => [field, document.querySelector(`#${field}`)])),
  projectStatus: document.querySelector("#projectStatus"),
  projectChecklist: document.querySelector("#projectChecklist"),
  previewFullName: document.querySelector("#previewFullName"),
  previewHeadline: document.querySelector("#previewHeadline"),
  previewContact: document.querySelector("#previewContact"),
  previewSummary: document.querySelector("#previewSummary"),
  previewSummarySection: document.querySelector("#previewSummarySection"),
  previewSkills: document.querySelector("#previewSkills"),
  previewSkillsSection: document.querySelector("#previewSkillsSection"),
  previewLanguages: document.querySelector("#previewLanguages"),
  previewLanguagesSection: document.querySelector("#previewLanguagesSection"),
  previewProjects: document.querySelector("#previewProjects"),
  futureProjectForm: document.querySelector("#futureProjectForm"),
  loadProjectsButton: document.querySelector("#loadProjectsButton"),
  printResumeButton: document.querySelector("#printResumeButton"),
  exportButton: document.querySelector("#exportButton"),
  importInput: document.querySelector("#importInput"),
  resetButton: document.querySelector("#resetButton"),
  saveStatus: document.querySelector("#saveStatus"),
};

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
  description: description || "GitHub repository ready to be highlighted in your resume.",
  tech: tech || "Mixed",
  url,
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

const SAMPLE_ENTRIES = {
  experience: [
    {
      role: "Frontend Developer Intern",
      company: "Company Name",
      location: "Remote",
      start: "Jun 2024",
      end: "Aug 2024",
      highlights:
        "Shipped a feature that improved something measurable by a clear percentage\nCollaborated with designers and backend engineers to deliver on schedule",
    },
  ],
  education: [
    {
      school: "University Name",
      degree: "B.Tech, Computer Science",
      location: "City",
      score: "",
      start: "2022",
      end: "2026",
      details: "",
    },
  ],
  certifications: [],
  achievements: [],
};

const state = {
  projects: [...bundledGithubProjects],
  entries: Object.fromEntries(
    Object.keys(ENTRY_SECTIONS).map((section) => [section, SAMPLE_ENTRIES[section].map(createEntry)]),
  ),
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
  return value
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
    const container = document.querySelector(`#preview${key}`);
    const wrapper = document.querySelector(`#preview${key}Section`);
    const visible = state.entries[section].filter((entry) => entry.include && entryHasContent(section, entry));

    container.innerHTML = visible.map(config.render).join("");
    wrapper.hidden = !visible.length;
  });
}

function updatePreview() {
  elements.previewFullName.textContent = elements.fullName.value.trim() || "Your Name";
  elements.previewHeadline.textContent = elements.headline.value.trim();
  renderContactLine();

  const summary = elements.summary.value.trim();
  elements.previewSummary.textContent = summary;
  elements.previewSummarySection.hidden = !summary;

  const skills = normaliseList(elements.skills.value);
  elements.previewSkills.innerHTML = skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join("");
  elements.previewSkillsSection.hidden = !skills.length;

  const languages = normaliseList(elements.languages.value);
  elements.previewLanguages.textContent = languages.join(" · ");
  elements.previewLanguagesSection.hidden = !languages.length;

  renderEntryPreviews();

  const selectedProjects = state.projects.filter((project) => project.selected);
  const projectSection = elements.previewProjects.closest(".resume-section");
  projectSection.toggleAttribute("data-empty", !selectedProjects.length);

  if (!selectedProjects.length) {
    elements.previewProjects.innerHTML =
      '<p class="empty-state">Select GitHub projects or add future projects to display them in the resume preview.</p>';
  } else {
    elements.previewProjects.innerHTML = selectedProjects
      .map((project) => {
        const techStack = project.tech ? `<p><strong>Tech:</strong> ${escapeHtml(project.tech)}</p>` : "";
        const safeUrl = normaliseUrl(project.url);
        const link = safeUrl
          ? `<p><strong>Link:</strong> <a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayUrl(safeUrl))}</a></p>`
          : "";

        return `
          <article class="resume-project">
            <h3>${escapeHtml(project.name)}</h3>
            <p>${escapeHtml(project.description || "Project details coming soon.")}</p>
            ${techStack}
            ${link}
          </article>
        `;
      })
      .join("");
  }

  scheduleSave();
}

function entryCardTitle(section, entry) {
  const title = ENTRY_SECTIONS[section].titleKeys
    .map((key) => (entry[key] || "").trim())
    .filter(Boolean)
    .join(" — ");
  return title || `New ${ENTRY_SECTIONS[section].noun}`;
}

function renderEntryEditor(section) {
  const config = ENTRY_SECTIONS[section];
  const list = document.querySelector(`.entry-section[data-section="${section}"] .entry-list`);
  const entries = state.entries[section];

  if (!entries.length) {
    list.innerHTML = `<p class="empty-state">No ${config.noun} entries yet.</p>`;
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
        <article class="entry-card${entry.include ? "" : " is-excluded"}" data-id="${entry.id}">
          <div class="entry-card-header">
            <label class="include-toggle" title="Show this entry on the resume">
              <input type="checkbox" data-field="include" ${entry.include ? "checked" : ""} />
              <span class="entry-card-title">${escapeHtml(entryCardTitle(section, entry))}</span>
            </label>
            <div class="entry-actions">
              <button type="button" class="icon-button" data-action="up" aria-label="Move up" ${index === 0 ? "disabled" : ""}>↑</button>
              <button type="button" class="icon-button" data-action="down" aria-label="Move down" ${index === entries.length - 1 ? "disabled" : ""}>↓</button>
              <button type="button" class="icon-button danger" data-action="remove" aria-label="Remove entry">✕</button>
            </div>
          </div>
          <div class="form-grid entry-fields">${fields}</div>
        </article>
      `;
    })
    .join("");
}

function setupEntrySection(section) {
  const container = document.querySelector(`.entry-section[data-section="${section}"]`);

  container.querySelector(".add-entry").addEventListener("click", () => {
    const entry = createEntry();
    state.entries[section].push(entry);
    renderEntryEditor(section);
    updatePreview();
    container.querySelector(`[data-id="${entry.id}"] input:not([type='checkbox'])`)?.focus();
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
      card.querySelector(".entry-card-title").textContent = entryCardTitle(section, entry);
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

function renderProjectChecklist() {
  if (!state.projects.length) {
    elements.projectChecklist.innerHTML =
      '<p class="empty-state">No projects yet. Load a GitHub profile or add a future project below.</p>';
    updatePreview();
    return;
  }

  elements.projectChecklist.innerHTML = state.projects
    .map(
      (project) => `
        <div class="project-row">
          <label class="project-item" for="project-${project.id}">
            <input id="project-${project.id}" data-project-id="${project.id}" type="checkbox" ${project.selected ? "checked" : ""} />
            <span>
              <h3>${escapeHtml(project.name)}</h3>
              <p>${escapeHtml(project.description || "No description provided yet.")}</p>
              <span class="project-meta">${escapeHtml(project.tech || "Tech stack not listed")}${project.source === "manual" ? " · added manually" : ""}</span>
            </span>
          </label>
          ${
            project.source === "manual"
              ? `<button type="button" class="icon-button danger" data-remove-project="${project.id}" aria-label="Remove ${escapeHtml(project.name)}">✕</button>`
              : ""
          }
        </div>
      `,
    )
    .join("");

  updatePreview();
}

function mergeProjects(newProjects) {
  const existingGithubProjects = state.projects.filter((project) => project.source === "github");
  const manualProjects = state.projects.filter((project) => project.source === "manual");
  const selectedGithubProjects = new Map(existingGithubProjects.map((project) => [project.url, project.selected]));

  state.projects = [
    ...newProjects.map((project) => ({
      ...project,
      selected: selectedGithubProjects.get(project.url) ?? project.selected,
    })),
    ...manualProjects,
  ];
  renderProjectChecklist();
}

async function loadGithubProjects() {
  const username = elements.githubUsername.value.trim() || "Syrthax";
  elements.projectStatus.textContent = `Loading projects from @${username}...`;
  elements.loadProjectsButton.disabled = true;

  try {
    const repositories = [];
    let page = 1;

    while (true) {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&page=${page}`,
      );

      if (!response.ok) {
        throw new Error(`GitHub returned ${response.status}`);
      }

      const pageRepositories = await response.json();
      repositories.push(...pageRepositories);

      if (pageRepositories.length < 100) {
        break;
      }

      page += 1;
    }

    const projects = repositories
      .filter((repository) => !repository.fork)
      .map((repository) => ({
        id: `github-${repository.id}`,
        name: repository.name,
        description: repository.description || "GitHub repository ready to be highlighted in your resume.",
        tech: repository.language || "Mixed",
        url: repository.html_url,
        selected: false,
        source: "github",
      }));

    mergeProjects(projects);
    elements.projectStatus.textContent = `Loaded ${projects.length} GitHub project${projects.length === 1 ? "" : "s"} from @${username}.`;
  } catch (error) {
    if (username.toLowerCase() === "syrthax") {
      elements.projectStatus.textContent =
        "Live GitHub loading is unavailable right now, so the page is showing the bundled project list for @Syrthax. You can still add and select future projects manually.";
    } else {
      elements.projectStatus.textContent = `Unable to load GitHub projects for @${username}. Keeping the current project list in place.`;
    }
  } finally {
    elements.loadProjectsButton.disabled = false;
  }
}

function addFutureProject(event) {
  event.preventDefault();

  const projectName = document.querySelector("#futureProjectName").value.trim();
  const projectTech = document.querySelector("#futureProjectTech").value.trim();
  const projectLink = normaliseUrl(document.querySelector("#futureProjectLink").value.trim());
  const projectDescription = document.querySelector("#futureProjectDescription").value.trim();

  if (!projectName) {
    return;
  }

  state.projects.push({
    id: `manual-${Date.now()}`,
    name: projectName,
    description: projectDescription || "Future project ready for resume inclusion.",
    tech: projectTech || "To be decided",
    url: projectLink,
    selected: true,
    source: "manual",
  });

  elements.projectStatus.textContent = "Future project added. Adjust the checkbox list to control what appears in the resume.";
  elements.futureProjectForm.reset();
  renderProjectChecklist();
}

// Persistence: everything lives in this browser's localStorage, plus JSON export/import for backups.

function snapshot() {
  return {
    version: 1,
    profile: Object.fromEntries(PROFILE_FIELDS.map((field) => [field, elements[field].value])),
    entries: state.entries,
    manualProjects: state.projects.filter((project) => project.source === "manual"),
    selectedGithubUrls: state.projects
      .filter((project) => project.source === "github" && project.selected)
      .map((project) => project.url),
  };
}

function applySnapshot(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid resume data");
  }

  PROFILE_FIELDS.forEach((field) => {
    if (typeof data.profile?.[field] === "string") {
      elements[field].value = data.profile[field];
    }
  });

  Object.keys(ENTRY_SECTIONS).forEach((section) => {
    const saved = data.entries?.[section];
    if (Array.isArray(saved)) {
      state.entries[section] = saved
        .filter((entry) => entry && typeof entry === "object")
        .map((entry) => createEntry({ ...entry, include: entry.include !== false }));
    }
  });

  const selectedUrls = new Set(Array.isArray(data.selectedGithubUrls) ? data.selectedGithubUrls : []);
  const manualProjects = Array.isArray(data.manualProjects)
    ? data.manualProjects
        .filter((project) => project && typeof project.name === "string")
        .map((project, index) => ({
          id: typeof project.id === "string" ? project.id : `manual-${Date.now()}-${index}`,
          name: project.name,
          description: String(project.description ?? ""),
          tech: String(project.tech ?? ""),
          url: normaliseUrl(project.url),
          selected: Boolean(project.selected),
          source: "manual",
        }))
    : [];

  state.projects = [
    ...state.projects
      .filter((project) => project.source === "github")
      .map((project) => ({ ...project, selected: selectedUrls.has(project.url) })),
    ...manualProjects,
  ];
}

let saveTimer;

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot()));
      elements.saveStatus.textContent = "Saved in this browser.";
    } catch (error) {
      elements.saveStatus.textContent = "Autosave unavailable — use Export JSON to keep a copy.";
    }
  }, 300);
}

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      applySnapshot(JSON.parse(raw));
    }
  } catch (error) {
    elements.saveStatus.textContent = "Couldn't restore saved data, starting fresh.";
  }
}

function renderAll() {
  Object.keys(ENTRY_SECTIONS).forEach(renderEntryEditor);
  renderProjectChecklist();
}

function exportJson() {
  const blob = new Blob([JSON.stringify(snapshot(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const slug = (elements.fullName.value.trim() || "resume").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  link.href = url;
  link.download = `${slug}-niacina.json`;
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
    elements.saveStatus.textContent = `Imported ${file.name}.`;
  } catch (error) {
    elements.saveStatus.textContent = `Couldn't import ${file.name}: not a NiaCina JSON file.`;
  }
}

function resetAll() {
  if (!window.confirm("Clear all saved resume data from this browser?")) {
    return;
  }
  clearTimeout(saveTimer);
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // Nothing stored or storage blocked; the reload still restores defaults.
  }
  window.location.reload();
}

PROFILE_FIELDS.forEach((field) => elements[field].addEventListener("input", updatePreview));

elements.projectChecklist.addEventListener("change", (event) => {
  const project = state.projects.find((entry) => entry.id === event.target.dataset.projectId);
  if (project) {
    project.selected = event.target.checked;
    updatePreview();
  }
});

elements.projectChecklist.addEventListener("click", (event) => {
  const id = event.target.closest("[data-remove-project]")?.dataset.removeProject;
  if (!id) {
    return;
  }
  state.projects = state.projects.filter((project) => project.id !== id);
  renderProjectChecklist();
});

Object.keys(ENTRY_SECTIONS).forEach(setupEntrySection);

elements.loadProjectsButton.addEventListener("click", loadGithubProjects);
elements.futureProjectForm.addEventListener("submit", addFutureProject);
elements.exportButton.addEventListener("click", exportJson);
elements.importInput.addEventListener("change", importJson);
elements.resetButton.addEventListener("click", resetAll);
window.addEventListener("afterprint", () => elements.fullName.focus());
elements.printResumeButton.addEventListener("click", () => window.print());

loadSaved();
renderAll();
loadGithubProjects();
