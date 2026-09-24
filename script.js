const elements = {
  fullName: document.querySelector("#fullName"),
  headline: document.querySelector("#headline"),
  email: document.querySelector("#email"),
  phone: document.querySelector("#phone"),
  location: document.querySelector("#location"),
  githubUsername: document.querySelector("#githubUsername"),
  summary: document.querySelector("#summary"),
  skills: document.querySelector("#skills"),
  projectStatus: document.querySelector("#projectStatus"),
  projectChecklist: document.querySelector("#projectChecklist"),
  previewFullName: document.querySelector("#previewFullName"),
  previewHeadline: document.querySelector("#previewHeadline"),
  previewEmail: document.querySelector("#previewEmail"),
  previewPhone: document.querySelector("#previewPhone"),
  previewLocation: document.querySelector("#previewLocation"),
  previewSummary: document.querySelector("#previewSummary"),
  previewSkills: document.querySelector("#previewSkills"),
  previewProjects: document.querySelector("#previewProjects"),
  futureProjectForm: document.querySelector("#futureProjectForm"),
  loadProjectsButton: document.querySelector("#loadProjectsButton"),
  printResumeButton: document.querySelector("#printResumeButton"),
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

const state = {
  projects: [...bundledGithubProjects],
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normaliseSkills(value) {
  return value
    .split(",")
    .map((skill) => skill.trim())
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

function updatePreview() {
  elements.previewFullName.textContent = elements.fullName.value.trim() || "Your Name";
  elements.previewHeadline.textContent = elements.headline.value.trim() || "Professional Title";
  elements.previewEmail.textContent = elements.email.value.trim() || "you@example.com";
  elements.previewPhone.textContent = elements.phone.value.trim() || "+00 123 456 7890";
  elements.previewLocation.textContent = elements.location.value.trim() || "Remote";
  elements.previewSummary.textContent =
    elements.summary.value.trim() ||
    "Write a short summary that highlights your strengths, preferred technologies, and the value you bring to a team.";

  const skills = normaliseSkills(elements.skills.value);
  elements.previewSkills.innerHTML = skills
    .map((skill) => `<li>${escapeHtml(skill)}</li>`)
    .join("");

  const selectedProjects = state.projects.filter((project) => project.selected);
  if (!selectedProjects.length) {
    elements.previewProjects.innerHTML =
      '<p class="empty-state">Select GitHub projects or add future projects to display them in the resume preview.</p>';
    return;
  }

  elements.previewProjects.innerHTML = selectedProjects
    .map((project) => {
      const techStack = project.tech ? `<p><strong>Tech:</strong> ${escapeHtml(project.tech)}</p>` : "";
      const safeUrl = normaliseUrl(project.url);
      const link = safeUrl
        ? `<p><strong>Link:</strong> <a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(safeUrl)}</a></p>`
        : "";

      return `
        <article class="resume-project">
          <h3>${escapeHtml(project.name)} <span class="project-check">✓</span></h3>
          <p>${escapeHtml(project.description || "Project details coming soon.")}</p>
          ${techStack}
          ${link}
        </article>
      `;
    })
    .join("");
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
        <label class="project-item" for="project-${project.id}">
          <input id="project-${project.id}" data-project-id="${project.id}" type="checkbox" ${project.selected ? "checked" : ""} />
          <span>
            <h3>${escapeHtml(project.name)}</h3>
            <p>${escapeHtml(project.description || "No description provided yet.")}</p>
            <span class="project-meta">${escapeHtml(project.tech || "Tech stack not listed")}</span>
          </span>
        </label>
      `,
    )
    .join("");

  elements.projectChecklist
    .querySelectorAll("input[type='checkbox']")
    .forEach((checkbox) =>
      checkbox.addEventListener("change", (event) => {
        const project = state.projects.find((entry) => entry.id === event.target.dataset.projectId);
        if (project) {
          project.selected = event.target.checked;
          updatePreview();
        }
      }),
    );

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

[
  elements.fullName,
  elements.headline,
  elements.email,
  elements.phone,
  elements.location,
  elements.summary,
  elements.skills,
].forEach((input) => input.addEventListener("input", updatePreview));

elements.loadProjectsButton.addEventListener("click", loadGithubProjects);
elements.futureProjectForm.addEventListener("submit", addFutureProject);
window.addEventListener("afterprint", () => {
  if (elements.printResumeButton.offsetParent !== null) {
    elements.printResumeButton.focus();
  }
});
elements.printResumeButton.addEventListener("click", () => window.print());

updatePreview();
renderProjectChecklist();
loadGithubProjects();
