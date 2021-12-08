import React from 'react';
import moment from 'moment';

// process.env.PUBLIC_URL
function CurrentHero(props) {
    return (
        <div className="col-md-12 mt-2 mb-2" style={{
            height: "400px",
           
            position: "relative",
            color: "#fff",
            borderRadius: "15px",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${process.env.PUBLIC_URL + '/img/' + props.iconid + '.jpg'})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: "cover",
            margin: "0"
        }}>
            {!props.loading && <div>
                <div style={{ top: "10", left: "20px", position: "absolute" }}>
                    <p className="display-1">{props.city}</p>
                </div>
                <div style={{ right: "30px", bottom: "0", position: "absolute" }}>
                    <p className="display-1" style={{ fontSize: "72px" }}>{props.temp}&deg;C</p>
                </div>
                <div style={{ bottom: "120px", right: "0px", position: "absolute" }}>
                    <img src={`http://openweathermap.org/img/wn/${props.iconid}@4x.png`} alt={props.main}></img>
                </div>
                <div style={{ bottom: "80px", right: "30px", position: "absolute" }}>
                    <p className="display-5">{props.main}</p>
                </div>
                <div style={{ bottom: "0", left: "20px", position: "absolute" }}>
                    <p className="display-5">{moment(props.date).format('D, dddd')}</p>
                </div>
            </div>
            }
        </div>
    )
}

export default CurrentHero
