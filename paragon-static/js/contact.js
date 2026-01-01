// js/contact.js

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.style.display = "none";

  // Insert success message after form
  contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

  // Form validation and submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset previous states
    resetFormErrors();
    successMessage.style.display = "none";

    // Validate form
    if (validateForm()) {
      sendEmail();
    }
  });

  // Real-time validation
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  if (firstNameInput) {
    firstNameInput.addEventListener("blur", function () {
      validateField("first-name", "First Name is required");
    });
  }

  if (lastNameInput) {
    lastNameInput.addEventListener("blur", function () {
      validateField("last-name", "Last Name is required");
    });
  }

  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      validateEmailField();
    });
  }

  if (messageInput) {
    messageInput.addEventListener("blur", function () {
      validateField("message", "Message is required");
    });
  }

  function validateForm() {
    let isValid = true;

    // Validate required fields
    if (!validateField("first-name", "First Name is required")) isValid = false;
    if (!validateField("last-name", "Last Name is required")) isValid = false;
    if (!validateEmailField()) isValid = false;
    if (!validateField("message", "Message is required")) isValid = false;

    return isValid;
  }

  function validateField(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + "-error");
    // Find closest form-field or label parent
    const formGroup = field.closest(".form-field") || field.parentElement;

    if (!field.value.trim()) {
      formGroup.classList.add("error");
      if (errorElement) errorElement.textContent = errorMessage;
      return false;
    } else {
      formGroup.classList.remove("error");
      if (errorElement) errorElement.textContent = "";
      return true;
    }
  }

  function validateEmailField() {
    const field = document.getElementById("email");
    const errorElement = document.getElementById("email-error");
    const formGroup = field.closest(".form-field") || field.parentElement;
    const email = field.value.trim();

    if (!email) {
      formGroup.classList.add("error");
      if (errorElement) errorElement.textContent = "Email is required";
      return false;
    } else if (!isValidEmail(email)) {
      formGroup.classList.add("error");
      if (errorElement)
        errorElement.textContent = "Please enter a valid email address";
      return false;
    } else {
      formGroup.classList.remove("error");
      if (errorElement) errorElement.textContent = "";
      return true;
    }
  }

  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function resetFormErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
      element.textContent = "";
    });

    const errorGroups = document.querySelectorAll(
      ".form-field.error, .form-group.error"
    );
    errorGroups.forEach((group) => {
      group.classList.remove("error");
    });
  }

  function sendEmail() {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Replace these with your actual Service ID and Template ID
    const serviceID = "service_ydmdg1c";
    const templateID = "template_b3q0wp2";

    emailjs
      .sendForm(serviceID, templateID, "#contact-form")
      .then(
        () => {
          successMessage.textContent =
            "Thank you for your message! We will get back to you within 24 hours.";
          successMessage.style.display = "block";
          successMessage.className = "success-message"; // ensure success class

          contactForm.reset();
          successMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });

          setTimeout(() => {
            successMessage.style.display = "none";
          }, 8000);
        },
        (err) => {
          successMessage.textContent =
            "Failed to send message. Please try again later or contact us directly.";
          successMessage.style.display = "block";
          successMessage.className = "success-message error-state"; // add error class for styling if needed
          console.error("EmailJS Error:", err);
        }
      )
      .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
  }

  // Phone number formatting
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      const input = e.target.value.replace(/\D/g, "").substring(0, 10);
      const areaCode = input.substring(0, 3);
      const middle = input.substring(3, 6);
      const last = input.substring(6, 10);

      if (input.length > 6) {
        e.target.value = `(${areaCode}) ${middle}-${last}`;
      } else if (input.length > 3) {
        e.target.value = `(${areaCode}) ${middle}`;
      } else if (input.length > 0) {
        e.target.value = `(${areaCode}`;
      }
    });
  }
});
