import CityCard from "../components/CityCard";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  let [forecastResults, setForecastResults] = useState({});
  useEffect(() => {
    async function fetchData() {
      setForecastResults(await fetchForecast("Austin"));
    }
    fetchData();
  }, []);

  return (
    <>
      <video   
        className="absolute -z-50 object-cover h-screen"
        autoPlay
        loop
        muted
        preload="metadata"
      >
        <source src="https://s3.us-central-1.wasabisys.com/gitprofile/Untitled%20Project%204.m4v"type="video/mp4" />
      </video>
      <div className="flex items-center justify-center h-screen">
        <CityCard results={forecastResults} />
      </div>
    </>
  );
}

async function fetchForecast(searchCity) {
  try {
    let forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&APPID=e63a54f308d51d63317b621826a180fe`
    );
    forecast = forecast.data;
    let currentTemp = ((forecast.main.temp - 273.15) * (9 / 5) + 32).toFixed(1);
    let minTemp = ((forecast.main.temp_min - 273.15) * (9 / 5) + 32).toFixed(1);
    let maxTemp = ((forecast.main.temp_max - 273.15) * (9 / 5) + 32).toFixed(1);
    let city = forecast.name;
    let conditions = forecast.weather[0].main;
    const snowStats = await fetchSnow(searchCity);
    let snowTotal = snowStats.sum;
    let snowDays = snowStats.daysOfSnow;
    const rainStats = await fetchRain(searchCity);
    let rainTotal = rainStats.sum;
    let rainDays = rainStats.daysOfRain;
    return {
      currentTemp,
      minTemp,
      maxTemp,
      city,
      conditions,
      snowTotal,
      snowDays,
      rainTotal,
      rainDays,
    };
  } catch (error) {
    console.log(error);
  }
}

async function fetchSnow(searchCity) {
  try {
    let cityParams = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=e63a54f308d51d63317b621826a180fe`
    );
    console.log(cityParams);
    let lat = cityParams.data[0].lat;
    let lon = cityParams.data[0].lon;
    const forecastArr = await axios.get(
      `https://meteostat.p.rapidapi.com/point/daily?lat=${lat}&lon=${lon}&start=2020-12-20&end=2021-12-20&units=imperial`,
      {
        headers: {
          "x-rapidapi-host": "meteostat.p.rapidapi.com",
          "x-rapidapi-key":
            "988672d8a8msh556129638478dc5p1b413bjsnf537d93f017b",
        },
      }
    );
    console.log(forecastArr);
    let histArray = forecastArr.data.data;
    let sum = 0;
    let daysOfSnow = 0;
    for (const day of histArray) {
      sum += day.snow;
      if (day.snow > 0.1) {
        daysOfSnow += 1;
      }
    }
    sum = (sum / 12).toFixed(1);
    return { sum, daysOfSnow };
  } catch (error) {
    console.log(error);
  }
}

async function fetchRain(searchCity) {
  try {
    let cityParams = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=e63a54f308d51d63317b621826a180fe`
    );
    let lat = cityParams.data[0].lat;
    let lon = cityParams.data[0].lon;
    const forecastArr = await axios.get(
      `https://meteostat.p.rapidapi.com/point/daily?lat=${lat}&lon=${lon}&start=2020-12-20&end=2021-12-20&units=imperial`,
      {
        headers: {
          "x-rapidapi-host": "meteostat.p.rapidapi.com",
          "x-rapidapi-key":
            "988672d8a8msh556129638478dc5p1b413bjsnf537d93f017b",
        },
      }
    );
    console.log(forecastArr);
    let histArray = forecastArr.data.data;
    let sum = 0;
    let daysOfRain = 0;
    for (const day of histArray) {
      sum += day.prcp;
      if (day.prcp > 0.075) {
        daysOfRain += 1;
      }
    }
    sum = (sum / 12).toFixed(1);
    return { sum, daysOfRain };
  } catch (error) {
    console.log(error);
  }
}
