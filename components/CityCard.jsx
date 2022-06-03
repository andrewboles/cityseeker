export default function CityCard({results}) {
    console.log(results)
    return (
        <div className="flex flex-col items-start bg-eggwhite rounded-xl p-8 dark:bg-slate-800 m-10 shadow-md w-1/3 h-5/6">
            <h2 className="text-xl font-semibold">{results.city}</h2>
            <div className="flex flex-col items-center justify-center bg-eggwhite w-full flex-grow" >
                <StatItem title="Days of Rain" value={5}/>
                <StatItem title="Days of Rain" value={5}/>
                <StatItem title="Days of Rain" value={5}/>
                <StatItem title="Days of Rain" value={5}/>
                <StatItem title="Days of Rain" value={5}/>
                <StatItem title="Days of Rain" value={5}/>
            </div>
        </div>
    )
}
/* { currentTemp, minTemp, maxTemp, city, conditions, snowTotal, snowDays, rainTotal, rainDays } */

const StatItem = ({title, value, winLose}) => {

    return(
        <div className="flex p-4 bg-dust rounded-lg mx-6 my-3 shadow-md hover:shadow-lg hover:bg-red-100 w-5/6 justify-between">
            <h2 className="text-soil text-lg font-medium">{title}</h2>
            <h2 className="text-hot-clay text-xl font-semibold">{value}</h2>
        </div>
    )
}