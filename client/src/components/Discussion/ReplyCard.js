import React from "react";

const ReplyCard = ({ reply = {} }) => {
  return (
    <div className="card-body">
      <h2>{reply.replyTitle}</h2>
      <p>{reply.replyDescription}</p>
    </div>
  );
};
export default ReplyCard;
