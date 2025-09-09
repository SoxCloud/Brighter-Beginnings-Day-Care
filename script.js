document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded, starting scripts...");

  // -----------------------
  // Mobile nav toggle
  // -----------------------
  const menuToggle = document.getElementById("menuToggle");
  const primaryMenu = document.getElementById("primaryMenu");

  if (menuToggle && primaryMenu) {
    console.log("✅ Mobile nav elements found");
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      primaryMenu.style.display = expanded ? "none" : "flex";
      console.log(`🔀 Mobile nav toggled. Expanded: ${!expanded}`);
    });
  } else {
    console.warn("⚠️ Mobile nav elements not found");
  }

  // -----------------------
  // Hero slider auto-scroll
  // -----------------------
  const slides = document.querySelectorAll(".hero-slider .slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
    });
    console.log(`🎞️ Showing slide ${index + 1}/${slides.length}`);
  }

  if (slides.length > 0) {
    console.log(`✅ Found ${slides.length} slides. Starting auto-scroll...`);
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  } else {
    console.warn("⚠️ No slides found for hero slider");
  }

  // -----------------------
  // Gallery lightbox
  // -----------------------
  const galleryImgs = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  if (galleryImgs.length > 0 && lightbox && lightboxImg && lightboxClose) {
    console.log(`✅ Found ${galleryImgs.length} gallery images. Lightbox ready.`);
    galleryImgs.forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("show");
        console.log(`🖼️ Lightbox opened for ${img.src}`);
      });
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("show");
      console.log("❌ Lightbox closed (close button)");
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("show");
        console.log("❌ Lightbox closed (background click)");
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.classList.remove("show");
        console.log("❌ Lightbox closed (Escape key)");
      }
    });
  } else {
    console.warn("⚠️ Gallery or lightbox elements not found");
  }

  // -----------------------
  // Form AJAX (Web3Forms / Formspree)
  // -----------------------
  const form = document.getElementById("applicationForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    console.log("✅ Form and status elements found. AJAX enabled.");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "⏳ Sending...";
      console.log("📨 Form submission started...");

      const endpoint = form.getAttribute("action");

      if (!endpoint || endpoint.includes("your-form-id")) {
        status.style.color = "red";
        status.textContent = "⚠️ Add your form action URL.";
        console.error("❌ Form action missing or invalid");
        return;
      }

      const data = new FormData(form);
      try {
        const res = await fetch(endpoint, {
          method: form.method || "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          form.reset();
          status.style.color = "green";
          status.textContent = "✅ Application submitted successfully!";
          console.log("✅ Form submitted successfully");
        } else {
          const err = await res.json().catch(() => ({}));
          status.style.color = "red";
          status.textContent =
            "❌ Submission failed: " + (err.message || "Unknown error.");
          console.error("❌ Form submission failed:", err);
        }
      } catch (err) {
        status.style.color = "red";
        status.textContent = "❌ Network error. Try again.";
        console.error("❌ Network error during form submission:", err);
      }
    });
  } else {
    console.warn("⚠️ Form or status element not found");
  }
});
