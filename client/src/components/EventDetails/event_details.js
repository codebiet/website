import React from "react";
import img from "../assets/header.jpg";
function Event_details(props) {
  return (
    <main className="event-details-main">
      <div className="eventDetails">
        <div className="eventDetailsOuter">
          <div className="eventINnerDiv">
            <div className="headerImage">
              <img src={img} alt="svg"></img>
            </div>
            <div className="eventBody">
              <div className="eventINfoSection">
                <h1>RECURSION For Humanity</h1>
                <div className="registerDetails">
                  <div className="registerButton">Register Now</div>
                  <div className="event">
                    <p>Starts On</p>
                    <p color="grey">01:00 PM, 5 JUN 2021</p>
                  </div>
                  <div className="event">
                    <p>Donation</p>
                    <p>Free</p>
                  </div>
                  <div className="event">
                    <p>Venue</p>
                    <p>Online Platform CN</p>
                  </div>
                </div>

                <div className="detailedContent">
                  <h2>DESCRIPTION</h2>
                  <div className="description">
                    <div>
                      <span>
                        As India grapples with the second wave of COVID-19, we
                        at Coding Ninjas, have come up with an exclusive
                        initiative wherein you get a chance to not only create a
                        bright future for yourself, but for others as well,
                        through our exclusive Fund-Raising LIVE Masterclass on
                        "Recursion for Humanity" and FAANG Interview Problems on
                        Recursion hosted by our Co-Founder & Instructor - Ankush
                        Singla.
                      </span>
                      <br></br>
                      <br></br>
                      <span>
                        <strong>DATE : </strong> 21<sup>st</sup> March
                      </span>
                      <br></br>
                      <span>
                        <strong>TIME : </strong>5 am to 8 am
                      </span>
                      <br></br>
                      <br></br>
                      <span>
                        Donate any amount between Rs.100-1000 which will be
                        donated to the Covid relief NGO.
                      </span>
                      <br></br>
                      <br></br>
                      <span>
                        <b>
                          In addition, the donated amount will be doubled and
                          added to your Ninja Wallet as Ninja Coins for future
                          purchase on any course. For instance, if your donated
                          amount is Rs.500, you will receive 1000 Ninja Coins in
                          your Ninja Wallet.
                        </b>
                      </span>
                      <br></br>
                      <br></br>
                      <h2>WHY SHOULD YOU ATTEND THE CLASS</h2>
                      <ul>
                        <li>
                          An opportunity to do your bit towards the society
                        </li>
                        <li>
                          Learn Important Interview Questions of Recursion from
                          Ankush Singla, an alumnus of IIT Delhi & Stanford with
                          prior experience of working in Facebook and Amazon
                        </li>
                        <li>
                          Get twice the amount of your contribution as Ninja
                          Coins in your Ninja Wallet.
                        </li>
                      </ul>
                      <br></br>
                      <br></br>
                      <span>
                        These Ninja Coins will be valid till 12th June, 2021 and
                        can be used to purchase any course, from Coding Ninjas.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Event_details;
