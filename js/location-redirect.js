console.log("Location script started...");

fetch('https://ipinfo.io/json?token=971e67675db5c4')
  .then(response => response.json())
  .then(data => {
    console.log("City detected:", data.city);
    const cityMap = {
       "new delhi": "delhi",
      "delhi": "delhi",
      "dehradun": "dehradun",
      "gurgaon": "gurgaon",
      "noida": "noida",
      "alighar": "alighar",
      "haridwar": "haridwar"
    };

    const userCity = data.city.toLowerCase().trim();
    const citySlug = cityMap[userCity];

    if (citySlug) {
      console.log("Redirecting to:", citySlug);
      window.location.href = `${citySlug}.html`;
    } else {
      console.warn("City not in map:", userCity);
    }
  })
  .catch(error => {
    console.error("Error fetching location:", error);
  });
