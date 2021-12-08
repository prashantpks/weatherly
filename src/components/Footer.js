import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';


function Footer(props) {
    return (
        <div className="row mt-5 frow" >
            <div className="col-6">
            <h5 className="mt-3 text-start flogo" style={{fontWeight:"bolder"}}>Weather<span style={{
                                background: "white",
                                borderRadius: "5px",
                                color: `${props.bgColor['c'+props.iconid]}`,
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                fontWeight: "bolder"}}>.ly</span>
            </h5>
            </div>
            <div className="col-6 mt-3">
                <div className="row">
                    <div className="col-md-6 col-12">
                    <p className="text-start"><b>Developed by:</b>  Prashant</p>
                    </div>
                    <div className="col-md-6 col-12 text-start">
                        <a href="https://www.linkedin.com/in/prashant-kumar-7aa9a4203/" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color:"white", fontSize:"25px"}}><FontAwesomeIcon icon={faLinkedin}/></a>
                        <a href="https://github.com/prashantpks" target="_blank" rel="noopener noreferrer"  className="social-icon" style={{ color:"white", fontSize:"25px"}}><FontAwesomeIcon icon={faGithub}/></a>
                        <a href="https://www.instagram.com/prashaaant_14/" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color:"white", fontSize:"25px"}}><FontAwesomeIcon icon={faInstagram}/> </a>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Footer
