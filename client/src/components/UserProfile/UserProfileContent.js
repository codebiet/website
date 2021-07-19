import React, { useEffect } from "react";
import "./UserProfileContent.scss";

const UserProfileContent=(props)=>{

    return(
        <div className="UserProfileContentContainer">
            <div className="UserProfile-content">
                <div className="AboutSec">
                    <h6><i class="fas fa-user-tie"></i> ABOUT ME</h6>
                    <hr/>
                    <p>{props.user.about}</p>
                </div>
                <div className="ContentSection">
                    <div className="LeftSection">
                    <div className="SkillSec">
                        <h6><i className="fas icon fa-chart-bar"></i>
                      SKILLS</h6>
                      <hr/>
                      <div className="skillTabs">
                    {props.user.programmingLanguages &&
                      props.user.programmingLanguages.map((da) => (
                        <span className="Tab">{da.name}</span>
                      ))}<br/>
                    {props.user.webTechnologies &&
                      props.user.webTechnologies.map((da) => (
                        <span className="Tab">{da.name}</span>
                      ))}<br/>
                    {props.user.webFrameworks &&
                      props.user.webFrameworks.map((da) => (
                        <span className="Tab">{da.name}</span>
                      ))}<br/>
                    {props.user.dbms &&
                      props.user.dbms.map((da) => (
                        <span className="Tab">{da.name}</span>
                      ))}<br/>
                    {props.user.technologies &&
                      props.user.technologies.map((da) => (
                        <span className="Tab">{da.name}</span>
                      ))}<br/>
                    {props.user.operatingSystem &&
                      props.user.operatingSystem.map((da) => (
                        <span className="Tab">{da.name}</span>
                      ))}
                  </div>
                    </div>


                    {props.user.interest && props.user.interest.preference1.length > 0 && (

                    <div className="HobbiesSec">
                    <h6><i class="fas fa-gamepad"></i>
                      HOBBIES & INTEREST</h6>
                      <hr/>
                      {props.user.interest && (
                  <ul className="hobbiesList">
                    {props.user.interest.preference1 &&
                      props.user.interest.preference1.length > 0 && (
                        <li><i class="fas fa-gamepad hobbyIco"></i>
                           {props.user.interest.preference1}
                        </li>
                      )}

                    {props.user.interest.preference2 &&
                      props.user.interest.preference2.length > 0 && (
                        <li><i class="fas fa-gamepad hobbyIco"></i>
                           {props.user.interest.preference2}
                        </li>
                      )}

                    {props.user.interest.preference3 &&
                      props.user.interest.preference3.length > 0 && (
                        <li><i class="fas fa-gamepad hobbyIco"></i>
                           {props.user.interest.preference3}
                        </li>
                      )}
                  </ul>
                )}

                    </div>)}
                    {props.user.achievements &&
                  props.user.achievements.length > 0 &&
                  props.user.achievements[0].length > 0 && (
                    <div className="HobbiesSec">
                    <h6><i class="fas fa-award"></i>
                      AWARDS</h6>
                      <hr/>
                      <ul className="rewardList">
                        {props.user.achievements &&
                          props.user.achievements.length > 0 &&
                          props.user.achievements.map((da) => {
                            console.log(da.length);
                            if (da.length > 0) {
                              return <li><i class="fas fa-award hobbyIco"></i> {da}</li>;
                            }
                          })}
                      </ul>

                      </div>)}
                      
                      
                    </div>
                    <div className="VerticalLine"/>
                    <div className="RightSection">
                    {props.user.academics && props.user.academics.length > 0 && (
                    <div className="EducationSec">
                        <h6><i class="fas fa-graduation-cap"></i>
                      EDUCATION</h6>
                      <hr/>
                      <div className="timeline">
                      
                          <div className="timelineCnt right">
                              <div className='timelinemainCnt'>
                                  <div className="timelinedeatils">
                                  <div className="timelineHd">
                                  {props.user.academics &&
                          props.user.academics.length > 0 &&
                          props.user.academics[0].degree} <span>from</span>
                          </div>
                          <div className="timelineSubHd">
                                  {props.user.academics &&
                          props.user.academics.length > 0 &&
                          props.user.academics[0].college}
                                  </div>
                                  </div>
                                  
                                  
                                  <div className="timelineDate">
                                  Completion year- 
                                  {props.user.academics &&
                          props.user.academics.length > 0 &&
                          props.user.academics[0].year}
                                  </div>
                              </div>
                          </div>

                          <div className="timelineCnt right">
                              <div className='timelinemainCnt'>
                                  <div className="timelinedeatils">
                                  <div className="timelineHd">
                                  {props.user.academics &&
                          props.user.academics.length > 0 &&
                          props.user.academics[1].degree} <span>from</span>
                          </div>
                          <div className="timelineSubHd">
                                  {props.user.academics &&
                          props.user.academics.length > 0 &&
                          props.user.academics[1].college}
                                  </div>
                                  </div>
                                  
                                  
                                  <div className="timelineDate">
                                  Completion year- 
                                  {props.user.academics &&
                          props.user.academics.length > 0 &&
                          props.user.academics[1].year}
                                  </div>
                              </div>
                          </div>
                          <div className="timelineCnt right">
                              <div className='timelinemainCnt'>
                                  <div className="timelinedeatils">
                                  <div className="timelineHd">
                                  {props.user.academics &&
                          props.user.academics.length > 0 &&
                          props.user.academics[2].degree} <span>from</span>
                          </div>
                          <div className="timelineSubHd">
                                  {props.user.academics &&
                          props.user.academics.length > 0 &&
                          props.user.academics[2].college}
                                  </div>
                                  </div>
                                  
                                  
                                  <div className="timelineDate">
                                  Completion year- 
                                  {props.user.academics &&
                          props.user.academics.length > 0 &&
                          props.user.academics[2].year}
                                  </div>
                              </div>
                          </div>
                         
                      </div>
                      

                      </div>)}


                      {props.user.trainings && props.user.trainings.length > 0 && (
                      <div className="TrainingSec">
                    <h6><i class="fas fa-tools"></i>
                      TRAININGS</h6>
                      <hr/>
                      <ul>
                         
                          {props.user.trainings &&
                            props.user.trainings.map((da) => (<li> <i class="fas fa-tools trainingIco"></i>
                              <span >
                                {da.name}<br/>
                                <a href={da.credentials}>
                                {/* <span className="TrainingLink"> */}
                                 {da.credentials}</a><br/>
                                {/* </span></a> */}
                              </span></li>
                            ))}
                          
                      </ul>
                      </div>)}
                      
                      {props.user.projects && props.user.projects.length > 0 && (
                      <div className="ProjectsSec">
                    <h6><i class="fas fa-code-branch"></i>
                      PROJECTS</h6>
                      <hr/>
                      <ul>
                      {props.user.projects &&
                            props.user.projects.map((da) => (<li><i class="fas fa-code-branch ProjectIco"></i>
                              <span>
                                {da.name}<br/>
                                <span
                                  className="Tab"
                                   >
                                  {da.type}
                                </span>
                              </span></li>
                            ))}
                      </ul></div>)}
                      {props.user.internships && props.user.internships.length > 0 && (
                      <div className="ExperienceSec">
                    <h6><i class="fas fa-briefcase"></i>
                      EXPERIENCE</h6>
                      <hr/>
                      <ul>
                      {props.user.internships &&
                            props.user.internships.map((da) => (<li> <i class="fas fa-briefcase expIco"></i>
                              <span >
                                {da.title}<br/>
                                <span
                                  className="Tab"                                  
                                >
                                  {da.type}
                                </span>
                              </span></li>
                            ))}
                      </ul>
                      
                      </div>)}



                        
                    </div>
                </div>
            </div>
        </div>


    )
}

export default UserProfileContent;