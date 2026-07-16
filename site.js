const explorer = document.querySelector("[data-project-explorer]");
const projectTabs = [...document.querySelectorAll("[data-project][role='tab']")];
const projectPanels = [...document.querySelectorAll("[data-project-panel]")];
const projectCounter = document.querySelector("#project-counter");
const projectSteps = [...document.querySelectorAll("[data-project-step]")];
const projectOrder = projectTabs.map((tab) => tab.dataset.project);

function activateProject(project, { focus = false } = {}) {
  const nextIndex = projectOrder.indexOf(project);
  if (!explorer || nextIndex < 0) return;

  explorer.dataset.active = project;

  projectTabs.forEach((tab) => {
    const isActive = tab.dataset.project === project;
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive && focus) tab.focus();
  });

  projectPanels.forEach((panel) => {
    panel.hidden = panel.dataset.projectPanel !== project;
  });

  if (projectCounter) {
    projectCounter.textContent = `${String(nextIndex + 1).padStart(2, "0")} / ${String(projectOrder.length).padStart(2, "0")}`;
  }
}

projectTabs.forEach((tab) => {
  tab.addEventListener("click", () => activateProject(tab.dataset.project));

  tab.addEventListener("keydown", (event) => {
    const currentIndex = projectOrder.indexOf(tab.dataset.project);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % projectOrder.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + projectOrder.length) % projectOrder.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = projectOrder.length - 1;

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      activateProject(projectOrder[nextIndex], { focus: true });
    }
  });
});

projectSteps.forEach((button) => {
  button.addEventListener("click", () => {
    const currentIndex = projectOrder.indexOf(explorer.dataset.active);
    const direction = button.dataset.projectStep === "next" ? 1 : -1;
    const nextIndex = (currentIndex + direction + projectOrder.length) % projectOrder.length;
    activateProject(projectOrder[nextIndex]);
  });
});

const root = document.documentElement;
let scrollFrame = 0;

function updateScrollProgress() {
  const scrollRange = root.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollRange) * 100)) : 0;
  root.style.setProperty("--scroll-progress", `${progress}%`);
  scrollFrame = 0;
}

function requestScrollProgress() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(updateScrollProgress);
}

window.addEventListener("scroll", requestScrollProgress, { passive: true });
window.addEventListener("resize", requestScrollProgress);
updateScrollProgress();

const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const visibleSections = new Map(observedSections.map((section) => [section.id, false]));

function setCurrentLink(activeLink) {
  sectionLinks.forEach((link) => {
    if (link === activeLink) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateActiveSection() {
  const activeSection = observedSections
    .filter((section) => visibleSections.get(section.id))
    .sort(
      (first, second) =>
        Math.abs(first.getBoundingClientRect().top - 100) -
        Math.abs(second.getBoundingClientRect().top - 100),
    )[0];

  if (!activeSection) return;

  const activeLink = sectionLinks.find(
    (link) => link.getAttribute("href") === `#${activeSection.id}`,
  );

  if (activeLink) setCurrentLink(activeLink);
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", () => setCurrentLink(link));
});

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visibleSections.set(entry.target.id, entry.isIntersecting));
      updateActiveSection();
    },
    { rootMargin: "-10% 0px -45% 0px", threshold: [0, 0.01] },
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}
