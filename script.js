// Toggle contacts
const contacts = document.getElementById("contacts");
const toggleContactsBtn = document.getElementById("toggle-contacts");

if (contacts && toggleContactsBtn) {
  toggleContactsBtn.addEventListener("click", () => {
    contacts.classList.toggle("contacts--open");
    const isOpen = contacts.classList.contains("contacts--open");
    toggleContactsBtn.textContent = isOpen ? "Hide contacts" : "Show contacts";
  });
}

// Smooth scroll & active nav link
const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });

    navLinks.forEach((l) => l.classList.remove("nav__link--active"));
    link.classList.add("nav__link--active");
  });
});

// Portfolio filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("filter-btn--active"));
    btn.classList.add("filter-btn--active");

    projects.forEach((project) => {
      const projectCategory = project.dataset.category;
      if (category === "all" || category === projectCategory) {
        project.style.display = "flex";
      } else {
        project.style.display = "none";
      }
    });
  });
});

// Optional: mobile toggling of nav (here we simply scroll, so no extra logic yet)
