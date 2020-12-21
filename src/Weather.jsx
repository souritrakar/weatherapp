import React from "react"

export default function Weather(props){
    return(
        <div className="weathercard">
            <h3> Temperature : {props.temp}°C </h3>
    <h3>Condition : {props.condition}</h3>
    <h3> Humidity : {props.humidity} </h3>
    <h3>Feels Like: {props.feelslike} °C</h3>
    <h3>Wind Speed : {props.windspeed}</h3>
    <h3>Clouds : {props.clouds}</h3>
        </div>
    )
}