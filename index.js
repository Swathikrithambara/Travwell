const header = document.getElementById("siteHeader");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link, .dropdown-item, .nav-cta");
const navbarCollapse = document.getElementById("mainNavbar");
const bookingForm = document.getElementById("bookingForm");
const newsletterForm = document.getElementById("newsletterForm");
const formMessage = document.getElementById("formMessage");
const year = document.getElementById("year");

function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function closeMobileNav() {
  if (!navbarCollapse || !navbarCollapse.classList.contains("show")) return;
  const collapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
  collapse.hide();
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function showTemporaryMessage(message) {
  if (!formMessage) return;
  formMessage.textContent = message;
  window.setTimeout(() => {
    formMessage.textContent = "";
  }, 4200);
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("load", () => {
  updateHeader();
  revealOnScroll();
  if (year) year.textContent = new Date().getFullYear();
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = document.getElementById("location")?.value.trim();
    const date = document.getElementById("date")?.value.trim();
    const guests = document.getElementById("guests")?.value.trim();
    const destination = location || "your dream destination";
    const timing = date ? ` around ${date}` : "";
    const people = guests ? ` for ${guests}` : "";
    showTemporaryMessage(`Great choice. We will prepare ideas for ${destination}${timing}${people}.`);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = newsletterForm.querySelector("input")?.value.trim();
    if (!email) return;
    showTemporaryMessage("Thank you. A Travelux planner will contact you with a custom itinerary.");
    newsletterForm.reset();
  });
}
