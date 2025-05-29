document.addEventListener("DOMContentLoaded", function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  mobileMenuBtn.addEventListener("click", function() {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeMenuBtn.addEventListener("click", function() {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });

  // Testimonial Slider
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove("active"));
    testimonialCards[index].classList.add("active");
    currentIndex = index;
  }

  prevBtn.addEventListener("click", function() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = testimonialCards.length - 1;
    showTestimonial(newIndex);
  });

  nextBtn.addEventListener("click", function() {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonialCards.length) newIndex = 0;
    showTestimonial(newIndex);
  });

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonialCards.length) newIndex = 0;
    showTestimonial(newIndex);
  }, 5000);

  // Pause auto-rotation on hover
  const testimonialSlider = document.querySelector(".testimonial-slider");
  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  testimonialSlider.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      let newIndex = currentIndex + 1;
      if (newIndex >= testimonialCards.length) newIndex = 0;
      showTestimonial(newIndex);
    }, 5000);
  });

  // Button click handlers
  const btnLearnMore = document.getElementById("btnLearnMore");
  const btnDemo = document.getElementById("btnDemo");

  btnLearnMore.addEventListener("click", function() {
    window.scrollTo({
      top: document.getElementById("features").offsetTop - 80,
      behavior: "smooth"
    });
  });

  btnDemo.addEventListener("click", function() {
    alert("Demo akan ditampilkan di sini. Fitur ini sedang dalam pengembangan!");
  });

  // Animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(".feature-card, .pricing-card, .section-title");
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state for animated elements
  document.querySelectorAll(".feature-card, .pricing-card").forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on page load

  // Form submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const emailInput = this.querySelector("input[type='email']");
      alert(`Terima kasih! Email ${emailInput.value} telah berhasil terdaftar untuk newsletter.`);
      emailInput.value = "";
    });
  }
});