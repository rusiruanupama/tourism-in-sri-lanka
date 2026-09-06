// Tourism In Sri Lanka - script.js

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // PAGE LOADER
  // =========================
  const loader = document.querySelector(".loader");

  if (loader) {
    window.addEventListener("load", () => {
      loader.classList.add("loader-hidden");

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    });
  }


  // =========================
  // MOBILE MENU
  // =========================
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });
  }


  // =========================
  // DARK MODE
  // =========================
  const themeToggle = document.querySelector(".theme-toggle");

  const savedTheme = localStorage.getItem("tourism-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      const currentTheme =
        document.body.classList.contains("dark-mode")
          ? "dark"
          : "light";

      localStorage.setItem("tourism-theme", currentTheme);
    });
  }


  // =========================
  // SMOOTH SCROLL
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // =========================
  // DESTINATION SEARCH
  // =========================
  const searchInput = document.querySelector("#destinationSearch");
  const destinationCards = document.querySelectorAll(".destination-card");

  function filterDestinations() {
    if (!searchInput) return;

    const searchValue = searchInput.value
      .toLowerCase()
      .trim();

    destinationCards.forEach(card => {
      const text = card.textContent.toLowerCase();

      if (text.includes(searchValue)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterDestinations);
  }


  // =========================
  // DESTINATION FILTERS
  // =========================
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter = button.dataset.filter;

      destinationCards.forEach(card => {
        const category = card.dataset.category || "";

        if (
          filter === "all" ||
          category.toLowerCase().includes(filter.toLowerCase())
        ) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });


  // =========================
  // DESTINATION MODAL
  // =========================
  const modal = document.querySelector("#destinationModal");
  const modalTitle = document.querySelector("#modalTitle");
  const modalDescription = document.querySelector("#modalDescription");
  const modalImage = document.querySelector("#modalImage");
  const modalClose = document.querySelector(".modal-close");

  destinationCards.forEach(card => {

    card.addEventListener("click", () => {

      if (!modal) return;

      const title =
        card.dataset.title ||
        card.querySelector("h3")?.textContent ||
        "Sri Lanka";

      const description =
        card.dataset.description ||
        card.querySelector("p")?.textContent ||
        "Discover one of Sri Lanka's unforgettable destinations.";

      const image =
        card.dataset.image ||
        card.querySelector("img")?.src ||
        "";

      if (modalTitle) {
        modalTitle.textContent = title;
      }

      if (modalDescription) {
        modalDescription.textContent = description;
      }

      if (modalImage && image) {
        modalImage.src = image;
        modalImage.alt = title;
      }

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });


  function closeModal() {
    if (!modal) return;

    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeModal();
    }
  });


  // =========================
  // TRIP PLANNER
  // =========================
  const daysInput = document.querySelector("#tripDays");
  const daysOutput = document.querySelector("#daysOutput");

  if (daysInput && daysOutput) {
    daysOutput.textContent = daysInput.value;

    daysInput.addEventListener("input", () => {
      daysOutput.textContent = daysInput.value;
    });
  }


  const generateTripBtn =
    document.querySelector("#generateTrip");

  const itineraryResult =
    document.querySelector("#itineraryResult");


  const itineraries = {

    classic: [
      "Colombo",
      "Sigiriya",
      "Dambulla",
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
      "Yala",
      "Ella",
      "Horton Plains",
      "Nuwara Eliya",
      "Knuckles"
    ],

    beach: [
      "Negombo",
      "Bentota",
      "Hikkaduwa",
      "Unawatuna",
      "Mirissa",
      "Tangalle",
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
      "Ella",
      "Knuckles",
      "Horton Plains",
      "Arugam Bay",
      "Yala"
    ]
  };


  if (generateTripBtn) {

    generateTripBtn.addEventListener("click", () => {

      const days =
        parseInt(daysInput?.value || "5", 10);

      const style =
        document.querySelector("#travelStyle")?.value ||
        "classic";

      const budget =
        document.querySelector("#budgetLevel")?.value ||
        "comfort";

      const route =
        itineraries[style] ||
        itineraries.classic;


      let html = `
        <div class="generated-trip">
          <h3>Your ${days}-Day Sri Lanka Adventure</h3>

          <p>
            Travel style:
            <strong>${formatText(style)}</strong>
          </p>

          <p>
            Budget:
            <strong>${formatText(budget)}</strong>
          </p>

          <div class="trip-days">
      `;


      for (let day = 1; day <= days; day++) {

        const destination =
          route[(day - 1) % route.length];

        html += `
          <div class="trip-day">
            <span>Day ${day}</span>

            <div>
              <h4>${destination}</h4>
              <p>
                Explore the highlights, local culture,
                food and scenery of ${destination}.
              </p>
            </div>
          </div>
        `;
      }


      html += `
          </div>

          <p class="planner-note">
            This itinerary is a planning guide.
            Always check current transport,
            weather and official travel information
            before travelling.
          </p>
        </div>
      `;


      if (itineraryResult) {
        itineraryResult.innerHTML = html;

        itineraryResult.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });
  }


  function formatText(text) {
    return text
      .replace(/-/g, " ")
      .replace(/\b\w/g, letter =>
        letter.toUpperCase()
      );
  }


  // =========================
  // SCROLL REVEAL
  // =========================
  const revealElements =
    document.querySelectorAll(
      ".reveal, .destination-card, .experience-card, .info-card"
    );


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  // =========================
  // NAVBAR ON SCROLL
  // =========================
  const navbar =
    document.querySelector(".navbar");

  window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  });


  // =========================
  // BACK TO TOP
  // =========================
  const backToTop =
    document.querySelector(".back-to-top");


  window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

  });


  if (backToTop) {

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  // =========================
  // CURRENT YEAR
  // =========================
  const yearElement =
    document.querySelector("#currentYear");

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }


  console.log(
    "Tourism In Sri Lanka website loaded successfully 🇱🇰"
  );

});