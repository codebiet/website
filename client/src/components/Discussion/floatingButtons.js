import React,{useState} from 'react';


export const FloatingButtons = () => {
    const [toggle1,settoggle1] = useState(false);
    const [toggle2,settoggle2] = useState(false);

    const actionHandler = (e) => {
        settoggle1(!toggle1);
        settoggle2(!toggle2);
    }

    const changeAction = () => {
        settoggle1(false);
        settoggle2(false);
    }

    return (
<>
        {
          toggle1 && <>
          <div className="modal" id="sortModal">
        <div className="modal-dialog">
        <div className="modal-content mobilemodal">
    
          
            <div className="modal-header">
            <h4 className="modal-title">Sorting Options</h4>
            <button type="button" onClick={changeAction} className="close" data-dismiss="modal">&times;</button>
            </div>
    
           
            <div className="modal-body">
               
                <button className="sortbutton">
                    <span className="btn-icon"><i className="fa fa-sort-alpha-asc"></i></span>
                    <span className="btn-label">Alphabetically</span>
                </button>
               
                <button className="sortbutton">
                    <span className="btn-icon"><i className="fa fa-thumbs-up"></i></span>
                    <span className="btn-label">Highest Upvotes</span>
                </button>
               
                <button className="sortbutton">
                    <span className="btn-icon"><i className="fa fa-thumbs-down"></i></span>
                    <span className="btn-label">Lowest Upvotes</span>
                </button>
               
                <button className="sortbutton">
                    <span className="btn-icon"><i className="fa fa-sort-amount-asc"></i></span>
                    <span className="btn-label">Latest First</span>
                </button>
               
                <button className="sortbutton">
                    <span className="btn-icon"><i className="fa fa-sort-amount-desc"></i></span>
                    <span className="btn-label">Oldest First</span>
                </button>
            </div>
    
        </div>
        </div>
    </div>
          </>
        }


        { toggle2 && <>
            <div className="modal" id="filtertModal">
        <div className="modal-dialog">
        <div className="modal-content mobilemodal">
    
           
            <div className="modal-header">
            <h4 className="modal-title">Filter Categories</h4>
            <button type="button" onClick={changeAction} className="close" data-dismiss="modal">&times;</button>
            </div>
    
            
            <div className="modal-body">
                
                <button className="sortbutton">
                    <span className="btn-label">Programming Languages</span>
                </button>
                
                <button className="sortbutton">
                    <span className="btn-label">Operating Systems</span>
                </button>
                
                <button className="sortbutton">
                    <span className="btn-label">DBMS</span>
                </button>
                
                <button className="sortbutton">
                    <span className="btn-label">Web Development</span>
                </button>
                
                
                <button className="sortbutton">
                    <span className="btn-label">Competitive Programming</span>
                </button>
                
                
                <button className="sortbutton">
                    <span className="btn-label">Dynamic Programming</span>
                </button>
                
                
                <button className="sortbutton">
                    <span className="btn-label">Interview Preparation</span>
                </button>
                
                <button className="sortbutton">
                    <span className="btn-label">Java</span>
                </button>
                
                <button className="sortbutton">
                    <span className="btn-label">Python</span>
                </button>
            </div>
    
        </div>
        </div>
    </div>
        </>}

        <div id="floatingbtns">
        
      
        <button id="sortbtn"  onClick={(e)=> actionHandler(e) }  data-toggle="modal" data-target="#sortModal" >
            <i className="fa fa-sort"></i>
        </button>
        
    

        
        <button id="filterbtn" onClick={(e)=> actionHandler(e)} data-toggle="modal" data-target="#filtertModal">
            <i className="fa fa-filter"></i>
        </button>
       
        
    </div>
</>
    )
}
