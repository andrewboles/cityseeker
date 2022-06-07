export default function CityCard({ results, setForecastResults }) {

    const resultsAndCriteria = [
        {
            title: "Annual Max Temp",
            value1: results[0].yearlyMaxTemp,
            value2: results[1].yearlyMaxTemp,
            criteria: results[0].yearlyMaxTemp < results[1].yearlyMaxTemp,
        },
        {
            title: "Annual Min Temp",
            value1: results[0].yearlyMinTemp,
            value2: results[1].yearlyMinTemp,
            criteria: results[0].yearlyMinTemp > results[1].yearlyMinTemp,
        },
        {
            title: "Rainfall Annually [ft]",
            value1: results[0].rainTotal,
            value2: results[1].rainTotal,
            criteria: results[0].rainTotal < results[1].rainTotal,
        },
        {
            title: "Days of Rain",
            value1: results[0].rainDays,
            value2: results[1].rainDays,
            criteria: results[0].rainDays < results[1].rainDays,
        },
        {
            title: "Snowfall Annually [ft]",
            value1: results[0].snowTotal,
            value2: results[1].snowTotal,
            criteria: results[0].snowTotal < results[1].snowTotal,
        },
        {
            title: "Days of Snow",
            value1: results[0].snowDays,
            value2: results[1].snowDays,
            criteria: results[0].snowDays < results[1].snowDays,
        },
    ]

    return (
        <div className="flex flex-col items-start bg-ash rounded-xl p-8 dark:bg-slate-800 m-10 shadow-xl w-1/2">
            <div className="flex justify-between w-full">
                <h2 className="text-xl font-semibold text-stone-blue">{results[0].city}</h2>
                vs
                <h2 className="text-xl font-semibold text-stone-blue">{results[1].city}</h2>
            </div>
            <div className="flex flex-col items-center justify-center bg-ash w-full flex-grow" >
                {resultsAndCriteria.map(item => {
                    return (
                        item.criteria == true ? <StatItem title={item.title} value={item.value1} /> : null
                    )
                })}
            </div>
            <button
                className="bg-moss text-slate-blue shadow-md hover:shadow-lg p-4 rounded-md mt-5"
                type="submit"
                onClick={()=>setForecastResults(null)}
            >
                Start Over
            </button>
        </div>
    )
}
/* { currentTemp, minTemp, maxTemp, city, conditions, snowTotal, snowDays, rainTotal, rainDays } */

const StatItem = ({ title, value, criteria }) => {

    return (
        <>
            {value ?
                <>
                    <div className="flex p-4 items-center bg-eggwhite rounded-lg mx-6 my-3 shadow-md hover:shadow-lg hover:bg-cobalt h-20 w-5/6 justify-between">
                        <h2 className="text-stone-blue text-lg font-medium">{title}</h2>
                        <h2 className="text-stone-blue text-xl font-semibold">{value}</h2>
                    </div>
                </> :
                <div className="flex p-4 bg-eggwhite rounded-lg mx-6 my-3 shadow-md hover:shadow-lg  h-20 w-5/6 justify-between animate-pulse">
                </div>
            }
        </>
    )
}