import CityCard from "../components/CityCard";
import { useEffect, useState } from "react";
import { fetchForecast } from "../lib/fetchServices";
import { TextInput } from "@mantine/core";

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
        <source
          src="https://s3.us-central-1.wasabisys.com/gitprofile/Untitled%20Project%204.m4v"
          type="video/mp4"
        />
      </video>
      <div className="flex items-center justify-center h-screen">
        {forecastResults ? (
          <>
            <CityCard results={forecastResults} setForecastResults={setForecastResults} />
          </>

        ) : (
          <SearchCard {...{ setForecastResults }} />
        )}
      </div>
    </>
  );
}

const SearchCard = ({ setForecastResults }) => {
  const [searchCities, setSearchCities] = useState({ city1: "", city2: "" });
  const [errors, setErrors] = useState({ city1: "", city2: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ city1: "", city2: "" });
    Promise.all([
      fetchForecast(searchCities.city1),
      fetchForecast(searchCities.city2),
    ]).then((values) => {
      console.log("Search Cities: ", searchCities);
      console.log("Forecast Results:", values);
      if (!values[0]) {
        console.log("city 1 not found");
        setErrors({ city1: "city not found" });
      }
      if (!values[1]) {
        console.log("city 2 not found");
        setErrors({ city2: "city not found" });
      }
      if (!values[0] && !values[1]) {
        setErrors({ city1: "city not found", city2: "city not found" });
      }
      if (values[0] && values[1]) {
        setForecastResults(values);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center bg-ash rounded-xl p-8 dark:bg-slate-800 m-10 shadow-xl w-3/4 md:w-1/3"
    >
      <TextInput
        label="Your City"
        value={searchCities.city1}
        onChange={(e) =>
          setSearchCities({ ...searchCities, city1: e.target.value })
        }
        required
        error={errors.city1}
      />
      <TextInput
        label="Rival City"
        value={searchCities.city2}
        onChange={(e) =>
          setSearchCities({ ...searchCities, city2: e.target.value })
        }
        required
        error={errors.city2}
      />
      <button
        className="bg-moss text-slate-blue shadow-md hover:shadow-lg p-4 rounded-md mt-5"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
