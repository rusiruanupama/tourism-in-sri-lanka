document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  const loader =
    document.getElementById("loader");

  const header =
    document.getElementById("header");

  const nav =
    document.getElementById("nav");

  const menuToggle =
    document.getElementById("menuToggle");

  const themeToggle =
    document.getElementById("themeToggle");

  const langToggle =
    document.getElementById("langToggle");

  const backToTop =
    document.getElementById("backToTop");


  // =========================
  // LOADER
  // =========================

  setTimeout(() => {

    if (!loader) return;

    loader.classList.add("hide");

  }, 500);


  // =========================
  // HEADER
  // =========================

  function handleScroll() {

    if (header) {

      header.classList.toggle(
        "scrolled",
        window.scrollY > 40
      );

    }

    if (backToTop) {

      backToTop.classList.toggle(
        "show",
        window.scrollY > 500
      );

    }

  }

  window.addEventListener(
    "scroll",
    handleScroll
  );

  handleScroll();


  // =========================
  // MOBILE MENU
  // =========================

  if (menuToggle && nav) {

    menuToggle.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        nav.classList.toggle("open");

      }
    );

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove("open");

        }
      );

    });

    document.addEventListener(
      "click",
      event => {

        if (
          !nav.contains(event.target) &&
          !menuToggle.contains(event.target)
        ) {

          nav.classList.remove("open");

        }

      }
    );

  }


  // =========================
  // DARK MODE
  // =========================

  const savedTheme =
    localStorage.getItem(
      "tourism-theme"
    );

  if (savedTheme === "dark") {

    body.classList.add("dark");

  }

  function updateThemeIcon() {

    if (!themeToggle) return;

    themeToggle.textContent =
      body.classList.contains("dark")
        ? "☀️"
        : "🌙";

  }

  updateThemeIcon();

  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        body.classList.toggle("dark");

        localStorage.setItem(
          "tourism-theme",
          body.classList.contains("dark")
            ? "dark"
            : "light"
        );

        updateThemeIcon();

      }
    );

  }


  // =========================
  // LANGUAGE
  // =========================

  let language =
    localStorage.getItem(
      "tourism-language"
    ) || "en";

  function applyLanguage(lang) {

    language = lang;

    document
      .querySelectorAll("[data-en][data-si]")
      .forEach(element => {

        const text =
          element.getAttribute(
            `data-${lang}`
          );

        if (text) {

          element.textContent = text;

        }

      });

    if (langToggle) {

      langToggle.textContent =
        lang === "en"
          ? "සිං"
          : "EN";

    }

    const destinationSearch =
      document.getElementById(
        "destinationSearch"
      );

    const districtSearch =
      document.getElementById(
        "districtSearch"
      );

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

    localStorage.setItem(
      "tourism-language",
      lang
    );

  }

  applyLanguage(language);

  if (langToggle) {

    langToggle.addEventListener(
      "click",
      () => {

        applyLanguage(
          language === "en"
            ? "si"
            : "en"
        );

      }
    );

  }


  // =========================
  // DESTINATION FILTER
  // =========================

  const destinationSearch =
    document.getElementById(
      "destinationSearch"
    );

  const destinationCards =
    [
      ...document.querySelectorAll(
        ".destination-card"
      )
    ];

  const filterButtons =
    [
      ...document.querySelectorAll(
        ".filter-btn"
      )
    ];

  let activeFilter = "all";

  function filterDestinations() {

    const search =
      destinationSearch
        ? destinationSearch
            .value
            .toLowerCase()
            .trim()
        : "";

    destinationCards.forEach(card => {

      const title =
        (card.dataset.title || "")
          .toLowerCase();

      const description =
        (card.dataset.description || "")
          .toLowerCase();

      const categories =
        (card.dataset.category || "")
          .toLowerCase();

      const searchMatch =
        title.includes(search) ||
        description.includes(search);

      const categoryMatch =
        activeFilter === "all" ||
        categories.includes(
          activeFilter
        );

      card.style.display =
        searchMatch && categoryMatch
          ? ""
          : "none";

    });

  }

  if (destinationSearch) {

    destinationSearch.addEventListener(
      "input",
      filterDestinations
    );

  }

  filterButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(btn => {

          btn.classList.remove("active");

        });

        button.classList.add("active");

        activeFilter =
          button.dataset.filter || "all";

        filterDestinations();

      }
    );

  });


  // =========================
  // DESTINATION MODAL
  // =========================

  const destinationModal =
    document.getElementById(
      "destinationModal"
    );

  const modalImage =
    document.getElementById(
      "modalImage"
    );

  const modalTitle =
    document.getElementById(
      "modalTitle"
    );

  const modalDescription =
    document.getElementById(
      "modalDescription"
    );

  const modalClose =
    document.getElementById(
      "modalClose"
    );

  function openDestinationModal(card) {

    if (!destinationModal) return;

    const title =
      card.dataset.title ||
      "Destination";

    const description =
      card.dataset.description || "";

    const image =
      card.querySelector("img")
        ?.src || "";

    if (modalTitle) {

      modalTitle.textContent =
        title;

    }

    if (modalDescription) {

      modalDescription.textContent =
        description;

    }

    if (modalImage) {

      modalImage.src = image;
      modalImage.alt = title;

    }

    destinationModal
      .classList
      .add("active");

    body.classList.add(
      "modal-open"
    );

  }

  function closeDestinationModal() {

    if (!destinationModal) return;

    destinationModal
      .classList
      .remove("active");

    body.classList.remove(
      "modal-open"
    );

  }

  destinationCards.forEach(card => {

    const button =
      card.querySelector(
        ".details-btn"
      );

    if (button) {

      button.addEventListener(
        "click",
        () => {

          openDestinationModal(
            card
          );

        }
      );

    }

  });

  modalClose?.addEventListener(
    "click",
    closeDestinationModal
  );

  document
    .querySelector(
      "[data-close-modal]"
    )
    ?.addEventListener(
      "click",
      closeDestinationModal
    );


  // =========================
  // FAVORITES
  // =========================

  const favoritesGrid =
    document.getElementById(
      "favoritesGrid"
    );

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

  function updateFavoriteButtons() {

    destinationCards.forEach(card => {

      const title =
        card.dataset.title;

      const button =
        card.querySelector(
          ".favorite-btn"
        );

      if (!button) return;

      const exists =
        favorites.some(
          item =>
            item.title === title
        );

      button.textContent =
        exists
          ? "♥"
          : "♡";

      button.classList.toggle(
        "active",
        exists
      );

    });

  }

  function renderFavorites() {

    if (!favoritesGrid) return;

    if (favorites.length === 0) {

      favoritesGrid.innerHTML = `
        <div class="empty-state">
          <span>♡</span>
          <p>
            Add destinations to your favorites.
          </p>
        </div>
      `;

      return;

    }

    favoritesGrid.innerHTML =
      favorites
        .map(item => `

          <article class="favorite-item">

            <img
              src="${item.image}"
              alt="${item.title}"
            >

            <div
              class="favorite-item-content"
            >

              <h3>
                ${item.title}
              </h3>

              <p>
                ${item.description}
              </p>

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
      .querySelectorAll(
        ".remove-favorite"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            favorites =
              favorites.filter(
                item =>
                  item.title !==
                  button.dataset.title
              );

            saveFavorites();

            renderFavorites();

            updateFavoriteButtons();

          }
        );

      });

  }

  destinationCards.forEach(card => {

    const button =
      card.querySelector(
        ".favorite-btn"
      );

    if (!button) return;

    button.addEventListener(
      "click",
      () => {

        const title =
          card.dataset.title;

        const description =
          card.dataset.description;

        const image =
          card.querySelector("img")
            ?.src || "";

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


  // =========================
  // DISTRICT DATA
  // =========================

  const districtData = {

    Ampara: {
      province: "Eastern Province",
      description:
        "A diverse eastern district known for beaches, wildlife, lagoons and cultural sites.",
      attractions: [
        "Arugam Bay",
        "Kumana National Park",
        "Lahugala",
        "Muhudu Maha Viharaya"
      ]
    },

    Anuradhapura: {
      province:
        "North Central Province",
      description:
        "One of Sri Lanka's most important ancient capitals.",
      attractions: [
        "Sri Maha Bodhi",
        "Ruwanwelisaya",
        "Mihintale",
        "Isurumuniya"
      ]
    },

    Badulla: {
      province: "Uva Province",
      description:
        "Mountain landscapes, waterfalls and famous highland destinations.",
      attractions: [
        "Ella",
        "Nine Arches Bridge",
        "Dunhinda Falls",
        "Little Adam's Peak"
      ]
    },

    Batticaloa: {
      province: "Eastern Province",
      description:
        "Eastern coastal district known for lagoons and beaches.",
      attractions: [
        "Batticaloa Lagoon",
        "Kallady Beach",
        "Batticaloa Fort",
        "Pasikuda Area"
      ]
    },

    Colombo: {
      province:
        "Western Province",
      description:
        "Sri Lanka's commercial capital and largest urban tourism centre.",
      attractions: [
        "Galle Face Green",
        "Lotus Tower",
        "Independence Square",
        "Colombo National Museum"
      ]
    },

    Galle: {
      province:
        "Southern Province",
      description:
        "Historic coastal district famous for colonial heritage and beaches.",
      attractions: [
        "Galle Fort",
        "Unawatuna",
        "Jungle Beach",
        "Hikkaduwa"
      ]
    },

    Gampaha: {
      province:
        "Western Province",
      description:
        "Western district with coastal areas, wetlands and urban attractions.",
      attractions: [
        "Negombo Beach",
        "Negombo Lagoon",
        "Muthurajawela",
        "Kelaniya Temple"
      ]
    },

    Hambantota: {
      province:
        "Southern Province",
      description:
        "Wildlife and coastal landscapes in southern Sri Lanka.",
      attractions: [
        "Yala National Park",
        "Bundala",
        "Tissamaharama",
        "Kataragama Area"
      ]
    },

    Jaffna: {
      province:
        "Northern Province",
      description:
        "Northern cultural centre known for history, islands and food.",
      attractions: [
        "Jaffna Fort",
        "Nallur Temple",
        "Delft Island",
        "Point Pedro"
      ]
    },

    Kalutara: {
      province:
        "Western Province",
      description:
        "Coastal district with beaches, rivers and temples.",
      attractions: [
        "Kalutara Bodhiya",
        "Beruwala",
        "Bentota Area",
        "Richmond Castle"
      ]
    },

    Kandy: {
      province:
        "Central Province",
      description:
        "Sri Lanka's historic hill capital and cultural centre.",
      attractions: [
        "Temple of the Tooth",
        "Kandy Lake",
        "Peradeniya Gardens",
        "Udawattakele"
      ]
    },

    Kegalle: {
      province:
        "Sabaragamuwa Province",
      description:
        "Green landscapes, forests and cultural attractions.",
      attractions: [
        "Pinnawala",
        "Belilena Cave",
        "Alagalla",
        "Kitulgala Area"
      ]
    },

    Kilinochchi: {
      province:
        "Northern Province",
      description:
        "Northern district with reservoirs and peaceful landscapes.",
      attractions: [
        "Iranamadu Tank",
        "Kilinochchi War Memorial",
        "Elephant Pass",
        "Northern Countryside"
      ]
    },

    Kurunegala: {
      province:
        "North Western Province",
      description:
        "Historic north-western district surrounded by rocky landscapes.",
      attractions: [
        "Athugala",
        "Yapahuwa",
        "Ridi Viharaya",
        "Kurunegala Lake"
      ]
    },

    Mannar: {
      province:
        "Northern Province",
      description:
        "Island and coastal landscapes famous for birdlife and history.",
      attractions: [
        "Mannar Fort",
        "Adam's Bridge Area",
        "Baobab Tree",
        "Talaimannar"
      ]
    },

    Matale: {
      province:
        "Central Province",
      description:
        "Central district with heritage sites, mountains and spice gardens.",
      attractions: [
        "Dambulla Cave Temple",
        "Knuckles Range",
        "Nalanda Gedige",
        "Spice Gardens"
      ]
    },

    Matara: {
      province:
        "Southern Province",
      description:
        "Southern coastal district known for beaches and historic locations.",
      attractions: [
        "Mirissa",
        "Polhena Beach",
        "Dondra Head",
        "Matara Fort"
      ]
    },

    Monaragala: {
      province:
        "Uva Province",
      description:
        "Large rural district with archaeology, forests and mountains.",
      attractions: [
        "Buduruwagala",
        "Maligawila",
        "Gal Oya Area",
        "Yudaganawa"
      ]
    },

    Mullaitivu: {
      province:
        "Northern Province",
      description:
        "Quiet northern coastline with lagoons and natural scenery.",
      attractions: [
        "Mullaitivu Beach",
        "Nanthi Kadal",
        "Lagoons",
        "Northern Coast"
      ]
    },

    "Nuwara Eliya": {
      province:
        "Central Province",
      description:
        "Sri Lanka's famous highland district with tea estates and cool weather.",
      attractions: [
        "Gregory Lake",
        "Horton Plains",
        "World's End",
        "Tea Estates"
      ]
    },

    Polonnaruwa: {
      province:
        "North Central Province",
      description:
        "Ancient royal capital filled with archaeological monuments.",
      attractions: [
        "Gal Vihara",
        "Royal Palace",
        "Parakrama Samudra",
        "Vatadage"
      ]
    },

    Puttalam: {
      province:
        "North Western Province",
      description:
        "Coastal district known for lagoons, marine life and nature.",
      attractions: [
        "Kalpitiya",
        "Wilpattu Area",
        "Puttalam Lagoon",
        "Dutch Bay"
      ]
    },

    Ratnapura: {
      province:
        "Sabaragamuwa Province",
      description:
        "Sri Lanka's gem district and gateway to mountain adventures.",
      attractions: [
        "Adam's Peak",
        "Sinharaja Area",
        "Bopath Ella",
        "Gem Museums"
      ]
    },

    Trincomalee: {
      province:
        "Eastern Province",
      description:
        "Famous eastern coastal destination with beaches and natural harbour.",
      attractions: [
        "Nilaveli Beach",
        "Pigeon Island",
        "Koneswaram Temple",
        "Fort Frederick"
      ]
    },

    Vavuniya: {
      province:
        "Northern Province",
      description:
        "Northern district with historic and cultural attractions.",
      attractions: [
        "Vavuniya Museum",
        "Reservoirs",
        "Ancient Sites",
        "Northern Landscapes"
      ]
    }

  };


  // =========================
  // MAP EXPLORER
  // =========================

  const mapDistrictSelect =
    document.getElementById(
      "mapDistrictSelect"
    );

  const mapResult =
    document.getElementById(
      "mapResult"
    );

  function showDistrictResult(
    districtName
  ) {

    if (!mapResult) return;

    const data =
      districtData[districtName];

    if (!data) return;

    mapResult.innerHTML = `

      <div class="district-result">

        <div
          class="district-result-top"
        >

          <h3>
            ${districtName}
          </h3>

          <span
            class="province-badge"
          >
            ${data.province}
          </span>

        </div>

        <p
          class="district-description"
        >
          ${data.description}
        </p>

        <div class="attraction-list">

          ${data.attractions
            .map(
              attraction => `
                <div
                  class="attraction-item"
                >
                  📍 ${attraction}
                </div>
              `
            )
            .join("")}

        </div>

      </div>

    `;

  }

  mapDistrictSelect?.addEventListener(
    "change",
    () => {

      if (
        mapDistrictSelect.value
      ) {

        showDistrictResult(
          mapDistrictSelect.value
        );

      }

    }
  );


  // =========================
  // DISTRICT GRID
  // =========================

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

  if (districtSearch) {

    districtSearch.addEventListener(
      "input",
      () => {

        const search =
          districtSearch.value
            .toLowerCase()
            .trim();

        districtCards.forEach(card => {

          const name =
            card.textContent
              .toLowerCase();

          card.style.display =
            name.includes(search)
              ? ""
              : "none";

        });

      }
    );

  }


  // =========================
  // DISTRICT MODAL
  // =========================

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

  function openDistrictModal(
    districtName
  ) {

    const data =
      districtData[districtName];

    if (
      !districtModal ||
      !data
    ) return;

    districtModalTitle.textContent =
      districtName;

    districtModalDescription.innerHTML = `

      <strong>
        ${data.province}
      </strong>

      <br><br>

      ${data.description}

      <br><br>

      <strong>
        Popular attractions:
      </strong>

      <br>

      ${data.attractions.join(" • ")}

    `;

    districtModal
      .classList
      .add("active");

    body.classList.add(
      "modal-open"
    );

  }

  function closeDistrictModal() {

    if (!districtModal) return;

    districtModal
      .classList
      .remove("active");

    body.classList.remove(
      "modal-open"
    );

  }

  districtCards.forEach(card => {

    card.addEventListener(
      "click",
      () => {

        const districtName =
          card.textContent.trim();

        openDistrictModal(
          districtName
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


  // =========================
  // TRIP PLANNER
  // =========================

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

  const budgets = {

    value:
      "Budget-friendly accommodation and local transport.",

    comfort:
      "Comfortable hotels and flexible transport.",

    premium:
      "Premium hotels and private transport."

  };

  function updateDays() {

    if (
      !daysRange ||
      !daysOutput
    ) return;

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
    updateDays
  );

  updateDays();

  generateTrip?.addEventListener(
    "click",
    () => {

      if (
        !daysRange ||
        !travelStyle ||
        !budgetLevel ||
        !plannerResult
      ) return;

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

        itineraryHTML += `

          <div class="itinerary-day">

            <div class="day-number">
              DAY ${day}
            </div>

            <div>

              <h4>
                ${place}
              </h4>

              <p>
                Explore ${place},
                visit local attractions
                and enjoy your Sri Lanka journey.
              </p>

            </div>

          </div>

        `;

      }

      plannerResult.innerHTML = `

        <div class="itinerary-summary">

          <h3>
            ${days}-Day
            ${styleNames[style]}
            Trip
          </h3>

          <p>
            ${budgets[budget]}
          </p>

        </div>

        <div class="itinerary-list">

          ${itineraryHTML}

        </div>

      `;

    }
  );


  // =========================
  // BACK TO TOP
  // =========================

  backToTop?.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  // =========================
  // ESC MODALS
  // =========================

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeDestinationModal();

        closeDistrictModal();

      }

    }
  );


  // =========================
  // CURRENT YEAR
  // =========================

  const year =
    document.getElementById(
      "currentYear"
    );

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  console.log(
    "Tourism In Sri Lanka V5 READY 🇱🇰"
  );

});
