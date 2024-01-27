'use client'
import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const Datauser =()=>{
  const [forecast,setForecast] = useState([])
  const [search,setSearch] = useState('')

  let API_KEY = 'ddead9b055d3632eb4806f8cc1ae4ad2'
  const getData=async ()=>{
     const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${API_KEY}&units=metric`)
     const data = await res.json()
      console.log(data.list)
      setForecast(data.list)
    }
   
  useEffect(()=>{
    getData()
  },[])
    
const onClickSubmit=(e)=>{
  e.preventDefault()
  getData()
}


 return (
  <div className='container'>
      <div className='head_weather'>
        <form onSubmit={onClickSubmit}>
         <h3>Weather Report</h3>
         <input type='text' value={search} onChange={(e)=>setSearch(e.target.value)}  />
         <input type='submit' value='button' />
         </form>
         </div>
    <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
               <tr>
                 <th>Date</th>
                 <th>Max</th>
                 <th>Min</th>
                 <th>Pressure</th>
                 <th>Humidity</th>
               </tr>
            </thead>
             <tbody>
                  { forecast && 
                    forecast.map((item,i)=>{
                      console.log(item)
                      return (
                      <tr key={i}>
                       <td>{item.dt_txt}</td>
                       <td>{item.main.temp_max}°C</td>
                       <td>{item.main.temp_min}°C</td>
                       <td>{item.main.pressure}hPa</td>
                       <td>{item.main.pressure}%</td>
                      </tr>
                      )
                    })
                  }
             </tbody>
          </table>
        </div>
    </div>
  </div>
 )  
}
export default Datauser;