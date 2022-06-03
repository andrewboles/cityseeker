import { useState } from "react"
export default function CityCard({ results }) {

    const handleSearch = e => {
        
    }
    return (
        <div className="flex flex-col items-start bg-eggwhite rounded-xl p-8 dark:bg-slate-800 m-10 shadow-md w-1/3 h-5/6">
            <h2 className="text-xl font-semibold">{results.city}</h2>
            <div className="flex flex-col items-center justify-center bg-eggwhite w-full flex-grow" >
                <StatItem title="Current Temp" value={results.currentTemp} />
                <StatItem title="Conditions" value={results.conditions} />
                <StatItem title="Snowfall Annually [ft]" value={results.snowTotal} />
                <StatItem title="Days of Snow" value={results.snowDays} />
                <StatItem title="Rainfall Annually [ft]" value={results.rainTotal} />
                <StatItem title="Days of Rain" value={results.rainDays} />
            </div>
        </div>
    )
}
/* { currentTemp, minTemp, maxTemp, city, conditions, snowTotal, snowDays, rainTotal, rainDays } */

const StatItem = ({ title, value, winLose }) => {

    return (
        <>
            {value ?
                <div className="flex p-4 items-center bg-dust rounded-lg mx-6 my-3 shadow-md hover:shadow-lg hover:bg-red-100 h-20 w-5/6 justify-between">
                   <h2 className="text-soil text-lg font-medium">{title}</h2>
                    <h2 className="text-hot-clay text-xl font-semibold">{value}</h2>
                </div> :
                <div className="flex p-4 bg-dust rounded-lg mx-6 my-3 shadow-md hover:shadow-lg hover:bg-red-100 h-20 w-5/6 justify-between animate-pulse">
                </div>
            }
        </>
    )
}