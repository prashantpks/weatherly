import React from 'react'
import Chart from './Chart';

function Daily(props) {
    return (
        <>
            <div className="col-md-12 mt-2" style={{
                height: "300px",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                backgroundColor: "rgba(255, 255, 255, .08)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px"
            }}>
                {props.forecastData && <Chart data={props.forecastData} />}
            </div>
        </>
    )
}

export default Daily
