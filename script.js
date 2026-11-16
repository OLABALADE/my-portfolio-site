const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("hidden") === false;
    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close the menu after a link is tapped
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", false);
      menuBtn.setAttribute("aria-label", "Open menu");
    });
  });
}

// Fade In and Out effects
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fadeItems = document.querySelectorAll("main > *");

if (!reduceMotion && "IntersectionObserver" in window) {
  // Start every block hidden and slightly lower
  fadeItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(24px)";
    item.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  });

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Entering the screen: fade in
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        } else {
          // Leaving the screen: fade out
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(24px)";
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeItems.forEach((item) => fadeObserver.observe(item));
}

// Highlight current section link
const sectionLinks = document.querySelectorAll('#nav-links a[href^="#"]');
const activeClasses = ["bg-ink", "text-paper"];

function setActiveLink(id) {
  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === "#" + id;
    activeClasses.forEach((cls) => link.classList.toggle(cls, isActive));
    link.classList.toggle("hover:text-accent", !isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if (sectionLinks.length > 0 && "IntersectionObserver" in window) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    // A section counts as "active" when it crosses the middle of the screen
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) spyObserver.observe(section);
  });
}

//Current year in the footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
