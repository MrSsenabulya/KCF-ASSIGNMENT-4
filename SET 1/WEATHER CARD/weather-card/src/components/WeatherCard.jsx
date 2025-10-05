import React from 'react'
//  all weather SVG icons
import ClearNight from '../assets/Clear (Night).svg'
import CloudWithLightning from '../assets/Cloud with lightning.svg'
import Cloudy from '../assets/Cloudy.svg'
import HeavyRain from '../assets/heavy rain.svg'
import LightDrizzle from '../assets/Light drizzle.svg'
import LightRain from '../assets/light rain.svg'
import ModerateRain from '../assets/moderate rain.svg'
import PartlyCloudyNight from '../assets/Partly cloudy (Night).svg'
import PartlyCloudy from '../assets/Partly cloudy.svg'
import PatchyLightRainNight from '../assets/Patchy light rain (Night).svg'
import PatchyLightRain from '../assets/Patchy light rain.svg'
import SmallClouds from '../assets/small clouds.svg'
import StrongWind from '../assets/Strong Wind.svg'
import SunBehindCloud from '../assets/Sun behind a cloud.svg'
import SunWithSmallCloud from '../assets/Sun with a small cloud.svg'
import SunnyWithWind from '../assets/Sunny with Wind.svg'
import Sunny from '../assets/Sunny.svg'
import Thunderstorm from '../assets/thunderstorm.svg'
import VeryHotSunny from '../assets/very hot (Sunny).svg'

const WeatherCard = ({props}) => {
  // Function to get the correct SVG icon based on weather condition
  const getWeatherIcon = (iconName) => {
    const iconMap = {
      'Sunny': Sunny,
      'Cloudy': Cloudy,
      'ModerateRain': ModerateRain,
      'LightDrizzle': LightDrizzle,
      'Thunderstorm': Thunderstorm,
      'SmallClouds': SmallClouds,
      'SunBehindCloud': SunBehindCloud,
      'ClearNight': ClearNight,
      'PartlyCloudy': PartlyCloudy,
      'PartlyCloudyNight': PartlyCloudyNight,
      'LightRain': LightRain,
      'HeavyRain': HeavyRain,
      'PatchyLightRain': PatchyLightRain,
      'PatchyLightRainNight': PatchyLightRainNight,
      'StrongWind': StrongWind,
      'SunnyWithWind': SunnyWithWind,
      'SunWithSmallCloud': SunWithSmallCloud,
      'VeryHotSunny': VeryHotSunny,
      'CloudWithLightning': CloudWithLightning
    }
    
    return iconMap[iconName] || Sunny
  }

  return (
    <div>
      
      <div className="container justify-content-center">
        <div className="card">
          <h2 className='city-name'>{props.city}</h2>
          <img src={getWeatherIcon(props.icon)} className='weather-icon' alt="Weather" />
          <p>{props.weather}</p>
          <h1 className='temperature'>{props.temperature}°C</h1>
          <p>Highs: {props.highs}°C | Lows: {props.lows}°C</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard