document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const menu = document.getElementById("menu");

  if (menuButton && menu) {
    // Toggle menu visibility
    menuButton.addEventListener("click", function () {
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.style.display = "none";
      }
    });
  }
  document.getElementById("menuButton").addEventListener("click", function () {
    let menu = document.getElementById("menu");
    menu.classList.toggle("active");
  });

  // Image Slider
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let slideIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    if (!slidesContainer || slides.length === 0) return;
    slideIndex = (index + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[slideIndex]?.classList.add("active");
  }

  function moveSlide(n) {
    showSlide(slideIndex + n);
    resetAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => moveSlide(1), 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  if (slidesContainer && slides.length > 0) {
    window.moveSlide = moveSlide;
    startAutoSlide();
    showSlide(slideIndex);
  }

  // Contact Form Validation
  const contactForm = document.getElementById("contactForm");
  const clearButton = document.getElementById("clearForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const namePattern = /^[A-Za-z\s]+$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name.match(namePattern)) {
        formMessage.innerText = "Invalid name. Use letters only.";
        formMessage.style.color = "red";
        return;
      }

      if (!email.match(emailPattern)) {
        formMessage.innerText = "Invalid email format.";
        formMessage.style.color = "red";
        return;
      }

      if (name && email && message) {
        formMessage.innerText = `Thank you for your message, ${name}!`;
        formMessage.style.color = "black";
        contactForm.reset();
      } else {
        formMessage.innerText = "Please fill out all fields.";
        formMessage.style.color = "red";
      }
    });

    clearButton?.addEventListener("click", function () {
      contactForm.reset();
      formMessage.innerText = "";
    });
  }

  // Product Quantity Increment & Decrement (Using Event Delegation)
  document.addEventListener("click", function (event) {
    const btn = event.target;
    if (
      btn.classList.contains("increment") ||
      btn.classList.contains("decrement")
    ) {
      const product = btn.closest(".product-container");
      if (!product) return;

      const quantityDisplay = product.querySelector(".quantity");
      const totalPriceDisplay = product.querySelector(".total-price");
      const pricePerItem = parseFloat(
        product
          .querySelector("p")
          .textContent.replace("Price: ₱", "")
          .replace(",", "")
      );

      let quantity = parseInt(quantityDisplay.textContent);

      if (btn.classList.contains("increment")) quantity++;
      if (btn.classList.contains("decrement") && quantity > 1) quantity--;

      quantityDisplay.textContent = quantity;
      totalPriceDisplay.textContent = `₱${(
        quantity * pricePerItem
      ).toLocaleString()}`;
    }

    if (btn.classList.contains("add-to-cart")) {
      const product = btn.closest(".product-container");
      if (!product) return;

      const quantity = parseInt(product.querySelector(".quantity").textContent);
      const pricePerItem = parseFloat(
        product
          .querySelector("p")
          .textContent.replace("Price: ₱", "")
          .replace(",", "")
      );

      alert(
        `Added ${quantity} item(s) to cart! Total Price: ₱${(
          quantity * pricePerItem
        ).toLocaleString()}`
      );
    }
  });

  // Add Paragraph Dynamically
  document
    .getElementById("addParagraph")
    .addEventListener("click", function () {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "How do you comfort a JavaScript bug? You console it.",
        "Why was the JavaScript developer sad? Because he didn’t ‘null’ his feelings.",
        "I told my website there was a bug... it said: 'It’s not a bug, it’s a feature.'",
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      const para = document.createElement("p");
      para.textContent = randomJoke;
      document.getElementById("paragraphContainer").appendChild(para);
    });
});
