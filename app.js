"use strict";

const { categories, buildings, providers, defaultBuildingId } = window.VITRO_DATA;
const categoriesById = Object.fromEntries(categories.map((category) => [category.id, category]));
const building = buildings.find(({ id }) => id === defaultBuildingId);
const homeView = document.querySelector("#home-view");
const detailView = document.querySelector("#detail-view");
const emergencyGrid = document.querySelector("#emergency-grid");
const backButton = document.querySelector("#back-button");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");
const detailIcon = document.querySelector("#detail-icon");
const providerList = document.querySelector("#provider-list");

document.querySelector("#building-name").textContent = building.name;

function iconMarkup(iconName, className = "") {
  return `<svg${className ? ` class="${className}"` : ""} aria-hidden="true"><use href="#icon-${iconName}"></use></svg>`;
}

function renderEmergencyCards() {
  emergencyGrid.innerHTML = categories
    .map((category) => `
      <button class="emergency-card" type="button" data-category="${category.id}" aria-label="Ver ${category.title}">
        <span class="card-icon">${iconMarkup(category.icon)}</span>
        <span class="card-bottom">
          <span class="card-label">${category.name}</span>
          ${iconMarkup("chevron", "card-chevron")}
        </span>
      </button>
    `)
    .join("");
}

function renderProviders(categoryId) {
  const category = categoriesById[categoryId];
  const categoryProviders = providers.filter((provider) =>
    provider.categoryIds.includes(categoryId)
    && (provider.buildingIds.length === 0 || provider.buildingIds.includes(building.id))
  );
  const isAssigned = category.providerMode === "assigned";
  const title = isAssigned ? "Proveedor asignado" : "Proveedores disponibles";

  providerList.innerHTML = `
    <h2 class="provider-list-title">${title}</h2>
    ${categoryProviders.map((provider) => `
      <article class="provider-card">
        <div>
          <span class="provider-type">Proveedor${isAssigned ? " del edificio" : " disponible"}</span>
          <p class="provider-name">${provider.name}</p>
        </div>
        <div class="phone-block">
          ${iconMarkup("phone")}
          <div>
            <span class="phone-label">Teléfono</span>
            <span class="phone-number">${provider.phone}</span>
          </div>
        </div>
      </article>
    `).join("")}
  `;
}

function showCategory(categoryId, updateHistory = true) {
  const category = categoriesById[categoryId];
  if (!category) {
    showHome(false);
    return;
  }

  detailTitle.textContent = category.title;
  detailDescription.textContent = category.description;
  detailIcon.style.setProperty("--category-color", `var(--${categoryId})`);
  detailIcon.innerHTML = iconMarkup(category.icon);
  renderProviders(categoryId);

  homeView.hidden = true;
  detailView.hidden = false;
  document.title = `${category.title} | VITRO`;

  if (updateHistory) {
    history.pushState({ categoryId }, "", `#${categoryId}`);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  detailTitle.focus({ preventScroll: true });
}

function showHome(updateHistory = true) {
  detailView.hidden = true;
  homeView.hidden = false;
  document.title = "VITRO | Área General de Emergencias";

  if (updateHistory) {
    history.pushState({}, "", window.location.pathname + window.location.search);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector("#home-title").focus({ preventScroll: true });
}

emergencyGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-category]");
  if (card) {
    showCategory(card.dataset.category);
  }
});

backButton.addEventListener("click", () => showHome());

window.addEventListener("popstate", () => {
  const categoryId = window.location.hash.slice(1);
  categoryId ? showCategory(categoryId, false) : showHome(false);
});

renderEmergencyCards();

const initialCategory = window.location.hash.slice(1);
if (initialCategory) {
  showCategory(initialCategory, false);
}
