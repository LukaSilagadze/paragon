document.addEventListener("DOMContentLoaded", function () {
  const blogContainer = document.querySelector(".main-content");

  // We will store all articles here for search functionality
  let allArticles = [];
  let postsByCategory = {};
  const postLimits = {}; // Track visible counts per category

  // Selectors for search (from previous blog-search.js)
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  // 1. Fetch Data
  fetch("assets/data/blog-posts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      allArticles = data;
      renderArticles(data);
      initializeSearch();
      initializeSidebar();
    })
    .catch((error) => {
      console.error("Error fetching blog posts:", error);
      // Optionally show error message in UI
    });

  // 2. Render Functions
  function renderArticles(posts, isSearch = false) {
    // Group posts by category to easily target sections
    const grouped = posts.reduce((acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = [];
      }
      acc[post.category].push(post);
      return acc;
    }, {});

    // Unified Rendering for all sections
    const categories = [
      "architecture",
      "sod",
      "lawn",
      "irrigation",
      "terrace",
      "lighting",
      "maintenance",
      "hardscaping",
      "decorative",
      "luxury",
      "import",
    ];

    categories.forEach((cat) => {
      renderSection(
        cat,
        grouped[cat] || [],
        "article-grid-3",
        renderCard,
        isSearch
      );
    });
  }

  function renderSection(
    sectionId,
    posts,
    gridClass,
    renderFn,
    isSearch = false
  ) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    if (!posts || posts.length === 0) {
      section.classList.add("hidden");
      return;
    }

    section.classList.remove("hidden");

    // Pagination logic
    if (postLimits[sectionId] === undefined) {
      postLimits[sectionId] = 3; // Default initial limit
    }

    const currentLimit = isSearch ? posts.length : postLimits[sectionId];
    const visiblePosts = posts.slice(0, currentLimit);
    const hasMore = !isSearch && posts.length > currentLimit;

    let container = section.querySelector(`.${gridClass}`);
    if (!container) return;

    container.innerHTML = ""; // Clear content
    visiblePosts.forEach((post) => {
      container.appendChild(renderFn(post));
    });

    // Handle Pagination Buttons
    let paginationContainer = section.querySelector(".pagination-container");
    const isExpanded = currentLimit > 3;

    if (hasMore || isExpanded) {
      if (!paginationContainer) {
        paginationContainer = document.createElement("div");
        paginationContainer.className = "pagination-container";
        section.appendChild(paginationContainer);
      }

      paginationContainer.innerHTML = "";

      if (isExpanded) {
        const showLessBtn = document.createElement("button");
        showLessBtn.className = "btn-pagination btn-show-less";
        showLessBtn.innerHTML = `
          <span data-i18n="blog.showLess">Show Less</span> <span class="material-symbols-outlined">expand_less</span>
        `;
        showLessBtn.addEventListener("click", () => {
          postLimits[sectionId] = 3;
          renderSection(sectionId, posts, gridClass, renderFn, isSearch);
          // Optional: Scroll back to section header
          section.scrollIntoView({ behavior: "smooth" });
        });
        paginationContainer.appendChild(showLessBtn);
      }

      if (hasMore) {
        const showMoreBtn = document.createElement("button");
        showMoreBtn.className = "btn-pagination btn-show-more";
        showMoreBtn.innerHTML = `
          <span data-i18n="blog.showMore">Show More</span> <span class="material-symbols-outlined">expand_more</span>
        `;
        showMoreBtn.addEventListener("click", () => {
          postLimits[sectionId] += 3;
          renderSection(sectionId, posts, gridClass, renderFn, isSearch);
        });
        paginationContainer.appendChild(showMoreBtn);
      }
      if (window.languageManager) {
        window.languageManager.applyLanguage(
          window.languageManager.currentLanguage
        );
      }
    } else if (paginationContainer) {
      paginationContainer.remove();
    }
  }

  // Template Generators
  function renderCard(post) {
    const article = document.createElement("article");
    article.className = "article-card";
    const lang = window.languageManager
      ? window.languageManager.currentLanguage
      : "en";
    const title = lang === "ka" ? post.title_ka || post.title : post.title;
    const excerpt =
      lang === "ka" ? post.excerpt_ka || post.excerpt : post.excerpt;

    article.innerHTML = `
            <div class="article-image">
                <div class="article-img-bg" style="background-image: url('${post.image}');"></div>
            </div>
            <div class="article-body">
                <div class="article-meta">
                    <span>${post.date}</span> • <span>${post.readTime}</span>
                </div>
                <h3 class="article-title">${title}</h3>
                <p class="article-excerpt">${excerpt}</p>
                <div class="article-footer">
                    <a href="article.html?id=${post.id}" class="article-link">
                        <span data-i18n="blog.readMore">Read Article</span> <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                </div>
            </div>
        `;
    article.style.cursor = "pointer";
    article.addEventListener("click", (e) => {
      if (!e.target.closest("a")) {
        window.location.href = `article.html?id=${post.id}`;
      }
    });
    return article;
  }

  // 3. Search Logic (Moved & Adaptive from blog-search.js)
  function initializeSearch() {
    function performSearch() {
      const query = searchInput.value.toLowerCase().trim();

      if (query === "") {
        // Reset to original view
        renderArticles(allArticles, false);
        return;
      }

      const filteredPosts = allArticles.filter((post) => {
        const title = post.title.toLowerCase();
        const excerpt = post.excerpt.toLowerCase();
        // search in content too if needed
        const content = post.content.toLowerCase();

        return (
          title.includes(query) ||
          excerpt.includes(query) ||
          content.includes(query)
        );
      });

      renderArticles(filteredPosts, true);
    }

    if (searchInput) {
      searchInput.addEventListener("input", performSearch);
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          performSearch();
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener("click", performSearch);
    }
  }

  // 4. Sidebar Navigation
  function initializeSidebar() {
    const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

    sidebarLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Remove active class from all links
        sidebarLinks.forEach((l) => l.classList.remove("active"));
        // Add active class to clicked link
        this.classList.add("active");

        // Optional: Close mobile menu if it was open (handled by main.js usually)
      });
    });
  }

  // 5. Language Event Listener
  if (window.languageManager) {
    window.addEventListener("languageChanged", (e) => {
      renderArticles(allArticles, false); // Re-render with new language
    });
  }
});
