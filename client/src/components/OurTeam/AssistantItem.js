import React,{lazy} from "react";
// import Assistant from "./Assistant";
const Assistant = lazy(() => import("../OurTeam/Assistant"));
import Data from "../Data";

const Assistants = () => {
  return (
    <div>
      {Data.filter((dt) => {
        if (dt.category === "assistants") {
          return dt;
        }
      }).map((dt) => (
        <Assistant
          name={dt.name}
          im={dt.image}
          mail={dt.mail}
          fb_link={dt.fb_link}
          lnkdin_link={dt.lnkdin_link}
        />
      ))}
    </div>
  );
};

export default Assistants;