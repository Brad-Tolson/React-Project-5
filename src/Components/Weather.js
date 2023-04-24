import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { selectDisplay } from "../redux/slices/displayCountrySlice";

const Weather = () => {
    const [weather, setWeather] = useState();
    const display = useSelector(selectDisplay);
    const latitude = display.capitalInfo.latlng[0];
    const longitude = display.capitalInfo.latlng[1];

    useEffect(() => {
        const fetchWeather = async () => {
            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/current.json',
                params: {q: `${latitude},${longitude}`},
                headers: {
                    'content-type': 'application/octet-stream',
                    'X-RapidAPI-Key': '22dee4ba68msha116b47f5052480p124debjsnf10c940c9c33',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };
            try {
                const response = await axios.request(options);
                setWeather(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchWeather();
    }, [latitude, longitude]);

    return (
        <div>
            {weather && 
                <table className="overview-table">
                    <tbody>
                        <tr>
                            <td>Conditions: </td>
                            <td>{weather.current.condition.text}</td>
                        </tr>
                        <tr>
                            <td>Temperature: </td>
                            <td>{weather.current.temp_f}°F / {weather.current.temp_c}°C</td>
                        </tr>
                        <tr>
                            <td>Feels Like: </td>
                            <td>{weather.current.feelslike_f}°F / {weather.current.feelslike_c}°C</td>
                        </tr>
                        <tr>
                            <td>Humidity: </td>
                            <td>{weather.current.humidity}%</td>
                        </tr>
                        <tr>
                            <td>Wind Speed: </td>
                            <td>{weather.current.wind_mph}mph / {weather.current.wind_kph}kph</td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    );
};

export default Weather;
