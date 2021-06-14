import React, {useState, useEffect} from "react";
import eventRoutes from "./eventRoutes";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import ContentLoaderSvg from "../../EventCard/EventCardLoader";
const EventRegistrations = (props) => {
    return <DashboardLayout routes={eventRoutes}>
        <ContentLoaderSvg />
    </DashboardLayout>
}
export default EventRegistrations;