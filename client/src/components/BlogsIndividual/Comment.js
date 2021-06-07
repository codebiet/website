import React from "react";
import image from "../assets/BlogImage.jpg";

const Comment = (props) => {
  return (
    <div className="comment-container-blogs">
      <div className="comment_header">
        <nav className="nav_box nav_link">
          <div className="nav1 nav_pad">
            <a href="">
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
                  src={image}
                  className="img1"
                />
                <span className="tittle">
                  What Does It Take for a Fresher to Get an IT Job?
                </span>
              </span>
            </a>
          </div>

          <div className="nav2 nav_pad">
            <a href="">
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
                  src={image}
                  className="img2"
                />
                <span className="tittle">
                  What Does It Take for a Fresher to Get an IT Job?
                </span>
              </span>
            </a>
          </div>
        </nav>
        {/* nav bar ends here */}

        {/* Comment form */}

        <aside className="comment_box">
          <div className="comment_box_header clearfix">
            <h4 className="reply">
              <i className="reply_icon"></i>
              Leave a reply
            </h4>
          </div>

          <div className="ContactForm">
            <form>
              <input type="text" required placeholder="Your Name"></input>
              <input type="email" required placeholder="Your Email"></input>
              <input
                type="number"
                required
                placeholder="Contact number"
              ></input>
              <textarea
                required
                placeholder="Type your Comment here*"
                className="textareaContactDetails"
                rows="4"
              ></textarea>
              <div class="form-comment-cookies">
                <span>
                  <input type="checkbox" class="checkbox" />
                  <label for="comment-cookies">
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </span>
              </div>
              <button type="submit " className="btn-hover color-4">
                Post Comment
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Comment;
