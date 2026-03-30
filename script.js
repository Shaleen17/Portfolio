document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const spans = mobileMenuButton
    ? mobileMenuButton.querySelectorAll("span")
    : [];
  const glow = document.getElementById("glow");
  const subtitleEl = document.getElementById("subtitle");
  const secretBubble = document.getElementById("secret-bubble");
  const secretModal = document.getElementById("secret-modal");
  const closeSecretModal = document.getElementById("close-secret-modal");

  function setGlowPosition(x, y) {
    if (!glow) return;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  }

  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (event) => {
      setGlowPosition(event.clientX, event.clientY);
    });
  } else {
    setGlowPosition(window.innerWidth / 2, 220);
  }

  function typeWriter(element, text, speed = 100) {
    if (!element) return;
    element.textContent = "";
    let index = 0;

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index += 1;
        setTimeout(type, speed);
      }
    }

    setTimeout(type, 700);
  }

  typeWriter(subtitleEl, "Product Manager and Tech Assistant at RentZoo", 45);

  function openMobileMenu() {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.remove("-translate-x-full");
    document.body.classList.add("overflow-hidden");
    mobileMenuButton.setAttribute("aria-expanded", "true");
    spans[0]?.classList.add("rotate-45", "translate-y-[7px]");
    spans[1]?.classList.add("opacity-0");
    spans[2]?.classList.add("-rotate-45", "-translate-y-[7px]");
  }

  function closeMobileMenu() {
    mobileMenu.classList.add("-translate-x-full");
    document.body.classList.remove("overflow-hidden");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    spans[0]?.classList.remove("rotate-45", "translate-y-[7px]");
    spans[1]?.classList.remove("opacity-0");
    spans[2]?.classList.remove("-rotate-45", "-translate-y-[7px]");

    window.setTimeout(() => {
      if (mobileMenu.classList.contains("-translate-x-full")) {
        mobileMenu.classList.add("hidden");
      }
    }, 300);
  }

  mobileMenuButton?.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    if (isHidden) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
      closeMobileMenu();
    }
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    if (window.scrollY > 300) {
      scrollTopBtn?.classList.remove("hidden");
      scrollTopBtn?.classList.add("flex");
    } else {
      scrollTopBtn?.classList.add("hidden");
      scrollTopBtn?.classList.remove("flex");
    }
  });

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
  });

  function openSecretModal() {
    if (!secretModal) return;
    secretModal.classList.remove("hidden");
    secretModal.classList.add("flex");
    secretModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
  }

  function closeModal() {
    if (!secretModal) return;
    secretModal.classList.add("hidden");
    secretModal.classList.remove("flex");
    secretModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");
  }

  const searchParams = new URLSearchParams(window.location.search);
  const foundSecret =
    searchParams.get("secret") === "found" ||
    localStorage.getItem("portfolioSecretUnlocked") === "true";

  if (foundSecret) {
    localStorage.setItem("portfolioSecretUnlocked", "true");
    secretBubble?.classList.remove("hidden");
    secretBubble?.classList.add("flex");

    if (searchParams.get("secret") === "found") {
      openSecretModal();
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete("secret");
      window.history.replaceState(
        {},
        document.title,
        cleanUrl.pathname + cleanUrl.hash,
      );
    }
  }

  secretBubble?.addEventListener("click", openSecretModal);
  closeSecretModal?.addEventListener("click", closeModal);

  secretModal?.addEventListener("click", (event) => {
    if (event.target === secretModal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
