
import './App.css';
import React from 'react';
import Weather from './components/Weather';


function App() {

  const api_weather = process.env.REACT_APP_API_KEY_WEATHER
  const api_onecall = process.env.REACT_APP_API_KEY_ONE_CALL


  
  return (

    
    <>
      <Weather api_weather = {api_weather} api_onecall = {api_onecall}> </Weather>
    </>
  );
}

export default App;
