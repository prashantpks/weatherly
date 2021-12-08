import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import SearchCity from './SearchCity';
import CurrentHero from './CurrentHero';
import CurrentDetails from './CurrentDetails';
import Hourly from './Hourly';
import Daily from './Daily';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

function Weather(props) {

    const [text, setText] = useState("New York");
    const [main, setMain] = useState("");
    const [temp, setTemp] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [clouds, setClouds] = useState(0);
    const [uvi, setUvi] = useState(0);
    const [feels, setFeels] = useState(0);
    const [sunrise, setSunrise] = useState();
    const [sunset, setSunset] = useState();
    const [windSpeed, setWindSpeed] = useState(0);
    const [date, setDate] = useState();
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [daily, setDaily] = useState([{}]);
    const [hourly, setHourly] = useState([{
        dt: 1638514800,
        temp: 10,
        weather: [{
            icon: "01n"
        }]
    }]);
    const [iconid, setIconid] = useState("01d");
    const [forecastData, setForecastData] = useState([]);
    const [exist, setExist] = useState(true);
    const [code, setCode] = useState(200);
    const [err, setErr] = useState("");
    const [city, setCity] = useState("New York");
   
    const bgColor = {
        c01d: "#f89223",
        c01n: "#09161c",
        c02d: "#04262f",
        c02n: "#04262f",
        c03d: "#04262f",
        c03n: "#04262f",
        c04d: "#04262f",
        c04n: "#0d1414",
        c09d: "#353535",
        c10d: "#353535",
        c09n: "#353535",
        c10n: "#353535",
        c13d: "#121621",
        c13n: "#121621",
        c11d: "#37334c",
        c11n: "#37334c",
        c50d: "#404447",
        c50n: "#404447"
    }


    const convertDate = (unixTime, offset) => {
        const d = new Date();
        let diff = d.getTimezoneOffset() * 60 * 1000;
        return new Date().setTime(unixTime * 1000) + offset * 1000 + diff;
    }

    const makeDailyData = (pData) => {
        let f = [];
        for (let i = 0; i < 8; i++) {
            let x = {};
            let s = moment(convertDate(pData.daily[i].dt, pData.timezone_offset)).format('dddd');
            x.day = s.substring(0, 3);
            x.min = pData.daily[i].temp.min;
            x.max = pData.daily[i].temp.max;
            f.push(x);
        }
        setForecastData(f);
    }

    const makeHourlyData = (pData) => {
        for (let i = 0; i < 48; i++) {
            pData.hourly[i].id = i;
            pData.hourly[i].dt = convertDate(pData.hourly[i].dt,pData.timezone_offset);
        }
        
        setHourly(pData.hourly);
    }

    const updateWeatherData = (pData) => {
        setDaily(pData.daily);
        makeHourlyData(pData);
    

        setMain(pData.current.weather[0].main);
        setTemp((pData.current.temp).toFixed(0));
        setOffset(pData.timezone_offset * 1000);
        
        setFeels((pData.current.feels_like).toFixed(2));
        setHumidity(pData.current.humidity);
        setPressure(pData.current.pressure);
        setWindSpeed(pData.current.wind_speed);
        setClouds(pData.current.clouds);
        setUvi(pData.current.uvi);
        setSunrise(convertDate(pData.current.sunrise, pData.timezone_offset));
        setSunset(convertDate(pData.current.sunset, pData.timezone_offset));
        setDate(convertDate(pData.current.dt, pData.timezone_offset));
        setIconid(pData.current.weather[0].icon);

        makeDailyData(pData);
    }


    const getCoordinates = async () => {

        let urlcoord = `http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('sbox').value}&APPID=${props.api_weather}&units=metric`
        let data = await fetch(urlcoord);
        let parsedData = await data.json();

        if (parsedData.cod === 200)
            return {
                lon: await parsedData.coord.lon,
                lat: await parsedData.coord.lat,
                cod: await parsedData.cod,
                cityName: await parsedData.name
            }
        else {
            return {
                cod: await parsedData.cod,
                message: await parsedData.message
            }
        }
    }


    const getWeatherData = async (lat, lon) => {
        setLongitude(lon);
        setLatitude(lat);

        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${props.api_onecall}&units=metric`
        let mdata = await fetch(url);
        let pData = await mdata.json();

        return pData;
    }


    const updateWeather = async () => {
        setLoading(true);
        const data = await getCoordinates();
        if (data.cod === 200) {
            const { lat, lon } = data;
            setExist(true);
            setCity(data.cityName);
            const pData = await getWeatherData(lat, lon);
            updateWeatherData(pData);
        } else {

            setExist(false);
            setCode(data.cod);
            setErr(data.message);
        }
        setLoading(false);
    }

    useEffect(() => {

        updateWeather();
        //eslint-disable-next-line
    }, [])



    return (
        <div className="mt-0 " style={{
            background: `${bgColor['c' + iconid]}`,
            background: `-moz-linear-gradient(-45deg, ${bgColor['c' + iconid]} 0%, #000000 100%)`,
            background: `-webkit-linear-gradient(-45deg, ${bgColor['c' + iconid]} 0%, #000000 100%)`,
            background: `linear-gradient(135deg, ${bgColor['c' + iconid]} 0%, #000000 100%)`
        }} >
            <div className="container">
                <div className="App ">
                    <div className="d-flex flex-row mb-3">
                        <div className="md-col-12 ">
                            <h3 className="mt-3" style={{ fontWeight: "bolder" }}>Weather<span style={{
                                background: "white",
                                borderRadius: "5px",
                                color: `${bgColor['c' + iconid]}`,
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                fontWeight: "bolder"
                            }}>.ly</span>
                            </h3>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-center my-4">
                        <SearchCity text={text} updateWeather={updateWeather} setText={setText}></SearchCity>
                    </div>
                    {exist && <div>
                        <div className="row" style={{ minHeight: "400px" }}>
                            <div className="col-md-7 col-xs-12">
                                <CurrentHero iconid={iconid} temp={temp} main={main} date={date} city={city} loading={loading}></CurrentHero>
                            </div>
                            <div className="col-md-5 col-xs-12">
                                <CurrentDetails windSpeed={windSpeed} humidity={humidity} feels={feels} pressure={pressure} clouds={clouds} uvi={uvi} sunset={moment(sunset).format('hh:mm a')} sunrise={moment(sunrise).format('hh:mm a')} ></CurrentDetails>
                            </div>
                        </div>
                        <div className="container mb-3 mt-3 text-start">
                            <h3 style={{ fontWeight: "bold" }}>Hourly Forecast</h3>
                        </div>
                        <div className="rowbody" >
                            <Hourly hourly={hourly} convertDate={convertDate} offset={offset} ></Hourly>
                        </div>
                        <div className="container mb-3 mt-3 text-start">
                            <h3 style={{ fontWeight: "bold" }}>7-Days Forecast</h3>
                        </div>
                        <div className="row mt-3">
                            <Daily forecastData={forecastData}></Daily>
                        </div>
                    </div>}

                    {!exist && <div style={{ height: "70vh" }}>
                        <h1>{code}: {err}</h1>
                        <h1><FontAwesomeIcon icon={faBolt}></FontAwesomeIcon></h1>
                    </div>}
                    <div>
                        <Footer iconid={iconid} bgColor={bgColor}></Footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
