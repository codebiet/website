import React, { useState } from "react";
const SwitchBar = ({ setSort, setType }) => {
  //set Type if used to implement Help Others filter, if type == "Help Others", in query we'll add replyAdded = false, means which are unanswered questions
  var active = {
    backgound: "rgb(255, 166, 0)",
    fontWeight: "700",
    color: "#000",
    boxShadow: "1px 1px 5px #aaa",
  };

  var inActive = {
    backgound: "",
    fontWeight: "",
    color: "",
    boxShadow: "",
  };

  const [liveCss, setliveCss] = useState(active);
  const [upcomingCss, setupcomingCss] = useState(inActive);
  const [closedCss, setclosedCss] = useState(inActive);

  const addLiveCss = () => {
    setliveCss(active);
    setupcomingCss(inActive);
    setclosedCss(inActive);
    setSort("");
    setType("");
  };

  const addUpcomingCss = () => {
    setliveCss(inActive);
    setupcomingCss(active);
    setclosedCss(inActive);
    setSort("latest");
    setType("");
  };

  const addClosedCss = () => {
    setliveCss(inActive);
    setupcomingCss(inActive);
    setclosedCss(active);
    setSort("");
    setType("Help Others");
  };

  return (
    <div id="tabs">
      <span
        id="live"
        className="tab"
        style={{
          background: liveCss.backgound,
          fontWeight: liveCss.fontWeight,
          color: liveCss.color,
          boxShadow: liveCss.boxShadow,
        }}
        onClick={addLiveCss}
      >
        Explore
      </span>
      <span
        id="upcoming"
        className="tab"
        style={{
          background: upcomingCss.backgound,
          fontWeight: upcomingCss.fontWeight,
          color: upcomingCss.color,
          boxShadow: upcomingCss.boxShadow,
        }}
        onClick={addUpcomingCss}
      >
        Recent
      </span>
      <span
        id="closed"
        className="tab"
        style={{
          background: closedCss.backgound,
          fontWeight: closedCss.fontWeight,
          color: closedCss.color,
          boxShadow: closedCss.boxShadow,
        }}
        onClick={addClosedCss}
      >
        Help Others
      </span>
    </div>
  );
};

export default SwitchBar;
