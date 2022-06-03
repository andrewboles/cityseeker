import CityCard from "../components/CityCard"
import { useEffect, useState } from 'react'
export default function Home() {
  let [forecastResults, setForecastResults] = useState({})
  useEffect(()=>{
    async function fetchData(){
      setForecastResults(await fetchForecast("Austin"))
    }
    fetchData()
  },[])

  return (
    <div className="flex items-center justify-center h-screen bg-ash">

      {forecastResults ? <CityCard results={forecastResults}/> : <h2>Loading</h2>}
    </div>
    
  )
}

async function fetchForecast(searchCity) {
  try {
    const response = await fetch( 
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&APPID=e63a54f308d51d63317b621826a180fe`,
      { mode: "no-cors" }
    );
    const forecast = await response.json();
    let currentTemp = ((forecast.main.temp - 273.15) * (9 / 5) + 32).toFixed(1);
    let minTemp = ((forecast.main.temp_min - 273.15) * (9 / 5) + 32).toFixed(1);
    let maxTemp = ((forecast.main.temp_max - 273.15) * (9 / 5) + 32).toFixed(1);
    let city = forecast.name;
    let conditions = forecast.weather[0].main;
    const snowStats = await fetchSnow(searchCity);
    let snowTotal = snowStats.sum;
    let snowDays = snowStats.daysOfSnow
    const rainStats = await fetchRain(searchCity);
    let rainTotal = rainStats.sum;
    let rainDays = rainStats.daysOfRain
    return { currentTemp, minTemp, maxTemp, city, conditions, snowTotal, snowDays, rainTotal, rainDays };
  } catch (error) {
    console.log(error);
  }
}

async function fetchSnow(searchCity) {
  try {
    const cityQuery = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=e63a54f308d51d63317b621826a180fe`,
      { mode: "no-cors" }
    );
    console.log(cityQuery)
    const cityParams = await cityQuery.json();
    let lat = cityParams[0].lat;
    let lon = cityParams[0].lon;
    const response = await fetch(
      `https://meteostat.p.rapidapi.com/point/daily?lat=${lat}&lon=${lon}&start=2020-12-20&end=2021-12-20&units=imperial`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "meteostat.p.rapidapi.com",
          "x-rapidapi-key":
            "988672d8a8msh556129638478dc5p1b413bjsnf537d93f017b",
        },
      }
    );
    const forecastArr = await response.json();
    let histArray = forecastArr.data;
    let sum = 0;
    let daysOfSnow = 0;
    for (const day of histArray) {
      sum += day.snow;
      if (day.snow > 0.1) {daysOfSnow += 1};
    }
    sum = (sum/12).toFixed(1);
    return { sum, daysOfSnow };
  } catch (error) {
    console.log(error);
  }
}

async function fetchRain(searchCity) {
  try {
    const cityQuery = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=e63a54f308d51d63317b621826a180fe`
    );
    const cityParams = await cityQuery.json();
    let lat = cityParams[0].lat;
    let lon = cityParams[0].lon;
    const response = await fetch(
      `https://meteostat.p.rapidapi.com/point/daily?lat=${lat}&lon=${lon}&start=2020-12-20&end=2021-12-20&units=imperial`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "meteostat.p.rapidapi.com",
          "x-rapidapi-key":
            "988672d8a8msh556129638478dc5p1b413bjsnf537d93f017b",
        },
      }
    );
    const forecastArr = await response.json();
    let histArray = forecastArr.data;
    let sum = 0;
    let daysOfRain = 0;
    for (const day of histArray) {
      sum += day.prcp;
      if (day.prcp > 0.075) {daysOfRain += 1};
    }
    sum = (sum/12).toFixed(1);
    return { sum, daysOfRain };
  } catch (error) {
    console.log(error);
  }
}

function appendCity(results) {
  newForecast.innerHTML = `<h2>${results.city}</h2><br><ul><li>Conditions: ${
    results.conditions
  }</li><li>Current Temp: ${results.currentTemp}</li><li>Min Temp: ${
    results.minTemp
  }</li><li>Max Temp: ${results.maxTemp}</li><li>365 Day Snow Total: ${
    (results.snowTotal / 12).toFixed(1)
  } ft</li><li>Days of Snow: ${
    results.snowDays
  }</li><li>365 Day Rain Total: ${
    (results.rainTotal / 12).toFixed(1)
  } ft</li><li>Days of Rain: ${
    results.rainDays
  }</li></ul>`;
}
