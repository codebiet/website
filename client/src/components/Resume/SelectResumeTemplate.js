import React from 'react';
import template1 from "../assets/template1.png";
import template2 from "../assets/template2.png";
import template3 from "../assets/template3.png";
const Template = ({setTemplate}) => {
    return <div className="resume-select">
        <h1>SELECT THE TEMPLATE</h1>
        <div className="templates">
            <img src={template1} alt="" onClick={() => setTemplate(1)}/>
            <img src={template2} alt="" onClick={() => setTemplate(2)}/>
            <img src={template3} alt="" onClick={() => setTemplate(3)}/>
        </div>
    </div>
}
export default Template;