import React from 'react'

function CurrentDetails() {
    return (
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
        </div>
    )
}

export default CurrentDetails
