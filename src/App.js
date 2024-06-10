import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
import {  ThemeProvider, createTheme, CssBaseline, } from '@mui/material';
import Header from './Components/Header/Header.js';
import WeatherBox from './Components/Weatherbox/WeatherBox.js';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [location , setLocation] = useState('');
  const [coordinate , setCoordinate] = useState({lon:0 , lat :0});
  const [darkMode , setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchWeatherByCoordinates  = async (coords) => {
          try {
              const apiKey = '590dcedc5cb3c444a593854476b3b68e';
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey} `);
              setCoordinate({lon: response.data.coord.lon, lat: response.data.coord.lat});
              setWeather(response.data);
          } catch (error) {
            console.error("Error fetching the weather data", error.message);
          }
      };

      const fetchWeatherByCity = async (city) => {
        try{
          const apikey = '590dcedc5cb3c444a593854476b3b68e';
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
          setCoordinate({lon : response.data.coord.lon , lat : response.data.coord.lat});
          setWeather(response.data);
        }
        catch(error){
          console.error("error fetching the weather data" , error.message);
        }
      }

      useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              fetchWeatherByCoordinates(position.coords);
              
            },
            (error) => {
              console.error(error.message);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }, []);

            


  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header onSearch={fetchWeatherByCity} darkMode={darkMode} toggleDarkMode={toggleDarkMode}  />
          <WeatherBox weather={weather} coordinates = {coordinate} />
      </ThemeProvider>
  );
}

export default App;
