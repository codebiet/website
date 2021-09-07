import React from 'react'
import './roadmapCard.scss'

const miniCard = (title) => {
  return (
    <div className='miniCard'>
      <div className='circleIcon'><img src={require(`../../../public/icons/HTML.svg`)} alt="html"/></div>
      <div className='titleHolder'>{title}</div>
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
            return miniCard(topic.title)
          })}
        </div> 
    </div>
  )
}
