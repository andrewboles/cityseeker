import CityCard from "../components/CityCard";
import { useEffect, useState } from "react";
import { fetchForecast } from "../lib/fetchServices";
import { TextInput } from '@mantine/core';

export default function Home() {
  let [forecastResults, setForecastResults] = useState(null);

  return (
    <>
      <video
        className="absolute -z-50 object-cover h-screen w-screen"
        autoPlay
        loop
        muted
        preload="metadata"
      >
        <source src="https://s3.us-central-1.wasabisys.com/gitprofile/Untitled%20Project%204.m4v" type="video/mp4" />
      </video>
      <div className="flex items-center justify-center h-screen">
        {forecastResults ? <CityCard results={forecastResults[0]} /> : <SearchCard {...{ setForecastResults }} />}
      </div>
    </>
  );
}

const SearchCard = ({ setForecastResults }) => {
  const [searchCities, setSearchCities] = useState({ city1: null, city2: null })
  const [errors, setErrors] = useState({ city1: null, city2: null })

  const handleSubmit = async e => {
    e.preventDefault()
    Promise.all([fetchForecast(searchCities.city1), fetchForecast(searchCities.city2)]).then(values => {
      console.log("Search Cities: ", searchCities)
      console.log("Forecast Results:", values);
      setForecastResults(values)
    });
  }

  const handleChange = async e => {
    
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center bg-ash rounded-xl p-8 dark:bg-slate-800 m-10 shadow-xl w-3/4 md:w-1/3">
      <TextInput
        label="Your City"
        value={searchCities.city1}
        onChange={e => setSearchCities({ ...searchCities, city1: e.target.value })}
        required
        error={errors.city1}
      />
      <TextInput
        label="Rival City"
        value={searchCities.city2}
        onChange={e => setSearchCities({ ...searchCities, city2: e.target.value })}
        required
        error={errors.city2}
      />
      <button className="bg-moss text-slate-blue shadow-md hover:shadow-lg p-4 rounded-md mt-5" type="submit">Submit</button>
    </form>
  )
}