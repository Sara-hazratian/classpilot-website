/* ============================================================
   CLASSPILOT MARKETING SITE — interactions
   ============================================================ */

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
  setTimeout(() => revealEls.forEach(el => el.classList.add("is-visible")), 4000);
} else {
  revealEls.forEach(el => el.classList.add("is-visible"));
}

document.querySelectorAll(".faq-item__q").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const answer = item.querySelector(".faq-item__a");
    const isOpen = btn.getAttribute("aria-expanded") === "true";

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

const nav = document.getElementById("nav");
if (nav) {
  window.addEventListener("scroll", () => {
    nav.style.boxShadow = window.scrollY > 8 ? "0 4px 20px rgba(11,31,58,.08)" : "none";
  }, { passive: true });
}
