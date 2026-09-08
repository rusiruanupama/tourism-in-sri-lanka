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
// =========================
// V6 INTERACTIVE MAP
// =========================

const visualDistrictButtons = [
  ...document.querySelectorAll(".map-district")
];

const mapResetBtn =
  document.getElementById("mapResetBtn");


function selectDistrictV6(districtName) {

  if (
    !districtName ||
    !districtData[districtName]
  ) {
    return;
  }

  // Highlight selected district
  visualDistrictButtons.forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.district === districtName
    );

  });


  // Update select menu
  if (mapDistrictSelect) {

    mapDistrictSelect.value =
      districtName;

  }


  // Show district information
  showDistrictResult(
    districtName
  );

}


/* =========================
   MAP DISTRICT BUTTONS
   ========================= */

visualDistrictButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const district =
        button.dataset.district;

      selectDistrictV6(
        district
      );

    }
  );

});


/* =========================
   SELECT MENU SYNC
   ========================= */

if (mapDistrictSelect) {

  mapDistrictSelect.addEventListener(
    "change",
    () => {

      const selected =
        mapDistrictSelect.value;

      visualDistrictButtons.forEach(
        button => {

          button.classList.toggle(
            "active",
            button.dataset.district === selected
          );

        }
      );

    }
  );

}


/* =========================
   RESET MAP
   ========================= */

if (mapResetBtn) {

  mapResetBtn.addEventListener(
    "click",
    () => {

      // Remove active state
      visualDistrictButtons.forEach(
        button => {

          button.classList.remove(
            "active"
          );

        }
      );


      // Reset select
      if (mapDistrictSelect) {

        mapDistrictSelect.value = "";

      }


      // Reset result area
      if (mapResult) {

        mapResult.innerHTML = `

          <div class="map-placeholder">

            <span>
              🗺️
            </span>

            <h3>
              Explore Sri Lanka
            </h3>

            <p>
              Select a district to see its province,
              travel highlights and popular attractions.
            </p>

          </div>

        `;

      }

    }
  );

}


// =========================
// V6 SCROLL REVEAL
// =========================

const revealElements = [

  ...document.querySelectorAll(

    `
    .section-head,
    .quick-card,
    .destination-card,
    .experience-card,
    .info-card,
    .district-card,
    .planner-form,
    .planner-result,
    .v6-map-card,
    .v6-map-side
    `

  )

];


// Add reveal class
revealElements.forEach(
  element => {

    element.classList.add(
      "reveal"
    );

  }
);


// Check browser support
if (
  "IntersectionObserver" in window
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

        threshold: 0.08,

        rootMargin:
          "0px 0px -35px 0px"

      }

    );


  revealElements.forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  // Fallback for old browsers
  revealElements.forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );

}


// =========================
// V6 MAP KEYBOARD SUPPORT
// =========================

visualDistrictButtons.forEach(
  button => {

    button.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          selectDistrictV6(
            button.dataset.district
          );

        }

      }
    );

  }
);


// =========================
// V6 ACTIVE MAP SYNC
// =========================

function syncMapDistrict(
  districtName
) {

  visualDistrictButtons.forEach(
    button => {

      button.classList.toggle(

        "active",

        button.dataset.district ===
          districtName

      );

    }
  );

}


// =========================
// V6 DISTRICT GRID → MAP
// =========================

document
  .querySelectorAll(
    ".district-card"
  )
  .forEach(
    card => {

      card.addEventListener(
        "click",
        () => {

          const districtName =
            card.textContent.trim();

          syncMapDistrict(
            districtName
          );

        }
      );

    }
  );


// =========================
// V6 MAP TOOLTIP
// =========================

visualDistrictButtons.forEach(
  button => {

    const district =
      button.dataset.district;

    const data =
      districtData[district];

    if (!data) {
      return;
    }

    button.title =
      `${district} • ${data.province}`;

  }
);


// =========================
// V6 INITIAL STATE
// =========================

visualDistrictButtons.forEach(
  button => {

    button.setAttribute(
      "type",
      "button"
    );

    button.setAttribute(
      "aria-label",
      `Explore ${button.dataset.district} District`
    );

  }
);


// =========================
// V6 READY
// =========================

console.log(
  "Tourism In Sri Lanka V6 READY 🇱🇰"
);
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
/* =========================================================
   V7 DESTINATION TRAVEL GUIDE
   ========================================================= */

const destinationGuideData = {

  "Sigiriya": {
    district: "Matale",
    province: "Central Province",
    category: "Heritage / UNESCO",
    bestTime: "January to April is usually a comfortable period for visiting, especially early in the morning.",
    description:
      "Sigiriya is one of Sri Lanka's most famous historic landmarks. The ancient rock fortress rises dramatically above the surrounding plains and is known for its archaeological remains, landscaped gardens, defensive structures, frescoes and panoramic summit views. The site is closely connected with the reign of King Kashyapa and today remains one of the country's most important cultural attractions.",

    highlights: [
      "Ancient Rock Fortress",
      "Water Gardens",
      "Frescoes",
      "Mirror Wall",
      "Lion's Paw Entrance",
      "Panoramic Summit Views"
    ],

    tips: [
      "Visit early in the morning to avoid strong midday heat.",
      "Wear comfortable shoes because the climb includes many steps.",
      "Carry drinking water.",
      "Allow enough time to explore both the gardens and the summit."
    ],

    nearby: [
      "Pidurangala",
      "Dambulla",
      "Minneriya National Park",
      "Habarana"
    ],

    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sigiriya%20Sri%20lanka.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sigiriya%20Rock%20Fortress.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sigiriya%20Gardens.jpg"
    ]
  },


  "Ella": {
    district: "Badulla",
    province: "Uva Province",
    category: "Nature / Highlands",
    bestTime: "January to March often offers clearer conditions for hiking and sightseeing.",
    description:
      "Ella is a small mountain town in Sri Lanka's central highlands, surrounded by tea estates, green valleys, waterfalls and dramatic viewpoints. It is especially popular with travellers who enjoy hiking, railway journeys and cooler mountain scenery. The area combines beautiful landscapes with easy access to several famous attractions.",

    highlights: [
      "Nine Arches Bridge",
      "Little Adam's Peak",
      "Ella Rock",
      "Ravana Falls",
      "Tea Estates",
      "Scenic Railway"
    ],

    tips: [
      "Start hikes early before the weather becomes warmer.",
      "Wear footwear with good grip during wet weather.",
      "Check train schedules in advance.",
      "Keep rain protection with you because highland weather can change quickly."
    ],

    nearby: [
      "Bandarawela",
      "Haputale",
      "Ravana Falls",
      "Badulla"
    ],

    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nine%20Arches%20Bridge%20in%20Ella.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ella%20Sri%20Lanka.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Little%20Adam%27s%20Peak%20Sri%20Lanka.jpg"
    ]
  },


  "Kandy": {
    district: "Kandy",
    province: "Central Province",
    category: "Culture / Heritage",
    bestTime: "December to April is generally suitable for sightseeing, although Kandy can be visited throughout the year.",
    description:
      "Kandy is one of Sri Lanka's most important cultural cities and the country's historic hill capital. Surrounded by green hills, the city is centred around Kandy Lake and is home to the Temple of the Sacred Tooth Relic. Kandy also provides access to gardens, museums, forest reserves and traditional cultural experiences.",

    highlights: [
      "Temple of the Tooth",
      "Kandy Lake",
      "Royal Botanical Gardens",
      "Udawattakele",
      "Cultural Performances",
      "Historic City Centre"
    ],

    tips: [
      "Dress respectfully when visiting religious sites.",
      "Remove footwear where required at temples.",
      "Allow extra travel time because city traffic can become busy.",
      "Visit the lake area in the morning or evening for a relaxed walk."
    ],

    nearby: [
      "Peradeniya",
      "Kadugannawa",
      "Pilimathalawa",
      "Knuckles Region"
    ],

    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Temple%20of%20tooth%20sri%20lanka.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kandy%20Lake.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Royal%20Botanical%20Gardens%20Peradeniya.jpg"
    ]
  },


  "Galle": {
    district: "Galle",
    province: "Southern Province",
    category: "Heritage / Coast",
    bestTime: "December to April is often ideal for exploring the southern coast.",
    description:
      "Galle is a historic coastal city in southern Sri Lanka. Its best-known attraction is Galle Fort, a fortified old town with colonial-era architecture, narrow streets, museums, cafes, shops and sea views. The city combines cultural heritage with easy access to several popular beaches.",

    highlights: [
      "Galle Fort",
      "Fort Ramparts",
      "Lighthouse",
      "Historic Streets",
      "Museums",
      "Southern Coast"
    ],

    tips: [
      "Walk around the fort near sunset for cooler weather and sea views.",
      "Wear light clothing during daytime visits.",
      "Explore the smaller streets inside the fort, not only the main road.",
      "Keep enough time for both the fort and nearby beaches."
    ],

    nearby: [
      "Unawatuna",
      "Jungle Beach",
      "Hikkaduwa",
      "Weligama"
    ],

    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/GALLE%20FORT.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Galle%20Lighthouse.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Galle%20Fort%20Sri%20Lanka.jpg"
    ]
  },


  "Mirissa": {
    district: "Matara",
    province: "Southern Province",
    category: "Beach / Coast",
    bestTime: "December to April usually provides favourable conditions on the south coast.",
    description:
      "Mirissa is a popular beach destination on Sri Lanka's southern coast. It is known for its curved sandy beach, tropical scenery, ocean viewpoints and relaxed atmosphere. The surrounding coast also provides access to several other beaches and coastal towns.",

    highlights: [
      "Mirissa Beach",
      "Coconut Tree Hill",
      "Parrot Rock",
      "Ocean Views",
      "Southern Coast",
      "Sunset Spots"
    ],

    tips: [
      "Use sun protection during daytime beach visits.",
      "Check sea conditions before swimming.",
      "Visit viewpoints in the morning or near sunset.",
      "Respect warning signs and local safety advice near the ocean."
    ],

    nearby: [
      "Weligama",
      "Matara",
      "Polhena Beach",
      "Dondra Head"
    ],

    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mirissa%20beach,%20Srilanka.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mirissa%20Sri%20Lanka.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Coconut%20Tree%20Hill%20Mirissa.jpg"
    ]
  },


  "Nuwara Eliya": {
    district: "Nuwara Eliya",
    province: "Central Province",
    category: "Nature / Highlands",
    bestTime: "January to April is popular for clearer mountain weather, while temperatures remain cooler than many lowland areas.",
    description:
      "Nuwara Eliya is a highland city surrounded by tea estates, mountains and cool-climate scenery. Often associated with Sri Lanka's tea country, the area features lakes, gardens, waterfalls and access to Horton Plains National Park. Its cool weather makes it very different from the tropical lowlands.",

    highlights: [
      "Gregory Lake",
      "Tea Estates",
      "Horton Plains",
      "World's End",
      "Waterfalls",
      "Cool Climate"
    ],

    tips: [
      "Bring a light jacket because mornings and evenings can be cool.",
      "Start Horton Plains visits very early.",
      "Carry rain protection.",
      "Allow time for tea-estate viewpoints and scenic drives."
    ],

    nearby: [
      "Horton Plains",
      "Ambewela",
      "Hakgala",
      "Ramboda"
    ],

    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Nuwara-Eliya.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gregory%20Lake%20Nuwara%20Eliya.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tea%20Plantation%20Nuwara%20Eliya.jpg"
    ]
  },


  "Yala National Park": {
    district: "Hambantota",
    province: "Southern Province",
    category: "Wildlife / Nature",
    bestTime: "Wildlife viewing varies through the year, so checking current park conditions before visiting is useful.",
    description:
      "Yala National Park is one of Sri Lanka's best-known wildlife areas. The landscape includes dry forests, grasslands, wetlands, rocky areas and coastal environments. Visitors usually explore the park on guided safari drives while observing wildlife from a safe distance.",

    highlights: [
      "Safari Drives",
      "Leopards",
      "Elephants",
      "Birdlife",
      "Dry Forest",
      "Coastal Landscapes"
    ],

    tips: [
      "Use an authorised safari vehicle or guide.",
      "Never approach or feed wild animals.",
      "Keep noise low while observing wildlife.",
      "Follow park rules and instructions from guides."
    ],

    nearby: [
      "Tissamaharama",
      "Kataragama",
      "Bundala National Park",
      "Kirinda"
    ],

    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Yala%20National%20Park,%20Sri%20Lanka.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Yala%20National%20Park.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sri%20Lankan%20Elephant%20Yala.jpg"
    ]
  },


  "Anuradhapura": {
    district: "Anuradhapura",
    province: "North Central Province",
    category: "Heritage / Sacred City",
    bestTime: "The dry season is convenient for outdoor exploration, and early mornings are usually more comfortable.",
    description:
      "Anuradhapura is one of Sri Lanka's most important ancient cities and a major centre of Buddhist heritage. The archaeological area contains enormous stupas, monasteries, reservoirs, ruins and sacred sites spread across a large landscape. It played a major role in the island's early history and remains an important place of worship.",

    highlights: [
      "Sri Maha Bodhi",
      "Ruwanwelisaya",
      "Mihintale",
      "Isurumuniya",
      "Ancient Reservoirs",
      "Historic Monasteries"
    ],

    tips: [
      "Dress respectfully when entering sacred areas.",
      "The ancient city is large, so transport can be useful.",
      "Carry water during hot weather.",
      "Avoid walking on archaeological structures."
    ],

    nearby: [
      "Mihintale",
      "Wilpattu Area",
      "Ritigala",
      "Kala Wewa"
    ],

    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Anuradhapura%20in%20Sri%20Lanka.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ruwanwelisaya%20Anuradhapura.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Jaya%20Sri%20Maha%20Bodhi.jpg"
    ]
  },


  "Polonnaruwa": {
    district: "Polonnaruwa",
    province: "North Central Province",
    category: "Heritage / Ancient City",
    bestTime: "Early mornings and late afternoons are usually more comfortable for exploring the archaeological area.",
    description:
      "Polonnaruwa is one of Sri Lanka's best-preserved ancient capitals. The archaeological city includes palace ruins, temples, stone carvings, religious monuments and historic water-management structures. Many attractions are spread across a large area, making the site suitable for a half-day or full-day visit.",

    highlights: [
      "Gal Vihara",
      "Royal Palace",
      "Vatadage",
      "Parakrama Samudra",
      "Ancient Temples",
      "Stone Sculpture"
    ],

    tips: [
      "Start early to avoid the strongest heat.",
      "Wear comfortable footwear.",
      "Bring drinking water.",
      "Respect religious areas and archaeological remains."
    ],

    nearby: [
      "Minneriya",
      "Kaudulla",
      "Medirigiriya",
      "Sigiriya"
    ],

    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Polonnaruwa.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gal%20Vihara%20Polonnaruwa.jpg",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Polonnaruwa%20Vatadage.jpg"
    ]
  }

};


/* =========================================================
   GET V7 MODAL ELEMENTS
   ========================================================= */

const v7DestinationModal =
  document.getElementById("destinationModal");

const v7ModalClose =
  document.getElementById("modalClose");

const v7ModalImage =
  document.getElementById("modalImage");

const v7ModalTitle =
  document.getElementById("modalTitle");

const v7ModalCategory =
  document.getElementById("modalCategory");

const v7ModalLocation =
  document.getElementById("modalLocation");

const v7ModalDescription =
  document.getElementById("modalDescription");

const v7ModalFacts =
  document.getElementById("modalFacts");

const v7ModalHighlights =
  document.getElementById("modalHighlights");

const v7ModalGallery =
  document.getElementById("modalGallery");

const v7ModalBestTime =
  document.getElementById("modalBestTime");

const v7ModalTips =
  document.getElementById("modalTips");

const v7ModalNearby =
  document.getElementById("modalNearby");

const v7GuideFavoriteBtn =
  document.getElementById("guideFavoriteBtn");

const v7GuideDistrictBtn =
  document.getElementById("guideDistrictBtn");


let currentGuideDestination = null;


/* =========================================================
   HTML HELPERS
   ========================================================= */

function createGuideChip(text) {

  return `
    <span class="guide-chip">
      ${text}
    </span>
  `;

}


function createGuideFact(label, value) {

  return `
    <div class="guide-fact">

      <span>
        ${label}
      </span>

      <strong>
        ${value}
      </strong>

    </div>
  `;

}


/* =========================================================
   OPEN DESTINATION GUIDE
   ========================================================= */

function openDestinationGuide(destinationName) {

  const data =
    destinationGuideData[destinationName];

  if (!data) {
    return;
  }


  currentGuideDestination =
    destinationName;


  const destinationCard =
    [...document.querySelectorAll(".destination-card")]
      .find(card =>
        card.dataset.title === destinationName
      );


  let mainImage =
    data.images[0];


  if (destinationCard) {

    const cardImage =
      destinationCard.querySelector("img");

    if (cardImage) {
      mainImage =
        cardImage.src;
    }

  }


  /* =========================
     HERO
     ========================= */

  if (v7ModalImage) {

    v7ModalImage.src =
      mainImage;

    v7ModalImage.alt =
      destinationName;

  }


  if (v7ModalTitle) {
    v7ModalTitle.textContent =
      destinationName;
  }


  if (v7ModalCategory) {
    v7ModalCategory.textContent =
      data.category;
  }


  if (v7ModalLocation) {

    v7ModalLocation.textContent =
      `📍 ${data.district} District • ${data.province}`;

  }


  if (v7ModalDescription) {

    v7ModalDescription.textContent =
      data.description;

  }


  /* =========================
     FACTS
     ========================= */

  if (v7ModalFacts) {

    v7ModalFacts.innerHTML =

      createGuideFact(
        "District",
        data.district
      )

      +

      createGuideFact(
        "Province",
        data.province
      )

      +

      createGuideFact(
        "Category",
        data.category
      )

      +

      createGuideFact(
        "Country",
        "Sri Lanka 🇱🇰"
      );

  }


  /* =========================
     HIGHLIGHTS
     ========================= */

  if (v7ModalHighlights) {

    v7ModalHighlights.innerHTML =
      data.highlights
        .map(createGuideChip)
        .join("");

  }


  /* =========================
     GALLERY
     ========================= */

  if (v7ModalGallery) {

    v7ModalGallery.innerHTML =
      data.images
        .map((image, index) => {

          return `

            <button
              class="guide-gallery-item"
              type="button"
              data-image="${image}"
              aria-label="Open ${destinationName} photo ${index + 1}"
            >

              <img
                src="${image}"
                alt="${destinationName} photo ${index + 1}"
                loading="lazy"
              >

            </button>

          `;

        })
        .join("");

  }


  /* =========================
     BEST TIME
     ========================= */

  if (v7ModalBestTime) {

    v7ModalBestTime.textContent =
      data.bestTime;

  }


  /* =========================
     TRAVEL TIPS
     ========================= */

  if (v7ModalTips) {

    v7ModalTips.innerHTML =
      data.tips
        .map(tip => {

          return `
            <li>
              ${tip}
            </li>
          `;

        })
        .join("");

  }


  /* =========================
     NEARBY PLACES
     ========================= */

  if (v7ModalNearby) {

    v7ModalNearby.innerHTML =
      data.nearby
        .map(createGuideChip)
        .join("");

  }


  updateGuideFavoriteButton();


  /* =========================
     OPEN MODAL
     ========================= */

  if (v7DestinationModal) {

    v7DestinationModal.classList.add(
      "active"
    );

    document.body.style.overflow =
      "hidden";

  }

}


/* =========================================================
   VIEW DETAILS BUTTONS
   ========================================================= */

document
  .querySelectorAll(".destination-card")
  .forEach(card => {

    const detailsButton =
      card.querySelector(".details-btn");

    if (!detailsButton) {
      return;
    }


    /*
      Clone removes any old View Details click listener.
      This prevents the old V5 modal from fighting V7.
    */

    const newButton =
      detailsButton.cloneNode(true);

    detailsButton.replaceWith(
      newButton
    );


    newButton.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openDestinationGuide(
          card.dataset.title
        );

      }
    );

  });


/* =========================================================
   CLOSE GUIDE
   ========================================================= */

function closeDestinationGuideV7() {

  if (!v7DestinationModal) {
    return;
  }

  v7DestinationModal.classList.remove(
    "active"
  );

  document.body.style.overflow =
    "";

}


if (v7ModalClose) {

  v7ModalClose.addEventListener(
    "click",
    closeDestinationGuideV7
  );

}


document
  .querySelectorAll("[data-close-modal]")
  .forEach(element => {

    element.addEventListener(
      "click",
      closeDestinationGuideV7
    );

  });


document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeDestinationGuideV7();

      closeGuideLightbox();

    }

  }
);


/* =========================================================
   GUIDE FAVORITES
   ========================================================= */

function getSavedFavoritesV7() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "tourismFavorites"
      )
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveFavoritesV7(favorites) {

  localStorage.setItem(
    "tourismFavorites",
    JSON.stringify(favorites)
  );

}


function updateGuideFavoriteButton() {

  if (
    !v7GuideFavoriteBtn ||
    !currentGuideDestination
  ) {
    return;
  }


  const favorites =
    getSavedFavoritesV7();


  const saved =
    favorites.includes(
      currentGuideDestination
    );


  v7GuideFavoriteBtn.textContent =
    saved
      ? "♥ Saved"
      : "♡ Save Favorite";

}


if (v7GuideFavoriteBtn) {

  v7GuideFavoriteBtn.addEventListener(
    "click",
    () => {

      if (!currentGuideDestination) {
        return;
      }


      let favorites =
        getSavedFavoritesV7();


      if (
        favorites.includes(
          currentGuideDestination
        )
      ) {

        favorites =
          favorites.filter(
            place =>
              place !== currentGuideDestination
          );

      } else {

        favorites.push(
          currentGuideDestination
        );

      }


      saveFavoritesV7(
        favorites
      );


      updateGuideFavoriteButton();


      /*
        Sync existing favorite heart if present
      */

      document
        .querySelectorAll(".destination-card")
        .forEach(card => {

          if (
            card.dataset.title !==
            currentGuideDestination
          ) {
            return;
          }


          const favoriteButton =
            card.querySelector(
              ".favorite-btn"
            );


          if (!favoriteButton) {
            return;
          }


          const isSaved =
            favorites.includes(
              currentGuideDestination
            );


          favoriteButton.textContent =
            isSaved
              ? "♥"
              : "♡";

          favoriteButton.classList.toggle(
            "active",
            isSaved
          );

        });


      /*
        Try to use existing V5/V6 favorites renderer
      */

      if (
        typeof renderFavorites ===
        "function"
      ) {

        renderFavorites();

      }

    }
  );

}


/* =========================================================
   EXPLORE DISTRICT BUTTON
   ========================================================= */

if (v7GuideDistrictBtn) {

  v7GuideDistrictBtn.addEventListener(
    "click",
    () => {

      if (!currentGuideDestination) {
        return;
      }


      const data =
        destinationGuideData[
          currentGuideDestination
        ];


      if (!data) {
        return;
      }


      closeDestinationGuideV7();


      const mapSection =
        document.getElementById(
          "map"
        );


      if (mapSection) {

        mapSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }


      setTimeout(() => {

        if (
          typeof selectDistrictV6 ===
          "function"
        ) {

          selectDistrictV6(
            data.district
          );

        } else if (
          typeof showDistrictResult ===
          "function"
        ) {

          showDistrictResult(
            data.district
          );

        }

      }, 500);

    }
  );

}


/* =========================================================
   PHOTO LIGHTBOX
   ========================================================= */

const guideLightbox =
  document.createElement("div");


guideLightbox.className =
  "guide-lightbox";


guideLightbox.innerHTML = `

  <button
    class="guide-lightbox-close"
    type="button"
    aria-label="Close photo"
  >
    ×
  </button>

  <img
    src=""
    alt="Destination photo"
  >

`;


document.body.appendChild(
  guideLightbox
);


const lightboxImage =
  guideLightbox.querySelector("img");


const lightboxClose =
  guideLightbox.querySelector(
    ".guide-lightbox-close"
  );


function openGuideLightbox(imageURL) {

  if (!imageURL) {
    return;
  }


  lightboxImage.src =
    imageURL;


  guideLightbox.classList.add(
    "active"
  );

}


function closeGuideLightbox() {

  guideLightbox.classList.remove(
    "active"
  );

}


document.addEventListener(
  "click",
  event => {

    const galleryButton =
      event.target.closest(
        ".guide-gallery-item"
      );


    if (!galleryButton) {
      return;
    }


    openGuideLightbox(
      galleryButton.dataset.image
    );

  }
);


if (lightboxClose) {

  lightboxClose.addEventListener(
    "click",
    closeGuideLightbox
  );

}


guideLightbox.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      guideLightbox
    ) {

      closeGuideLightbox();

    }

  }
);


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

document.addEventListener(
  "error",
  event => {

    if (
      event.target.tagName !== "IMG"
    ) {
      return;
    }


    const image =
      event.target;


    if (
      image.dataset.fallbackUsed ===
      "true"
    ) {
      return;
    }


    image.dataset.fallbackUsed =
      "true";


    /*
      If a gallery image fails,
      use the destination hero image where possible.
    */

    if (
      currentGuideDestination &&
      destinationGuideData[
        currentGuideDestination
      ]
    ) {

      image.src =
        destinationGuideData[
          currentGuideDestination
        ].images[0];

    }

  },

  true
);


/* =========================================================
   V7 READY
   ========================================================= */

console.log(
  "Tourism In Sri Lanka V7 Travel Guide READY 🇱🇰"
);
