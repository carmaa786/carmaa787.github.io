// City slug mapping (customize based on your supported cities)
const cityMap = {
  "new delhi": "delhi",
  "delhi": "delhi",
  "dehradun": "dehradun",
  "gurgaon": "gurgaon",
  "noida": "noida"
};

fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {
    const userCity = data.city.toLowerCase().trim();
    const citySlug = cityMap[userCity];

    if (citySlug) {
      window.location.href = `/${citySlug}.html`;
    } else {
      console.log("City not mapped, staying on homepage.");
    }
  })
  .catch(error => {
    console.error("Location detection failed:", error);
  });
