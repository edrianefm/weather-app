import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { CiSearch, CiRepeat  } from "react-icons/ci";
import { IoIosPartlySunny } from "react-icons/io";
import { BsWind } from "react-icons/bs";
import { MdOutlineWaterDrop } from "react-icons/md";
import { IoRainyOutline } from "react-icons/io5";

function App() {

  const [city, setCity] = useState('Manila');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_Key = "d3e800bae18e48e79a211044241306";

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {

      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${city}`
      );
      setWeatherData(response.data)
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather(city);
  }, []);
  
  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[#f3f4f8]'>
      <div className='w-full max-w-[600px] h-[600px] bg-[#ffffff] shadow-lg'>
         {/* Search bar */}
          <div className='flex flex-col md:flex-row p-6 md:p-10 justify-center gap-5 items-center'>
          <input className='w-full md:w-auto border rounded-xl text-2xl md:text-3xl pl-5 text-left h-[70px]' type="text" value={city}  onChange={(e) => setCity(e.target.value)}/>
          <button onClick={fetchWeather}><CiSearch className='text-3xl md:text-4xl font-bold'/></button>
          </div>
           {/* Weather Display */}
        {loading ? (
          <div className='w-full h-[300px] flex justify-center items-center'>
            <p>Loading...</p>
          </div>
        ) : weatherData ? (
          <div>
            <div className='w-full h-[300px] flex flex-row items-center justify-center px-10 gap-10'>
              {/* <IoIosPartlySunny className='text-[13rem] text-center' /> */}
              <img src={weatherData.current.condition.icon} className='w-[9rem] text-center' alt="" />
              <div  className='flex flex-col gap-3'>
                <h1 className='text-6xl md:text-8xl'>{Math.round(weatherData.current.temp_c)}°c</h1>
                <p className='text-4xl text-gray-400'>{weatherData.current.condition.text}</p>
              </div>
            </div>

            {/* Additional Weather Info */}
            <div className='flex flex-row justify-evenly h-[100px] items-center'>
              <div className='flex flex-col gap-1 items-center'>
                <BsWind className='text-5xl ' />
                <p className='text-xl text-gray-500'>{weatherData.current.wind_mph} m/h</p>
              </div>
              <div className='flex flex-col gap-1 items-center'>
                <MdOutlineWaterDrop className='text-5xl ' />
                <p className='text-xl text-gray-500'>{weatherData.current.humidity}%</p>
              </div>
              <div className='flex flex-col gap-1 items-center'>
                <IoRainyOutline className='text-5xl ' />
                <p className='text-xl text-gray-500'>{weatherData.current.cloud}%</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full h-[300px] flex justify-center items-center'>
            <p className='text-2xl'>Enter a location to get the weather.</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default App;