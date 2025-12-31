document.addEventListener("DOMContentLoaded", function () {
  const blogContainer = document.querySelector(".main-content");

  // We will store all articles here for search functionality
  let allArticles = [];

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
    })
    .catch((error) => {
      console.error("Error fetching blog posts:", error);
      // Optionally show error message in UI
    });

  // 2. Render Functions
  function renderArticles(posts) {
    // Clear existing content if needed, but we structure by sections
    // We assume sections exist in HTML with specific IDs: architecture, sod, irrigation, luxury, import

    // Group posts by category to easily target sections
    const postsByCategory = posts.reduce((acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = [];
      }
      acc[post.category].push(post);
      return acc;
    }, {});

    // Architecture Section
    renderSection(
      "architecture",
      postsByCategory["architecture"],
      "article-grid-3",
      renderCard
    );

    // Sod Section
    renderSection(
      "sod",
      postsByCategory["sod"],
      "article-grid-2",
      renderHorizontal
    );

    // Irrigation Section
    renderSection(
      "irrigation",
      postsByCategory["irrigation"],
      "article-grid-3",
      renderCompact
    );

    // Luxury Section
    renderSection("luxury", postsByCategory["luxury"], null, renderFeatured);

    // Import Section
    renderSection(
      "import",
      postsByCategory["import"],
      "article-grid-2",
      renderList
    );
  }

  function renderSection(sectionId, posts, gridClass, renderFn) {
    if (!posts) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    let container = section.querySelector(`.${gridClass}`);
    if (!gridClass) {
      const existing = section.querySelectorAll("article");
      existing.forEach((el) => el.remove());

      posts.forEach((post) => {
        section.appendChild(renderFn(post));
      });
      return;
    }

    if (container) {
      container.innerHTML = ""; // Clear static content
      posts.forEach((post) => {
        container.appendChild(renderFn(post));
      });
    }
  }

  // Template Generators
  function renderCard(post) {
    const article = document.createElement("article");
    article.className = "article-card";
    article.innerHTML = `
            <div class="article-image">
                <div class="article-img-bg" style="background-image: url('${post.image}');"></div>
            </div>
            <div class="article-body">
                <div class="article-meta">
                    <span>${post.date}</span> • <span>${post.readTime}</span>
                </div>
                <h3 class="article-title">${post.title}</h3>
                <p class="article-excerpt">${post.excerpt}</p>
                <div class="article-footer">
                    <a href="article.html?id=${post.id}" class="article-link">
                        Read Article <span class="material-symbols-outlined">arrow_forward</span>
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

  function renderHorizontal(post) {
    const article = document.createElement("article");
    article.className = "article-horizontal";
    article.innerHTML = `
            <div class="article-h-image">
                <div class="article-img-bg" style="background-image: url('${post.image}');"></div>
            </div>
            <div class="article-h-body">
                <div class="article-meta">
                    <span>${post.date}</span>
                </div>
                <h3 class="article-h-title">${post.title}</h3>
                <p class="article-h-excerpt">${post.excerpt}</p>
                <a href="article.html?id=${post.id}" class="article-link">
                    Read Article <span class="material-symbols-outlined">arrow_forward</span>
                </a>
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

  function renderCompact(post) {
    const article = document.createElement("article");
    article.className = "article-compact";
    article.innerHTML = `
            <div class="article-compact-image">
                <div class="article-img-bg" style="background-image: url('${
                  post.image
                }');"></div>
            </div>
            <h3 class="article-compact-title">${post.title}</h3>
            <p class="article-compact-excerpt">${post.excerpt}</p>
            <span class="article-tag">${post.tag || ""}</span>
        `;
    article.style.cursor = "pointer";
    article.addEventListener("click", () => {
      window.location.href = `article.html?id=${post.id}`;
    });
    return article;
  }

  function renderFeatured(post) {
    const article = document.createElement("article");
    article.className = "article-featured";
    article.innerHTML = `
            <div class="featured-bg" style="background-image: url('${
              post.image
            }');"></div>
            <div class="featured-overlay"></div>
            <div class="featured-content">
                <div class="featured-meta">
                    <span class="featured-badge">${post.badge}</span>
                    <span>${post.subMeta || ""}</span>
                </div>
                <h3 class="featured-title">${post.title}</h3>
                <p class="featured-excerpt">${post.excerpt}</p>
                <a href="article.html?id=${post.id}" class="featured-btn">
                    Read Full Feature <span class="material-symbols-outlined">arrow_forward</span>
                </a>
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

  function renderList(post) {
    const article = document.createElement("article");
    article.className = "article-list";
    article.innerHTML = `
            <div class="article-list-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="article-list-body">
                <h3 class="article-list-title">${post.title}</h3>
                <p class="article-list-excerpt">${post.excerpt}</p>
            </div>
        `;
    article.style.cursor = "pointer";
    article.addEventListener("click", () => {
      window.location.href = `article.html?id=${post.id}`;
    });
    return article;
  }

  // 3. Search Logic (Moved & Adaptive from blog-search.js)
  function initializeSearch() {
    const articleSelectors = [
      ".article-card",
      ".article-horizontal",
      ".article-compact",
      ".article-featured",
      ".article-list",
    ];

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
            article
              .querySelector(".featured-badge")
              ?.textContent.toLowerCase() || "";
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
});
