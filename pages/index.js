import { useEffect, useState } from "react";
import { fetchForecast } from "../lib/fetchServices";
import Select from "react-select";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import PreferenceSlider from "../components/PreferenceSlider";
import CityProgressCompareBar from "../components/CityCompareProgressBar";
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

    medianHouseholdIncome: citiesData[city]["working-in"]["Median Household Income"]["value"],
    medianRent: citiesData[city]["real-estate"]["Median Rent"]["value"],
    medianHomeValue: citiesData[city]["real-estate"]["Median Home Value"]["value"]
  });
});

export default function Home() {
  const [compareDisabled, setCompareDisabled] = useState(false);
  const [searchCities, setSearchCities] = useState({ city1: "", city2: "" });
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
  useEffect(()=>{
    if(searchCities.city1 !== "" && searchCities.city2 !== ""){
      setCompareDisabled(true)
    } else {
      setCompareDisabled(false)
    }
  },[searchCities])

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <RankingList {...{ preferences, compareDisabled, setSearchCities, searchCities }} />
      <div className="flex flex-col lg:flex-row w-screen justify-center items-center">
        <SliderSet {...{ preferences, setPreferences }} />
        <SearchCard {...{  setSearchCities, searchCities }} />
      </div>
    </div>
  );
}

const SearchCard = ({ searchCities, setSearchCities }) => {
  const [forecastResults, setForecastResults] = useState({
    city1: {},
    city2: {},
  });


  useEffect(() => {
    if (searchCities.city1 !== "") {
      fetchForecast(searchCities.city1.value).then((values) => {
        console.log(values);
        setForecastResults({ ...forecastResults, city1: values });
      });
    }
  }, [searchCities.city1]);
  useEffect(() => {
    if (searchCities.city2 !== "") {

      fetchForecast(searchCities.city2.value).then((values) => {
        console.log(values);
        setForecastResults({ ...forecastResults, city2: values });
      });
    }
  }, [searchCities.city2]);

  const handleRemoveClick = e => {
    setSearchCities({...searchCities, [e.target.id]: ""})
    setForecastResults({...forecastResults, [e.target.id]:{}})
  }

  return (
    <div className="flex flex-col w-full lg:w-1/2 justify-center items-center shadow-md rounded-lg m-2  p-2">
      <div className="flex w-full justify-around">
        <div className="flex align-center">
          <h2 className="bg-lime rounded-md p-1">{searchCities.city1.value}</h2>
          {searchCities.city1 !== "" && <button className="ml-2 p-1 text-ash text-sm bg-cobalt border-2 rounded-md" onClick={handleRemoveClick} id="city1">X</button>}
        </div>
        <div className="flex align-center">
          <h2 className="bg-pink rounded-md p-1">{searchCities.city2.value}</h2>
          {searchCities.city2 !== "" && <button className="ml-2 p-1 text-ash text-sm bg-cobalt border-2 rounded-md" onClick={handleRemoveClick} id="city2">X</button>}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <CityProgressCompareBar heading="Median Home Price" values={{city1: searchCities.city1.medianHomeValue/11000, city2: searchCities.city2.medianHomeValue/11000}} labels={{city1: searchCities.city1.medianHomeValue, city2: searchCities.city2.medianHomeValue}} />
        <CityProgressCompareBar heading="Median Rent" values={{city1: searchCities.city1.medianRent/30, city2: searchCities.city2.medianRent/30}} labels={{city1: searchCities.city1.medianRent, city2: searchCities.city2.medianRent}}/>
        <CityProgressCompareBar heading="Median Household Income" values={{city1: searchCities.city1.medianHouseholdIncome/1500, city2: searchCities.city2.medianHouseholdIncome/1500}} labels={{city1: searchCities.city1.medianHouseholdIncome, city2: searchCities.city2.medianHouseholdIncome}}/>
        <CityProgressCompareBar heading="Yearly Min Temp" values={{city1: forecastResults.city1.yearlyMinTemp, city2: forecastResults.city2.yearlyMinTemp}} />
        <CityProgressCompareBar heading="Yearly Max Temp" values={{city1: forecastResults.city1.yearlyMaxTemp/1.2, city2: forecastResults.city2.yearlyMaxTemp/1.2}} labels={{city1: forecastResults.city1.yearlyMaxTemp, city2: forecastResults.city2.yearlyMaxTemp}}/>
        <CityProgressCompareBar heading="Days of Rain" values={{city1: forecastResults.city1.rainDays, city2: forecastResults.city2.rainDays}} />
        <CityProgressCompareBar heading="Days of Snow" values={{city1: forecastResults.city1.snowDays, city2: forecastResults.city2.snowDays}}/>
      </div>
    </div>
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
    <div className="flex w-full lg:w-1/2 justify-center items-center shadow-md rounded-lg m-6 p-2">
      <div className="w-1/2 m-4 flex flex-col items-center justify-center p-2">
        <PreferenceSlider
          step={25}
          categoryHeading="Minimum City Population"
          preferences={preferences}
          category="population"
          MARKS={populationMarks}
          setPreferences={setPreferences}
        />
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Cost of Living"
          preferences={preferences}
          category="costOfLivingScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Job Market"
          preferences={preferences}
          category="jobScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Crime Safety"
          preferences={preferences}
          category="crimeScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Nightlife"
          preferences={preferences}
          category="nightlifeScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Housing Market"
          preferences={preferences}
          category="housingScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
      </div>
      <div className="w-1/2 m-2 flex flex-col items-center justify-center">
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Family Friendly"
          preferences={preferences}
          category="familyScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Diversity"
          preferences={preferences}
          category="diversityScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Weather"
          preferences={preferences}
          category="weatherScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Outdoor Activities"
          preferences={preferences}
          category="outdoorScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Commute"
          preferences={preferences}
          category="commuteScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
        <PreferenceSlider
          min={0}
          max={5}
          step={1}
          categoryHeading="Health & Fitness"
          preferences={preferences}
          category="healthAndFitnessScore"
          MARKS={generalMarks}
          setPreferences={setPreferences}
        />
      </div>
    </div>
  );
};

const RankingList = ({ preferences, compareDisabled, setSearchCities, searchCities }) => {
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

  const handleCompareClick = (e) => { 
    if(searchCities.city1 === ""){
      setSearchCities({...searchCities, city1: shortList[e.target.id]})
    } else {
      setSearchCities({...searchCities, city2: shortList[e.target.id]})
    }
  };

  return (
    <div className=" flex justify-center items-start relative  shadow-md sm:rounded-lg  overflow-y-auto mx-8 mt-1 w-11/12">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-2 py-3">
              Rank
            </th>
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
          {shortList.map((city, index) => {
            return (
              <tr
                key={city.value}
                className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
              >
                 <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {index}
                </th>
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
                <td className="px-6 py-4 hidden lg:table-cell ">
                  {city.crimeScore}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell ">
                  {city.nightlifeScore}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell ">
                  {city.weatherScore}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell ">
                  {city.publicSchoolScore}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell ">
                  {city.housingScore}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell ">
                  {city.costOfLivingScore}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell ">
                  {city.outdoorScore}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell ">
                  {city.jobScore}
                </td>
                <td className="px-6 py-4 text-right hidden lg:table-cell ">
                  
                    
                    <button id={index}
                    onClick={handleCompareClick}
                    disabled={compareDisabled} type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50">Compare</button>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
