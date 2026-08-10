/* ============================================================
   CLASSPILOT MARKETING SITE — interactions
   Kept intentionally small: no framework, no build step.
   ============================================================ */

// ---------- Mobile nav toggle ----------
const burger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");
if (burger && navLinks) {
  burger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }));
}

// ---------- Scroll-reveal ----------
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(el => io.observe(el));

  // Safety net: content must never stay invisible forever. If something
  // never crosses the viewport threshold (unusual scroll behavior, a very
  // short page, etc.), reveal it anyway after a few seconds.
  setTimeout(() => revealEls.forEach(el => el.classList.add("is-visible")), 4000);
} else {
  revealEls.forEach(el => el.classList.add("is-visible"));
}

// ---------- FAQ accordion ----------
document.querySelectorAll(".faq-item__q").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const answer = item.querySelector(".faq-item__a");
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    // Close any other open item for a cleaner single-focus reading experience.
    document.querySelectorAll(".faq-item__q[aria-expanded='true']").forEach(openBtn => {
      if (openBtn !== btn) {
        openBtn.setAttribute("aria-expanded", "false");
        openBtn.closest(".faq-item").querySelector(".faq-item__a").style.maxHeight = null;
      }
    });

    btn.setAttribute("aria-expanded", String(!isOpen));
    answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
  });
});

// ---------- Sticky nav shadow on scroll ----------
const nav = document.getElementById("nav");
if (nav) {
  window.addEventListener("scroll", () => {
    nav.style.boxShadow = window.scrollY > 8 ? "0 4px 20px rgba(11,31,58,.08)" : "none";
  }, { passive: true });
}
