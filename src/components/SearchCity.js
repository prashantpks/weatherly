import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function SearchCity(props) {
    const handleChange = (event) => {
        props.setText(event.target.value);
    };

    return (
        <div className="col-12" >
            <input type="text" id="sbox" value={props.text} placeholder="Search your city" spellCheck="false" onChange={handleChange}
            style={{ width: "55%", 
            height: "40px", 
            borderRadius: "20px", 
            textDecoration: "none", 
            border: "0", 
            paddingLeft: "20px", 
            zIndex: "2", 
            fontSize: "18px", 
            color: "black", 
            fontWeight: "bold" }} ></input>
            
            <button className="mx-2 " onClick={props.updateWeather} style={{
                height: "40px", 
                 
                border: "1px solid rgba(255,255,255,1)", 
                color: "#fff", 
                backgroundColor: "rgba(255, 255, 255, .08)",
                backdropFilter: "blur(10px)", 
                borderRadius: "15px"
            }}> 
            <p className="p-2">
                <FontAwesomeIcon icon={faArrowRight} />
            </p>
            </button>
        </div>
    )
}

export default SearchCity
