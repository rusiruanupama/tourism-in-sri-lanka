document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("header");
  const loader = document.getElementById("loader");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const themeToggle = document.getElementById("themeToggle");
  const langToggle = document.getElementById("langToggle");
  const backToTop = document.getElementById("backToTop");

  /* =========================
     Loader
  ========================== */
  window.addEventListener("load", () => {
    if (loader) {
      setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
          loader.style.display = "none";
        }, 450);
      }, 300);
    }
  });

  /* =========================
     Header scroll
  ========================== */
  const updateHeader = () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
      backToTop?.classList.add("show");
    } else {
      backToTop?.classList.remove("show");
    }
  };

  window.addEventListener("scroll", updateHeader);
  updateHeader();

  /* =========================
     Mobile menu
  ========================== */
  menuToggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

  document.addEventListener("click", e => {
    if (
      nav &&
      menuToggle &&
      !nav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      nav.classList.remove("open");
    }
  });

  /* =========================
     Dark mode
  ========================== */
  const savedTheme = localStorage.getItem("tourism-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem(
      "tourism-theme",
      isDark ? "dark" : "light"
    );
  });

  /* =========================
     Language switch
  ========================== */
  let currentLanguage =
    localStorage.getItem("tourism-language") || "en";

  function applyLanguage(language) {
    currentLanguage = language;

    document.querySelectorAll("[data-en][data-si]").forEach(element => {
      const text = element.getAttribute(`data-${language}`);

      if (text) {
        element.textContent = text;
      }
    });

    if (langToggle) {
      langToggle.textContent = language === "en" ? "සිං" : "EN";
    }

    const destinationSearch =
      document.getElementById("destinationSearch");

    const districtSearch =
      document.getElementById("districtSearch");

    if (destinationSearch) {
      destinationSearch.placeholder =
        language === "en"
          ? "Search destinations..."
          : "ගමනාන්ත සොයන්න...";
    }

    if (districtSearch) {
      districtSearch.placeholder =
        language === "en"
          ? "Search a district..."
          : "දිස්ත්‍රික්කයක් සොයන්න...";
    }

    localStorage.setItem("tourism-language", language);
  }

  applyLanguage(currentLanguage);

  langToggle?.addEventListener("click", () => {
    applyLanguage(
      currentLanguage === "en" ? "si" : "en"
    );
  });

  /* =========================
     Smooth scrolling
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        const offset = 70;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /* =========================
     Destination search/filter
  ========================== */
  const destinationSearch =
    document.getElementById("destinationSearch");

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const destinationCards =
    [...document.querySelectorAll(".destination-card")];

  let activeFilter = "all";

  function filterDestinations() {
    const searchText =
      destinationSearch?.value
        .toLowerCase()
        .trim() || "";

    destinationCards.forEach(card => {
      const title =
        card.dataset.title?.toLowerCase() || "";

      const description =
        card.dataset.description?.toLowerCase() || "";

      const categories =
        card.dataset.category?.toLowerCase() || "";

      const matchesSearch =
        title.includes(searchText) ||
        description.includes(searchText);

      const matchesFilter =
        activeFilter === "all" ||
        categories.includes(activeFilter);

      card.style.display =
        matchesSearch && matchesFilter
          ? ""
          : "none";
    });
  }

  destinationSearch?.addEventListener(
    "input",
    filterDestinations
  );

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

  /* =========================
     Destination modal
  ========================== */
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
    const title =
      card.dataset.title || "Destination";

    const description =
      card.dataset.description || "";

    const image =
      card.querySelector("img")?.src || "";

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalDescription) {
      modalDescription.textContent =
        description;
    }

    if (modalImage) {
      modalImage.src = image;
      modalImage.alt = title;
    }

    destinationModal?.classList.add("active");
    destinationModal?.setAttribute(
      "aria-hidden",
      "false"
    );

    body.style.overflow = "hidden";
  }

  function closeDestinationModal() {
    destinationModal?.classList.remove("active");
    destinationModal?.setAttribute(
      "aria-hidden",
      "true"
    );

    body.style.overflow = "";
  }

  destinationCards.forEach(card => {
    const detailsButton =
      card.querySelector(".details-btn");

    detailsButton?.addEventListener(
      "click",
      () => openDestinationModal(card)
    );
  });

  modalClose?.addEventListener(
    "click",
    closeDestinationModal
  );

  document
    .querySelector("[data-close-modal]")
    ?.addEventListener(
      "click",
      closeDestinationModal
    );

  /* =========================
     Favorites
  ========================== */
  const favoritesGrid =
    document.getElementById("favoritesGrid");

  let favorites = [];

  try {
    favorites =
      JSON.parse(
        localStorage.getItem(
          "tourism-favorites"
        )
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

    favoritesGrid.innerHTML =
      favorites
        .map(
          item => `
        <article class="favorite-item">
          <img
            src="${item.image}"
            alt="${item.title}"
          />

          <div class="favorite-item-content">
            <h3>${item.title}</h3>

            <p>${item.description}</p>

            <button
              class="remove-favorite"
              data-remove="${item.title}"
            >
              Remove
            </button>
          </div>
        </article>
      `
        )
        .join("");

    favoritesGrid
      .querySelectorAll(
        ".remove-favorite"
      )
      .forEach(button => {
        button.addEventListener(
          "click",
          () => {
            const title =
              button.dataset.remove;

            favorites =
              favorites.filter(
                item =>
                  item.title !== title
              );

            saveFavorites();
            renderFavorites();
            updateFavoriteButtons();
          }
        );
      });
  }

  function updateFavoriteButtons() {
    destinationCards.forEach(card => {
      const title =
        card.dataset.title;

      const button =
        card.querySelector(
          ".favorite-btn"
        );

      const isFavorite =
        favorites.some(
          item =>
            item.title === title
        );

      if (button) {
        button.classList.toggle(
          "active",
          isFavorite
        );

        button.textContent =
          isFavorite ? "♥" : "♡";
      }
    });
  }

  destinationCards.forEach(card => {
    const favoriteButton =
      card.querySelector(
        ".favorite-btn"
      );

    favoriteButton?.addEventListener(
      "click",
      e => {
        e.stopPropagation();

        const title =
          card.dataset.title || "";

        const description =
          card.dataset.description || "";

        const image =
          card.querySelector("img")?.src || "";

        const exists =
          favorites.some(
            item =>
              item.title === title
          );

        if (exists) {
          favorites =
            favorites.filter(
              item =>
                item.title !== title
            );
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
      }
    );
  });

  renderFavorites();
  updateFavoriteButtons();

  /* =========================
     District explorer
  ========================== */
  const districtSearch =
    document.getElementById(
      "districtSearch"
    );

  const districtCards =
    [
      ...document.querySelectorAll(
        ".district-card"
      )
    ];

  const districtModal =
    document.getElementById(
      "districtModal"
    );

  const districtModalTitle =
    document.getElementById(
      "districtModalTitle"
    );

  const districtModalDescription =
    document.getElementById(
      "districtModalDescription"
    );

  const districtModalClose =
    document.getElementById(
      "districtModalClose"
    );

  const districtInfo = {
    Ampara:
      "Known for eastern beaches, lagoons, wildlife areas and cultural diversity.",

    Anuradhapura:
      "An ancient capital famous for stupas, sacred sites and archaeological heritage.",

    Badulla:
      "A beautiful highland district featuring Ella, waterfalls and mountain scenery.",

    Batticaloa:
      "Known for lagoons, beaches and the cultural heritage of Sri Lanka’s eastern coast.",

    Colombo:
      "Sri Lanka’s commercial capital with shopping, dining, museums and modern city attractions.",

    Galle:
      "Home to the historic Galle Fort, beaches and beautiful southern coastal scenery.",

    Gampaha:
      "A western district with urban centres, wetlands, temples and easy access to Colombo.",

    Hambantota:
      "Known for national parks, coastal landscapes and wildlife experiences.",

    Jaffna:
      "A northern cultural centre known for historic sites, islands and unique local cuisine.",

    Kalutara:
      "A coastal district famous for beaches, rivers, temples and resort areas.",

    Kandy:
      "Sri Lanka’s cultural capital, home to the Temple of the Tooth and scenic hills.",

    Kegalle:
      "A green district known for plantations, waterfalls and elephant-related attractions.",

    Kilinochchi:
      "A northern district with peaceful landscapes, reservoirs and developing attractions.",

    Kurunegala:
      "Known for rocky landscapes, historic places and important cultural sites.",

    Mannar:
      "Famous for coastal scenery, historic ruins, islands and birdlife.",

    Matale:
      "Home to Dambulla, spice gardens, mountains and access to the Cultural Triangle.",

    Matara:
      "A southern coastal district with beaches, temples and scenic ocean views.",

    Monaragala:
      "A large southeastern district featuring forests, mountains and archaeological sites.",

    Mullaitivu:
      "A northeastern coastal district with beaches, lagoons and quiet natural landscapes.",

    "Nuwara Eliya":
      "Known for tea estates, cool weather, colonial architecture and highland beauty.",

    Polonnaruwa:
      "An ancient royal city with impressive ruins, monuments and archaeological sites.",

    Puttalam:
      "Known for lagoons, beaches, nature reserves and the Kalpitiya peninsula.",

    Ratnapura:
      "Sri Lanka’s gem-producing region and a gateway to forests, waterfalls and Adam’s Peak.",

    Trincomalee:
      "Famous for beautiful beaches, natural harbour, temples and marine activities.",

    Vavuniya:
      "A northern gateway district featuring cultural sites, reservoirs and local history."
  };

  districtSearch?.addEventListener(
    "input",
    () => {
      const searchText =
        districtSearch.value
          .toLowerCase()
          .trim();

      districtCards.forEach(card => {
        const name =
          card.textContent
            .toLowerCase();

        card.style.display =
          name.includes(searchText)
            ? ""
            : "none";
      });
    }
  );

  function openDistrictModal(name) {
    if (districtModalTitle) {
      districtModalTitle.textContent =
        name;
    }

    if (
      districtModalDescription
    ) {
      districtModalDescription.textContent =
        districtInfo[name] ||
        `Explore ${name} District in Sri Lanka.`;
    }

    districtModal?.classList.add(
      "active"
    );

    districtModal?.setAttribute(
      "aria-hidden",
      "false"
    );

    body.style.overflow = "hidden";
  }

  function closeDistrictModal() {
    districtModal?.classList.remove(
      "active"
    );

    districtModal?.setAttribute(
      "aria-hidden",
      "true"
    );

    body.style.overflow = "";
  }

  districtCards.forEach(card => {
    card.addEventListener(
      "click",
      () => {
        openDistrictModal(
          card.textContent.trim()
        );
      }
    );
  });

  districtModalClose?.addEventListener(
    "click",
    closeDistrictModal
  );

  document
    .querySelector(
      "[data-close-district]"
    )
    ?.addEventListener(
      "click",
      closeDistrictModal
    );

  /* =========================
     Close modal with ESC
  ========================== */
  document.addEventListener(
    "keydown",
    e => {
      if (e.key === "Escape") {
        closeDestinationModal();
        closeDistrictModal();
      }
    }
  );

  /* =========================
     Trip planner
  ========================== */
  const daysRange =
    document.getElementById(
      "daysRange"
    );

  const daysOutput =
    document.getElementById(
      "daysOutput"
    );

  const travelStyle =
    document.getElementById(
      "travelStyle"
    );

  const budgetLevel =
    document.getElementById(
      "budgetLevel"
    );

  const generateTrip =
    document.getElementById(
      "generateTrip"
    );

  const plannerResult =
    document.getElementById(
      "plannerResult"
    );

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
      "Yala",
      "Knuckles"
    ],

    beach: [
      "Negombo",
      "Bentota",
      "Hikkaduwa",
      "Galle",
      "Unawatuna",
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
      "Yala",
      "Sinharaja"
    ]
  };

  const styleTitles = {
    classic:
      "Classic Highlights",

    nature:
      "Nature & Wildlife",

    beach:
      "Beaches & Coast",

    culture:
      "History & Culture",

    adventure:
      "Adventure"
  };

  const budgetDescriptions = {
    value:
      "Budget-friendly stays, public transport and local dining.",

    comfort:
      "Comfortable hotels, a mix of private and public transport, and flexible dining.",

    premium:
      "Premium hotels, private transport and higher-end travel experiences."
  };

  function updateDaysOutput() {
    if (!daysRange || !daysOutput)
      return;

    const days =
      Number(daysRange.value);

    daysOutput.textContent =
      `${days} ${
        days === 1
          ? "Day"
          : "Days"
      }`;
  }

  daysRange?.addEventListener(
    "input",
    updateDaysOutput
  );

  updateDaysOutput();

  generateTrip?.addEventListener(
    "click",
    () => {
      if (
        !daysRange ||
        !travelStyle ||
        !budgetLevel ||
        !plannerResult
      )
        return;

      const days =
        Number(daysRange.value);

      const style =
        travelStyle.value;

      const budget =
        budgetLevel.value;

      const route =
        routes[style] ||
        routes.classic;

      let itineraryHTML = "";

      for (
        let day = 1;
        day <= days;
        day++
      ) {
        const place =
          route[
            (day - 1) %
              route.length
          ];

        const nextPlace =
          route[
            day %
              route.length
          ];

        itineraryHTML += `
          <div class="itinerary-day">
            <div class="day-number">
              Day ${day}
            </div>

            <div>
              <h4>${place}</h4>

              <p>
                Explore ${place},
                enjoy local attractions
                and prepare for the
                next part of your trip
                ${
                  day < days
                    ? `towards ${nextPlace}.`
                    : "."
                }
              </p>
            </div>
          </div>
        `;
      }

      plannerResult.innerHTML = `
        <div class="itinerary-summary">
          <h3>
            ${days}-Day
            ${styleTitles[style]}
            Trip
          </h3>

          <p>
            ${
              budgetDescriptions[
                budget
              ]
            }
          </p>
        </div>

        <div class="itinerary-list">
          ${itineraryHTML}
        </div>
      `;
    }
  );

  /* =========================
     Reveal animations
  ========================== */
  const revealTargets =
    document.querySelectorAll(
      ".section-head, .destination-card, .district-card, .experience-card, .season-card, .info-card, .emergency-card, .quick-card, .resource-box"
    );

  revealTargets.forEach(
    element =>
      element.classList.add(
        "reveal"
      )
  );

  if (
    "IntersectionObserver"
      in window
  ) {
    const revealObserver =
      new IntersectionObserver(
        entries => {
          entries.forEach(
            entry => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "visible"
                );

                revealObserver.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.12
        }
      );

    revealTargets.forEach(
      element =>
        revealObserver.observe(
          element
        )
    );
  } else {
    revealTargets.forEach(
      element =>
        element.classList.add(
          "visible"
        )
    );
  }

  /* =========================
     Back to top
  ========================== */
  backToTop?.addEventListener(
    "click",
    () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );

  /* =========================
     Current year
  ========================== */
  const currentYear =
    document.getElementById(
      "currentYear"
    );

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }

  /* =========================
     Image fallback
  ========================== */
  document
    .querySelectorAll("img")
    .forEach(image => {
      image.addEventListener(
        "error",
        () => {
          image.style.background =
            "linear-gradient(135deg, #d9eee5, #f3e8c9)";

          image.alt =
            image.alt ||
            "Sri Lanka";
        }
      );
    });

  console.log(
    "Tourism In Sri Lanka V4 loaded 🇱🇰"
  );
});
