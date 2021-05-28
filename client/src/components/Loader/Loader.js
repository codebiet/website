import React, {useEffect} from 'react';
function Loader({fullPageLoader}) {
    useEffect(() => {
        window.scrollTo(0,0);
        const clipBody = () => {
           document.getElementById('doc-body-main').classList.add('clip-body');
        }
        clipBody();
        return () => {
            document.getElementById('doc-body-main').classList.remove('clip-body');
        }
    })
    return (
        <div className={"loader-container position-absolute full-width flex " + ((fullPageLoader && "fullPageLoader") || "")}>
            <div className="loader"></div>
        </div>
    )
}

export default Loader
