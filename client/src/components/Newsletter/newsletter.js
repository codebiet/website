import React from "react";
function Newsletter() {
  return (
    <section className="newsletterSection">
      <div className="newsLetter">
        <div>
          <h1>Developer Newsletter</h1>
          <p>
            Get the latest news, techniques and updates straight to your inbox.
          </p>
        </div>

        <div className="newLetterInputDiv">
          <form className="newslettterForm">
            <div className="emailOuterDiv">
              <input
                type="email"
                required
                placeholder="Enter your email"
              ></input>
            </div>

            <br></br>
            <span>
              Don't worry, no spam here! Your information will only be used for
              C.O.D.E and Chrome related updates and our emails are typically no
              more than 1-2 times a month. You can unsubscribe anytime.
            </span>
            <br></br>
            <button type="submit " className="buttonNewsletter">
              Let's Connect
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
