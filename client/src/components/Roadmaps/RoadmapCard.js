import React from 'react'
import { Link } from "react-router-dom";
import slugify from 'slugify'
import './roadmapCard.scss'

import htmllogo from '../../../public/icons/HTML.svg'

const miniCard = (title,icon) => {
  let url = slugify(title.toLowerCase(), {remove: /[*+~.()'"!:@//\\?]/g})
  return (
      <div className='miniCard'>
        <Link to={`/roadmaps/${url}`}>
          <div className='circleIcon'>
            {!icon && <img src={htmllogo} alt={title}/>}
            {icon && <img src={icon} alt={title}/>}
          </div>
          <div className='titleHolder'>{title}</div>
        </Link>
      </div>
  )
}

export default function RoadmapCard(props) {

  return (
    <div className="cardRoadmap">

        <div className="cardHeader"> 
          <p>{props.type}</p>
        </div>
        <div className="cardDesc"> 
          <p>{props.description}</p>
        </div>

        <div className="cardMain">
          {props.topics.map((topic)=>{
            return miniCard(topic.title,topic.icon)
          })}
        </div> 
    </div>
  )
}
