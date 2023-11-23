const container = document.getElementById("countries-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const textRange = document.getElementById("rangeValue");
const alpha = document.getElementById("alpha");
const croissant = document.getElementById("minToMax");
const decroissant = document.getElementById("maxToMin");

let currentSort = "alpha";
let countries = [];
let rangeValue = inputRange.value;

async function fetchData() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
  console.log(countries);

  container.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .slice(0, rangeValue)
    .sort(function (a, b) {
      if (currentSort === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      } else if (currentSort === "croissant") {
        return a.population - b.population;
      } else if (currentSort === "decroissant") {
        return b.population - a.population;
      }
    })
    .map(
      (country) =>
        `
        <div class="countryContainer">
            <img src=${country.flags.png} alt=${country.flags.alt}>
            <h1>${country.translations.fra.common}</h1>
            <h3>${country.capital}</h3>
            <p>Population : ${country.population.toLocaleString()}</p>
        </div>
  `
    )
    .join("");
}

inputSearch.addEventListener("input", fetchData);

inputRange.addEventListener("input", (e) => {
  rangeValue = e.target.value;
  textRange.textContent = rangeValue;
  fetchData();
});

alpha.addEventListener("click", () => {
  currentSort = "alpha";
  fetchData();
});

croissant.addEventListener("click", () => {
  currentSort = "croissant";
  fetchData();
});

decroissant.addEventListener("click", () => {
  currentSort = "decroissant";
  fetchData();
});

fetchData();
