import React, { useEffect, useState } from "react";
import "./weather.css";
import { assets } from "../assets/Images/assets";
import { fetchWeatherData } from "../Data/api";

function Weather() {
  const [city, setcity] = useState("");
  const [city1, setcity1] = useState("dehradun");
  const [weatherdata, setweatherdata] = useState({});
  const allicons = {
    "01d": assets.clear,
    "01n": assets.night,
    "02d": assets.cloud,
    "02n": assets.cloud,
    "03d": assets.cloud,
    "03n": assets.cloud,
    "04d": assets.drizzle,
    "04n": assets.drizzle,
    "09d": assets.rain,
    "09n": assets.rain,
    "10d": assets.rain,
    "10n": assets.rain,
    "13d": assets.snow,
    "13n": assets.snow,
  };
  const pass = () => {
    setcity1(city);
    setcity("");
  };

  useEffect(() => {
    const getweather = async () => {
      const data = await fetchWeatherData(city1);
      console.log(data);
      const icon = allicons[data.weather[0].icon] || assets.clear;
      setweatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        name: data.name,
        icon: icon,
      });
    };
    getweather();
  }, [city1]);
  console.log(weatherdata);
  return (
    <div className="weather">
      {/* <img src={assets.back1} alt="" /> */}
      <div className="search-bar">
        <input
          value={city}
          onChange={(e) => {
            setcity(e.target.value);
          }}
          type="text"
          placeholder="search"
        />
        <img
          onClick={() => {
            pass();
          }}
          src={assets.search}
          alt=""
        />
      </div>
      <img src={weatherdata.icon} alt="" className="icon" />
      <p className="temp">{Math.floor(weatherdata.temperature)}°c</p>
      <p className="location">{weatherdata.name}</p>

      <div className="bottom">
        <div className="col">
          <img src={assets.humidity} alt="" />
          <div>
            <p>{weatherdata.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={assets.wind} alt="" />
          <div>
            <p>{weatherdata.windspeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
