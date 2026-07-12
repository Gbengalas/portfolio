// Sanmi Gbenga — Portfolio interactions
(function () {
  "use strict";

  // Nav scroll state
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  toggle?.addEventListener("click", () => {
    links.classList.toggle("open");
    const open = links.classList.contains("open");
    toggle.innerHTML = open
      ? '<i class="bi bi-x-lg" aria-hidden="true"></i>'
      : '<i class="bi bi-list" aria-hidden="true"></i>';
    toggle.setAttribute("aria-expanded", String(open));
  });
  links?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      if (toggle) toggle.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
    })
  );

  // Scroll reveal
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Skill bars fill on view
  const skillIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".skill-fill");
          const pct = entry.target.dataset.pct || "0";
          if (fill) fill.style.width = pct + "%";
          skillIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll(".skill").forEach((el) => skillIO.observe(el));

  // Form (frontend-only)
  const form = document.querySelector("#contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = form.querySelector(".form-msg");
    const data = new FormData(form);
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      msg.textContent = "Please complete every field before sending.";
      return;
    }
    msg.textContent = "Thanks — I'll reply within one business day.";
    form.reset();
  });

  // Year
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
