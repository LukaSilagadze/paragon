// js/contact.js

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.display = 'none';
    
    // Insert success message after form
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);

    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous states
        resetFormErrors();
        successMessage.style.display = 'none';
        
        // Validate form
        if (validateForm()) {
            // Simulate form submission
            simulateFormSubmission();
        }
    });

    // Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            validateField('name', 'Name is required');
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmailField();
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            validateField('message', 'Message is required');
        });
    }

    function validateForm() {
        let isValid = true;
        
        // Validate required fields
        if (!validateField('name', 'Name is required')) isValid = false;
        if (!validateEmailField()) isValid = false;
        if (!validateField('message', 'Message is required')) isValid = false;
        
        return isValid;
    }

    function validateField(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        const formGroup = field.closest('.form-group');
        
        if (!field.value.trim()) {
            formGroup.classList.add('error');
            errorElement.textContent = errorMessage;
            return false;
        } else {
            formGroup.classList.remove('error');
            errorElement.textContent = '';
            return true;
        }
    }

    function validateEmailField() {
        const field = document.getElementById('email');
        const errorElement = document.getElementById('email-error');
        const formGroup = field.closest('.form-group');
        const email = field.value.trim();
        
        if (!email) {
            formGroup.classList.add('error');
            errorElement.textContent = 'Email is required';
            return false;
        } else if (!isValidEmail(email)) {
            formGroup.classList.add('error');
            errorElement.textContent = 'Please enter a valid email address';
            return false;
        } else {
            formGroup.classList.remove('error');
            errorElement.textContent = '';
            return true;
        }
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function resetFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        const errorGroups = document.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
        });
    }

    function simulateFormSubmission() {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            successMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide success message after 8 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 8000);
        }, 1500);
    }

    // Phone number formatting (optional enhancement)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const input = e.target.value.replace(/\D/g, '').substring(0, 10);
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