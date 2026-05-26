const header = document.querySelector("[data-header]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  },
  {
    rootMargin: "-20% 0px -60% 0px",
    threshold: [0.1, 0.25, 0.5]
  }
);

sections.forEach((section) => sectionObserver.observe(section));
window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const closeButtons = document.querySelectorAll("[data-close-lightbox]");
const emptyImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
let lastFocusedElement = null;

const openLightbox = (trigger) => {
  lastFocusedElement = document.activeElement;
  lightboxImage.src = trigger.dataset.full;
  lightboxImage.alt = trigger.querySelector("img")?.alt || "Project image preview";
  lightboxCaption.textContent = trigger.dataset.caption || "";
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightbox.querySelector(".lightbox-close").focus();
};

const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImage.src = emptyImage;
  document.body.classList.remove("lightbox-open");
  if (lastFocusedElement) lastFocusedElement.focus();
};

document.querySelectorAll(".gallery-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => openLightbox(trigger));
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});
