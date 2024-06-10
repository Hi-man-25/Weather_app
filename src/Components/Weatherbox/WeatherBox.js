import React , {useState , useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrainIcon from '@mui/icons-material/Grain';
import axios from 'axios';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const WeatherBox = ({ weather, coordinates }) => {
    const [weeklyForecast, setWeeklyForecast] = useState([]);

    const filteruniqueData = (data) => {
        const uniqueDates = new Set();
        const uniqueData = new Set();
        return data.filter(item => {
          if (!uniqueDates.has(item.dt_txt.split(' ')[0])) {
            uniqueDates.add(item.dt_txt.split(' ')[0]);
            uniqueData.add(item);
            return true;
          }
          return false;
        });
      };
      function getDayOfWeek(dateString) {
        const date = new Date(dateString);
        const dayOfWeek = date.getDay();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[dayOfWeek];
      }

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = `${process.env.API_KEY}`;
                const url = coordinates ? 
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}` :
                    `https://api.openweathermap.org/data/2.5/forecast?q=${weather}&appid=${apiKey}`;
                const forecastResponse = await axios.get(url);
                const uniqueData = filteruniqueData(forecastResponse.data.list);
                setWeeklyForecast(uniqueData);
            } catch (error) {
                console.error("Error fetching the weekly weather data", error.message);
            }
        };

        fetchWeather();
    },  [weather]);

    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'Cloudy' :
            case 'broken clouds' :
            case 'scattered clouds':
            case 'overcast clouds':
            case 'few clouds':
            case 'Haze':
            case 'light rain':
                return <CloudIcon />;
            case 'Sunny':
            case 'clear sky':
                return <WbSunnyIcon />;
            case 'Snow':
                return <AcUnitIcon />;
            case 'Rainy' :
                return <GrainIcon />;
            default:
                return <WbSunnyIcon />;
        }
    };

    if (!weather) {
        return (
            <Box sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                minWidth: 1000,
                textAlign: 'center',
                marginTop: 5
            }}>
                <Typography variant="body1">Enter a location to get the weather.</Typography>
            </Box>
        );
    }

    const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

    return (
        <Box sx={{
            boxShadow: 1,
            borderRadius: 2,
            height : '80vh',
            p: 2,
            minWidth: 1000,
            textAlign: 'center',
            marginTop: 5,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            
        }}>

            <Box sx={{ marginTop:3}}>
                <Typography variant='h6'>Today</Typography>
                <Grid item xs={4} key={weather.dt_txt}>
                            <Box sx={{
                                bgcolor:'grey',
                                boxShadow: 1,
                                borderRadius: 1,
                                p: 1,
                                textAlign: 'center',
                                background: 'rgba(255, 255, 255, 0.7)',
                                color: 'black',
                            }} >
                                <Typography variant="body2"> <LocationOnIcon/> {weather.name} {(weather.main.temp-273.15).toFixed(0)}°C</Typography>
                                {getWeatherIcon(weather.weather.main)}
                                <Typography variant="body1">Feels like: {(weather.main.feels_like - 273.15).toFixed(0)}°C</Typography>
                                <Typography variant="body1">Humidity : {weather.main.humidity}</Typography>
                                <Typography variant="body1">Sunrise: {sunrise}</Typography>
                                <Typography variant="body1">Sunset: {sunset}</Typography>
                            </Box>
                        </Grid>
            </Box>

            <Box sx={{ marginTop: 3 }}>
                <Typography variant="h6">Weekly Forecast</Typography>
                <Grid container spacing={2} sx = {{flexWrap : 'nowrap'}}>
                    {weeklyForecast.map((day, index) => (
                        <Grid item xs={4} key={day.dt_txt}>
                            <Box sx={{
                                bgcolor: 'background.paper',
                                boxShadow: 1,
                                borderRadius: 1,
                                p: 1,
                                textAlign: 'center',
                                background: 'rgba(255, 255, 255, 0.7)',
                                color: 'black',
                            }}>
                                <Typography variant="body2">{getDayOfWeek(day.dt_txt.split(' ')[0])}</Typography>
                                {getWeatherIcon(day.weather[0].description)}
                                <Typography variant="body2">Temperature : {(day.main.temp - 273.15).toFixed(0)}°C</Typography>
                                <Typography variant='body2'>humidity : {day.main.humidity} g/Kg </Typography>
                                <Typography variant='body2'>Windspeed : {day.wind.speed} m/s</Typography>
                                <Typography variant='body2'>{day.weather[0].description}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default WeatherBox;

