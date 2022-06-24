import { useEffect, useState } from "react";
import { fetchForecast } from "../lib/fetchServices";
import PreferenceSlider from "../components/PreferenceSlider";
import CityProgressCompareBar from "../components/CityCompareProgressBar";
import { initialData } from "../lib/initialDragData";
import { DragDrop } from "../components/DragDrop";
import { RankingList } from "../components/RankingList";
import { resetServerContext } from "react-beautiful-dnd";

export const getServerSideProps = async ({ query }) => {

  resetServerContext() 

  return {props: { data : []}}

}
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

    medianHouseholdIncome:
      citiesData[city]["working-in"]["Median Household Income"]["value"],
    medianRent: citiesData[city]["real-estate"]["Median Rent"]["value"],
    medianHomeValue:
      citiesData[city]["real-estate"]["Median Home Value"]["value"],
  });
});

export default function Home() {
  const [compareDisabled, setCompareDisabled] = useState(false);
  const [searchCities, setSearchCities] = useState({ city1: "", city2: "" });
  const [prefColumnOrder, setPrefColumnOrder] = useState(initialData);
  const [preferences, setPreferences] = useState({
    population: [250000, 2000000],
    medianHomeValue: [200000, 1000000],
    medianRent: [500, 2000],
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
  useEffect(() => {
    if (searchCities.city1 !== "" && searchCities.city2 !== "") {
      setCompareDisabled(true);
    } else {
      setCompareDisabled(false);
    }
  }, [searchCities]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <RankingList
        {...{
          preferences,
          compareDisabled,
          setSearchCities,
          searchCities,
          citiesList,
        }}
      />
       <div className="flex flex-col lg:flex-row w-screen justify-center items-center">
        <div className="flex h-full w-full lg:w-1/2 justify-center items-center shadow-md rounded-lg m-6 p-2">
          <SliderSet {...{ preferences, setPreferences }} />
          <DragDrop {...{ prefColumnOrder, setPrefColumnOrder }} />
        </div>
        <SearchCard {...{ setSearchCities, searchCities }} />
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

  const handleRemoveClick = (e) => {
    setSearchCities({ ...searchCities, [e.target.id]: "" });
    setForecastResults({ ...forecastResults, [e.target.id]: {} });
  };

  return (
    <div className="flex flex-col w-full lg:w-1/2 justify-center items-center shadow-md rounded-lg m-2  p-2">
      <div className="flex w-full justify-around">
        <div className="flex align-center">
          <h2 className="bg-lime rounded-md p-1">{searchCities.city1.value}</h2>
          {searchCities.city1 !== "" && (
            <button
              className="ml-2 p-1 text-ash text-sm bg-cobalt border-2 rounded-md"
              onClick={handleRemoveClick}
              id="city1"
            >
              X
            </button>
          )}
        </div>
        <div className="flex align-center">
          <h2 className="bg-pink rounded-md p-1">{searchCities.city2.value}</h2>
          {searchCities.city2 !== "" && (
            <button
              className="ml-2 p-1 text-ash text-sm bg-cobalt border-2 rounded-md"
              onClick={handleRemoveClick}
              id="city2"
            >
              X
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <CityProgressCompareBar
          heading="Median Home Price"
          values={{
            city1: searchCities.city1.medianHomeValue / 11000,
            city2: searchCities.city2.medianHomeValue / 11000,
          }}
          labels={{
            city1: searchCities.city1.medianHomeValue,
            city2: searchCities.city2.medianHomeValue,
          }}
        />
        <CityProgressCompareBar
          heading="Median Rent"
          values={{
            city1: searchCities.city1.medianRent / 30,
            city2: searchCities.city2.medianRent / 30,
          }}
          labels={{
            city1: searchCities.city1.medianRent,
            city2: searchCities.city2.medianRent,
          }}
        />
        <CityProgressCompareBar
          heading="Median Household Income"
          values={{
            city1: searchCities.city1.medianHouseholdIncome / 1500,
            city2: searchCities.city2.medianHouseholdIncome / 1500,
          }}
          labels={{
            city1: searchCities.city1.medianHouseholdIncome,
            city2: searchCities.city2.medianHouseholdIncome,
          }}
        />
        <CityProgressCompareBar
          heading="Yearly Min Temp"
          values={{
            city1: forecastResults.city1.yearlyMinTemp,
            city2: forecastResults.city2.yearlyMinTemp,
          }}
        />
        <CityProgressCompareBar
          heading="Yearly Max Temp"
          values={{
            city1: forecastResults.city1.yearlyMaxTemp / 1.2,
            city2: forecastResults.city2.yearlyMaxTemp / 1.2,
          }}
          labels={{
            city1: forecastResults.city1.yearlyMaxTemp,
            city2: forecastResults.city2.yearlyMaxTemp,
          }}
        />
        <CityProgressCompareBar
          heading="Days of Rain"
          values={{
            city1: forecastResults.city1.rainDays,
            city2: forecastResults.city2.rainDays,
          }}
        />
        <CityProgressCompareBar
          heading="Days of Snow"
          values={{
            city1: forecastResults.city1.snowDays,
            city2: forecastResults.city2.snowDays,
          }}
        />
      </div>
    </div>
  );
};

const SliderSet = ({ preferences, setPreferences }) => {
  const populationMarks = [
    { value: 100000, label: "100k" },
    { value: 500000, label: "500k" },
    { value: 1000000, label: "1M" },
    { value: 1500000, label: "1.5M" },
    { value: 2000000, label: "2M" },
    { value: 2500000, label: "Infinite" },
  ];

  const generalMarks = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  const rentMarks = [
    { value: 500, label: "$500" },
    { value: 750, label: "$750" },
    { value: 1000, label: "$1k" },
    { value: 1250, label: "$1.25k" },
    { value: 1500, label: "$1.5k" },
    { value: 1750, label: "$1.75k" },
    { value: 2000, label: "Infinite" },
  ];

  const homeCostMarks = [
    { value: 100000, label: "$100k" },
    { value: 250000, label: "$250k" },
    { value: 500000, label: "$500k" },
    { value: 750000, label: "$750k" },
    { value: 1000000, label: "Infinite" },
  ];

  return (
    <div className="w-1/2 m-4 flex flex-col items-center justify-center p-2">
      <PreferenceSlider
        min={100000}
        max={2500000}
        categoryHeading="Preferred City Population"
        preferences={preferences}
        category="population"
        MARKS={populationMarks}
        setPreferences={setPreferences}
      />
      <PreferenceSlider
        min={100000}
        max={1000000}
        categoryHeading="Prefered Median Home Value"
        preferences={preferences}
        category="medianHomeValue"
        MARKS={homeCostMarks}
        setPreferences={setPreferences}
      />
      <PreferenceSlider
        min={500}
        max={2000}
        categoryHeading="Preferred Median Rent"
        preferences={preferences}
        category="medianRent"
        MARKS={rentMarks}
        setPreferences={setPreferences}
      />
    </div>
  );
};
