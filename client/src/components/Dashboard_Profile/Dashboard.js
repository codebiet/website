import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../state/Store";
import { InfoContext } from "../../state/Store";
import {
  generateError,
  clearEverything,
  generateSuccess,
  generateWarning
} from "../../state/info/infoActions";
import axios from "axios";
import Loader from "../Loader/Loader";
// import AutoSuggest from "react-autosuggest
import { options_ProgrammingLangs } from "./formField_options";
import { options_WebTechnologies } from "./formField_options";
import { options_WebFrameworks } from "./formField_options";
import { options_Dbms } from "./formField_options";
import { options_Os } from "./formField_options";
import { options_technologies } from "./formField_options";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DemoNavbar from "./DashboardHeaderNav";
import Footer from "./DashboardFooter";
import Sidebar from "./DashboardSidebar";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { DeleteForeverOutlined } from "@material-ui/icons";
const useInput = ({ type, id, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const Input = (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="form-control"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      autoComplete="off"
    />
  );
  return [Input, inputValue, setInputValue];
};
const useDisabledInput = ({ type, placeholder, id }) => {
  const [inputValue, setInputValue] = useState("");
  const Input = (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="form-control"
      value={inputValue}
      disabled
    />
  );
  return [Input, inputValue, setInputValue];
};
const AddPhoneNumberModal = (props) => {
  const { className, setModal, modal, setNumber, setNumberVerified } = props;
  const [phoneInput, phoneValue, setPhoneValue] = useInput({
    type: "text",
    placeholder: "Enter 10 digit phone Number!",
    id: "phone-input",
  });
  const [otpInput, otpValue, setOtpValue] = useInput({
    type: "text",
    placeholder: "Ente the OTP",
    id: "otp-input",
  });
  const [otpSent, setOtpSend] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let timer;
    if (otpSent && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (!otpSent) {
      setSeconds(5);
    }
  }, [otpSent, seconds]);
  const toggle = () => {
    if (modal) {
      setTimeout(() => {
        setOtpSend(false);
      }, 500);
      setMsg("");
    }
    setModal(!modal);
  };
  const updateMobile = () => {
    const regex = /^[0-9]{10}/i;
    if (!regex.test(phoneValue) || phoneValue.length != 10) {
      return setMsg(
        "Invalid Phone Number. Please enter 10 digit phone Number!"
      );
    }
    let body = {};
    if (props.whatsApp) {
      body.whatsAppPhoneNumber = phoneValue;
    } else {
      body.callingPhoneNumber = phoneValue;
    }
    setLoading(true);
    axios
      .post("/post/updateMobile", body)
      .then((res) => {
        setOtpSend(true);
        setLoading(false);
        setNumber(phoneValue);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errorMsg) {
          setMsg(err.response.data.errorMsg);
        } else {
          setMsg("Something went wrong! Please try again!");
        }
        setLoading(false);
      });
  };
  const submitOtp = () => {
    const regex = /^[0-9]{4}/i;
    if (!regex.test(otpValue))
      return setMsg("Please Enter the valid 4 digit OTP!");
    let type = "calling";
    if (props.whatsApp) type = "whatsApp";
    setLoading(true);
    axios
      .post("/post/verifyOtp", { otp: otpValue, type })
      .then((res) => {
        if (props.calling) {
          props.setCallingPhoneNum(phoneValue);
        } else if (props.whatsApp) {
          props.setWhatsAppPhoneNum(phoneValue);
        }
        setPhoneValue("");
        setOtpValue("");
        setModal(false);
        setLoading(false);
        setNumberVerified(true);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errorMsg) {
          setMsg(err.response.data.errorMsg);
        } else {
          setMsg("Something Went Wrong!");
        }
        setLoading(false);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("called");
    if (otpSent) {
      submitOtp();
    } else {
      updateMobile();
    }
  };
  const resendOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/post/resendOtp", { mobile: phoneValue })
      .then((res) => {
        setLoading(false);
        setMsg(res.data.msg);
        setSeconds(59);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data && err.response.data.errorMsg) {
          setMsg(err.response.data.errorMsg);
        } else {
          setMsg("Something went wrong!");
        }
      });
  };
  return (
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>Enter Your Phone Number</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <form style={{ paddingLeft: 0 }} onSubmit={(e) => handleSubmit(e)}>
              {msg && (
                <p style={{ color: "red", paddingLeft: 0, textAlign: "left" }}>
                  {msg}
                </p>
              )}
              <FormGroup>{otpSent ? otpInput : phoneInput}</FormGroup>
            </form>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button className="phone-button" onClick={handleSubmit}>
          {otpSent ? "Verify" : "Update"}
        </Button>
        {otpSent && (
          <Button className="phone-button" onClick={(e) => resendOtp(e)}>
            {seconds ? `Resend in ${seconds}` : "Resend"}
          </Button>
        )}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
      {loading && <Loader />}
    </Modal>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const Dashboard = (props) => {
  const auth = useContext(AuthContext);
  const info = useContext(InfoContext);
  const classes = useStyles();
  const [profileImg, setProfileImg] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [callingModal, setCallingPhoneModal] = useState(false);
  const [whatsAppPhoneModal, setWhatsAppPhoneModal] = useState(false);
  const [callingPhoneInput, callingPhoneNum, setCallingPhoneNum] =
    useDisabledInput({
      type: "text",
      name: "callingPhoneNum",
      id: "dashboard-calling-phone",
      placeholder: "Calling Phone Number",
    });
  const [callingVerified, setCallingVerified] = useState(false);
  const [whatsAppPhoneInput, whatsAppPhoneNum, setWhatsAppPhoneNum] =
    useDisabledInput({
      type: "text",
      name: "whatsappPhoneNum",
      id: "dashboard-whatsapp-phone",
      placeholder: "WhatsApp Phone Number",
    });
  const [whatsAppVerified, setWhatsAppVerified] = useState(false);
  const [githubUserInput, githubUserName, setGitHubUserName] = useInput({
    type: "text",
    name: "githubUserName",
    id: "github-user",
    placeholder: "Github Username",
  });
  const [rollNumberInput, rollNumber, setRollNumber] = useInput({
    type: "number",
    name: "rollNumber",
    id: "roll-number",
    placeholder: "Roll Number",
  });
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [hostingPlatforms, setHostingPlatforms] = useState({
    heroku: { name: "Heroku", checked: false },
    azure: { name: "Miscrosoft Azure", checked: false },
    aws: { name: "Amazon AWS", checked: false },
    gCloud: { name: "Google Cloud", checked: false },
    digitalOcean: { name: "Digital Ocean", checked: false },
    pythonAnywhere: { name: "Python Anywhwere", checked: false },
  });
  const [programmingLanguages, setProgrammingLanguages] = useState([
    { name: "", level: "" },
  ]);
  const [programmingLangOptions, setProgrammingLangOptions] = useState(
    options_ProgrammingLangs
  );
  const [webTechnologies, setWebTechnologies] = useState([
    { name: "", level: "" },
  ]);
  const [webTechnologiesOptions, setWebTechnologiesOptions] = useState(
    options_WebTechnologies
  );
  const [webFrameworks, setWebFrameworks] = useState([{ name: "", level: "" }]);
  const [webFrameworksOptions, setWebFrameworksOptions] = useState(
    options_WebFrameworks
  );
  const [dbms, setDbms] = useState([{ name: "", level: "" }]);
  const [dbmsOptions, setDbmsOptions] = useState(options_Dbms);
  const [os, setOs] = useState([{ name: "", level: "" }]);
  const [osOptions, setOsOptions] = useState(options_Os);
  const [techs, setTechs] = useState([{ name: "", level: "" }]);
  const [techsOptions, setTechsOptions] = useState(options_technologies);
  const [interest, setInterest] = useState({
    preference1: "",
    preference2: "",
    preference3: "",
  });
  const [otherSkills, setOtherSkills] = useState([""]);
  const [trainings, setTrainings] = useState([{ name: "", credentials: "" }]);
  const [projects, setProjects] = useState([
    { name: "", type: "", technologies: "", credentials: "" },
  ]);
  const [internships, setInternships] = useState([
    { title: "", type: "", technologies: "", credentials: "" },
  ]);
  const resumeInput = React.createRef();
  const profilePhotoInput = React.createRef();
  const addMore = (thing) => {
    switch (thing) {
      case "programmingLangs":
        setProgrammingLanguages((langs) => [...langs, { name: "", level: "" }]);
        break;
      case "webTechs":
        setWebTechnologies((webtechs) => [
          ...webtechs,
          { name: "", level: "" },
        ]);
        break;
      case "webFrameworks":
        setWebFrameworks((webFrames) => [
          ...webFrames,
          { name: "", level: "" },
        ]);
        break;
      case "dbms":
        setDbms((dbms) => [...dbms, { name: "", level: "" }]);
        break;
      case "os":
        setOs((os) => [...os, { name: "", level: "" }]);
        break;
      case "techs":
        setTechs((techs) => [...techs, { name: "", level: "" }]);
        break;
      case "otherSkills":
        setOtherSkills((prev) => [...prev, ""]);
        break;
      case "trainings":
        setTrainings((prev) => [...prev, { name: "", credentials: "" }]);
        break;
      case "projects":
        setProjects((prev) => [
          ...prev,
          { name: "", type: "", credentials: "", technologies: "" },
        ]);
        break;
      case "internships":
        setInternships((prev) => [
          ...prev,
          { title: "", type: "", credentials: "", technologies: "" },
        ]);
    }
  };
  const isdisabled = (thing) => {
    let last;
    const urlRegex =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    switch (thing) {
      case "programmingLangs":
        last = programmingLanguages[programmingLanguages.length - 1];
        if (last && (!last.name || !last.level)) return true;
        else return false;
      case "webTechs":
        last = webTechnologies[webTechnologies.length - 1];
        if (last && (!last.name || !last.level)) return true;
        else return false;
      case "webFrameworks":
        last = webFrameworks[webFrameworks.length - 1];
        if (last && (!last.name || !last.level)) return true;
        else return false;
      case "dbms":
        last = dbms[dbms.length - 1];
        if (last && (!last.name || !last.level)) return true;
        else return false;
      case "os":
        last = os[os.length - 1];
        if (last && (!last.name || !last.level)) return true;
        else return false;
      case "techs":
        last = techs[techs.length - 1];
        if (last && (!last.name || !last.level)) return true;
        else return false;
      case "otherSkills":
        last = otherSkills[otherSkills.length - 1];
        if (!last) return true;
        else return false;
      case "trainings":
        last = trainings[trainings.length - 1];
        if (last && (!last.name || !last.credentials)) return true;
        else if (last && !urlRegex.test(last.credentials)) return true;
        else return false;
      case "projects":
        last = projects[projects.length - 1];
        if (
          last &&
          (!last.name || !last.type || !last.credentials || !last.technologies)
        )
          return true;
        else if (last && !urlRegex.test(last.credentials)) return true;
        else return false;
      case "internships":
        last = internships[internships.length - 1];
        if (
          last &&
          (!last.title || !last.type || !last.credentials || !last.technologies)
        )
          return true;
        else if (last && !urlRegex.test(last.credentials)) return true;
        else return false;
    }
  };
  const deleteThingWithOptions = (setThing, setThingOptions, index) => {
    setThing((prev) => {
      const deleted = prev.splice(index, 1);
      setThingOptions((optns) => {
        optns.push(deleted.name);
        return [...optns];
      });
      return [...prev];
    });
  };
  const deleteThingWithoutOptions = (setThing, index) => {
    setThing((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };
  const handleLangChange = (e, index, changeType) => {
    if (changeType == "name") {
      setProgrammingLanguages((langs) => {
        if (index == langs.length - 1) {
          langs[index].name = e.target.value;
        }
        //filter options, hide options that has been selected;
        setProgrammingLangOptions((optns) => {
          optns = options_ProgrammingLangs.filter((op) => {
            for (var i = 0; i < langs.length; i++) {
              if (langs[i].name == op) return false;
            }
            return true;
          });
          return [...optns];
        });
        return [...langs];
      });
    } else if (changeType == "level") {
      setProgrammingLanguages((langs) => {
        if (index == langs.length - 1) langs[index].level = e.target.value;
        else if (e.target.value != "") langs[index].level = e.target.value;
        return [...langs];
      });
    }
  };
  const handleWebTechChange = (e, index, changeType) => {
    if (changeType == "name") {
      setWebTechnologies((langs) => {
        if (index == langs.length - 1) {
          langs[index].name = e.target.value;
        }
        //filter options, hide options that has been selected;
        setWebTechnologiesOptions((optns) => {
          optns = options_WebTechnologies.filter((op) => {
            for (var i = 0; i < langs.length; i++) {
              if (langs[i].name == op) return false;
            }
            return true;
          });
          return [...optns];
        });
        return [...langs];
      });
    } else if (changeType == "level") {
      setWebTechnologies((langs) => {
        if (index == langs.length - 1) langs[index].level = e.target.value;
        else if (e.target.value != "") langs[index].level = e.target.value;
        return [...langs];
      });
    }
  };
  const handleWebFrameworkChange = (e, index, changeType) => {
    if (changeType == "name") {
      setWebFrameworks((langs) => {
        if (index == langs.length - 1) {
          langs[index].name = e.target.value;
        }
        //filter options, hide options that has been selected;
        setWebFrameworksOptions((optns) => {
          optns = options_WebFrameworks.filter((op) => {
            for (var i = 0; i < langs.length; i++) {
              if (langs[i].name == op) return false;
            }
            return true;
          });
          return [...optns];
        });
        return [...langs];
      });
    } else if (changeType == "level") {
      setWebFrameworks((langs) => {
        if (index == langs.length - 1) langs[index].level = e.target.value;
        else if (e.target.value != "") langs[index].level = e.target.value;
        return [...langs];
      });
    }
  };
  const handleDbmsChange = (e, index, changeType) => {
    if (changeType == "name") {
      setDbms((langs) => {
        if (index == langs.length - 1) {
          langs[index].name = e.target.value;
        }
        //filter options, hide options that has been selected;
        setDbmsOptions((optns) => {
          optns = options_Dbms.filter((op) => {
            for (var i = 0; i < langs.length; i++) {
              if (langs[i].name == op) return false;
            }
            return true;
          });
          return [...optns];
        });
        return [...langs];
      });
    } else if (changeType == "level") {
      setDbms((langs) => {
        if (index == langs.length - 1) langs[index].level = e.target.value;
        else if (e.target.value != "") langs[index].level = e.target.value;
        return [...langs];
      });
    }
  };
  const handleOsChange = (e, index, changeType) => {
    if (changeType == "name") {
      setOs((langs) => {
        if (index == langs.length - 1) {
          langs[index].name = e.target.value;
        }
        //filter options, hide options that has been selected;
        setOsOptions((optns) => {
          optns = options_Os.filter((op) => {
            for (var i = 0; i < langs.length; i++) {
              if (langs[i].name == op) return false;
            }
            return true;
          });
          return [...optns];
        });
        return [...langs];
      });
    } else if (changeType == "level") {
      setOs((langs) => {
        if (index == langs.length - 1) langs[index].level = e.target.value;
        else if (e.target.value != "") langs[index].level = e.target.value;
        return [...langs];
      });
    }
  };
  const handleTechChange = (e, index, changeType) => {
    if (changeType == "name") {
      setTechs((langs) => {
        if (index == langs.length - 1) {
          langs[index].name = e.target.value;
        }
        //filter options, hide options that has been selected;
        setTechsOptions((optns) => {
          optns = options_technologies.filter((op) => {
            for (var i = 0; i < langs.length; i++) {
              if (langs[i].name == op) return false;
            }
            return true;
          });
          return [...optns];
        });
        return [...langs];
      });
    } else if (changeType == "level") {
      setTechs((langs) => {
        if (index == langs.length - 1) langs[index].level = e.target.value;
        else if (e.target.value != "") langs[index].level = e.target.value;
        return [...langs];
      });
    }
  };
  const handleHostingPlatformChange = (e, platform) => {
    setHostingPlatforms((prev) => {
      prev[platform].checked = e.target.checked;
      return { ...prev };
    });
  };
  const handleInterestChange = (e, pref) => {
    setInterest((prev) => {
      prev[pref] = e.target.value;
      return { ...prev };
    });
  };
  const handleOtherSkillsChange = (e, index) => {
    setOtherSkills((langs) => {
      if (index == langs.length - 1) {
        langs[index] = e.target.value;
      }
      return [...langs];
    });
  };
  const handleTrainingsChange = (e, index, changeType) => {
    if (changeType == "name") {
      setTrainings((langs) => {
        if (index == langs.length - 1) langs[index].name = e.target.value;
        return [...langs];
      });
    } else if (changeType == "credentials") {
      setTrainings((langs) => {
        if (index == langs.length - 1)
          langs[index].credentials = e.target.value;
        return [...langs];
      });
    }
  };
  const handleProjectsChange = (e, index, changeType) => {
    if (changeType == "name") {
      setProjects((langs) => {
        if (index == langs.length - 1) langs[index].name = e.target.value;
        return [...langs];
      });
    } else if (changeType == "credentials") {
      setProjects((langs) => {
        if (index == langs.length - 1)
          langs[index].credentials = e.target.value;
        return [...langs];
      });
    } else if (changeType == "type") {
      setProjects((prev) => {
        if (index == prev.length - 1) prev[index].type = e.target.value;
        return [...prev];
      });
    } else if (changeType == "technologies") {
      setProjects((prev) => {
        if (index == prev.length - 1) prev[index].technologies = e.target.value;
        return [...prev];
      });
    }
  };
  const handleInternshipsChange = (e, index, changeType) => {
    if (changeType == "title") {
      setInternships((langs) => {
        if (index == langs.length - 1) langs[index].title = e.target.value;
        return [...langs];
      });
    } else if (changeType == "credentials") {
      setInternships((langs) => {
        if (index == langs.length - 1)
          langs[index].credentials = e.target.value;
        return [...langs];
      });
    } else if (changeType == "type") {
      setInternships((prev) => {
        if (index == prev.length - 1) prev[index].type = e.target.value;
        return [...prev];
      });
    } else if (changeType == "technologies") {
      setInternships((prev) => {
        if (index == prev.length - 1) prev[index].technologies = e.target.value;
        return [...prev];
      });
    }
  };
  const [loading, setLoading] = useState(false);
  const setDefaultValues = (data) => {
    setProfileImg(data.profilePhoto);
    setResumeUrl(data.resume);
    setName(data.name);
    setEmail(data.email);
    setCallingPhoneNum(data.callingPhoneNumber.slice(2));
    setWhatsAppPhoneNum(data.whatsAppPhoneNumber.slice(2));
    setCallingVerified(data.callingVerified);
    setWhatsAppVerified(data.whatsAppVerified);
    setYear(data.year);
    setBranch(data.branch);
    setRollNumber(data.rollNum);
    setGitHubUserName(data.githubUserName);
    setProgrammingLanguages((prev) => {
      if (data.programmingLanguages.length > 0) {
        return data.programmingLanguages.map((item) => {
          delete item._id;
          return item;
        });
      } else return prev;
    });
    setWebTechnologies((prev) => {
      if (data.webTechnologies.length > 0) {
        return data.webTechnologies.map((item) => {
          delete item._id;
          return item;
        });
      } else return prev;
    });
    setWebFrameworks((prev) => {
      if (data.webFrameworks.length > 0) {
        return data.webFrameworks.map((item) => {
          delete item._id;
          return item;
        });
      } else return prev;
    });
    setDbms((prev) => {
      if (data.dbms.length > 0) {
        return data.dbms.map((item) => {
          delete item._id;
          return item;
        });
      } else return prev;
    });
    setOs((prev) => {
      if (data.operatingSystem.length > 0) {
        return data.operatingSystem.map((item) => {
          delete item._id;
          return item;
        });
      } else return prev;
    });
    setTechs((prev) => {
      if (data.technologies.length > 0) {
        return data.technologies.map((item) => {
          delete item._id;
          return item;
        });
      } else return prev;
    });
    setHostingPlatforms((prev) => {
      data.cloudHostingPlatforms.forEach((pt) => {
        if (prev[pt]) prev[pt].checked = true;
      });
      return { ...prev };
    });
    setOtherSkills(data.otherSkills.length ? data.otherSkills : [""]);
    setInterest((prev) => {
      prev.preference1 = data.interest.preference1;
      prev.preference2 = data.interest.preference2;
      prev.preference3 = data.interest.preference3;
      return { ...prev };
    });
    setInternships((prev) => {
      if (data.internships.length > 0) {
        return data.internships.map((item) => {
          delete item._id;
          return item;
        });
      } else return prev;
    });
    setProjects((prev) => {
      if (data.projects.length > 0) {
        return data.projects.map((item) => {
          delete item._id;
          return item;
        });
      } else return prev;
    });
    setTrainings((prev) => {
      if (data.trainings.length > 0) {
        return data.trainings.map((item) => {
          delete item._id;
          return item;
        });
      } else return prev;
    });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/loadUser")
      .then((res) => {
        setLoading(false);
        setDefaultValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => info.dispatch(clearEverything());
  }, []);
  useEffect(() => {
    window.scrollTo();
    return () => info.dispatch(clearEverything());
  }, []);
  const handleSubmit = (e) => {
    // throw e;
    e.preventDefault();
    console.log("updating the profile!");
    info.dispatch(clearEverything());
    if(!year || !branch || !rollNumber){
      window.scrollTo(0,0);
      return info.dispatch(generateWarning("Please provide your YEAR, BRANCH and ROLL NUMBER!"));
    }
    const data = new FormData();
    data.append("resume", resumeInput.current.files[0]);
    data.append("profilePhoto", profilePhotoInput.current.files[0]);
    const lastProgrammingLang =
      programmingLanguages[programmingLanguages.length - 1];
    const lastWebTech = webTechnologies[webTechnologies.length - 1];
    const lastWebFramework = webFrameworks[webFrameworks.length - 1];
    const lastDbms = dbms[dbms.length - 1];
    const lastOs = os[os.length - 1];
    const lastTech = techs[techs.length - 1];
    const lastOtherSkill = otherSkills[otherSkills.length - 1];
    const lastTraining = trainings[trainings.length - 1];
    const lastProject = projects[projects.length - 1];
    const lastInternship = internships[internships.length - 1];
    const urlRegex =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    let slicedProgrammingLang = programmingLanguages;
    let slicedWebTechs = webTechnologies;
    let slicedWebFrameworks = webFrameworks;
    let slicedDbms = dbms;
    let slicedOs = os;
    let slicedTechs = techs;
    let slicedOtherSkills = otherSkills;
    let slicedTrainings = trainings;
    let slicedProjects = projects;
    let slicedInternships = internships;
    if (!lastProgrammingLang.name || !lastProgrammingLang.level)
      slicedProgrammingLang = programmingLanguages.slice(
        0,
        programmingLanguages.length - 1
      );
    if (!lastWebTech.name || !lastWebTech.level)
      slicedWebTechs = webTechnologies.slice(0, webTechnologies.length - 1);
    if (!lastWebFramework.name || !lastWebFramework.level)
      slicedWebFrameworks = webFrameworks.slice(0, webFrameworks.length - 1);
    if (!lastDbms.name || !lastDbms.level)
      slicedDbms = dbms.slice(0, dbms.length - 1);
    if (!lastOs.name || !lastOs.level) slicedOs = os.slice(0, os.length - 1);
    if (!lastTech.name || !lastTech.level)
      slicedTechs = techs.slice(0, techs.length - 1);
    if (!lastOtherSkill)
      slicedOtherSkills = otherSkills.slice(0, otherSkills.length - 1);
    if (
      !lastTraining.name ||
      !lastTraining.credentials ||
      !urlRegex.test(lastTraining.credentials)
    ) {
      slicedTrainings = trainings.slice(0, trainings.length - 1);
    }
    if (
      !lastProject.type ||
      !lastProject.name ||
      !lastProject.technologies ||
      !lastProject.credentials ||
      !urlRegex.test(lastProject.credentials)
    ) {
      slicedProjects = projects.slice(0, projects.length - 1);
    }
    if (
      !lastInternship.type ||
      !lastInternship.title ||
      !lastInternship.technologies ||
      !lastInternship.credentials ||
      !urlRegex.test(lastInternship.credentials)
    ) {
      slicedInternships = internships.slice(0, internships.length - 1);
    }
    const cloudPlatforms = [];
    for (var key in hostingPlatforms) {
      if (hostingPlatforms[key].checked) {
        cloudPlatforms.push(hostingPlatforms[key].name);
      }
    }
    data.append("callingPhoneNumber", callingPhoneNum);
    data.append("whatsAppPhoneNumber", whatsAppPhoneNum);
    data.append("year", year);
    data.append("branch", branch);
    data.append("rollNum", rollNumber);
    data.append("githubUserName", githubUserName);
    data.append("programmingLanguages", JSON.stringify(slicedProgrammingLang));
    data.append("webTechnologies", JSON.stringify(slicedWebTechs));
    data.append("webFrameworks", JSON.stringify(slicedWebFrameworks));
    data.append("dbms", JSON.stringify(slicedDbms));
    data.append("operatingSystem", JSON.stringify(slicedOs));
    data.append("technologies", JSON.stringify(slicedTechs));
    data.append("cloudHostingPlatforms", JSON.stringify(cloudPlatforms));
    data.append("otherSkills", JSON.stringify(slicedOtherSkills));
    data.append("interest", JSON.stringify(interest));
    data.append("internships", JSON.stringify(slicedInternships));
    data.append("projects", JSON.stringify(slicedProjects));
    data.append("trainings", JSON.stringify(slicedTrainings));
    setLoading(true);
    axios
      .post("/post/updateProfile", data)
      .then((res) => {
        setLoading(false);
        setDefaultValues(res.data);
        info.dispatch(
          generateSuccess("Congrats! You're profile was updated successfully.")
        );
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errorMsg)
          info.dispatch(generateError(err.response.data.errorMsg));
        if (err.response && err.response.data && err.response.data.userData)
          setDefaultValues(err.response.data.userData);
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      {auth.state.userLoggedIn && auth.state.emailVerified ? (
        <React.Fragment>
          <div className="wrapper dashboard-main-wrapper">
            <Sidebar
              bgColor="white"
              activeColor="info"
              profileImg={profileImg}
            />
            <div className="main-panel dashboard-main-panel">
              <DemoNavbar {...props} />
              <div className="content">
                <Row>
                  <Col>
                    <Card className="card-user">
                      <CardHeader>
                        <CardTitle tag="h5">UPDATE PROFILE</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col md="2">
                            {!profileImg && (
                              <AccountCircleIcon style={{ fontSize: "140" }} />
                            )}
                            {profileImg && (
                              <img
                                className="profile-img"
                                src={profileImg}
                                alt=""
                              />
                            )}
                          </Col>
                        </Row>

                        <form onSubmit={(e) => handleSubmit(e)}>
                          <Row>
                            <Col md="2" className="pt-2 pb-0 pr-4 pl-4">
                              <FormGroup
                                style={{
                                  marginBottom: ".5rem",
                                  width: "250px",
                                  marginLeft: "-.75rem",
                                }}
                              >
                                <input
                                  type="file"
                                  className="form-control-file"
                                  id="exampleFormControlFile1"
                                  ref={profilePhotoInput}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Accordion defaultExpanded style={{ width: "100%" }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>
                                Basic Information
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                <Row style={{ width: "100%" }}>
                                  <Col md="6">
                                    <FormGroup>
                                      <label
                                        className="fontType"
                                        htmlFor="fullname"
                                      >
                                        Full Name
                                      </label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={name}
                                        placeholder="Name"
                                        disabled
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md="6">
                                    <FormGroup>
                                      <label
                                        className="fontType"
                                        htmlFor="email"
                                      >
                                        Email address
                                      </label>
                                      <input
                                        className="form-control"
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        disabled
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row style={{ width: "100%" }}>
                                  <Col md="6">
                                    <FormGroup>
                                      <label
                                        className="fontType"
                                        htmlFor="mobile"
                                      >
                                        Calling Phone Number
                                      </label>
                                      {callingPhoneNum &&
                                        callingVerified &&
                                        callingPhoneInput}
                                      {(!callingPhoneNum ||
                                        !callingVerified) && (
                                        <div
                                          className="form-control phone-button"
                                          onClick={() =>
                                            setCallingPhoneModal(true)
                                          }
                                        >
                                          ADD CALLING PHONE NUMBER
                                        </div>
                                      )}

                                      <AddPhoneNumberModal
                                        setModal={setCallingPhoneModal}
                                        modal={callingModal}
                                        setNumber={setCallingPhoneNum}
                                        setNumberVerified={setCallingVerified}
                                        calling
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md="6">
                                    <FormGroup>
                                      <label
                                        className="fontType"
                                        htmlFor="whatsapp"
                                      >
                                        Whatsapp Number
                                      </label>
                                      {whatsAppPhoneNum &&
                                        whatsAppVerified &&
                                        whatsAppPhoneInput}
                                      {(!whatsAppPhoneNum ||
                                        !whatsAppVerified) && (
                                        <div
                                          className="form-control phone-button"
                                          onClick={() =>
                                            setWhatsAppPhoneModal(true)
                                          }
                                        >
                                          ADD WHATSAPP NUMBER
                                        </div>
                                      )}
                                      <AddPhoneNumberModal
                                        setModal={setWhatsAppPhoneModal}
                                        modal={whatsAppPhoneModal}
                                        setNumber={setWhatsAppPhoneNum}
                                        setNumberVerified={setWhatsAppVerified}
                                        whatsApp
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>

                                <Row style={{ width: "100%" }}>
                                  <Col md="12">
                                    <FormGroup>
                                      <label
                                        className="fontType"
                                        htmlFor="github"
                                      >
                                        GitHub Username
                                      </label>
                                      {githubUserInput}
                                    </FormGroup>
                                  </Col>
                                </Row>

                                <Row style={{ width: "100%" }}>
                                  <Col md="4">
                                    <FormGroup>
                                      <label
                                        className="fontType"
                                        htmlFor="year"
                                      >
                                        Year
                                      </label>
                                      <select
                                        className="form-control"
                                        value={year}
                                        onChange={(e) =>
                                          setYear(e.target.value)
                                        }
                                      >
                                        <option value="">Choose Year</option>
                                        <option value="1">1st</option>
                                        <option value="2">2nd</option>
                                        <option value="3">3rd</option>
                                        <option value="4">4th</option>
                                      </select>
                                    </FormGroup>
                                  </Col>
                                  <Col md="4">
                                    <FormGroup>
                                      <label
                                        className="fontType"
                                        htmlFor="branch"
                                      >
                                        Branch
                                      </label>

                                      <select
                                        className="form-control"
                                        value={branch}
                                        onChange={(e) =>
                                          setBranch(e.target.value)
                                        }
                                      >
                                        <option value="">Branch</option>
                                        <option value="Electrical Engineering">
                                          Electrical Engineering
                                        </option>
                                        <option value="Electronics and Communication">
                                          Electronics and Communication
                                        </option>
                                        <option value="Computer Science and Engineering">
                                          Computer Science and Engineering
                                        </option>
                                        <option value="Infomation Technology">
                                          Infomation Technology
                                        </option>
                                        <option value="Civil Engineering">
                                          Civil Engineering
                                        </option>
                                        <option value="Mechanical Engineering">
                                          Mechanical Engineering
                                        </option>
                                        <option value="Chemical Technology">
                                          Chemical Technology
                                        </option>
                                      </select>
                                    </FormGroup>
                                  </Col>
                                  <Col md="4">
                                    <FormGroup>
                                      <label
                                        className="fontType"
                                        htmlFor="rollnumber"
                                      >
                                        Roll Number
                                      </label>
                                      {rollNumberInput}
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Programming Languages
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    {programmingLanguages.map((lang, index) => {
                                      return (
                                        <>
                                          <Row
                                            style={{ width: "100%" }}
                                            key={index}
                                          >
                                            <Col
                                              xs="7"
                                              style={{ paddingRight: "4px" }}
                                            >
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.name}
                                                  onChange={(e) =>
                                                    handleLangChange(
                                                      e,
                                                      index,
                                                      "name"
                                                    )
                                                  }
                                                  disabled={
                                                    index <
                                                    programmingLanguages.length -
                                                      1
                                                  }
                                                >
                                                  {lang.name && (
                                                    <option value={lang.name}>
                                                      {lang.name}
                                                    </option>
                                                  )}
                                                  <option value="">
                                                    Language
                                                  </option>
                                                  {programmingLangOptions.map(
                                                    (op) => (
                                                      <option value={op}>
                                                        {op}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.level}
                                                  onChange={(e) =>
                                                    handleLangChange(
                                                      e,
                                                      index,
                                                      "level"
                                                    )
                                                  }
                                                >
                                                  <option value="">
                                                    Level
                                                  </option>
                                                  <option value="Beginner">
                                                    Beginner
                                                  </option>
                                                  <option value="Intermediate">
                                                    Intermediate
                                                  </option>
                                                  <option value="Expert">
                                                    Expert
                                                  </option>
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            {index <
                                              programmingLanguages.length -
                                                1 && (
                                              <Col xs="1">
                                                <DeleteForeverOutlined
                                                  style={{
                                                    color: "#fd2f00",
                                                    position: "absolute",
                                                    right: 0,
                                                    top: "12%",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    deleteThingWithOptions(
                                                      setProgrammingLanguages,
                                                      setProgrammingLangOptions,
                                                      index
                                                    )
                                                  }
                                                />
                                              </Col>
                                            )}
                                          </Row>
                                        </>
                                      );
                                    })}
                                    <Row>
                                      <div className="update ml-auto mr-auto">
                                        <div
                                          className={
                                            isdisabled("programmingLangs")
                                              ? "btn btn-success disabled"
                                              : "btn btn-success"
                                          }
                                          style={{ margin: "0" }}
                                          onClick={() =>
                                            addMore("programmingLangs")
                                          }
                                        >
                                          Add more
                                        </div>
                                      </div>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Web Technologies
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    {webTechnologies.map((lang, index) => {
                                      return (
                                        <>
                                          <Row
                                            style={{ width: "100%" }}
                                            key={index}
                                          >
                                            <Col
                                              xs="7"
                                              style={{ paddingRight: "4px" }}
                                            >
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.name}
                                                  onChange={(e) =>
                                                    handleWebTechChange(
                                                      e,
                                                      index,
                                                      "name"
                                                    )
                                                  }
                                                  disabled={
                                                    index <
                                                    webTechnologies.length - 1
                                                  }
                                                >
                                                  {lang.name && (
                                                    <option value={lang.name}>
                                                      {lang.name}
                                                    </option>
                                                  )}
                                                  <option value="">
                                                    Web Technologies
                                                  </option>
                                                  {webTechnologiesOptions.map(
                                                    (op) => (
                                                      <option value={op}>
                                                        {op}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.level}
                                                  onChange={(e) =>
                                                    handleWebTechChange(
                                                      e,
                                                      index,
                                                      "level"
                                                    )
                                                  }
                                                >
                                                  <option value="">
                                                    Level
                                                  </option>
                                                  <option value="Beginner">
                                                    Beginner
                                                  </option>
                                                  <option value="Intermediate">
                                                    Intermediate
                                                  </option>
                                                  <option value="Expert">
                                                    Expert
                                                  </option>
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            {index <
                                              webTechnologies.length - 1 && (
                                              <Col xs="1">
                                                <DeleteForeverOutlined
                                                  style={{
                                                    color: "#fd2f00",
                                                    position: "absolute",
                                                    right: 0,
                                                    top: "12%",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    deleteThingWithOptions(
                                                      setWebTechnologies,
                                                      setWebFrameworksOptions,
                                                      index
                                                    )
                                                  }
                                                />
                                              </Col>
                                            )}
                                          </Row>
                                        </>
                                      );
                                    })}
                                    <Row>
                                      <div className="update ml-auto mr-auto">
                                        <div
                                          className={
                                            isdisabled("webTechs")
                                              ? "btn btn-success disabled"
                                              : "btn btn-success"
                                          }
                                          style={{ margin: "0" }}
                                          onClick={() => addMore("webTechs")}
                                        >
                                          Add more
                                        </div>
                                      </div>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Web Frameworks
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    {webFrameworks.map((lang, index) => {
                                      return (
                                        <>
                                          <Row
                                            style={{ width: "100%" }}
                                            key={index}
                                          >
                                            <Col
                                              xs="7"
                                              style={{ paddingRight: "4px" }}
                                            >
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.name}
                                                  onChange={(e) =>
                                                    handleWebFrameworkChange(
                                                      e,
                                                      index,
                                                      "name"
                                                    )
                                                  }
                                                  disabled={
                                                    index <
                                                    webFrameworks.length - 1
                                                  }
                                                >
                                                  {lang.name && (
                                                    <option value={lang.name}>
                                                      {lang.name}
                                                    </option>
                                                  )}
                                                  <option value="">
                                                    Web Frameworks
                                                  </option>
                                                  {webFrameworksOptions.map(
                                                    (op) => (
                                                      <option value={op}>
                                                        {op}
                                                      </option>
                                                    )
                                                  )}
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.level}
                                                  onChange={(e) =>
                                                    handleWebFrameworkChange(
                                                      e,
                                                      index,
                                                      "level"
                                                    )
                                                  }
                                                >
                                                  <option value="">
                                                    Level
                                                  </option>
                                                  <option value="Beginner">
                                                    Beginner
                                                  </option>
                                                  <option value="Intermediate">
                                                    Intermediate
                                                  </option>
                                                  <option value="Expert">
                                                    Expert
                                                  </option>
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            {index <
                                              webFrameworks.length - 1 && (
                                              <Col xs="1">
                                                <DeleteForeverOutlined
                                                  style={{
                                                    color: "#fd2f00",
                                                    position: "absolute",
                                                    right: 0,
                                                    top: "12%",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    deleteThingWithOptions(
                                                      setWebFrameworks,
                                                      setWebFrameworksOptions,
                                                      index
                                                    )
                                                  }
                                                />
                                              </Col>
                                            )}
                                          </Row>
                                        </>
                                      );
                                    })}
                                    <Row>
                                      <div className="update ml-auto mr-auto">
                                        <div
                                          className={
                                            isdisabled("webFrameworks")
                                              ? "btn btn-success disabled"
                                              : "btn btn-success"
                                          }
                                          style={{ margin: "0" }}
                                          onClick={() =>
                                            addMore("webFrameworks")
                                          }
                                        >
                                          Add more
                                        </div>
                                      </div>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Database
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    {dbms.map((lang, index) => {
                                      return (
                                        <>
                                          <Row
                                            style={{ width: "100%" }}
                                            key={index}
                                          >
                                            <Col
                                              xs="7"
                                              style={{ paddingRight: "4px" }}
                                            >
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.name}
                                                  onChange={(e) =>
                                                    handleDbmsChange(
                                                      e,
                                                      index,
                                                      "name"
                                                    )
                                                  }
                                                  disabled={
                                                    index < dbms.length - 1
                                                  }
                                                >
                                                  {lang.name && (
                                                    <option value={lang.name}>
                                                      {lang.name}
                                                    </option>
                                                  )}
                                                  <option value="">
                                                    Database
                                                  </option>
                                                  {dbmsOptions.map((op) => (
                                                    <option value={op}>
                                                      {op}
                                                    </option>
                                                  ))}
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.level}
                                                  onChange={(e) =>
                                                    handleDbmsChange(
                                                      e,
                                                      index,
                                                      "level"
                                                    )
                                                  }
                                                >
                                                  <option value="">
                                                    Level
                                                  </option>
                                                  <option value="Beginner">
                                                    Beginner
                                                  </option>
                                                  <option value="Intermediate">
                                                    Intermediate
                                                  </option>
                                                  <option value="Expert">
                                                    Expert
                                                  </option>
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            {index < dbms.length - 1 && (
                                              <Col xs="1">
                                                <DeleteForeverOutlined
                                                  style={{
                                                    color: "#fd2f00",
                                                    position: "absolute",
                                                    right: 0,
                                                    top: "12%",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    deleteThingWithOptions(
                                                      setDbms,
                                                      setDbmsOptions,
                                                      index
                                                    )
                                                  }
                                                />
                                              </Col>
                                            )}
                                          </Row>
                                        </>
                                      );
                                    })}
                                    <Row>
                                      <div className="update ml-auto mr-auto">
                                        <div
                                          className={
                                            isdisabled("dbms")
                                              ? "btn btn-success disabled"
                                              : "btn btn-success"
                                          }
                                          style={{ margin: "0" }}
                                          onClick={() => addMore("dbms")}
                                        >
                                          Add more
                                        </div>
                                      </div>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Operating System
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    {os.map((lang, index) => {
                                      return (
                                        <>
                                          <Row
                                            style={{ width: "100%" }}
                                            key={index}
                                          >
                                            <Col
                                              xs="7"
                                              style={{ paddingRight: "4px" }}
                                            >
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.name}
                                                  onChange={(e) =>
                                                    handleOsChange(
                                                      e,
                                                      index,
                                                      "name"
                                                    )
                                                  }
                                                  disabled={
                                                    index < os.length - 1
                                                  }
                                                >
                                                  {lang.name && (
                                                    <option value={lang.name}>
                                                      {lang.name}
                                                    </option>
                                                  )}
                                                  <option value="">
                                                    Operating System
                                                  </option>
                                                  {osOptions.map((op) => (
                                                    <option value={op}>
                                                      {op}
                                                    </option>
                                                  ))}
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.level}
                                                  onChange={(e) =>
                                                    handleOsChange(
                                                      e,
                                                      index,
                                                      "level"
                                                    )
                                                  }
                                                >
                                                  <option value="">
                                                    Level
                                                  </option>
                                                  <option value="Beginner">
                                                    Beginner
                                                  </option>
                                                  <option value="Intermediate">
                                                    Intermediate
                                                  </option>
                                                  <option value="Expert">
                                                    Expert
                                                  </option>
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            {index < os.length - 1 && (
                                              <Col xs="1">
                                                <DeleteForeverOutlined
                                                  style={{
                                                    color: "#fd2f00",
                                                    position: "absolute",
                                                    right: 0,
                                                    top: "12%",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    deleteThingWithOptions(
                                                      setOs,
                                                      setOsOptions,
                                                      index
                                                    )
                                                  }
                                                />
                                              </Col>
                                            )}
                                          </Row>
                                        </>
                                      );
                                    })}
                                    <Row>
                                      <div className="update ml-auto mr-auto">
                                        <div
                                          className={
                                            isdisabled("os")
                                              ? "btn btn-success disabled"
                                              : "btn btn-success"
                                          }
                                          style={{ margin: "0" }}
                                          onClick={() => addMore("os")}
                                        >
                                          Add more
                                        </div>
                                      </div>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Technologies
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    {techs.map((lang, index) => {
                                      return (
                                        <>
                                          <Row
                                            style={{ width: "100%" }}
                                            key={index}
                                          >
                                            <Col
                                              xs="7"
                                              style={{ paddingRight: "4px" }}
                                            >
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.name}
                                                  onChange={(e) =>
                                                    handleTechChange(
                                                      e,
                                                      index,
                                                      "name"
                                                    )
                                                  }
                                                  disabled={
                                                    index < techs.length - 1
                                                  }
                                                >
                                                  {lang.name && (
                                                    <option value={lang.name}>
                                                      {lang.name}
                                                    </option>
                                                  )}
                                                  <option value="">
                                                    Technologies
                                                  </option>
                                                  {techsOptions.map((op) => (
                                                    <option value={op}>
                                                      {op}
                                                    </option>
                                                  ))}
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                              <FormGroup>
                                                <select
                                                  className="form-control"
                                                  value={lang.level}
                                                  onChange={(e) =>
                                                    handleTechChange(
                                                      e,
                                                      index,
                                                      "level"
                                                    )
                                                  }
                                                >
                                                  <option value="">
                                                    Level
                                                  </option>
                                                  <option value="Beginner">
                                                    Beginner
                                                  </option>
                                                  <option value="Intermediate">
                                                    Intermediate
                                                  </option>
                                                  <option value="Expert">
                                                    Expert
                                                  </option>
                                                </select>
                                              </FormGroup>
                                            </Col>
                                            {index < techs.length - 1 && (
                                              <Col xs="1">
                                                <DeleteForeverOutlined
                                                  style={{
                                                    color: "#fd2f00",
                                                    position: "absolute",
                                                    right: 0,
                                                    top: "12%",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    deleteThingWithOptions(
                                                      setTechs,
                                                      setTechsOptions,
                                                      index
                                                    )
                                                  }
                                                />
                                              </Col>
                                            )}
                                          </Row>
                                        </>
                                      );
                                    })}
                                    <Row>
                                      <div className="update ml-auto mr-auto">
                                        <div
                                          className={
                                            isdisabled("techs")
                                              ? "btn btn-success disabled"
                                              : "btn btn-success"
                                          }
                                          style={{ margin: "0" }}
                                          onClick={() => addMore("techs")}
                                        >
                                          Add more
                                        </div>
                                      </div>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Hosting Platforms
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    <FormGroup>
                                      <div
                                        className="pl-2"
                                        style={{ float: "left" }}
                                      >
                                        <label
                                          className="fontType form-check-label"
                                          htmlFor="heroku"
                                          htmlFor="flexCheckDefault"
                                        >
                                          Heroku
                                        </label>
                                      </div>
                                      <div
                                        className="pl-5 "
                                        style={{ float: "right" }}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={
                                            hostingPlatforms["heroku"]
                                              .checked || false
                                          }
                                          onChange={(e) =>
                                            handleHostingPlatformChange(
                                              e,
                                              "heroku"
                                            )
                                          }
                                        />
                                      </div>
                                    </FormGroup>

                                    <FormGroup>
                                      <div
                                        className="pl-2  "
                                        style={{ float: "left" }}
                                      >
                                        <label
                                          className="fontType form-check-label"
                                          htmlFor="microsoftazure"
                                        >
                                          Microsoft Azure
                                        </label>
                                      </div>
                                      <div
                                        className="pl-5 "
                                        style={{ float: "right" }}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={
                                            hostingPlatforms["azure"].checked ||
                                            false
                                          }
                                          onChange={(e) =>
                                            handleHostingPlatformChange(
                                              e,
                                              "azure"
                                            )
                                          }
                                        />
                                      </div>
                                    </FormGroup>

                                    <FormGroup>
                                      <div
                                        className="pl-2  "
                                        style={{ float: "left" }}
                                      >
                                        <label
                                          className="fontType form-check-label"
                                          htmlFor="aws"
                                        >
                                          Amazon AWS
                                        </label>
                                      </div>
                                      <div
                                        className="pl-5 "
                                        style={{ float: "right" }}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={
                                            hostingPlatforms["aws"].checked ||
                                            false
                                          }
                                          onChange={(e) =>
                                            handleHostingPlatformChange(
                                              e,
                                              "aws"
                                            )
                                          }
                                        />
                                      </div>
                                    </FormGroup>

                                    <FormGroup>
                                      <div
                                        className="pl-2  "
                                        style={{ float: "left" }}
                                      >
                                        <label
                                          className="fontType form-check-label"
                                          htmlFor="googlecloud"
                                        >
                                          Google Cloud
                                        </label>
                                      </div>
                                      <div
                                        className="pl-5 "
                                        style={{ float: "right" }}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={
                                            hostingPlatforms["gCloud"]
                                              .checked || false
                                          }
                                          onChange={(e) =>
                                            handleHostingPlatformChange(
                                              e,
                                              "gCloud"
                                            )
                                          }
                                        />
                                      </div>
                                    </FormGroup>

                                    <FormGroup>
                                      <div
                                        className="pl-2  "
                                        style={{ float: "left" }}
                                      >
                                        <label
                                          className="fontType form-check-label"
                                          htmlFor="digitalocean"
                                        >
                                          DigitalOcean
                                        </label>
                                      </div>
                                      <div
                                        className="pl-5 "
                                        style={{ float: "right" }}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={
                                            hostingPlatforms["digitalOcean"]
                                              .checked || false
                                          }
                                          onChange={(e) =>
                                            handleHostingPlatformChange(
                                              e,
                                              "digitalOcean"
                                            )
                                          }
                                        />
                                      </div>
                                    </FormGroup>

                                    <FormGroup>
                                      <div
                                        className="pl-2  "
                                        style={{ float: "left" }}
                                      >
                                        <label
                                          className="fontType form-check-label"
                                          htmlFor="pythonanywhere"
                                        >
                                          Python Anywhere
                                        </label>
                                      </div>
                                      <div
                                        className="pl-3 "
                                        style={{ float: "right" }}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={
                                            hostingPlatforms["pythonAnywhere"]
                                              .checked || false
                                          }
                                          onChange={(e) =>
                                            handleHostingPlatformChange(
                                              e,
                                              "pythonAnywhere"
                                            )
                                          }
                                        />
                                      </div>
                                    </FormGroup>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {/* Other Skills */}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Other Skills
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    {otherSkills.map((lang, index) => {
                                      return (
                                        <>
                                          <Row
                                            style={{ width: "100%" }}
                                            key={index}
                                          >
                                            <Col xs="11">
                                              <FormGroup>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  value={lang}
                                                  onChange={(e) =>
                                                    handleOtherSkillsChange(
                                                      e,
                                                      index
                                                    )
                                                  }
                                                  disabled={
                                                    index <
                                                    otherSkills.length - 1
                                                  }
                                                />
                                              </FormGroup>
                                            </Col>
                                            {index < otherSkills.length - 1 && (
                                              <Col xs="1">
                                                <DeleteForeverOutlined
                                                  style={{
                                                    color: "#fd2f00",
                                                    position: "absolute",
                                                    right: 0,
                                                    top: "12%",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    deleteThingWithoutOptions(
                                                      setOtherSkills,
                                                      index
                                                    )
                                                  }
                                                />
                                              </Col>
                                            )}
                                          </Row>
                                        </>
                                      );
                                    })}
                                    <Row>
                                      <div className="update ml-auto mr-auto">
                                        <div
                                          className={
                                            isdisabled("otherSkills")
                                              ? "btn btn-success disabled"
                                              : "btn btn-success"
                                          }
                                          style={{ margin: "0" }}
                                          onClick={() => addMore("otherSkills")}
                                        >
                                          Add more
                                        </div>
                                      </div>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {/* Interest */}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Interest
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    <Row style={{ width: "100%" }}>
                                      <Col md="4">
                                        <FormGroup>
                                          <select
                                            className="form-control"
                                            value={interest.preference1}
                                            onChange={(e) =>
                                              handleInterestChange(
                                                e,
                                                "preference1"
                                              )
                                            }
                                          >
                                            <option value="">
                                              Preference 1
                                            </option>
                                            <option value="Artificial Intelligence">
                                              Artificial Intelligence
                                            </option>
                                            <option value="Robotics">
                                              Robotics
                                            </option>
                                            <option value="Web Development">
                                              Web Development
                                            </option>
                                            <option value="Mobile Application Development">
                                              Mobile Application Development
                                            </option>
                                            <option value="Cloud Computing">
                                              Cloud Computing
                                            </option>
                                            <option value="Cyber Security and Ethical Hacking">
                                              Cyber Security and Ethical Hacking
                                            </option>
                                            <option value="Data Science and Data Analysis">
                                              Data Science and Data Analysis
                                            </option>
                                            <option value="Computer Software">
                                              Computer Software
                                            </option>
                                            <option value="Game development">
                                              Game development
                                            </option>
                                          </select>
                                        </FormGroup>
                                      </Col>
                                      <Col md="4">
                                        <FormGroup>
                                          <select
                                            className="form-control"
                                            value={interest.preference2}
                                            onChange={(e) =>
                                              handleInterestChange(
                                                e,
                                                "preference2"
                                              )
                                            }
                                          >
                                            <option value="">
                                              Preference 2
                                            </option>
                                            <option value="Artificial Intelligence">
                                              Artificial Intelligence
                                            </option>
                                            <option value="Robotics">
                                              Robotics
                                            </option>
                                            <option value="Web Development">
                                              Web Development
                                            </option>
                                            <option value="Mobile Application Development">
                                              Mobile Application Development
                                            </option>
                                            <option value="Cloud Computing">
                                              Cloud Computing
                                            </option>
                                            <option value="Cyber Security and Ethical Hacking">
                                              Cyber Security and Ethical Hacking
                                            </option>
                                            <option value="Data Science and Data Analysis">
                                              Data Science and Data Analysis
                                            </option>
                                            <option value="Computer Software">
                                              Computer Software
                                            </option>
                                            <option value="Game development">
                                              Game development
                                            </option>
                                          </select>
                                        </FormGroup>
                                      </Col>
                                      <Col md="4">
                                        <FormGroup>
                                          <select
                                            className="form-control"
                                            value={interest.preference3}
                                            onChange={(e) =>
                                              handleInterestChange(
                                                e,
                                                "preference3"
                                              )
                                            }
                                          >
                                            <option value="">
                                              Preference 3
                                            </option>
                                            <option value="Artificial Intelligence">
                                              Artificial Intelligence
                                            </option>
                                            <option value="Robotics">
                                              Robotics
                                            </option>
                                            <option value="Web Development">
                                              Web Development
                                            </option>
                                            <option value="Mobile Application Development">
                                              Mobile Application Development
                                            </option>
                                            <option value="Cloud Computing">
                                              Cloud Computing
                                            </option>
                                            <option value="Cyber Security and Ethical Hacking">
                                              Cyber Security and Ethical Hacking
                                            </option>
                                            <option value="Data Science and Data Analysis">
                                              Data Science and Data Analysis
                                            </option>
                                            <option value="Computer Software">
                                              Computer Software
                                            </option>
                                            <option value="Game development">
                                              Game development
                                            </option>
                                          </select>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {/* Internship or Project */}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Internships
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    {internships.map((lang, index) => {
                                      return (
                                        <Row
                                          key={index}
                                          style={{ width: "100%" }}
                                        >
                                          <Col xs="11">
                                            <Row
                                              style={{
                                                width: "100%",
                                                marginRight: 0,
                                              }}
                                              key={"title" + index}
                                            >
                                              <Col
                                                xs="8"
                                                style={{ paddingRight: "4px" }}
                                              >
                                                <FormGroup
                                                  style={{
                                                    marginBottom: ".2rem",
                                                  }}
                                                >
                                                  <input
                                                    type="text"
                                                    placeholder="Internship title"
                                                    className="form-control"
                                                    value={lang.name}
                                                    onChange={(e) =>
                                                      handleInternshipsChange(
                                                        e,
                                                        index,
                                                        "title"
                                                      )
                                                    }
                                                    disabled={
                                                      index <
                                                      internships.length - 1
                                                    }
                                                  />
                                                </FormGroup>
                                              </Col>
                                              <Col
                                                xs="4"
                                                style={{ paddingRight: 0 }}
                                              >
                                                <FormGroup
                                                  style={{
                                                    marginBottom: ".2rem",
                                                  }}
                                                >
                                                  <input
                                                    type="text"
                                                    placeholder="Type(Eg: Web Development/Machine Learning/ Mobile App Development)"
                                                    className="form-control"
                                                    value={lang.type}
                                                    onChange={(e) =>
                                                      handleInternshipsChange(
                                                        e,
                                                        index,
                                                        "type"
                                                      )
                                                    }
                                                    disabled={
                                                      index <
                                                      internships.length - 1
                                                    }
                                                  />
                                                </FormGroup>
                                              </Col>
                                            </Row>
                                            <Row
                                              style={{
                                                width: "100%",
                                                marginRight: 0,
                                              }}
                                              key={"type" + index}
                                            >
                                              <Col
                                                xs="8"
                                                style={{ paddingRight: "4px" }}
                                              >
                                                <FormGroup>
                                                  <input
                                                    type="text"
                                                    placeholder="Technologies(Eg: REACT, NODEJS, MONGODB, EXPRESS)"
                                                    className="form-control"
                                                    value={lang.technologies}
                                                    onChange={(e) =>
                                                      handleInternshipsChange(
                                                        e,
                                                        index,
                                                        "technologies"
                                                      )
                                                    }
                                                    disabled={
                                                      index <
                                                      internships.length - 1
                                                    }
                                                  />
                                                </FormGroup>
                                              </Col>
                                              <Col
                                                xs="4"
                                                style={{ paddingRight: 0 }}
                                              >
                                                <FormGroup>
                                                  <input
                                                    type="text"
                                                    placeholder="Credentials(https://somewhere.com/....)"
                                                    className="form-control"
                                                    value={lang.credentials}
                                                    onChange={(e) =>
                                                      handleInternshipsChange(
                                                        e,
                                                        index,
                                                        "credentials"
                                                      )
                                                    }
                                                    disabled={
                                                      index <
                                                      internships.length - 1
                                                    }
                                                  />
                                                </FormGroup>
                                              </Col>
                                            </Row>
                                          </Col>
                                          {index < internships.length - 1 && (
                                            <Col xs="1">
                                              <DeleteForeverOutlined
                                                style={{
                                                  color: "#fd2f00",
                                                  position: "absolute",
                                                  right: 0,
                                                  top: "20%",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                  deleteThingWithoutOptions(
                                                    setInternships,
                                                    index
                                                  )
                                                }
                                              />
                                            </Col>
                                          )}
                                        </Row>
                                      );
                                    })}
                                    <Row>
                                      <div className="update ml-auto mr-auto">
                                        <div
                                          className={
                                            isdisabled("internships")
                                              ? "btn btn-success disabled"
                                              : "btn btn-success"
                                          }
                                          style={{ margin: "0" }}
                                          onClick={() => addMore("internships")}
                                        >
                                          Add more
                                        </div>
                                      </div>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Project
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    {projects.map((lang, index) => {
                                      return (
                                        <Row
                                          key={index}
                                          style={{ width: "100%" }}
                                        >
                                          <Col xs="11">
                                            <Row
                                              style={{
                                                width: "100%",
                                                marginRight: 0,
                                              }}
                                              key={"name" + index}
                                            >
                                              <Col
                                                xs="8"
                                                style={{ paddingRight: "4px" }}
                                              >
                                                <FormGroup
                                                  style={{
                                                    marginBottom: ".2rem",
                                                  }}
                                                >
                                                  <input
                                                    type="text"
                                                    placeholder="Project title"
                                                    className="form-control"
                                                    value={lang.name}
                                                    onChange={(e) =>
                                                      handleProjectsChange(
                                                        e,
                                                        index,
                                                        "name"
                                                      )
                                                    }
                                                    disabled={
                                                      index <
                                                      projects.length - 1
                                                    }
                                                  />
                                                </FormGroup>
                                              </Col>
                                              <Col
                                                xs="4"
                                                style={{ paddingRight: 0 }}
                                              >
                                                <FormGroup
                                                  style={{
                                                    marginBottom: ".2rem",
                                                  }}
                                                >
                                                  <input
                                                    type="text"
                                                    placeholder="Type(Eg: Web Development/Machine Learning/ Mobile App Development)"
                                                    className="form-control"
                                                    value={lang.type}
                                                    onChange={(e) =>
                                                      handleProjectsChange(
                                                        e,
                                                        index,
                                                        "type"
                                                      )
                                                    }
                                                    disabled={
                                                      index <
                                                      projects.length - 1
                                                    }
                                                  />
                                                </FormGroup>
                                              </Col>
                                            </Row>
                                            <Row
                                              style={{
                                                width: "100%",
                                                marginRight: 0,
                                              }}
                                              key={"type" + index}
                                            >
                                              <Col
                                                xs="8"
                                                style={{ paddingRight: "4px" }}
                                              >
                                                <FormGroup>
                                                  <input
                                                    type="text"
                                                    placeholder="Technologies(Eg: REACT, NODEJS, MONGODB, EXPRESS)"
                                                    className="form-control"
                                                    value={lang.technologies}
                                                    onChange={(e) =>
                                                      handleProjectsChange(
                                                        e,
                                                        index,
                                                        "technologies"
                                                      )
                                                    }
                                                    disabled={
                                                      index <
                                                      projects.length - 1
                                                    }
                                                  />
                                                </FormGroup>
                                              </Col>
                                              <Col
                                                xs="4"
                                                style={{ paddingRight: 0 }}
                                              >
                                                <FormGroup>
                                                  <input
                                                    type="text"
                                                    placeholder="Credentials(https://somewhere.com/....)"
                                                    className="form-control"
                                                    value={lang.credentials}
                                                    onChange={(e) =>
                                                      handleProjectsChange(
                                                        e,
                                                        index,
                                                        "credentials"
                                                      )
                                                    }
                                                    disabled={
                                                      index <
                                                      projects.length - 1
                                                    }
                                                  />
                                                </FormGroup>
                                              </Col>
                                            </Row>
                                          </Col>
                                          {index < projects.length - 1 && (
                                            <Col xs="1">
                                              <DeleteForeverOutlined
                                                style={{
                                                  color: "#fd2f00",
                                                  position: "absolute",
                                                  right: 0,
                                                  top: "20%",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                  deleteThingWithoutOptions(
                                                    setProjects,
                                                    index
                                                  )
                                                }
                                              />
                                            </Col>
                                          )}
                                        </Row>
                                      );
                                    })}
                                    <Row>
                                      <div className="update ml-auto mr-auto">
                                        <div
                                          className={
                                            isdisabled("projects")
                                              ? "btn btn-success disabled"
                                              : "btn btn-success"
                                          }
                                          style={{ margin: "0" }}
                                          onClick={() => addMore("projects")}
                                        >
                                          Add more
                                        </div>
                                      </div>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {/* Trainings */}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Trainings
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography
                                    style={{ width: "100%", maxWidth: "675px" }}
                                  >
                                    {trainings.map((lang, index) => {
                                      return (
                                        <>
                                          <Row
                                            style={{ width: "100%" }}
                                            key={index}
                                          >
                                            <Col
                                              xs="7"
                                              style={{ paddingRight: "4px" }}
                                            >
                                              <FormGroup>
                                                <input
                                                  type="text"
                                                  placeholder="Title(Eg: Python for Everybody from Coursera)"
                                                  className="form-control"
                                                  value={lang.name}
                                                  onChange={(e) =>
                                                    handleTrainingsChange(
                                                      e,
                                                      index,
                                                      "name"
                                                    )
                                                  }
                                                  disabled={
                                                    index < trainings.length - 1
                                                  }
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                              <FormGroup>
                                                <input
                                                  type="text"
                                                  placeholder="Credentials(https://somewhere.com/....)"
                                                  className="form-control"
                                                  value={lang.credentials}
                                                  onChange={(e) =>
                                                    handleTrainingsChange(
                                                      e,
                                                      index,
                                                      "credentials"
                                                    )
                                                  }
                                                  disabled={
                                                    index < trainings.length - 1
                                                  }
                                                />
                                              </FormGroup>
                                            </Col>
                                            {index < trainings.length - 1 && (
                                              <Col xs="1">
                                                <DeleteForeverOutlined
                                                  style={{
                                                    color: "#fd2f00",
                                                    position: "absolute",
                                                    right: 0,
                                                    top: "12%",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    deleteThingWithoutOptions(
                                                      setTrainings,
                                                      index
                                                    )
                                                  }
                                                />
                                              </Col>
                                            )}
                                          </Row>
                                        </>
                                      );
                                    })}
                                    <Row>
                                      <div className="update ml-auto mr-auto">
                                        <div
                                          className={
                                            isdisabled("trainings")
                                              ? "btn btn-success disabled"
                                              : "btn btn-success"
                                          }
                                          style={{ margin: "0" }}
                                          onClick={() => addMore("trainings")}
                                        >
                                          Add more
                                        </div>
                                      </div>
                                    </Row>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          {/* Resume */}
                          {callingPhoneNum &&
                            callingVerified &&
                            whatsAppPhoneNum &&
                            whatsAppVerified && (
                              <Accordion style={{ width: "100%" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Typography className={classes.heading}>
                                    Resume
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    <FormGroup>
                                      <label
                                        className="fontType"
                                        htmlFor="resumefile"
                                      >
                                        Upload Your Current Resume
                                      </label>
                                      <input
                                        type="file"
                                        className="form-control"
                                        ref={resumeInput}
                                      />
                                      {resumeUrl && (
                                        <span>
                                          <a href={resumeUrl} target="_blank">
                                            Resume.pdf
                                          </a>
                                        </span>
                                      )}
                                    </FormGroup>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            )}
                          <Row>
                            <div className="update ml-auto mr-auto">
                              <Button
                                className="submitBorder"
                                color="warning"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                              >
                                Update Profile
                              </Button>
                            </div>
                          </Row>
                        </form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
              <Footer fluid />
              {loading && <Loader />}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: "/dashboard" } }} />
      )}
    </React.Fragment>
  );
};
export default Dashboard;
