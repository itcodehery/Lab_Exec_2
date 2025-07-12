// Mobile menu toggle
document.getElementById("menu-btn").addEventListener("click", () => {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
});

// Placeholder for your fetch API logic
async function loadDestinations() {
  try {
    // Sample API response (replace this with actual fetch call when you integrate)
    const url =
      "https://countries-cities.p.rapidapi.com/location/country/US/city/list?page=2&per_page=20&format=json&population=1501";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9770d12d14msh1b21e5f79c85f95p16e30fjsn9243a43f972f",
        "x-rapidapi-host": "countries-cities.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const data = await response.text();

    const container = document.getElementById("api-content");

    data.cities.forEach((city) => {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded shadow p-4 text-left hover:shadow-lg transition";

      card.innerHTML = `
        <h3 class="text-xl font-semibold text-blue-600 mb-1">${city.name}</h3>
        <p class="text-sm text-gray-600"><strong>State:</strong> ${
          city.division.code
        }</p>
        <p class="text-sm text-gray-600"><strong>Population:</strong> ${city.population.toLocaleString()}</p>
        <p class="text-sm text-gray-600"><strong>Coordinates:</strong> ${city.latitude.toFixed(
          2
        )}, ${city.longitude.toFixed(2)}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    document.getElementById("api-content").innerHTML = `
      <p class="text-red-500">Failed to load cities. Please try again later.</p>
    `;
    console.error("API fetch error:", err);
  }
}

// Call the function

loadDestinations();
