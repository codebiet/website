import React, { useState, useEffect, lazy } from "react";
import axios from "axios";
import feedbackRoutes from "./feedbackRoutes";
const DashboardLayout = lazy(() => import("../Dashboard/DashboardLayout"));
const Card = lazy(() => import("reactstrap/es/Card"));
const CardBody = lazy(() => import("reactstrap/es/CardBody"));
export default () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/feedbacks")
      .then((res) => {
        setFeedbacks(res.data.feedbacks);
      })
      .catch((err) => {});
  }, []);
  return (
    <DashboardLayout routes={feedbackRoutes}>
      <h1 style={{ paddingTop: "1rem" }}>Feedbacks</h1>
      {feedbacks.map((feedback, index) => {
        return (
          <Card key={index}>
            <CardBody>
              <p>
                <strong>Rating: </strong>
                {feedback.rating}
              </p>
              <p>
                <strong>Message: </strong>
                {feedback.message}
              </p>
            </CardBody>
          </Card>
        );
      })}
    </DashboardLayout>
  );
};
