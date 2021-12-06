
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Chart from './components/Chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [text, setText] = useState("New York");
  const [main, setMain] = useState("");
  const [temp, setTemp] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [himidity, setHumidity] = useState(0);
  const [tmin, setTmin] = useState(0);
  const [tmax, setTmax] = useState(0);
  const [feels, setFeels] = useState(0);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
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

  let bgColor = {
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

  let s = 0;
  const d = new Date();
  let diff = d.getTimezoneOffset() * 60 * 1000;

  const convertDate = (unixTime, offset, diff) => {
    return new Date().setTime(unixTime * 1000) + offset * 1000 + diff;
  }
  const [forecastData, setForecastData] = useState([]);


  let iconurl = "";
  const updateWeather = async () => {
    setLoading(true);

    let urlcoord = `http://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('sbox').value}&APPID=3754a52ee187d6db0deddd28aecf07b3&units=metric`
    let data = await fetch(urlcoord);
    let parsedData = await data.json();

    let lon = await parsedData.coord.lon;
    let lat = await parsedData.coord.lat;
    setLongitude(lon);
    setLatitude(lat);

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=9dc21565909072f67fd01b59181153a1&units=metric`
    let mdata = await fetch(url);
    let pData = await mdata.json();
    setDaily(pData.daily);
    setHourly(pData.hourly);

    setMain(pData.current.weather[0].main);
    setTemp((pData.current.temp).toFixed(0));
    setOffset(pData.timezone_offset * 1000);

    setFeels((pData.current.feels_like).toFixed(0));
    setHumidity(pData.current.humidity);
    setPressure(pData.current.pressure);

    setSunrise(convertDate(pData.current.sunrise, pData.timezone_offset, diff));
    setSunset(convertDate(pData.current.sunset, pData.timezone_offset, diff));
    setDate(convertDate(pData.current.dt, pData.timezone_offset, diff));
    setIconid(pData.current.weather[0].icon);

    let f = [];
    for (let i = 0; i < 8; i++) {
      let x = {};
      let s = moment(convertDate(pData.daily[i].dt, pData.timezone_offset, diff)).format('dddd');
      x.day = s.substring(0, 3);
      x.min = pData.daily[i].temp.min;
      x.max = pData.daily[i].temp.max;
      f.push(x);
    }

    setForecastData(f);
    setLoading(false);
    console.log(pData);
    console.log(daily);
  }

  useEffect(() => {

    updateWeather();
    //eslint-disable-next-line

  }, [])

  const handleSearch = (event) => {
    setText(event.target.value);

  };
  return (

    <div className="mt-0 " style={{
      background: `${bgColor['c' + iconid]}`,
      background: `-moz-linear-gradient(-45deg, ${bgColor['c' + iconid]} 0%, #000000 100%)`,
      background: `-webkit-linear-gradient(-45deg, ${bgColor['c' + iconid]} 0%, #000000 100%)`,
      background: `linear-gradient(135deg, ${bgColor['c' + iconid]} 0%, #000000 100%)`
    }} >

      <div className="container" >


        <div className="App ">
          <div className="d-flex flex-row mb-3 justify-content-center">
            <div className="md-col-12 ">
              <h1 className="mt-3">Weather Application</h1>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center my-4">
            <div className="col-12" >
              <input type="text" id="sbox" value={text} style={{ width: "55%", height: "40px", borderRadius: "20px", textDecoration: "none", border: "0", paddingLeft: "20px", zIndex: "2", fontSize: "18px", color:"black",fontWeight:"bold"}} spellCheck="false" onChange={handleSearch}></input>
              <button className="mx-2 " onClick={updateWeather} style={{
                height: "40px", border: "2px", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", backgroundColor: "rgba(255, 255, 255, .08)",
                backdropFilter: "blur(10px)", borderRadius: "15px"
              }}> <p className="p-2"><FontAwesomeIcon icon={faArrowRight} /></p></button>
            </div>
          </div>
          <div className="row" style={{ minHeight: "400px" }}>
            <div className="col-md-7 col-xs-12">
              <div className="col-md-12 mt-2 mb-2" style={{
                height: "400px",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                color: "#fff",
                borderRadius: "15px",
                backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.7)
          ),url(${process.env.PUBLIC_URL + 'img/' + iconid + '.jpg'})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",
                margin: "0"
              }}>
                {!loading && <div><div style={{ top: "10", left: "20px", position: "absolute" }}><p className="display-1">{text}</p></div>
                  <div style={{ right: "30px", bottom: "0", position: "absolute" }}><p className="display-1" style={{ fontSize: "72px" }}>{temp}&deg;C</p></div>
                  <div style={{ bottom: "120px", right: "0px", position: "absolute" }}><img src={`http://openweathermap.org/img/wn/${iconid}@4x.png`} alt="m"></img></div>
                  <div style={{ bottom: "80px", right:"30px", position: "absolute" }}><p className="display-5">{main}</p></div>
                  {/* <div>{moment(sunrise).format('h:mm a')}</div>
      <div>{moment(sunset).format('h:mm a')}</div> */}
                  <div style={{ bottom: "0", left: "20px", position: "absolute" }}><p style={{ fontSize: "36px" }}>{moment(date).format('D, dddd')}</p></div>
                </div>
                }
              </div></div>
            <div className="col-md-5 col-xs-12">
              <div className="col-md-12 mt-2" style={{
                height: "400px", 
                border: "1px solid rgba(255,255,255,0.1)", 
                color: "#fff", 
                backgroundColor: "rgba(255, 255, 255, .08)",
                backdropFilter: "blur(10px)", 
                borderRadius: "15px"
              }}>


                <div className="row" style={{ height: "100px" }}>
                  <div className="col-md-6 col-xs-6" style={{ align: "left" }}>
                    hi<br />hello
                  </div>
                  <div className="col-md-6 col-xs-6">hi</div>
                </div>
                <div className="row" style={{ height: "100px" }}>
                  <div className="col-md-6">
                    hi
                  </div>
                  <div className="col-md-6">hi</div>
                </div>
                <div className="row" style={{ height: "100px" }}>
                  <div className="col-md-6">
                    hi
                  </div>
                  <div className="col-md-6">hi</div>
                </div>
                <div className="row" style={{ height: "100px" }}>
                  <div className="col-md-6">
                    hi
                  </div>
                  <div className="col-md-6">hi</div>
                </div>
              </div></div>
          </div>
          <div className="container mb-3">
            <h1>Hourly Forecast</h1>
          </div>
          <div className="rowbody" >
            {hourly.map((element) => {
              return <div className="card" style={{
                border: "1px solid rgba(255,255,255,0.1)", 
                color: "#fff", 
                backgroundColor: "rgba(255, 255, 255, .08)",
                backdropFilter: "blur(10px)", 
                borderRadius: "15px"
              }}>
                <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} className="mb-1"></img>
                <p className="display-5">{element.temp.toFixed(0)} &deg;C</p>
                <p>{moment(convertDate(element.dt, offset, diff)).format('hh:mm a')}</p>
              </div>
            })}

          </div>
          <div className="container mb-3">
            <h1>One Week Forecast</h1>
          </div>
          <div className="row mt-5" style={{ height: "350px" }}>
            <div className="col-md-12 mt-2" style={{
              height: "300px",
              border: "1px solid rgba(255,255,255,0.1)", 
              color: "#fff", 
              backgroundColor: "rgba(255, 255, 255, .08)",
              backdropFilter: "blur(10px)", 
              borderRadius: "15px"
            }}>
              {forecastData && <Chart data={forecastData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
