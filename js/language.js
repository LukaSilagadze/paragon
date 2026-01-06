// Language Management System for Paragon Landscapes
class LanguageManager {
  constructor() {
    this.currentLanguage = this.getSavedLanguage() || "en";
    this.init();
  }

  // Get saved language from localStorage
  getSavedLanguage() {
    return localStorage.getItem("paragon_language");
  }

  // Save language preference to localStorage
  saveLanguage(lang) {
    localStorage.setItem("paragon_language", lang);
  }

  // Initialize language system
  init() {
    // Apply saved language on page load
    this.applyLanguage(this.currentLanguage);

    // Set up language switcher buttons
    this.setupLanguageSwitcher();
  }

  // Set up event listeners for language switcher
  setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll(".lang-btn");

    langButtons.forEach((button) => {
      // Set initial active state
      if (button.getAttribute("data-lang") === this.currentLanguage) {
        button.classList.add("active");
      }

      // Add click event listener
      button.addEventListener("click", (e) => {
        const selectedLang = e.target.getAttribute("data-lang");
        this.switchLanguage(selectedLang);
      });
    });
  }

  // Switch to a different language
  switchLanguage(lang) {
    if (lang === this.currentLanguage) return;

    this.currentLanguage = lang;
    this.saveLanguage(lang);
    this.applyLanguage(lang);
    this.updateButtonStates(lang);

    // Dispatch event for other components
    window.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { language: lang } })
    );
  }

  // Update active state of language buttons
  updateButtonStates(lang) {
    const langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach((button) => {
      if (button.getAttribute("data-lang") === lang) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  // Apply language to all elements with data-i18n attribute
  applyLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.getTranslation(key, lang);

      if (translation) {
        // Check if element is an input or textarea (update placeholder)
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.placeholder = translation;
        }
        // Check if element has a data-i18n-attr attribute (for specific attributes)
        else if (element.hasAttribute("data-i18n-attr")) {
          const attr = element.getAttribute("data-i18n-attr");
          element.setAttribute(attr, translation);
        }
        // Default: update text content
        else {
          element.textContent = translation;
        }
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang === "ka" ? "ka" : "en";
  }

  // Get translation from translations object using dot notation
  getTranslation(key, lang) {
    const keys = key.split(".");
    let translation = translations[lang];

    for (let k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(
          `Translation not found for key: ${key} in language: ${lang}`
        );
        return null;
      }
    }

    return translation;
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

// Initialize language manager when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.languageManager = new LanguageManager();
});
