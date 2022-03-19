import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumiidty] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  function updateData(response) {
    console.log(response);
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumiidty(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);
  }

  function fetchData(city) {
    let apiKey = "fc6aaa11eb87ef192ffff5b3c7cdceb9";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(updateData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetchData(city);
  }

  function handleInputChange(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a city"
          onChange={handleInputChange}
        />
        <input type="submit" value="Search" />
      </form>
      {temperature !== null &&
      description !== null &&
      humidity !== null &&
      wind !== null &&
      icon !== null ? (
        <ul>
          <li>Temperature: {Math.round(temperature)}</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}</li>
          <li>Wind: {wind}</li>
          <li>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          </li>
        </ul>
      ) : null}
    </div>
  );
}
