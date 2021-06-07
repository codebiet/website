import React from "react";
import { Link } from "react-router-dom";
const EventCard = ({
  name,
  startsOn,
  entryFee,
  venue,
  img,
  description,
  tags,
}) => {
  console.log({ name, startsOn, entryFee, venue, img, description, tags });
  return (
    <div className="cardEvent">
      <div className="card">
        <div className="cardHeader">
          <div className="cardHeaderInner">
            <img src={img} alt="cardimage" className="cardImage"></img>
          </div>
        </div>

        <div className="cardMain">
          <p>{name}</p>
          <div className="eventDetails">
            <div className="eventInfo">
              <p className="eventInfo-header">
                <i
                  className="far fa-calendar-alt"
                  style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                ></i>
                <b>Starts On</b>
              </p>
              <p>{startsOn}</p>
            </div>
            <div className="eventInfo">
              <p className="eventInfo-header">
                <i
                  className="fas fa-rupee-sign"
                  style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                ></i>
                <b>Entry Fees</b>
              </p>
              <p> {entryFee} </p>
            </div>
            <div className="eventInfo ">
              <p className="eventInfo-header">
                <i
                  className="fas fa-map-marked-alt"
                  style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                ></i>
                <b>Venue</b>
              </p>
              <p>{venue}</p>
            </div>
          </div>
          <div className="shortDescription">{description}</div>
          <div className="tagsContainer">
            {tags.map((tag) => (
              <div className="tags">{tag}</div>
            ))}
          </div>
          <Link to="/events/id" className="eventId">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
