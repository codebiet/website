import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FormGroup } from "reactstrap";
import { Redirect } from "react-router-dom";
import { AuthContext, InfoContext } from "../../state/Store";
import { generateError, clearEverything } from "../../state/info/infoActions";
import { useLocation } from "react-router-dom";
const CommentItem = ({ blogId, defaultComment }) => {
  const [replyInputVisible, setReplyInputVisible] = useState(false);
  const [reply, setReply] = useState("");
  const [redirect, setRedirect] = useState(false); //used to redirect to login if someone clicks reply button and is not logged in
  const [comment, setComment] = useState(defaultComment);
  const [repliesOpen, setRepliesOpen] = useState(false);
  const auth = useContext(AuthContext);
  const location = useLocation();
  const handleReply = () => {
    if (!reply) return;
    const data = { reply };
    setReply("");
    axios
      .patch(`/patch/blogs/${blogId}/comment/${comment._id}/reply`, data)
      .then((res) => {
        setComment(res.data.comment);
      })
      .catch((err) => {});
  };
  const toggleReply = () => {
    if (!auth.state.userLoggedIn) setRedirect(true);
    setReplyInputVisible((prev) => !prev);
  };
  const toggleRepliesHeight = () => {
    setRepliesOpen((prev) => !prev);
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") handleReply();
  };
  return (
    <>
      {redirect && (
        <Redirect
          to={{ pathname: "/login", state: { from: location.pathname } }}
        />
      )}
      <div className="comment">
        <div className="comment-user-img">
          <img src={comment.commentedBy.profilePhoto} alt="" />
        </div>
        <div className="content-with-username">
          <div className="username">{comment.commentedBy.name}</div>
          <div className="content">{comment.body}</div>
          {comment.replies && comment.replies.length > 0 && (
            <>
              <div className={repliesOpen ? "replies open" : "replies"}>
                {comment.replies.map((reply) => {
                  return (
                    <div className="comment" key={reply._id}>
                      <div className="comment-user-img">
                        <img src={reply.repliedBy.profilePhoto} alt="" />
                      </div>
                      <div className="content-with-username">
                        <div className="username">{reply.repliedBy.name}</div>
                        <div className="content">{reply.body}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                className="show-replies-btn"
                onClick={toggleRepliesHeight}
              >
                {repliesOpen ? "Hide Replies" : "Show Replies"}
              </button>
            </>
          )}
          <div className="actions">
            <button onClick={toggleReply}>Reply</button>
            <FormGroup>
              <input
                type="text"
                className="form-control"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write the reply and press Enter to post"
                onKeyDown={handleKeyDown}
                style={{ display: replyInputVisible ? "block" : "none" }}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
};
const Comment = ({ id, prevBlog, nextBlog }) => {
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const info = useContext(InfoContext);
  const auth = useContext(AuthContext);
  useEffect(() => {
    info.dispatch(clearEverything());
  }, [userComment]);
  useEffect(() => {
    axios
      .get(`/api/blogs/${id}/comments`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {});
    return () => info.dispatch(clearEverything());
  }, [location.pathname, id]);
  const handleComment = (e) => {
    e.preventDefault();
    if (!auth.state.userLoggedIn) setRedirect(true);
    if (!userComment)
      return info.dispatch(generateError("Please write your comment message"));
    const data = { comment: userComment };
    setUserComment("");
    axios
      .patch(`/patch/blogs/${id}/comment`, data)
      .then((res) => {
        setComments(res.data.comments);
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
      <div className="comment-container-blogs" style={{ marginBottom: "1rem" }}>
        <div className="comment_header">
          {(prevBlog.url || nextBlog.url) && (
            <nav className="nav_box nav_link">
              <div className="nav1 nav_pad">
                {prevBlog.url && (
                  <Link to={"/blogs/" + prevBlog.url}>
                    <span className="nav-label">
                      <i className="icon1"></i>
                      <span>
                        <i className="fas fa-angle-left"></i>
                        Previous Article
                      </span>
                    </span>
                    <span className="nav_img h4">
                      <img
                        style={{ width: 50, height: 50 }}
                        src={prevBlog.cardImg}
                        className="img1"
                      />
                      <span className="tittle">{prevBlog.title}</span>
                    </span>
                  </Link>
                )}
              </div>
              <div className="nav2 nav_pad">
                {nextBlog.url && (
                  <Link to={"/blogs/" + nextBlog.url}>
                    <span className="nav-label">
                      <i className="icon2"></i>
                      <span>
                        Next Article
                        <i className="fas fa-angle-right"></i>
                      </span>
                    </span>
                    <span className="nav_img h4">
                      <img
                        style={{ width: 50, height: 50 }}
                        src={nextBlog.cardImg}
                        className="img2"
                      />
                      <span className="tittle">{nextBlog.title}</span>
                    </span>
                  </Link>
                )}
              </div>
            </nav>
          )}
          {/* nav bar ends here */}

          {/* Comment form */}

          <aside className="comment_box">
            {comments.length > 0 && (
              <>
                <h3>Comments</h3>
                <div className="comments">
                  {comments.map((comment) => (
                    <CommentItem
                      key={comment._id}
                      blogId={id}
                      defaultComment={comment}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="comment_box_header clearfix">
              <h4 className="reply">
                <i className="reply_icon"></i>
                Leave a reply
              </h4>
            </div>

            <div className="ContactForm">
              <form style={{ width: "100%" }} onSubmit={handleComment}>
                {/* <input type="text" required placeholder="Your Name"></input>
              <input type="email" required placeholder="Your Email"></input>
              <input
                type="number"
                required
                placeholder="Contact number"
              ></input> */}
                <textarea
                  required
                  placeholder="Type your Comment here*"
                  className="textareaContactDetails"
                  rows="4"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                ></textarea>
                {/* <div class="form-comment-cookies">
                <span>
                  <input type="checkbox" class="checkbox" />
                  <label for="comment-cookies">
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </span>
              </div> */}
                <button
                  type="submit "
                  className="btn-hover color-4"
                  onClick={handleComment}
                >
                  Post Comment
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Comment;
