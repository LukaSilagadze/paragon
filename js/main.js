document.addEventListener("DOMContentLoaded", function () {
  // Header scroll effect
  const header = document.getElementById("main-header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile navigation toggle
  const hamburger = document.querySelector(".hamburger");
  const mainNav = document.querySelector(".main-nav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      mainNav.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      mainNav.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Initialize first slide indicator and get indicators
  const indicators = document.getElementsByClassName("indicator-dot");

  // Add click handlers for indicator dots
  Array.from(indicators).forEach((dot, index) => {
    dot.addEventListener("click", function () {
      // Reset all slides and indicators
      const slides = document.getElementsByClassName("bg_posters");
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
      }
      for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("active");
      }

      // Set clicked slide and indicator as active
      if (slides[index]) {
        slides[index].classList.add("active");
      }
      dot.classList.add("active");

      // Reset slideIndex to continue from clicked slide
      slideIndex = index + 1; // +1 because autoSlider increments first
    });
  });

  // Portfolio filtering (for portfolio.html)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        portfolioItems.forEach((item) => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 10);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Contact form validation
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      let isValid = true;

      // Reset error states
      document.querySelectorAll(".error").forEach((error) => error.remove());
      document
        .querySelectorAll(".form-group")
        .forEach((group) => group.classList.remove("error"));

      // Validate name
      if (!name.value.trim()) {
        showError(name, "Name is required");
        isValid = false;
      }

      // Validate email
      if (!email.value.trim()) {
        showError(email, "Email is required");
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, "Please enter a valid email address");
        isValid = false;
      }

      // Validate message
      if (!message.value.trim()) {
        showError(message, "Message is required");
        isValid = false;
      }

      if (isValid) {
        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.textContent =
          "Thank you for your message! We will get back to you soon.";
        successMessage.style.cssText =
          "background-color: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin-top: 20px;";

        contactForm.appendChild(successMessage);

        // Reset form
        contactForm.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }

  // Helper function to show error messages
  function showError(input, message) {
    const formGroup = input.closest(".form-group");
    formGroup.classList.add("error");

    const error = document.createElement("div");
    error.className = "error";
    error.textContent = message;
    error.style.cssText =
      "color: #dc3545; font-size: 0.875rem; margin-top: 5px;";

    formGroup.appendChild(error);
  }

  // Helper function to validate email format
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Only process internal anchor links
      if (href !== "#" && href.startsWith("#")) {
        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
          const headerHeight =
            document.getElementById("main-header").offsetHeight;
          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Hero Video Slider
  function initHeroSlider() {
    const videoElement = document.getElementById("hero-video");
    const prevBtn = document.getElementById("hero-prev");
    const nextBtn = document.getElementById("hero-next");
    const dotsContainer = document.getElementById("hero-dots");

    if (!videoElement || !prevBtn || !nextBtn || !dotsContainer) return;

    // Video slides configuration
    // Currently using the same video, but ready for more unique inputs
    const slides = [
      {
        video: "assets/videos/hero_vid.mp4",
        poster: "assets/images/hero-poster.jpg",
        title: "Landscape is not just about plants",
        subtitle:
          "it's about creating a grand entrance that speaks before you even step inside...",
      },
      {
        video: "assets/videos/hero_vid3.mp4",
        poster: "assets/images/hero-poster.jpg",
        title: "Sustainable Living Spaces",
        subtitle: "Harmony with nature for a better tomorrow...",
      },
      {
        video: "assets/videos/hero_vid4.mp4",
        poster: "assets/images/hero-poster.jpg",
        title: "Sustainable Living Spaces",
        subtitle: "Harmony with nature for a better tomorrow...",
      },
      {
        video: "assets/videos/hero_vid5.mp4",
        poster: "assets/images/hero-poster.jpg",
        title: "Sustainable Living Spaces",
        subtitle: "Harmony with nature for a better tomorrow...",
      },
    ];

    let currentSlide = 0;
    let slideInterval;
    const SLIDE_DURATION = 5000; // 5 seconds

    // Initialize dots
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("slider-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".slider-dot");

    function updateSlideContent(index) {
      const slide = slides[index];
      const videoSource = videoElement.querySelector("source");

      // Fade out
      videoElement.classList.add("fade-out");

      // Wait for fade out to complete before changing video
      setTimeout(() => {
        // Update video
        videoSource.src = slide.video;
        videoElement.load();

        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Fade back in only after play starts
              videoElement.classList.remove("fade-out");
            })
            .catch((e) => {
              console.log("Auto-play prevented", e);
              // Ensure we fade back in even if autoplay fails (e.g. user interaction needed)
              videoElement.classList.remove("fade-out");
            });
        }
      }, 500); // 500ms matches CSS transition duration
      // Text updates removed to keep content static

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlideContent(currentSlide);
      resetInterval();
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlideContent(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlideContent(currentSlide);
    }

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, SLIDE_DURATION);
    }

    // Event listeners
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetInterval();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetInterval();
    });

    // Start auto-slider
    resetInterval();
  }

  initHeroSlider();
});
