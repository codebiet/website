import React, { useState, useEffect, useContext } from "react";
import { InfoContext } from "../../../state/Store";
import {
  generateSuccess,
  generateError,
  clearEverything,
} from "../../../state/info/infoActions";
import DashboardLayout from "../Dashboard/DashboardLayout";
import homeRoutes from "./homeRoutes";
import {
  Form,
  FormGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";
import axios from "axios";
import Loader from "../../Loader/Loader";
import { DeleteForeverOutlined } from "@material-ui/icons";
const AdminCard = ({
  email,
  id,
  setAdmins = () => "",
  setLoading = () => "",
}) => {
  const info = useContext(InfoContext);
  const handleDelete = () => {
    setLoading(true);
    axios
      .patch(`/patch/admin/${id}/deleteAdmin`)
      .then((res) => {
        setLoading(false);
        setAdmins(res.data.admins);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          return info.dispatch(generateError(err.response.data.errorMsg));
        else return info.dispatch(generateError("Something went wrong!"));
      });
  };
  return (
    <Card
      style={{
        maxWidth: "400px",
        marginLeft: "1rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <CardBody>{email}</CardBody>
      <div style={{ color: "red", cursor: "pointer" }} onClick={handleDelete}>
        <DeleteForeverOutlined />
      </div>
    </Card>
  );
};
const Home = (props) => {
  const info = useContext(InfoContext);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/admins")
      .then((res) => {
        setLoading(false);
        setAdmins(res.data.admins);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          info.dispatch(generateError(err.response.data.errorMsg));
        else info.dispatch(generateError("Something went wrong!"));
      });
  }, []);
  return (
    <DashboardLayout routes={homeRoutes}>
      <div style={{ display: "flex", flexWrap: "wrap", paddingTop: "2rem" }}>
        {admins.map((admin) => (
          <AdminCard
            email={admin.email}
            id={admin._id}
            setAdmins={setAdmins}
            setLoading={setLoading}
          />
        ))}
      </div>
      {loading && <Loader />}
    </DashboardLayout>
  );
};
export default Home;
