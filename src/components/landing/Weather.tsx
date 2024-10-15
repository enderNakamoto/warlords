import { Sun, Cloud, Snowflake, CloudRain, CloudDrizzle, CloudLightning } from "lucide-react";

export default function Weather() {
  return (
    <section className="text-center mt-12 mb-12 py-8" id="weather">
      <h3 className="text-2xl font-bold text-gray-300 tracking-widest mt-8 mb-8">WEATHER</h3>
      <div className="flex flex-col md:flex-row justify-around">
        <div className="flex flex-col items-center cursor-pointer hover:scale-105">
          <Sun className="mb-2 text-yellow-500 h-8 w-8" />
          <h3 className="text-lg font-bold mb-2">CLEAR</h3>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:scale-105">
          <Cloud className="mb-2 text-gray-200 h-8 w-8" />
          <h3 className="text-lg font-bold mb-2">CLOUDS</h3>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:scale-105">
          <Snowflake className="mb-2 text-blue-200 h-8 w-8" />
          <h3 className="text-lg font-bold mb-2">SNOW</h3>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:scale-105">
          <CloudRain className="mb-2 text-blue-500 h-8 w-8" />
          <h3 className="text-lg font-bold mb-2">RAIN</h3>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:scale-105">
          <CloudDrizzle className="mb-2 text-gray-500 h-8 w-8" />
          <h3 className="text-lg font-bold mb-2">DRIZZLE</h3>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:scale-105">
          <CloudLightning className="mb-2 text-red-500 h-8 w-8" />
          <h3 className="text-lg font-bold mb-2">THUNDERSTORM</h3>
        </div>
      </div>
    </section>
  );
}
