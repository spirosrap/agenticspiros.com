const caseBrowser = document.querySelector("[data-case-browser]");
const caseViewTabs = [...document.querySelectorAll("[data-case-view][role='tab']")];
const caseImages = [...document.querySelectorAll("[data-case-image]")];
const caseViewOrder = caseViewTabs.map((tab) => tab.dataset.caseView);

function activateCaseView(view, { focus = false } = {}) {
  const nextIndex = caseViewOrder.indexOf(view);
  if (!caseBrowser || nextIndex < 0) return;

  caseBrowser.dataset.activeView = view;

  caseViewTabs.forEach((tab) => {
    const isActive = tab.dataset.caseView === view;
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive && focus) tab.focus();
  });

  caseImages.forEach((image) => {
    image.hidden = image.dataset.caseImage !== view;
  });
}

caseViewTabs.forEach((tab) => {
  tab.addEventListener("click", () => activateCaseView(tab.dataset.caseView));

  tab.addEventListener("keydown", (event) => {
    const currentIndex = caseViewOrder.indexOf(tab.dataset.caseView);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % caseViewOrder.length;
    if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + caseViewOrder.length) % caseViewOrder.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = caseViewOrder.length - 1;

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      activateCaseView(caseViewOrder[nextIndex], { focus: true });
    }
  });
});

const root = document.documentElement;
const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
let interfaceFrame = 0;
let activeSectionId = "";

function setCurrentLink(sectionId) {
  if (sectionId === activeSectionId) return;
  activeSectionId = sectionId;

  sectionLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateInterfaceState() {
  const scrollRange = root.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0
    ? Math.min(1, Math.max(0, window.scrollY / scrollRange))
    : 0;

  const referenceY = window.scrollY + 150;
  let currentSection = observedSections[0];

  observedSections.forEach((section) => {
    if (section.offsetTop <= referenceY) currentSection = section;
  });

  if (window.scrollY + window.innerHeight >= root.scrollHeight - 4) {
    currentSection = observedSections[observedSections.length - 1];
  }

  root.style.setProperty("--scroll-progress", progress.toFixed(4));
  if (currentSection) setCurrentLink(currentSection.id);
  interfaceFrame = 0;
}

function requestInterfaceUpdate() {
  if (interfaceFrame) return;
  interfaceFrame = window.requestAnimationFrame(updateInterfaceState);
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const sectionId = link.getAttribute("href").slice(1);
    setCurrentLink(sectionId);
  });
});

window.addEventListener("scroll", requestInterfaceUpdate, { passive: true });
window.addEventListener("resize", requestInterfaceUpdate);
updateInterfaceState();
