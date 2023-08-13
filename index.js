const express = require('express');
const axios = require('axios'); // Import the axios library
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/weather/:city', async (req, res) => {
  const { city } = req.params;

  try {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=90e9aa3641dd4b31a09190503231208&q=${city}&aqi=no`;

    // Make a GET request to the weather API
    const response = await axios.get(apiUrl);

    // Extract specific data from the API response
    const weatherData = {
      name: response.data.location.name,
      country: response.data.location.country,
      temp_c: response.data.current.temp_c,
      wind_kph: response.data.current.wind_kph,
      humidity: response.data.current.humidity,
      precip_mm:response.data.current.precip_mm
    };

    // Send the specific weather data fields as a JSON response
    res.json(weatherData);
    console.log("this is working")
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

// ... other code ...

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
});
