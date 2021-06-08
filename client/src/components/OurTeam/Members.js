import React, {lazy} from "react";
// import Member from "./Member";
const Member = lazy(() => import("./Member"));
import Data from "./Data";

const Members = (props) => {
  return (
    <div className="Members">
      {Data.filter((dt) => {
        if (dt.category === props.post) {
          return dt;
        }
      }).map((dt) => (
        <Member
          name={dt.name}
          im={dt.image}
          post={dt.post}
          mail={dt.mail}
          fb_link={dt.fb_link}
          lnkdin_link={dt.lnkdin_link}
        />
      ))}
    </div>
  );
};

export default Members;
