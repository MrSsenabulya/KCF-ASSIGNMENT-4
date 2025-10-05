import './index.css'
import { useEffect, useState } from 'react'
import WeatherCard from './components/WeatherCard'

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_KEY = 'cac959a2468845ff988230336250110'
  
  // 10 cities in Uganda
  const cities = [
    'Kampala',
    'Entebbe',
    'Jinja',
    'Mbale',
    'Gulu',
    'Lira',
    'Mbarara',
    'Fort Portal',
    'Masaka',
    'Arua'
  ]

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)
      
      
      const promises = cities.map(async (city) => {
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city},Uganda&aqi=no`
          )
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          
          // Map the WeatherAPI.com response to your component props
          return {
            city: data.location.name,
            temperature: Math.round(data.current.temp_c),
            weather: data.current.condition.text,
            highs: Math.round(data.current.temp_c + 3),
            lows: Math.round(data.current.temp_c - 3),  
            icon: getWeatherIcon(data.current.condition.text, data.current.is_day)
          }
        } catch (err) {
          console.error(`Error fetching data for ${city}:`, err)
          // Return fallback data for failed requests
          return {
            city: city,
            temperature: 25,
            weather: 'Sunny',
            highs: 28,
            lows: 22,
            icon: 'Sunny'
          }
        }
      })
      
      const results = await Promise.all(promises)
      setWeatherData(results)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching weather data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Function to map WeatherAPI.com conditions to the SVG icons

  function getWeatherIcon(conditionText, isDay) {
    const condition = conditionText.toLowerCase()
    
    // Map based on condition text and day/
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return isDay ? 'Sunny' : 'ClearNight'
    } else if (condition.includes('partly cloudy')) {
      return isDay ? 'PartlyCloudy' : 'PartlyCloudyNight'
    } else if (condition.includes('cloudy') || condition.includes('overcast')) {
      return 'Cloudy'
    } else if (condition.includes('rain') && !condition.includes('light')) {
      return 'HeavyRain'
    } else if (condition.includes('light rain') || condition.includes('drizzle')) {
      return 'LightRain'
    } else if (condition.includes('thunderstorm')) {
      return 'Thunderstorm'
    } else if (condition.includes('snow')) {
      return 'SmallClouds'
    } else if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
      return 'SunBehindCloud'
    } else if (condition.includes('wind')) {
      return 'StrongWind'
    }
    
    return 'Sunny' // Default fallback
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <div className="App">Loading weather data...</div>
  }

  if (error) {
    return (
      <div className="App">
        <p>Error: {error}</p>
        <button onClick={fetchData}>Retry</button>
      </div>
    )
  }

  return (
    <div className="App">
      
      <h1 className="card-title">Today's Weather</h1>

      {weatherData.length > 0 && weatherData.map((weather, index) => (
        <WeatherCard key={index} props={weather} />
      ))}
    </div>
  )
}

export default App
