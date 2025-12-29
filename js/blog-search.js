document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  // Select all article types
  const articleSelectors = [
    ".article-card",
    ".article-horizontal",
    ".article-compact",
    ".article-featured",
    ".article-list",
  ];

  // Helper function to get text content safely
  function getText(element, selector) {
    const el = element.querySelector(selector);
    return el ? el.textContent.toLowerCase() : "";
  }

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();

    // 1. Filter Articles
    articleSelectors.forEach((selector) => {
      const articles = document.querySelectorAll(selector);

      articles.forEach((article) => {
        const title =
          article.querySelector("h3")?.textContent.toLowerCase() || "";
        const excerpt =
          article.querySelector("p")?.textContent.toLowerCase() || "";
        const badge =
          article.querySelector(".featured-badge")?.textContent.toLowerCase() ||
          "";
        const tag =
          article.querySelector(".article-tag")?.textContent.toLowerCase() ||
          "";

        const fullText = `${title} ${excerpt} ${badge} ${tag}`;

        if (fullText.includes(query)) {
          article.classList.remove("hidden");
        } else {
          article.classList.add("hidden");
        }
      });
    });

    // 2. Filter Sections based on visible articles
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section) => {
      // Check if this section has any visible articles
      // We search for any of our article types that do NOT have the 'hidden' class
      const hasVisibleArticles = Array.from(
        section.querySelectorAll(articleSelectors.join(", "))
      ).some((article) => !article.classList.contains("hidden"));

      if (hasVisibleArticles) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });
  }

  if (searchInput) {
    // Search on typing
    searchInput.addEventListener("input", performSearch);

    // Search on enter key
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", performSearch);
  }
});
