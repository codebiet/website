import React from "react";
import activity_img from '../assets/mem_pic.jpg';

const Assistant = ({ name, im, post, mail, fb_link, lnkdin_link }) => {
    return (
          <div className='cardm'>
            <div className='imgem'>
                <img  src={activity_img} alt='Image 1'/>
            </div>
            <div className='titlem'>
                <h4>{name}</h4>
            </div>

            <div style={{padding:'0px 0px 5px 0px'}} className='desm'>
                <a className='icnm'><i className="fab fa-facebook"></i></a>
                <a className='icnm'><i className="fab fa-linkedin"></i></a>
                <a className='icnm'><i class="fas fa-envelope-square"></i></a>
            </div>
        </div>
     
    )
}

export default Assistant;