import CityCard from "../components/CityCard"


export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-ash">
      <CityCard city="Austin"/>
      <CityCard city="Detroit"/>
    </div>
    
  )
}