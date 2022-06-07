import axios from "axios";

export async function fetchForecast(searchCity) {
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
        const detailedStats = await fetchRainSnowAvg(searchCity)
        return {
            currentTemp,
            minTemp,
            maxTemp,
            city,
            conditions,
            snowTotal: detailedStats.snowSum,
            snowDays: detailedStats.daysOfSnow,
            rainTotal: detailedStats.rainSum,
            rainDays: detailedStats.daysOfRain,
            tempAvg: detailedStats.tempAvg,
            yearlyMinTemp: detailedStats.yearlyMinTemp,
            yearlyMaxTemp: detailedStats.yearlyMaxTemp
        };
    } catch (error) {
        console.log(error);
    }
}

async function fetchRainSnowAvg(searchCity) {
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
        let tempAvg = 0;
        let numDays = 0
        let snowSum = 0;
        let rainSum = 0;
        let daysOfRain = 0;
        let daysOfSnow = 0;
        let yearlyMaxTemp = 72;
        let yearlyMinTemp = 72;
        for (const day of histArray) {
            if (day.tmin < yearlyMinTemp){
                yearlyMinTemp = day.tmin
            }
            if (day.tmax > yearlyMaxTemp){
                yearlyMaxTemp = day.tmax
            }
            numDays += 1;
            tempAvg += day.tavg
            snowSum += day.snow;
            rainSum += day.prcp;
            if (day.prcp > 0.075) {
                daysOfRain += 1;
            }
            if (day.snow > 0.1) {
                daysOfSnow += 1;
            }
        }
        snowSum = (snowSum / 12).toFixed(1);
        rainSum = (rainSum / 12).toFixed(1);
        tempAvg = (tempAvg / numDays).toFixed(1);
        return { rainSum, snowSum, daysOfRain, daysOfSnow, tempAvg, yearlyMaxTemp, yearlyMinTemp };
    } catch (error) {
        console.log(error);
    }
}
