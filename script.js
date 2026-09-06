document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".header");
  const navLinks = document.querySelector(".nav-links");
  const menuBtn = document.querySelector(".menu-btn");
  const themeToggle = document.querySelector(".theme-toggle");
  const loader = document.querySelector(".loader");
  const backToTop = document.querySelector(".back-to-top");

  const searchInput = document.querySelector("#destinationSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const destinationCards = document.querySelectorAll(".destination-card");

  const modal = document.querySelector("#destinationModal");
  const modalTitle = document.querySelector("#modalTitle");
  const modalDescription = document.querySelector("#modalDescription");
  const modalImage = document.querySelector("#modalImage");
  const modalClose = document.querySelector(".modal-close");

  const daysInput = document.querySelector("#tripDays");
  const daysOutput = document.querySelector("#daysOutput");
  const travelStyle = document.querySelector("#travelStyle");
  const budgetLevel = document.querySelector("#budgetLevel");
  const generateTripBtn = document.querySelector("#generateTrip");
  const itineraryResult = document.querySelector("#itineraryResult");
  const currentYear = document.querySelector("#currentYear");

  /* =========================
     LOADER
  ========================= */

  window.addEventListener("load", () => {
    if (!loader) return;

    setTimeout(() => {
      loader.classList.add("loader-hidden");

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 350);
  });

  /* =========================
     HEADER SCROLL
  ========================= */

  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll);

  /* =========================
     MOBILE MENU
  ========================= */

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu =
        navLinks.contains(event.target) || menuBtn.contains(event.target);

      if (!clickedInsideMenu) {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
      }
    });
  }

  /* =========================
     DARK MODE
  ========================= */

  const savedTheme = localStorage.getItem("tourism-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      const currentTheme = body.classList.contains("dark-mode")
        ? "dark"
        : "light";

      localStorage.setItem("tourism-theme", currentTheme);
    });
  }

  /* =========================
     SMOOTH SCROLL
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* =========================
     DESTINATION SEARCH + FILTER
  ========================= */

  let activeFilter = "all";

  function updateDestinationCards() {
    const searchText = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    destinationCards.forEach((card) => {
      const title = card.dataset.title?.toLowerCase() || "";
      const category = card.dataset.category?.toLowerCase() || "";
      const cardText = card.textContent.toLowerCase();

      const matchesSearch =
        title.includes(searchText) || cardText.includes(searchText);

      const matchesFilter =
        activeFilter === "all" || category.includes(activeFilter);

      if (matchesSearch && matchesFilter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", updateDestinationCards);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      activeFilter = button.dataset.filter || "all";

      updateDestinationCards();
    });
  });

  /* =========================
     DESTINATION MODAL
  ========================= */

  function openDestinationModal(card) {
    if (!modal) return;

    const title =
      card.dataset.title ||
      card.querySelector("h3")?.textContent ||
      "Sri Lanka";

    const description =
      card.dataset.description ||
      card.querySelector("p")?.textContent ||
      "Discover this beautiful Sri Lankan destination.";

    const image = card.querySelector("img");

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalDescription) {
      modalDescription.textContent = description;
    }

    if (modalImage && image) {
      modalImage.src = image.src;
      modalImage.alt = title;
    }

    modal.classList.add("active");
    body.style.overflow = "hidden";
  }

  function closeDestinationModal() {
    if (!modal) return;

    modal.classList.remove("active");
    body.style.overflow = "";
  }

  destinationCards.forEach((card) => {
    card.addEventListener("click", () => {
      openDestinationModal(card);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeDestinationModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeDestinationModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDestinationModal();
    }
  });

  /* =========================
     TRIP PLANNER
  ========================= */

  const tripRoutes = {
    classic: [
      {
        place: "Colombo",
        activity: "Arrival, city highlights and local food."
      },
      {
        place: "Sigiriya",
        activity: "Explore the Cultural Triangle and Sigiriya area."
      },
      {
        place: "Kandy",
        activity: "Discover hill-country culture and heritage."
      },
      {
        place: "Nuwara Eliya",
        activity: "Enjoy tea country and cool mountain scenery."
      },
      {
        place: "Ella",
        activity: "Explore hiking trails and famous railway scenery."
      },
      {
        place: "Yala",
        activity: "Experience a wildlife-focused southern journey."
      },
      {
        place: "Galle",
        activity: "Walk through historic Galle Fort."
      },
      {
        place: "Mirissa",
        activity: "Relax along the southern coastline."
      }
    ],

    nature: [
      {
        place: "Sinharaja",
        activity: "Experience Sri Lanka's tropical rainforest environment."
      },
      {
        place: "Udawalawe",
        activity: "Explore wildlife and open landscapes."
      },
      {
        place: "Yala",
        activity: "Enjoy a national park safari experience."
      },
      {
        place: "Ella",
        activity: "Hike through beautiful mountain scenery."
      },
      {
        place: "Horton Plains",
        activity: "Explore cool highland grasslands and walking trails."
      },
      {
        place: "Nuwara Eliya",
        activity: "Discover tea estates and highland landscapes."
      }
    ],

    beach: [
      {
        place: "Negombo",
        activity: "Begin with a relaxed coastal experience."
      },
      {
        place: "Bentota",
        activity: "Enjoy beaches and water-based activities."
      },
      {
        place: "Hikkaduwa",
        activity: "Explore the southwest coast."
      },
      {
        place: "Unawatuna",
        activity: "Spend time on a popular southern beach."
      },
      {
        place: "Mirissa",
        activity: "Enjoy tropical scenery and coastal relaxation."
      },
      {
        place: "Tangalle",
        activity: "Explore quieter beaches further south."
      },
      {
        place: "Arugam Bay",
        activity: "Experience one of Sri Lanka's best-known surf areas."
      },
      {
        place: "Trincomalee",
        activity: "Discover the northeastern coastline."
      }
    ],

    culture: [
      {
        place: "Anuradhapura",
        activity: "Explore one of Sri Lanka's ancient capitals."
      },
      {
        place: "Polonnaruwa",
        activity: "Discover extraordinary archaeological remains."
      },
      {
        place: "Sigiriya",
        activity: "Visit the historic rock fortress landscape."
      },
      {
        place: "Dambulla",
        activity: "Explore important cultural and religious heritage."
      },
      {
        place: "Kandy",
        activity: "Discover Sri Lanka's historic hill capital."
      },
      {
        place: "Galle",
        activity: "Walk through the historic fortified old town."
      }
    ],

    adventure: [
      {
        place: "Kitulgala",
        activity: "Enjoy outdoor adventure activities and tropical scenery."
      },
      {
        place: "Ella",
        activity: "Hike through mountain landscapes."
      },
      {
        place: "Knuckles",
        activity: "Explore rugged highland trails."
      },
      {
        place: "Horton Plains",
        activity: "Walk through dramatic highland scenery."
      },
      {
        place: "Arugam Bay",
        activity: "Experience Sri Lanka's eastern surf culture."
      },
      {
        place: "Yala",
        activity: "Add a wildlife adventure to your journey."
      }
    ]
  };

  const budgetDescriptions = {
    value:
      "Focus on guesthouses, public transport and affordable local meals.",
    comfort:
      "Mix comfortable hotels, private transfers and local experiences.",
    premium:
      "Choose higher-end stays, private transport and premium experiences."
  };

  if (daysInput && daysOutput) {
    daysOutput.textContent = daysInput.value;

    daysInput.addEventListener("input", () => {
      daysOutput.textContent = daysInput.value;
    });
  }

  function formatName(text) {
    return text
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function generateItinerary() {
    if (!itineraryResult) return;

    const totalDays = parseInt(daysInput?.value || "7", 10);
    const style = travelStyle?.value || "classic";
    const budget = budgetLevel?.value || "comfort";

    const route = tripRoutes[style] || tripRoutes.classic;

    let itineraryHTML = `
      <div class="generated-trip">
        <h3>${totalDays}-Day Sri Lanka Journey</h3>

        <p>
          Style:
          <strong>${formatName(style)}</strong>
          &nbsp;•&nbsp;
          Budget:
          <strong>${formatName(budget)}</strong>
        </p>

        <p style="margin-top:8px;">
          ${budgetDescriptions[budget]}
        </p>

        <div class="trip-days">
    `;

    for (let day = 1; day <= totalDays; day++) {
      const stop = route[(day - 1) % route.length];

      itineraryHTML += `
        <div class="trip-day">
          <span>DAY ${day}</span>

          <div>
            <h4>${stop.place}</h4>
            <p>${stop.activity}</p>
          </div>
        </div>
      `;
    }

    itineraryHTML += `
        </div>

        <p class="planner-note">
          This itinerary is a suggested planning guide only.
          Check current transport, weather, opening hours and
          official travel information before travelling.
        </p>
      </div>
    `;

    itineraryResult.innerHTML = itineraryHTML;

    itineraryResult.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  if (generateTripBtn) {
    generateTripBtn.addEventListener("click", generateItinerary);
  }

  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements = document.querySelectorAll(
    ".destination-card, .experience-card, .info-card, .season-card, .emergency-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =========================
     BACK TO TOP
  ========================= */

  function updateBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop);

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =========================
     CURRENT YEAR
  ========================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =========================
     IMAGE ERROR FALLBACK
  ========================= */

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.style.background = "#dfe8e4";
      image.alt = `${image.alt || "Sri Lanka"} image unavailable`;
    });
  });

  console.log("Tourism In Sri Lanka V3 loaded 🇱🇰");
});
