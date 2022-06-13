
import { useEffect, useState } from "react";
import { fetchForecast } from "../lib/fetchServices";
import Select from "react-select";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import PreferenceSlider from "../components/PreferenceSlider";
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
    costOfLivingScore: 3,
    jobScore: 3,
    publicSchoolScore: 3,
    crimeScore: 3,
    housingScore: 3,
    nightlifeScore: 3,
    familyScore: 3,
    diversityScore: 3,
    jobScore: 3,
    weatherScore: 3,
    healthAndFitnessScore: 3,
    outdoorScore: 3,
    commuteScore: 3,
  });
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <RankingList {...{ preferences }} />
      <div className="flex flex-col lg:flex-row  w-screen lg:h-1/2 justify-center">
        <SliderSet {...{ preferences, setPreferences }} />
        <SearchCard {...{ setForecastResults }} />
      </div>
    </div>
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
      className="lg:flex flex-col items-center bg-ash rounded-xl p-8 dark:bg-slate-800 m-10 shadow-xl w-3/4 md:w-1/3 hidden"
    >
      <Select
        className=" w-1/4 mb-3"
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
  const populationMarks = [
    { value: 0, label: "0" },
    { value: 25, label: "250k" },
    { value: 50, label: "500k" },
    { value: 75, label: "750k" },
    { value: 100, label: "1M" },
  ];

  const generalMarks = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  return (
    <div className="flex lg:flex-col flex-wrap w-full lg:w-3/5 justify-center items-center shadow-md sm:rounded-lg m-0">
      <PreferenceSlider step={25} categoryHeading="Minimum City Population" preferences={preferences} category="population" MARKS={populationMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Cost of Living" preferences={preferences} category="costOfLivingScore" MARKS={generalMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Job Market" preferences={preferences} category="jobScore" MARKS={generalMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Crime Safety" preferences={preferences} category="crimeScore" MARKS={generalMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Nightlife" preferences={preferences} category="nightlifeScore" MARKS={generalMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Housing Market" preferences={preferences} category="housingScore" MARKS={generalMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Family Friendly" preferences={preferences} category="familyScore" MARKS={generalMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Diversity" preferences={preferences} category="diversityScore" MARKS={generalMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Weather" preferences={preferences} category="weatherScore" MARKS={generalMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Outdoor Activities" preferences={preferences} category="outdoorScore" MARKS={generalMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Commute" preferences={preferences} category="commuteScore" MARKS={generalMarks} setPreferences={setPreferences} />
      <PreferenceSlider min={0} max={5} step={1} categoryHeading="Health & Fitness" preferences={preferences} category="healthAndFitnessScore" MARKS={generalMarks} setPreferences={setPreferences} />

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
          preferences.publicSchoolScore * city1.publicSchoolScore +
          preferences.crimeScore * city1.crimeScore +
          preferences.housingScore * city1.housingScore +
          preferences.nightlifeScore * city1.nightlifeScore +
          preferences.familyScore * city1.familyScore +
          preferences.diversityScore * city1.diversityScore +
          preferences.jobScore * city1.jobScore +
          preferences.costOfLivingScore * city1.costOfLivingScore +
          preferences.weatherScore * city1.weatherScore +
          preferences.healthAndFitnessScore * city1.healthAndFitnessScore +
          preferences.outdoorScore * city1.outdoorScore +
          preferences.commuteScore * city1.commuteScore;

        let city2Score =
          preferences.publicSchoolScore * city2.publicSchoolScore +
          preferences.crimeScore * city2.crimeScore +
          preferences.housingScore * city2.housingScore +
          preferences.nightlifeScore * city2.nightlifeScore +
          preferences.familyScore * city2.familyScore +
          preferences.diversityScore * city2.diversityScore +
          preferences.jobScore * city2.jobScore +
          preferences.costOfLivingScore * city2.costOfLivingScore +
          preferences.weatherScore * city2.weatherScore +
          preferences.healthAndFitnessScore * city2.healthAndFitnessScore +
          preferences.outdoorScore * city2.outdoorScore +
          preferences.commuteScore * city2.commuteScore;


        if (city1Score > city2Score) return -1;
        if (city1Score < city2Score) return 1;
      });
      return temp;
    });
  }, [preferences]);
  return (
    <div className=" flex flex-col items-center  relative  shadow-md sm:rounded-lg max-h-96 overflow-y-auto m-6 w-5/6">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3">
              City
            </th>
            <th scope="col" className="px-2 py-3">
              Population
            </th>
            <th scope="col" className="px-2 py-3 hidden lg:table-cell ">
              Crime
            </th>
            <th scope="col" className="px-2 py-3 hidden lg:table-cell ">
              Nightlife
            </th>
            <th scope="col" className="px-2 py-3 hidden lg:table-cell ">
              Weather
            </th>
            <th scope="col" className="px-2 py-3 hidden lg:table-cell ">
              Schools
            </th>
            <th scope="col" className="px-2 py-3 hidden lg:table-cell ">
              Housing
            </th>
            <th scope="col" className="px-2 py-3 hidden lg:table-cell ">
              Cost of Living
            </th>
            <th scope="col" className="px-2 py-3 hidden lg:table-cell ">
              Outdoors
            </th>
            <th scope="col" className="px-2 py-3 hidden lg:table-cell ">
              Job Market
            </th>

            <th scope="col" className="px-2 py-3 hidden lg:flex ">
              <span className="sr-only ">Compare</span>
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
                <td className="px-6 py-4 hidden lg:table-cell ">{city.crimeScore}</td>
                <td className="px-6 py-4 hidden lg:table-cell ">{city.nightlifeScore}</td>
                <td className="px-6 py-4 hidden lg:table-cell ">{city.weatherScore}</td>
                <td className="px-6 py-4 hidden lg:table-cell ">{city.publicSchoolScore}</td>
                <td className="px-6 py-4 hidden lg:table-cell ">{city.housingScore}</td>
                <td className="px-6 py-4 hidden lg:table-cell ">{city.costOfLivingScore}</td>
                <td className="px-6 py-4 hidden lg:table-cell ">{city.outdoorScore}</td>
                <td className="px-6 py-4 hidden lg:table-cell ">{city.jobScore}</td>
                <td className="px-6 py-4 text-right hidden lg:table-cell ">
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
