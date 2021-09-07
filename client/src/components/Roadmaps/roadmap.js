import React, { useEffect, useState, lazy } from "react";
import axios from "axios";
import "./roadmaps.scss"

const RoadmapCard = lazy(() => import("./RoadmapCard.js"));

let roadmaps = [
  {type:'Front End Development',description:'Step by step guide to becoming a modern frontend developer in 2021.',
  topics:[
    {title:'HTML'},
    {title:'CSS'},
    {title:'JAVASCRIPT'},
    {title:'REACTJS + REDUX'},
    {title:'ANGULAR + REDUX'},
    {title:'VUEJS + REDUX'}
  ]},
  {type:'Backend Development',description:'Step by step guide to becoming a modern backend developer in 2021.',
  topics:[
    {title:'NODE JS'},
    {title:'DJANGO'},
    {title:'PHP'},
    {title:'JAVA BACKEND'},
  ]},
  {type:'Database Development',description:'Step by step guide to becoming a modern database developer in 2021.',
  topics:[
    {title:'MONGODB'},
    {title:'SQL'},
  ]},
  {type:'Data Structures and Algorithm',description:'Step by step guide to becoming a coding expert in 2021.',
  topics:[
    {title:'DATA STRUCTURE'},
    {title:'ALGORITHMS'},
    {title:'COMPETITIVE PROGRAMMING'},
  ]},
  {type:'Android Development',description:'Step by step guide to becoming a Android developer in 2021.',
  topics:[
    {title:'JAVA + ANDROID'},
    {title:'FLUTTER'},
    {title:'REACT NATIVE'},
    {title:'SWIFT'},
  ]},
  {type:'Machine Learning',description:'Step by step guide to becoming a Machine Learning Engineer in 2021.',
  topics:[
    {title:'DATA SCIENCE'},
    {title:'MACHINE LEARNING'},
    {title:'DEEP LEARNING ML+DL'},
  ]},
  {type:'Dev - Ops',description:'Step by step guide to becoming a modern DevOps Engineer in 2021.',
  topics:[
    {title:'GIT + GITHUB'},
    {title:'DOCKER + KUBERNETES'},
    {title:'SELENIUM'},
  ]},
  {type:'Cloud Technologies',description:'Step by step guide to becoming a modern Cloud Developer in 2021.',
  topics:[
    {title:'AWS'},
    {title:'GOOGLE GCP'},
    {title:'MICROSOFT AZURE'},
  ]},
]

// const hello = () => {
//   console.log('hello brother this is me')
//   for(let i =0 ; i<roadmaps.length ;i++) {
//     for(let j=0;j<roadmaps[i].topics.length;j++) {
//       roadmaps[i].topics[j].icon = require(`../../../public/icons/${roadmaps[i].topics[j].title}.svg`);
//       //console.log(roadmaps[i].topics[j].title)
//       //require(`../../../public/icons/${roadmaps[i].topics[j].title}.svg`)
//     }
//   }
//   console.log(roadmaps)
// }
// hello()

const Roadmap = () => {
  // useEffect(() => {
  //   setLoading(true);
  //   //scroll to top when mounted;
  //   window.scrollTo(0, 0);
  //   axios
  //     .get(`/api/jobs?filter=${filter}`)
  //     .then((res) => {
  //       setJobs(res.data.data);
  //       console.log(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err);
  //     });
  // }, [filter]);
  return (
    <div style={{ margin: "2rem" }}>  
      <main className="roadmap-main-container">
        <h3 className="menu-head">Developer Roadmap</h3>
        <div className='desc'>Step by step guides and paths to learn different tools or technologies</div>
        <div style={{marginBottom:'4rem'}}></div>
        {
          roadmaps.map((roadmap) => {
            return (
              <div className="roadmap-card-container">
                <RoadmapCard  {...roadmap} />
              </div>
            );
          })}


      </main>
     
    </div>
  );
};
export default Roadmap;
