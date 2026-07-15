const filterButtons = [...document.querySelectorAll("[data-filter]")];
const systemItems = [...document.querySelectorAll(".system-item")];
const filterStatus = document.querySelector("#filter-status");

function applySystemFilter(filter) {
  let visibleCount = 0;

  systemItems.forEach((item) => {
    const categories = item.dataset.category.split(" ");
    const isVisible = filter === "all" || categories.includes(filter);
    item.hidden = !isVisible;
    visibleCount += isVisible ? 1 : 0;
  });

  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
  });

  if (filterStatus) {
    filterStatus.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "system" : "systems"}`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applySystemFilter(button.dataset.filter));
});

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
