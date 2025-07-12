// Mobile menu toggle
document.getElementById("menu-btn").addEventListener("click", () => {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
});

// Placeholder for your fetch API logic
// async function loadDestinations() {
//   try {
//     // Sample API response (replace this with actual fetch call when you integrate)
//     const url =
//       "https://countries-cities.p.rapidapi.com/location/country/US/city/list?page=2&per_page=20&format=json&population=1501";
//     const options = {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key": "",
//         "x-rapidapi-host": "countries-cities.p.rapidapi.com",
//       },
//     };

//     const response = await fetch(url, options);
//     const data = await response.text();

//     const container = document.getElementById("api-content");

//     data.cities.forEach((city) => {
//       const card = document.createElement("div");
//       card.className =
//         "bg-white rounded shadow p-4 text-left hover:shadow-lg transition";

//       card.innerHTML = `
//         <h3 class="text-xl font-semibold text-blue-600 mb-1">${city.name}</h3>
//         <p class="text-sm text-gray-600"><strong>State:</strong> ${
//           city.division.code
//         }</p>
//         <p class="text-sm text-gray-600"><strong>Population:</strong> ${city.population.toLocaleString()}</p>
//         <p class="text-sm text-gray-600"><strong>Coordinates:</strong> ${city.latitude.toFixed(
//           2
//         )}, ${city.longitude.toFixed(2)}</p>
//       `;

//       container.appendChild(card);
//     });
//   } catch (err) {
//     document.getElementById("api-content").innerHTML = `
//       <p class="text-red-500">Failed to load cities. Please try again later.</p>
//     `;
//     console.error("API fetch error:", err);
//   }
// }

// // Call the function

// loadDestinations();

async function loadPokemons() {
  const apiContent = document.getElementById("api-content");

  // List of Pokémon names you want to show
  const pokemonNames = [
    "ditto",
    "pikachu",
    "bulbasaur",
    "charizard",
    "snorlax",
    "lucario",
    "gengar",
  ];

  apiContent.innerHTML = ""; // Clear any existing content

  for (const name of pokemonNames) {
    try {
      // Fetch main Pokémon data
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();

      const sprite = data.sprites.other["official-artwork"].front_default;
      const pokeName = data.name;

      // Fetch species data for description
      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();

      // Find the first English flavor text entry
      const flavorEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );

      const description = flavorEntry
        ? flavorEntry.flavor_text.replace(/\f/g, " ")
        : "No description available.";

      // Create HTML card
      const card = `
        <div class="bg-gray-100 rounded shadow p-4 flex flex-col items-center">
          <img src="${sprite}" alt="${pokeName}" class="w-32 h-32 mb-4" />
          <h3 class="text-xl font-bold capitalize mb-2">${pokeName}</h3>
          <p class="text-gray-700 text-center text-sm">${description}</p>
        </div>
      `;

      apiContent.innerHTML += card;
    } catch (error) {
      console.error(`Error fetching ${name}:`, error);
      apiContent.innerHTML += `<div class="p-4 bg-red-100 rounded shadow">Failed to load ${name}.</div>`;
    }
  }
}

// Call function on page load
loadPokemons();
