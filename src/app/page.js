'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [city,setCity] = useState('')
  const [forecastData ,setForecastData] = useState([])

     let API_KEY = 'ddead9b055d3632eb4806f8cc1ae4ad2'
  const getSearchWeather=async()=>{
    //  try{
    //  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,{
    //   method :"GET"
    //  }) 
    //    const data = await res.json()  
    //    console.log(data.list)
    //    setForecastData(data.list)
    //   }
    //   catch(error){
    //        console.error(error)
    //   }
     
    // }

     try{
       const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
       const data = await res.json()
       console.log(data.list)
        setForecastData(data.list)      
      }
     catch(error){
      console.log(error)
     }
    }
    useEffect(()=>{
      getSearchWeather()
    },[city])
  
   const submitHandler=(e)=>{
    e.preventDefault()
    console.log(city)

   }


   const formatForecastData = () => {
    if (!forecastData) {
      return null; 
        }

    return forecastData.map((a) => {
      const timestamp = a.dt;
      const date = new Date(timestamp * 1000).toLocaleDateString();
      const temperature = a.main.temp;
      const minTemperature = a.main.temp_min;
      const maxTemperature = a.main.temp_max;
      const pressure = a.main.pressure;
      const humidity = a.main.humidity;

      return (
        <tr key={timestamp}>
          <td>{date}</td>
          <td>{temperature}°C</td>
          <td>{minTemperature}°C</td>
          <td>{maxTemperature}°C</td>
          <td>{pressure} hPa</td>
          <td>{humidity}%</td>
        </tr>
      );
    });
  };


  return (
    <div className='container'>
         <div className='headweather'>
        <h2>Weather in your City</h2>
        <form onSubmit={submitHandler}>
         <input type='text' value={city} onChange={(e)=>setCity(e.target.value)}   />
        <input type='submit' value='search' />
         </form>
        </div>
        <table border='1px'>
            <thead className='card'>
                 <tr>
                    <th className='date'>Date:</th>
                 </tr>
                 <tr>
                  <th className='temp'>temperature</th>
                 </tr>
                 <tr>
                  <th className='min'>Min</th>
                  <th className='max'>Max</th>
                 </tr>
                 <tr>
                  <th className='pres'>Pressure</th>
                 </tr>
                 <tr>
                  <th className='humid'>humidity</th>
                 </tr>
            </thead>
            <tbody className='body'>
               {formatForecastData()}
            </tbody>
        </table>
    </div>
  )
}
