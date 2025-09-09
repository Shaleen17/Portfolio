document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const spans = mobileMenuButton.querySelectorAll("span");
  const glow = document.getElementById("glow");
  const subtitleEl = document.getElementById("subtitle");

  // Glow effect
  document.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });

  // Typing animation function
  function typeWriter(element, text, speed = 100) {
    element.innerHTML = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    setTimeout(type, 1000); // Initial delay
  }

  // Start typing effect for subtitle
  const originalText = "Product Manager and Tech Assistant at @RentZoo";
  typeWriter(subtitleEl, originalText, 50);

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Show/hide scroll to top button
    if (window.scrollY > 300) {
      scrollTopBtn.classList.remove("hidden");
      scrollTopBtn.classList.add("flex");
    } else {
      scrollTopBtn.classList.add("hidden");
      scrollTopBtn.classList.remove("flex");
    }
  });

  // Scroll to top functionality
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mobile menu toggle
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("-translate-x-full");

    // Hamburger icon animation
    spans[0].classList.toggle("rotate-45");
    spans[0].classList.toggle("translate-y-[7px]");
    spans[1].classList.toggle("opacity-0");
    spans[2].classList.toggle("-rotate-45");
    spans[2].classList.toggle("-translate-y-[7px]");
  });

  // Close mobile menu when a link is clicked
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.add("-translate-x-full");
      spans[0].classList.remove("rotate-45", "translate-y-[7px]");
      spans[1].classList.remove("opacity-0");
      spans[2].classList.remove("-rotate-45", "-translate-y-[7px]");
    });
  });

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
});
