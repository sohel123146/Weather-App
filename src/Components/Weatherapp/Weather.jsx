import React,{useState} from 'react'
import './Weather.css'
import search_icon from '../Assests/search.png'
import clear_icon from '../Assests/clear.png'
import cloud_icon from '../Assests/cloud.png'
import drizzle_icon from '../Assests/drizzle.png'
import humidity_icon from '../Assests/humidity.png'
import rain_icon from '../Assests/rain.png'
import snow_icon from '../Assests/snow.png'
import wind_icon from '../Assests/wind.png'
import pressure_icon from '../Assests/pressure.svg'
import feels_icon from '../Assests/feels_like.svg'

export default function Weather() {

    const [temp,setTemp] = useState(0)
    const [location,setLocation] = useState('')
    const [icon,setIcon] = useState(cloud_icon)
    const [lat,setLat] = useState(0)
    const [lon,setLon] = useState(0)
    const [des,setDes] = useState('')
    const [humidity,setHumidity] = useState(0)
    const [wind,setWind] = useState(0)
    const [pressure,setPressure] = useState(0)
    const [feelslike,setFeelslike] = useState(0)
    const [input,setInput] = useState('')
    
    // const api_key = process.env.REACT_APP_WEATHER_API;
    const api_key = "c5bdd6f900d13018e9b5121254011a46";


    const search = async () =>
    {
        const element = document.getElementsByClassName('cityInput')
        if(element[0].value === '')
        {
            return 0;
        }
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        let data = await fetch(url);
        let parsedData = await data.json(); 
        setTemp(parsedData.main.temp)
        setLocation(parsedData.name)
        setLat(parsedData.coord.lat)
        setLon(parsedData.coord.lon)
        setDes(parsedData.weather[0].description)
        setHumidity(parsedData.main.humidity)
        setWind(parsedData.wind.speed)
        setPressure(parsedData.main.pressure)
        setFeelslike(parsedData.main.feels_like)
        setInput('')

        if(parsedData.weather[0].icon === '01d' || parsedData.weather[0].icon === '01n')
        {
            setIcon(clear_icon)
        }
        else if(parsedData.weather[0].icon === '02d' || parsedData.weather[0].icon === '02n')
        {
            setIcon(cloud_icon)
        }
        else if(parsedData.weather[0].icon === '03d' || parsedData.weather[0].icon === '03n')
        {
            setIcon(drizzle_icon)
        }
        else if(parsedData.weather[0].icon === '04d' || parsedData.weather[0].icon === '04n')
        { 
            setIcon(drizzle_icon)
        }
        else if(parsedData.weather[0].icon === '09d' || parsedData.weather[0].icon === '09n')
        {
            setIcon(rain_icon)
        }
        else if(parsedData.weather[0].icon === '10d' || parsedData.weather[0].icon === '10n')
        {
            setIcon(rain_icon)
        }
        else if(parsedData.weather[0].icon === '11d' || parsedData.weather[0].icon === '11n')
        {
            setIcon(rain_icon)
        }
        else if(parsedData.weather[0].icon === '13d' || parsedData.weather[0].icon === '13n')
        {
            setIcon(snow_icon)
        }
        else if(parsedData.weather[0].icon === '50d' || parsedData.weather[0].icon === '50n')
        {
            setIcon(drizzle_icon)
        }
        else
        {
            setIcon(clear_icon)
        }
    }

    const handleOnChange = (event) =>
    {
        setInput(event.target.value)
    }

  return (
    <div>
        <div className='container'>
            <aside>
                <div className='topbar'>
                    <input type='text' value={input} onChange={handleOnChange} className='cityInput' placeholder='search city'/>
                    <div className='search-icon' onClick={search}>
                        <img src={search_icon} alt=""/>
                    </div>
                </div>
                <div className='weather-details'>
                    <div className='cloud-icon'>
                        <img src={icon} alt='img' width="150" height="150"/>
                    </div>
                    <div className='weather-temp'>{Math.floor(temp)}&deg;C</div>
                    <div className='weather-location'>{location}</div>
                    <div className='description'>{des}</div>
                    <div className='coord'>H: {lat}° L: {lon}°</div>
                </div>
            </aside>
            <div className='highlights'>
                <div className="humidity_card">
                    <div className="humidity_details">
                        <img src={humidity_icon} alt='' width="20" height="20"/>
                        <h1>HUMIDITY</h1>
                    </div>
                    <div className="humidity_value">{humidity}°</div>
                </div>
                <div className="wind_card">
                <div className="wind_details">
                        <img src={wind_icon} alt='' width="20" height="20"/>
                        <h1>WIND</h1>
                    </div>
                    <div className="wind_value">{wind} km/h</div>
                </div>
                <div className="pressure_card">
                <div className="pressure_details">
                        <img src={pressure_icon} alt='' width="20" height="20" fill='white'/>
                        <h1>PRESSURE</h1>
                    </div>
                    <div className="pressure_value">{pressure} hPa</div>
                </div>
                <div className="feelslike_card">
                <div className="feelslike_details">
                        <img src={feels_icon} alt='' width="20" height="20" fill='white'/>
                        <h1>FEELS LIKE</h1>
                    </div>
                    <div className="feelslike_value">{feelslike}°</div>
                </div>
                </div>
            </div>
    </div>
  )
}
