import CityCard from "../components/CityCard";
import { useEffect, useState } from "react";
import { fetchForecast } from "../lib/fetchServices";
import Select from "react-select";
import { Slider } from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const citiesData = require("../citydataacquire/results");
let citiesList = [];
const cityKeys = Object.keys(citiesData);

cityKeys.map((city) => {
  citiesList.push({
    value: city,
    label: city,
    publicSchoolScore:
      citiesData[city]["report-card"]["Public Schools"]["value"],
    crimeScore: citiesData[city]["report-card"]["Crime & Safety"]["value"],
    housingScore: citiesData[city]["report-card"]["Housing"]["value"],
    nightlifeScore: citiesData[city]["report-card"]["Nightlife"]["value"],
    familyScore: citiesData[city]["report-card"]["Good for Families"]["value"],
    diversityScore: citiesData[city]["report-card"]["Diversity"]["value"],
    jobScore: citiesData[city]["report-card"]["Jobs"]["value"],
    weatherScore: citiesData[city]["report-card"]["Weather"]["value"],
    costOfLivingScore:
      citiesData[city]["report-card"]["Cost of Living"]["value"],
    healthAndFitnessScore:
      citiesData[city]["report-card"]["Health & Fitness"]["value"],
    outdoorScore:
      citiesData[city]["report-card"]["Outdoor Activities"]["value"],
    commuteScore: citiesData[city]["report-card"]["Commute"]["value"],
    population: citiesData[city]["about"]["Population"]["value"],
  });
});

export default function Home() {
  const [forecastResults, setForecastResults] = useState(null);
  const [preferences, setPreferences] = useState({
    population: 50,
  });
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {true ? (
          <div className="flex flex-col justify-center items-center h-screen w-screen">
            <RankingList {...{ preferences }} />
            <SliderSet {...{ preferences, setPreferences }} />
          </div>
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
      <Select
        className=" w-full mb-3"
        onChange={(e) =>
          setSearchCities({ ...searchCities, city1: e?.value || "" })
        }
        options={citiesList}
        isClearable
        isSearchable
        name="city1"
      />
      <Select
        className=" w-full mb-3"
        onChange={(e) =>
          setSearchCities({ ...searchCities, city2: e?.value || "" })
        }
        options={citiesList}
        isClearable
        isSearchable
        name="city1"
      />

      <button
        className="bg-moss text-slate-blue shadow-md hover:shadow-xl p-4 rounded-md mt-5"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

const SliderSet = ({ preferences, setPreferences }) => {
  const MARKS = [
    { value: 0, label: "0" },
    { value: 25, label: "250000" },
    { value: 50, label: "500000" },
    { value: 75, label: "750000" },
    { value: 100, label: "1000000" },
  ];
  return (
    <div className="flex flex-col w-2/3 h-1/4 justify-center items-center shadow-md sm:rounded-lg">
      <h2>Population</h2>
      <Slider
        className="w-5/6"
        onChangeEnd={(e) =>
          setPreferences((preferences) => {
            return { ...preferences, population: e };
          })
        }
        label={(val) => MARKS.find((mark) => mark.value === val).label}
        defaultValue={50}
        step={25}
        marks={MARKS}
      />
    </div>
  );
};

const RankingList = ({ preferences }) => {
  const [shortList, setShortList] = useState([]);
  const [animationParent] = useAutoAnimate();
  useEffect(() => {
    setShortList(citiesList);
    setShortList((current) => {
      let temp = current.filter(
        (city) => city.population > preferences.population * 10000
      );
      temp = temp.sort(function (city1, city2) {
        let city1Score =
          city1.publicSchoolScore *
          city1.crimeScore *
          city1.housingScore *
          city1.nightlifeScore *
          city1.familyScore *
          city1.diversityScore *
          city1.jobScore *
          city1.costOfLivingScore *
          city1.weatherScore *
          city1.healthAndFitnessScore *
          city1.outdoorScore *
          city1.commuteScore;
        let city2Score =
          city2.publicSchoolScore *
          city2.crimeScore *
          city2.housingScore *
          city2.nightlifeScore *
          city2.familyScore *
          city2.diversityScore *
          city2.jobScore *
          city2.costOfLivingScore *
          city2.weatherScore *
          city2.healthAndFitnessScore *
          city2.outdoorScore *
          city2.commuteScore;

        if (city1Score > city2Score) return -1;
        if (city1Score < city2Score) return 1;
      });
      return temp;
    });
  }, [preferences]);
  return (
    <div className=" flex flex-col items-center  relative  shadow-md sm:rounded-lg h-1/2 overflow-auto ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Population
            </th>
            <th scope="col" className="px-6 py-3">
              Crime
            </th>
            <th scope="col" className="px-6 py-3">
              Nightlife
            </th>
            <th scope="col" className="px-6 py-3">
              Weather
            </th>
            <th scope="col" className="px-6 py-3">
              Schools
            </th>
            <th scope="col" className="px-6 py-3">
              Housing
            </th>
            <th scope="col" className="px-6 py-3">
              Cost of Living
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Compare</span>
            </th>
          </tr>
        </thead>
        <tbody ref={animationParent}>
          {shortList.map((city) => {
            return (
              <tr
                key={city.value}
                className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {city.value}
                </th>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {city.population}
                </td>
                <td className="px-6 py-4">{city.crimeScore}</td>
                <td className="px-6 py-4">{city.nightlifeScore}</td>
                <td className="px-6 py-4">{city.weatherScore}</td>
                <td className="px-6 py-4">{city.publicSchoolScore}</td>
                <td className="px-6 py-4">{city.housingScore}</td>
                <td className="px-6 py-4">{city.costOfLivingScore}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Compare
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
