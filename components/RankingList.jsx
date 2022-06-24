import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState, useEffect } from "react";

export const RankingList = ({
  preferences,
  compareDisabled,
  setSearchCities,
  searchCities,
  citiesList,
}) => {
  const [shortList, setShortList] = useState([]);
  const [animationParent] = useAutoAnimate();
  useEffect(() => {
    setShortList(citiesList);
    setShortList((current) => {
      let temp = current.filter(
        (city) =>
          city.population > preferences.population[0] &&
          (preferences.population[1] > 2490000 ||
            city.population < preferences.population[1]) &&
          city.medianHomeValue > preferences.medianHomeValue[0] &&
          (preferences.medianHomeValue[1] > 990000 ||
            city.medianHomeValue < preferences.medianHomeValue[1]) &&
          city.medianRent > preferences.medianRent[0] &&
          (preferences.medianRent[1] > 1950 ||
            city.medianRent < preferences.medianRent[1])
      );
      temp = temp.sort(function (city1, city2) {
        let city1Score =
          preferences.publicSchoolScore * city1.publicSchoolScore +
          preferences.crimeScore * city1.crimeScore +
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
  }, [citiesList, preferences]);

  const handleCompareClick = (e) => {
    if (searchCities.city1 === "") {
      setSearchCities({ ...searchCities, city1: shortList[e.target.id] });
    } else {
      setSearchCities({ ...searchCities, city2: shortList[e.target.id] });
    }
  };

  return (
    <div className=" flex justify-start items-start relative  shadow-md overflow-y-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-1 py-3">
              Rank
            </th>
            <th scope="col" className="px-1 py-3">
              City
            </th>
            <th scope="col" className="px-1 py-3">
              Population
            </th>
            <th scope="col" className="px-1 py-3 hidden lg:table-cell ">
              Median Rent
            </th>
            <th scope="col" className="px-1 py-3 hidden lg:table-cell ">
              Median Home Value
            </th>
            <th scope="col" className="px-1 py-3 hidden lg:table-cell ">
              Crime
            </th>
            <th scope="col" className="px-1 py-3 hidden lg:table-cell ">
              Nightlife
            </th>
            <th scope="col" className="px-1 py-3 hidden lg:table-cell ">
              Weather
            </th>
            <th scope="col" className="px-1 py-3 hidden lg:table-cell ">
              Schools
            </th>
            <th scope="col" className="px-1 py-3 hidden lg:table-cell ">
              Cost of Living
            </th>
            <th scope="col" className="px-1 py-3 hidden lg:table-cell ">
              Outdoors
            </th>
            <th scope="col" className="px-1 py-3 hidden lg:table-cell ">
              Job Market
            </th>

            <th scope="col" className="px-1 py-3 hidden lg:flex ">
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
                  className="px-1 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {index}
                </th>
                <th
                  scope="row"
                  className="px-1 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {city.value}
                </th>
                <td
                  scope="row"
                  className="px-1 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {city.population}
                </td>
                <td className="px-1 py-4 hidden lg:table-cell ">
                  {city.medianRent}
                </td>
                <td className="px-1 py-4 hidden lg:table-cell ">
                  {city.medianHomeValue}
                </td>
                <td className="px-1 py-4 hidden lg:table-cell ">
                  {city.crimeScore}
                </td>
                <td className="px-1 py-4 hidden lg:table-cell ">
                  {city.nightlifeScore}
                </td>
                <td className="px-1 py-4 hidden lg:table-cell ">
                  {city.weatherScore}
                </td>
                <td className="px-1 py-4 hidden lg:table-cell ">
                  {city.publicSchoolScore}
                </td>
                <td className="px-1 py-4 hidden lg:table-cell ">
                  {city.costOfLivingScore}
                </td>
                <td className="px-1 py-4 hidden lg:table-cell ">
                  {city.outdoorScore}
                </td>
                <td className="px-1 py-4 hidden lg:table-cell ">
                  {city.jobScore}
                </td>
                <td className="px-1 py-4 text-right hidden lg:table-cell ">
                  <button
                    id={index}
                    onClick={handleCompareClick}
                    disabled={compareDisabled}
                    type="button"
                    className="px-1 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                  >
                    Compare
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
