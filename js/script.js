document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const contactForm = document.getElementById("contactForm");
  const clearButton = document.getElementById("clearForm");
  const formMessage = document.getElementById("formMessage");

  let slideIndex = 0;
  let autoSlideInterval;

  window.moveSlide = function (n) {
    slideIndex += n;
    showSlide(slideIndex);
    resetAutoSlide(); 
  };

  function showSlide(index) {
    if (!slidesContainer) return; 

    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    slidesContainer.style.transform = `translateX(${-slideIndex * 100}%)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[slideIndex]?.classList.add("active"); 
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => moveSlide(1), 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  startAutoSlide();
  showSlide(slideIndex);

  // Mobile Menu Toggle
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !menuToggle.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      navLinks.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Contact Form Submission
  contactForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      alert(`Thank you, ${name}! Your message has been sent.`);
      formMessage.innerText = `Thank you for your message, ${name}!`;
      formMessage.style.color = "black";
      contactForm.reset();
    } else {
      alert("Please fill out all fields before submitting!");
      formMessage.innerText = "Please fill out all fields.";
      formMessage.style.color = "red";
    }
  });

  // Clear Form Button
  clearButton?.addEventListener("click", function () {
    contactForm?.reset();
    formMessage.innerText = "";
  });
});
