import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun,faCloudSun, faFeatherAlt, faTint, faGlasses, faCloud, faWind, faWeight } from '@fortawesome/free-solid-svg-icons';

// border: "1px solid rgba(255,255,255,0.1)",
function CurrentDetails(props) {
    return (
        <div className="col-md-12 mt-2" style={{
            height: "400px",
            color: "#fff",
            backgroundColor: "rgba(255, 255, 255, .08)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px"
        }}>
            <div className="row pt-2" style={{ height: "100px" }}>
                <div className="col-md-6 col-6" style={{ align: "left" }}>
                    <div className="col-12">
                        <p style={{ fontWeight: "bold", fontSize: "18px" }}> Sunrise <FontAwesomeIcon icon={faSun} /></p><p>{props.sunrise}</p></div>
                </div>
                <div className="col-md-6 col-6">
                    <div className="col-12">
                        <p style={{ fontWeight: "bold", fontSize: "18px" }}> Sunset <FontAwesomeIcon icon={faCloudSun} /></p><p>{props.sunset}</p></div>
                </div>
            </div>
            
            <div className="row pt-2" style={{ height: "100px" }}>
                <div className="col-md-6 col-6">
                    <div className="col-12">
                        <p style={{ fontWeight: "bold", fontSize: "18px" }}> Real Feel <FontAwesomeIcon icon={faFeatherAlt} /></p><p> {props.feels} &deg;C</p></div>
                </div>
                <div className="col-md-6 col-6">
                    <div className="col-12">
                        <p style={{ fontWeight: "bold", fontSize: "18px" }}> Humidity <FontAwesomeIcon icon={faTint} /></p><p> {props.humidity} %</p></div>
                </div>
            </div>
            <div className="row pt-2" style={{ height: "100px" }}>
                <div className="col-md-6 col-6">
                    <div className="col-12">
                        <p style={{ fontWeight: "bold", fontSize: "18px" }}>Wind Speed <FontAwesomeIcon icon={faWind} /></p><p> {props.windSpeed} m/s</p></div>
                </div>
                <div className="col-md-6 col-6">
                    <div className="col-12">
                        <p style={{ fontWeight: "bold", fontSize: "18px" }}>Pressure <FontAwesomeIcon icon={faWeight} /></p><p> {props.pressure} hPa</p></div>
                </div>
            </div>
            <div className="row pt-2" style={{ height: "100px" }}>
                <div className="col-md-6 col-6">
                    <div className="col-12">
                        <p style={{ fontWeight: "bold", fontSize: "18px" }}>Clouds <FontAwesomeIcon icon={faCloud} /></p><p> {props.clouds}</p></div>
                </div>
                <div className="col-md-6 col-6">
                    <div className="col-12">
                        <p style={{ fontWeight: "bold", fontSize: "18px" }}>UVI <FontAwesomeIcon icon={faGlasses} /></p><p> {props.uvi} </p></div>
                </div>
            </div>
        </div>
    )
}

export default CurrentDetails
