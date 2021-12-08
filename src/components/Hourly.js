import React from 'react'
import moment from 'moment';


function Hourly(props) {
    return (
        <>
            {props.hourly.map((element) => {
                return <div className="card" key={element.id} style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, .08)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "15px"
                }}>
                    <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} className="mb-0" alt={element.weather[0].main}></img>
                    <p className="display-5">{element.temp.toFixed(0)} &deg;C</p>
                    <p>{moment(element.dt).format('hh:mm a')}</p>
                    <p>{moment(element.dt).format('dddd').substring(0,3)}</p>
                </div>
            })}
        </>
    )
}

export default Hourly
