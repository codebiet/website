import React from "react";
import noUserImg from "../assets/user.svg";
const ReplyCard = ({ reply = {} }) => {
  return (
    <>
      <div style={{marginLeft:"1rem"}}>
        <div className="media flex-wrap w-100 align-items-center">
          <img
            src={reply.repliedBy.profilePhoto || noUserImg}
            className="d-block ui-w-40 rounded-circle"
            alt=""
            style={{ width: "40px", height: "40px" }}
          />
          <div className="media-body ml-3">
            <a href="javascript:void(0)" data-abc="true">
              {reply.repliedBy.name}
            </a>
            <div className="text-muted small">
              {new Date(reply.repliedAt).toDateString()}
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h2>{reply.replyTitle}</h2>
        <p>{reply.replyDescription}</p>
      </div>
    </>
  );
};
export default ReplyCard;
