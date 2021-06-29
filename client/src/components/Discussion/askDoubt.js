import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Reply} from "./reply"



export const AskDoubt = () => {
    const [toggle,settoggle] = useState(false);

    const [answerTitle,setAnswerTitle] = useState("");
    const [answer,setAnswer] = useState("");
    const [tags,setTags] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:4000/post/reply",{answerTitle,answer,tags})
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        })

    }

    const actionHandler = () => {
        settoggle((prev) => !prev);
    }

    const changeAction = () => {
        settoggle(false)
    }
   

    return (
    <>
        { toggle && <>
                <div className="modal" id="replyModal">
                <div className="modal-dialog">
                <div className="modal-content">
            
                    
                    <div className="modal-header">
                    <h4 className="modal-title">Post a Reply</h4>
                    <button type="button" onClick={changeAction} className="close" data-dismiss="modal">&times;</button>
                    </div>
            
                    <div className="modal-body">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-group">
                                <textarea className="form-control"
                                 id="sol-title" rows="1"
                                  placeholder="Your Solution Headline"
                                  value={answerTitle}
                                  onChange={(e) => setAnswerTitle(e.target.value)}
                                  ></textarea>
                                <small id="solHelpBlock" className="form-text text-muted">
                                    Short and Simple
                                </small>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control"
                                 id="sol-content" rows="4"
                                  placeholder="Describe your Solution"
                                  value={answer}
                                  onChange={(e) => setAnswer(e.target.value)}
                                  ></textarea>
                                <small id="contentHelpBlock" className="form-text text-muted">
                                    Provide a detailed description about your solution
                                </small>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" id="sol-tags"
                                 rows="2" placeholder="Add tags (optional)"
                                 value={tags}
                                 onChange={(e) => setTags(e.target.value)}
                                 ></textarea>
                                <small id="tagsHelpBlock" className="form-text text-muted">
                                    To help people quicly see what you posted about
                                </small>
                            </div>
                            <button className="btn btn-primary" type="submit">Post your Solution</button>
                        </form>
                    </div>
            
                </div>
                </div>
            </div>
            </>
        } 
        

        <div className="container-fluid">
           <div className="row">
               <div className="col-md-12 no-pad">
                   <div className="card mb-4">
                       <div className="card-header">
                           <div className="media flex-wrap w-100 align-items-center"> <img src="https://i.imgur.com/iNmBizf.jpg" className="d-block ui-w-40 rounded-circle" alt="" />
                               <div className="media-body ml-3"> <a href="javascript:void(0)" data-abc="true">Tom Harry</a>
                                   <div className="text-muted small">13 days ago</div>
                               </div>
                           </div>
                       </div>
                       <div className="card-body">
                           <div className="text-muted small">
                               <div className="category"><a href="#"><i className="fa fa-bookmark"></i> <strong>Category Name</strong></a></div>
                           </div>
                           <h2>Here comes the Question Title....</h2>
                           <p> For me, getting my business website made was a lot of tech wizardry things. Thankfully i get an ad on Facebook ragarding commence website. I get connected with BBB team. They made my stunning website live in just 3 days. With the increase demand of online customers. I had to take my business online. BBB Team guided me at each step and enabled me to centralise my work and have control on all aspect of my online business. </p>
                           <div className="tagContainer mt-20">
                               <a href="#" className="tag color1">OOPs Concept</a>
                               <a href="#" className="tag color2">Polymorphism</a>
                               <a href="#" className="tag color3">Java</a>
                               <a href="#" className="tag color4">Programming Languages</a>
                               <a href="#" className="tag color5">Infosys Interview</a>
                               <a href="#" className="tag color6">GATE Preparation</a>
                           </div>
                       </div>
                       <div className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                           <div className="px-4 pt-3"> <a href="javascript:void(0)" className="text-muted d-inline-flex align-items-center align-middle" data-abc="true"> <i className="fa fa-heart text-danger"></i>&nbsp; <span className="align-middle">445</span> </a> <span className="text-muted d-inline-flex align-items-center align-middle ml-4"> <i className="fa fa-eye text-muted fsize-3"></i>&nbsp; <span className="align-middle">14532</span> </span> </div>
                           <div className="px-4 pt-3"> 
                           
                            <button type="button" onClick={actionHandler} className="btn btn-primary"  data-toggle="modal" data-target="#replyModal"><i className="fa fa-pencil"></i>&nbsp; Reply</button> 
                           
                            </div>
                       </div>
                       <Reply />
                   </div>
               </div>
           </div>
           
       </div>


       <div className="container-fluid">
           <div className="row">
               <div className="col-md-12 no-pad">
                   <div className="card mb-4">
                       <div className="card-header">
                           <div className="media flex-wrap w-100 align-items-center"> <img src="https://i.imgur.com/iNmBizf.jpg" className="d-block ui-w-40 rounded-circle" alt="" />
                               <div className="media-body ml-3"> <a href="javascript:void(0)" data-abc="true">Tom Harry</a>
                                   <div className="text-muted small">13 days ago</div>
                               </div>
                           </div>
                       </div>
                       <div className="card-body">
                           <div className="text-muted small">
                               <div className="category"><a href="#"><i className="fa fa-bookmark"></i> <strong>Category Name</strong></a></div>
                           </div>
                           <h2>Here comes the Question Title....</h2>
                           <p> For me, getting my business website made was a lot of tech wizardry things. Thankfully i get an ad on Facebook ragarding commence website. I get connected with BBB team. They made my stunning website live in just 3 days. With the increase demand of online customers. I had to take my business online. BBB Team guided me at each step and enabled me to centralise my work and have control on all aspect of my online business. </p>
                           <div className="tagContainer mt-20">
                               <a href="#" className="tag color1">OOPs Concept</a>
                               <a href="#" className="tag color2">Polymorphism</a>
                               <a href="#" className="tag color3">Java</a>
                               <a href="#" className="tag color4">Programming Languages</a>
                               <a href="#" className="tag color5">Infosys Interview</a>
                               <a href="#" className="tag color6">GATE Preparation</a>
                           </div>
                       </div>
                       <div className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                           <div className="px-4 pt-3"> <a href="javascript:void(0)" className="text-muted d-inline-flex align-items-center align-middle" data-abc="true"> <i className="fa fa-heart text-danger"></i>&nbsp; <span className="align-middle">445</span> </a> <span className="text-muted d-inline-flex align-items-center align-middle ml-4"> <i className="fa fa-eye text-muted fsize-3"></i>&nbsp; <span className="align-middle">14532</span> </span> </div>
                           <div className="px-4 pt-3"> 
                           
                            <button type="button" onClick={actionHandler} className="btn btn-primary"  data-toggle="modal" data-target="#replyModal"><i className="fa fa-pencil"></i>&nbsp; Reply</button> 
                           
                            </div>
                       </div>
                       <Reply />
                   </div>
               </div>
           </div>
           
       </div>
       </>
    )
}

