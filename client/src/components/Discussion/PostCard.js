import React, { useState, useContext, lazy } from "react";
import noUserImg from "../assets/user.svg";
import axios from "axios";
import { InfoContext, AuthContext } from "../../state/Store";
import { generateError } from "../../state/info/infoActions";
import { Redirect, useLocation } from "react-router-dom";
// import ReplyCard from "./ReplyCard";
// import ReplyModal from "./ReplyModal";
const ReplyCard = lazy(() => import("./ReplyCard"));
const ReplyModal = lazy(() => import("./ReplyModal"));
const PostCard = ({ post = {}, setPosts = () => "", getQuery = () => "" }) => {
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const info = useContext(InfoContext);
  const auth = useContext(AuthContext);
  //toggle reply modal on clicking reply button;
  const toggleReplyModalOpen = () => {
    if (!auth.state.userLoggedIn) return setRedirect(true);
    setReplyModalOpen((prev) => !prev);
  };
  const changeLike = () => {
    if (!auth.state.userLoggedIn) return setRedirect(true);
    axios
      .patch(`/patch/doubts/${post._id}/like/${getQuery()}`)
      .then((res) => {
        setPosts(res.data.doubts);
      })
      .catch((err) => {
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data.errorMsg));
        else info.dispatch(generateError("Something went wrong!"));
      });
  };
  return (
    <>
      {redirect && (
        <Redirect
          to={{ pathname: "/login", state: { from: location.pathname } }}
        />
      )}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 no-pad">
            <div className="card mb-4">
              <div className="card-header">
                <div className="media flex-wrap w-100 align-items-center">
                  <img
                    src={post.postedBy.profilePhoto || noUserImg}
                    className="d-block ui-w-40 rounded-circle"
                    alt=""
                  />
                  <div className="media-body ml-3">
                    <a href="javascript:void(0)" data-abc="true">
                      {post.postedBy.name}
                    </a>
                    <div className="text-muted small">
                      {new Date(post.postedAt).toDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="text-muted small">
                  <div className="category">
                    <a href="#">
                      <i
                        className="fa fa-bookmark"
                        style={{ marginRight: ".2rem" }}
                      ></i>
                      <strong>{post.category}</strong>
                    </a>
                  </div>
                </div>
                <h2>{post.queryTitle}</h2>
                <p style={{ textAlign: "justify" }}>{post.queryDescription}</p>
                <div className="tagContainer mt-20">
                  {post.tags.map((tag, index) => (
                    <a key={index} href="#" className="tag color1">
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
              <div className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                <div className="px-4 pt-3">
                  <a
                    href="javascript:void(0)"
                    className="text-muted d-inline-flex align-items-center align-middle"
                    data-abc="true"
                    onClick={changeLike}
                  >
                    <i
                      className="fa fa-heart"
                      style={{ color: post.likedByThisUser ? "red" : "gray" }}
                    ></i>
                    &nbsp;
                    <span className="align-middle">{post.likes}</span>
                  </a>
                </div>
                <div className="px-4 pt-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => toggleReplyModalOpen((prev) => !prev)}
                  >
                    <i className="fa fa-pencil"></i>&nbsp; Reply
                  </button>
                </div>
                <ReplyModal
                  replyModalOpen={replyModalOpen}
                  toggleReplyModalOpen={toggleReplyModalOpen}
                  setPosts={setPosts}
                  getQuery={getQuery}
                  doubtId={post._id}
                />
              </div>
              {post.replies.length > 0 && <hr />}
              {/* show the first reply if it is there */}
              {post.replies.length > 0 && <ReplyCard reply={post.replies[0]} />}
              {/* if more replies and are shown, we need an hr */}
              {post.replies.length > 1 && showMore && <hr />}
              {/* show more replies if user selects show more */}
              {post.replies.length > 1 &&
                showMore &&
                post.replies.slice(1).map((reply, index) => (
                  <>
                    <ReplyCard key={reply._id} reply={reply} />
                    {post.replies.slice(1).length > index + 1 && <hr />}
                  </>
                ))}
              {post.replies.length > 1 && (
                <button
                  className="show-more-replies-btn"
                  onClick={() => setShowMore((prev) => !prev)}
                >
                  {showMore ? "Show Less Replies" : "Show More Replies"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
