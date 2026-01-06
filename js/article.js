document.addEventListener("DOMContentLoaded", function () {
  // 1. Get Article ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = parseInt(urlParams.get("id"));

  if (!articleId) {
    showError("Article not found.");
    return;
  }

  // 2. Fetch Data
  fetch("assets/data/blog-posts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const article = data.find((post) => post.id === articleId);
      if (article) {
        renderArticle(article);

        // Listen for language changes
        if (window.languageManager) {
          window.addEventListener("languageChanged", () => {
            renderArticle(article);
          });
        }
      } else {
        showError("Article not found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching article:", error);
      showError("Error loading article.");
    });

  function renderArticle(post) {
    const root = document.getElementById("article-root");

    // Dynamic Hero Background
    const heroSection =
      document.querySelector(".article-hero") || document.createElement("div");
    if (!document.querySelector(".article-hero")) {
      heroSection.className = "article-hero";
      root.appendChild(heroSection);
    }
    heroSection.style.backgroundImage = `url('${post.image}')`;

    // Content Construction
    const contentHTML = `
            <div class="article-hero-content">
                <span class="article-date">${post.date} • ${
      post.readTime || post.category
    }</span>
                <h1 class="article-title-large">${post.title}</h1>
            </div>
            
            <div class="article-container">
                <a href="blog.html" class="back-link">
                    <span class="material-symbols-outlined">arrow_back</span>
                    Back to Articles
                </a>
                
                <div class="article-body-content">
                    ${post.content || "<p>Content coming soon...</p>"}
                </div>
            </div>
        `;

    // If we created the hero dynamically, we might need a different approach,
    // but let's stick to the template structure.
    // The template has #article-root which is empty.
    // We will build the entire structure inside #article-root or replace it.

    const lang = window.languageManager
      ? window.languageManager.currentLanguage
      : "en";
    const title = lang === "ka" ? post.title_ka || post.title : post.title;
    const content =
      lang === "ka" ? post.content_ka || post.content : post.content;
    const readTime =
      lang === "ka" ? post.readTime_ka || post.readTime : post.readTime; // if readTime_ka exists

    root.innerHTML = `
            <section class="article-hero" style="background-image: url('${
              post.image
            }');">
                <div class="article-hero-content">
                    <span class="article-date">${post.date} ${
      readTime ? "• " + readTime : ""
    }</span>
                    <h1 class="article-title-large">${title}</h1>
                </div>
            </section>
            
            <div class="article-container">
                <a href="blog.html" class="back-link">
                    <span class="material-symbols-outlined">arrow_back</span>
                    <span data-i18n="blog.backToArticles">Back to Articles</span>
                </a>
                <div class="article-body-content">
                    ${content || "<p>Content coming soon...</p>"}
                </div>
            </div>
        `;

    // Apply translations to static elements like back button
    if (window.languageManager) {
      window.languageManager.applyLanguage(lang);
    }

    // Update Title
    document.title = `${title} - PARAGON Landscapes`;
  }

  function showError(message) {
    const root = document.getElementById("article-root");
    root.innerHTML = `
            <div style="height: 50vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <h2>${message}</h2>
                <a href="blog.html" class="btn-featured" style="margin-top: 1rem;">Return to Blog</a>
            </div>
        `;
  }
});
