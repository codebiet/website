import React, { useState, useEffect, useContext, lazy } from "react";
import { InfoContext } from "../../../state/Store";
import {
  generateSuccess,
  generateError,
  clearEverything,
} from "../../../state/info/infoActions";
// import DashboardLayout from "../Dashboard/DashboardLayout";
// import Loader from "../../Loader/Loader";
const DashboardLayout = lazy(() => import("../Dashboard/DashboardLayout"));
const Loader = lazy(() => import("../../Loader/Loader"));
import homeRoutes from "./homeRoutes";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";
import axios from "axios";
const Home = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const info = useContext(InfoContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    info.dispatch(clearEverything());
  }, [email]);
  const addAdmin = (e) => {
    e.preventDefault();
    if (!email)
      return info.dispatch(generateError("Please enter a valid email address"));
    setLoading(true);
    axios
      .post("/post/admin/addAdmin", { email, name })
      .then((res) => {
        setLoading(false);
        info.dispatch(generateSuccess("Successfully added the admin!"));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data)
          return info.dispatch(generateError(err.response.data.errorMsg));
        else return info.dispatch(generateError("Something went wrong!"));
      });
  };
  return (
    <DashboardLayout routes={homeRoutes}>
      <Card style={{ paddingTop: "2rem" }}>
        <CardHeader>
          <h3>Add Admin</h3>
        </CardHeader>
        <CardBody>
          <Form onSubmit={(e) => addAdmin(e)} autoComplete="off">
            <Row style={{ width: "100%", margin: 0 }}>
              <Col md="6">
                <FormGroup>
                  <label className="fontType" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter the Name(Optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label className="fontType" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ width: "100%", margin: 0 }}>
              <Col md="6">
                <FormGroup>
                  <Button
                    type="email"
                    className="default-btn"
                    color="warning"
                    placeholder="Enter admin Email"
                    onClick={addAdmin}
                  >
                    Add as Admin
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter>
          <Row style={{ width: "100%", margin: 0 }}>
            <Col>
              <p>
                <strong>Note: </strong>If this email is already associated to
                any user, the user will be having admin priviledges after you
                add that user as admin, password and name won't be updated no
                matter you provide here or not and if the email is not
                associated to any existing account their password will be same
                as their email. They can reset their password by clicking forgot
                password.
              </p>
            </Col>
          </Row>
        </CardFooter>
      </Card>
      {loading && <Loader />}
    </DashboardLayout>
  );
};
export default Home;
