import React from "react";
import user_image from "../assets/boy.png";
import "./UserProfileHeader.scss";


const UserProfileHeader= (props)=>{

    return(
        <div className="UserProfileHeaderContainer">
        <div className="UserProfile-header">
        <div className="HeaderleftSec">
            <div className="UserProfilePhoto">
            {props.user.profilePhoto && (
                  <img
                   src={props.user.profilePhoto}
                    className="head_image"
                    
                    
                    alt=""
                   
                    src={props.user.profilePhoto}               
                    alt=""
                  />
                )}
                {!props.user.profilePhoto && (
                  <img
                    src={user_image}
                    alt=""
                  />
                )}
            </div>
        </div>
        <div className="HeaderrightSec">
            <div className="UserData">
                <h5 className="User-Name">
                    {props.user.name}
                </h5>
                <p className="User-Role">
                    {props.user.role}
                </p>
                <div className="User-ContactInfo">
                    <table className="ContactInfoTable">
                        <tr>
                           
                            <i className="headerIcon fas fa-phone"></i>
                            
                            
                            {props.user.whatsAppPhoneNumber}
                        </tr>
                        <tr>
                            <i className="headerIcon fas fa-envelope"></i>
                            {props.user.email}
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default UserProfileHeader;