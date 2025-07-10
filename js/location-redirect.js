console.log("Location script started...");

// Step 1: Get public IPv4
fetch('https://api.ipify.org/?format=json')
  .then(res => res.json())
  .then(ipData => {
    const userIp = ipData.ip;
    console.log("Detected IPv4:", userIp);

    // Step 2: Send IP to Lambda
    fetch(`https://doxtmrsyif6ypa3d4afjescabq0ouzkq.lambda-url.ap-south-1.on.aws?ip=${userIp}`)
      .then(res => res.json())
      .then(data => {
        // If Lambda directly returns: { city: "Delhi", region: "...", ... }
        console.log("Lambda response:", data);

        const cityMap = {
          "new delhi": "delhi",
          "delhi": "delhi",
          "dehradun": "dehradun",
          "gurgaon": "gurgaon",
          "noida": "noida",
          "aligarh": "aligarh",
          "haridwar": "haridwar"
        };

        const city = (data.city || '').toLowerCase().trim();
        const citySlug = cityMap[city];
        console.log("Detected City:", city);

        if (citySlug) {
          console.log("Redirecting to:", citySlug);
          window.location.href = `${citySlug}.html`;
        } else {
          console.warn("City not in map:", city);
        }
      })
      .catch(err => console.error("Error calling Lambda:", err));
  })
  .catch(err => console.error("Error fetching IP:", err));