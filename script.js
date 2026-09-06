document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENTS
  // =========================
  const body = document.body;
  const header = document.getElementById("header");
  const loader = document.getElementById("loader");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const themeToggle = document.getElementById("themeToggle");
  const langToggle = document.getElementById("langToggle");
  const backToTop = document.getElementById("backToTop");

  // =========================
  // LOADER
  // =========================
  window.addEventListener("load", () => {
    if (!loader) return;

    setTimeout(() => {
      loader.classList.add("hide");

      setTimeout(() => {
        loader.style.display = "none";
      }, 400);
    }, 300);
  });

  // =========================
  // HEADER + BACK TO TOP
  // =========================
  function handleScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }

    if (backToTop) {
      backToTop.classList.toggle("show", window.scrollY > 500);
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // =========================
  // MOBILE MENU
  // =========================
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });

    document.addEventListener("click", e => {
      if (
        !nav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        nav.classList.remove("open");
      }
    });
  }

  // =========================
  // DARK MODE
  // =========================
  const savedTheme = localStorage.getItem("tourism-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  function updateThemeButton() {
    if (!themeToggle) return;

    themeToggle.textContent =
      body.classList.contains("dark") ? "☀️" : "🌙";
  }

  updateThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");

      localStorage.setItem(
        "tourism-theme",
        body.classList.contains("dark") ? "dark" : "light"
      );

      updateThemeButton();
    });
  }

  // =========================
  // LANGUAGE SWITCH
  // =========================
  let currentLanguage =
    localStorage.getItem("tourism-language") || "en";

  function applyLanguage(lang) {
    currentLanguage = lang;

    document.querySelectorAll("[data-en][data-si]").forEach(el => {
      const value = el.getAttribute(`data-${lang}`);

      if (value) {
        el.textContent = value;
      }
    });

    if (langToggle) {
      langToggle.textContent = lang === "en" ? "සිං" : "EN";
    }

    const destinationSearch =
      document.getElementById("destinationSearch");

    const districtSearch =
      document.getElementById("districtSearch");

    if (destinationSearch) {
      destinationSearch.placeholder =
        lang === "en"
          ? "Search destinations..."
          : "ගමනාන්ත සොයන්න...";
    }

    if (districtSearch) {
      districtSearch.placeholder =
        lang === "en"
          ? "Search a district..."
          : "දිස්ත්‍රික්කයක් සොයන්න...";
    }

    localStorage.setItem("tourism-language", lang);
  }

  applyLanguage(currentLanguage);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      applyLanguage(currentLanguage === "en" ? "si" : "en");
    });
  }

  // =========================
  // DESTINATION SEARCH + FILTER
  // =========================
  const destinationSearch =
    document.getElementById("destinationSearch");

  const destinationCards =
    [...document.querySelectorAll(".destination-card")];

  const filterButtons =
    [...document.querySelectorAll(".filter-btn")];

  let activeFilter = "all";

  function filterDestinations() {
    const search =
      destinationSearch?.value.toLowerCase().trim() || "";

    destinationCards.forEach(card => {
      const title =
        (card.dataset.title || "").toLowerCase();

      const description =
        (card.dataset.description || "").toLowerCase();

      const category =
        (card.dataset.category || "").toLowerCase();

      const matchesSearch =
        title.includes(search) ||
        description.includes(search);

      const matchesFilter =
        activeFilter === "all" ||
        category.includes(activeFilter);

      card.style.display =
        matchesSearch && matchesFilter ? "" : "none";
    });
  }

  if (destinationSearch) {
    destinationSearch.addEventListener(
      "input",
      filterDestinations
    );
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      activeFilter =
        button.dataset.filter || "all";

      filterDestinations();
    });
  });

  // =========================
  // DESTINATION MODAL
  // =========================
  const destinationModal =
    document.getElementById("destinationModal");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalDescription =
    document.getElementById("modalDescription");

  const modalImage =
    document.getElementById("modalImage");

  const modalClose =
    document.getElementById("modalClose");

  function openDestinationModal(card) {
    if (!destinationModal) return;

    const title = card.dataset.title || "Destination";
    const description = card.dataset.description || "";
    const image = card.querySelector("img")?.src || "";

    if (modalTitle) modalTitle.textContent = title;
    if (modalDescription) modalDescription.textContent = description;

    if (modalImage) {
      modalImage.src = image;
      modalImage.alt = title;
    }

    destinationModal.classList.add("active");
    body.style.overflow = "hidden";
  }

  function closeDestinationModal() {
    if (!destinationModal) return;

    destinationModal.classList.remove("active");
    body.style.overflow = "";
  }

  destinationCards.forEach(card => {
    const button =
      card.querySelector(".details-btn");

    if (button) {
      button.addEventListener("click", () => {
        openDestinationModal(card);
      });
    }
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeDestinationModal);
  }

  document
    .querySelector("[data-close-modal]")
    ?.addEventListener("click", closeDestinationModal);

  // =========================
  // FAVORITES
  // =========================
  const favoritesGrid =
    document.getElementById("favoritesGrid");

  let favorites = [];

  try {
    favorites =
      JSON.parse(
        localStorage.getItem("tourism-favorites")
      ) || [];
  } catch {
    favorites = [];
  }

  function saveFavorites() {
    localStorage.setItem(
      "tourism-favorites",
      JSON.stringify(favorites)
    );
  }

  function updateFavoriteButtons() {
    destinationCards.forEach(card => {
      const title = card.dataset.title || "";
      const button = card.querySelector(".favorite-btn");

      if (!button) return;

      const exists =
        favorites.some(item => item.title === title);

      button.textContent = exists ? "♥" : "♡";
      button.classList.toggle("active", exists);
    });
  }

  function renderFavorites() {
    if (!favoritesGrid) return;

    if (favorites.length === 0) {
      favoritesGrid.innerHTML = `
        <div class="empty-state">
          <span>♡</span>
          <p>Add destinations to your favorites.</p>
        </div>
      `;
      return;
    }

    favoritesGrid.innerHTML = favorites
      .map(item => `
        <article class="favorite-item">
          <img src="${item.image}" alt="${item.title}">

          <div class="favorite-item-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>

            <button
              class="remove-favorite"
              data-title="${item.title}"
            >
              Remove
            </button>
          </div>
        </article>
      `)
      .join("");

    favoritesGrid
      .querySelectorAll(".remove-favorite")
      .forEach(button => {
        button.addEventListener("click", () => {
          const title = button.dataset.title;

          favorites =
            favorites.filter(item => item.title !== title);

          saveFavorites();
          renderFavorites();
          updateFavoriteButtons();
        });
      });
  }

  destinationCards.forEach(card => {
    const favoriteButton =
      card.querySelector(".favorite-btn");

    if (!favoriteButton) return;

    favoriteButton.addEventListener("click", () => {
      const title = card.dataset.title || "";
      const description = card.dataset.description || "";
      const image = card.querySelector("img")?.src || "";

      const exists =
        favorites.some(item => item.title === title);

      if (exists) {
        favorites =
          favorites.filter(item => item.title !== title);
      } else {
        favorites.push({
          title,
          description,
          image
        });
      }

      saveFavorites();
      renderFavorites();
      updateFavoriteButtons();
    });
  });

  renderFavorites();
  updateFavoriteButtons();

  // =========================
  // DISTRICT SEARCH + MODAL
  // =========================
  const districtSearch =
    document.getElementById("districtSearch");

  const districtCards =
    [...document.querySelectorAll(".district-card")];

  const districtModal =
    document.getElementById("districtModal");

  const districtModalTitle =
    document.getElementById("districtModalTitle");

  const districtModalDescription =
    document.getElementById("districtModalDescription");

  const districtModalClose =
    document.getElementById("districtModalClose");

  const districtInfo = {
    Ampara: "Eastern beaches, lagoons, wildlife and cultural attractions.",
    Anuradhapura: "Ancient city famous for stupas, temples and sacred sites.",
    Badulla: "Highlands, waterfalls and beautiful mountain landscapes.",
    Batticaloa: "Eastern beaches, lagoons and cultural attractions.",
    Colombo: "Sri Lanka's commercial capital with shopping, food and city attractions.",
    Galle: "Historic Galle Fort and beautiful southern beaches.",
    Gampaha: "Urban centres, wetlands and easy access to Colombo.",
    Hambantota: "Wildlife parks and southern coastal scenery.",
    Jaffna: "Northern culture, historic sites, islands and unique food.",
    Kalutara: "Beaches, rivers, temples and coastal resorts.",
    Kandy: "Cultural capital and home of the Temple of the Tooth.",
    Kegalle: "Green landscapes, plantations and waterfalls.",
    Kilinochchi: "Reservoirs and peaceful northern landscapes.",
    Kurunegala: "Rocky landscapes and historic attractions.",
    Mannar: "Coastal scenery, islands and birdlife.",
    Matale: "Dambulla, spice gardens and mountain scenery.",
    Matara: "Southern beaches and coastal attractions.",
    Monaragala: "Forests, mountains and archaeological locations.",
    Mullaitivu: "Quiet beaches, lagoons and natural scenery.",
    "Nuwara Eliya": "Tea estates, cool climate and highland scenery.",
    Polonnaruwa: "Ancient royal city with historic ruins.",
    Puttalam: "Kalpitiya, lagoons, beaches and nature reserves.",
    Ratnapura: "Gem city, waterfalls and gateway to Adam's Peak.",
    Trincomalee: "Beaches, natural harbour and marine attractions.",
    Vavuniya: "Northern cultural sites and reservoirs."
  };

  if (districtSearch) {
    districtSearch.addEventListener("input", () => {
      const search =
        districtSearch.value.toLowerCase().trim();

      districtCards.forEach(card => {
        const name =
          card.textContent.toLowerCase();

        card.style.display =
          name.includes(search) ? "" : "none";
      });
    });
  }

  function openDistrict(name) {
    if (!districtModal) return;

    if (districtModalTitle) {
      districtModalTitle.textContent = name;
    }

    if (districtModalDescription) {
      districtModalDescription.textContent =
        districtInfo[name] ||
        `Explore ${name} District in Sri Lanka.`;
    }

    districtModal.classList.add("active");
    body.style.overflow = "hidden";
  }

  function closeDistrict() {
    if (!districtModal) return;

    districtModal.classList.remove("active");
    body.style.overflow = "";
  }

  districtCards.forEach(card => {
    card.addEventListener("click", () => {
      openDistrict(card.textContent.trim());
    });
  });

  if (districtModalClose) {
    districtModalClose.addEventListener("click", closeDistrict);
  }

  document
    .querySelector("[data-close-district]")
    ?.addEventListener("click", closeDistrict);

  // =========================
  // TRIP PLANNER
  // =========================
  const daysRange =
    document.getElementById("daysRange");

  const daysOutput =
    document.getElementById("daysOutput");

  const travelStyle =
    document.getElementById("travelStyle");

  const budgetLevel =
    document.getElementById("budgetLevel");

  const generateTrip =
    document.getElementById("generateTrip");

  const plannerResult =
    document.getElementById("plannerResult");

  const routes = {
    classic: [
      "Colombo",
      "Sigiriya",
      "Kandy",
      "Nuwara Eliya",
      "Ella",
      "Yala",
      "Galle",
      "Mirissa"
    ],

    nature: [
      "Sinharaja",
      "Udawalawe",
      "Ella",
      "Horton Plains",
      "Nuwara Eliya",
      "Yala"
    ],

    beach: [
      "Negombo",
      "Bentota",
      "Hikkaduwa",
      "Galle",
      "Mirissa",
      "Arugam Bay",
      "Trincomalee"
    ],

    culture: [
      "Anuradhapura",
      "Polonnaruwa",
      "Sigiriya",
      "Dambulla",
      "Kandy",
      "Galle"
    ],

    adventure: [
      "Kitulgala",
      "Knuckles",
      "Ella",
      "Horton Plains",
      "Arugam Bay",
      "Yala"
    ]
  };

  const styleNames = {
    classic: "Classic Highlights",
    nature: "Nature & Wildlife",
    beach: "Beaches & Coast",
    culture: "History & Culture",
    adventure: "Adventure"
  };

  const budgets = {
    value: "Budget-friendly accommodation and local transport.",
    comfort: "Comfortable hotels and flexible transport.",
    premium: "Premium hotels and private transport."
  };

  function updateDays() {
    if (!daysRange || !daysOutput) return;

    const days = Number(daysRange.value);

    daysOutput.textContent =
      `${days} ${days === 1 ? "Day" : "Days"}`;
  }

  if (daysRange) {
    daysRange.addEventListener("input", updateDays);
  }

  updateDays();

  if (generateTrip) {
    generateTrip.addEventListener("click", () => {
      if (
        !daysRange ||
        !travelStyle ||
        !budgetLevel ||
        !plannerResult
      ) return;

      const days = Number(daysRange.value);
      const style = travelStyle.value;
      const budget = budgetLevel.value;

      const route =
        routes[style] || routes.classic;

      let html = "";

      for (let day = 1; day <= days; day++) {
        const place =
          route[(day - 1) % route.length];

        html += `
          <div class="itinerary-day">
            <div class="day-number">
              Day ${day}
            </div>

            <div>
              <h4>${place}</h4>
              <p>
                Explore ${place}, visit local attractions
                and enjoy your Sri Lanka journey.
              </p>
            </div>
          </div>
        `;
      }

      plannerResult.innerHTML = `
        <div class="itinerary-summary">
          <h3>
            ${days}-Day ${styleNames[style]} Trip
          </h3>

          <p>${budgets[budget]}</p>
        </div>

        <div class="itinerary-list">
          ${html}
        </div>
      `;
    });
  }

  // =========================
  // BACK TO TOP
  // =========================
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // =========================
  // ESC CLOSE MODALS
  // =========================
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeDestinationModal();
      closeDistrict();
    }
  });

  // =========================
  // YEAR
  // =========================
  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }

  console.log("Tourism In Sri Lanka V4 READY 🇱🇰");

});
