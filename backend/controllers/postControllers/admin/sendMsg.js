const Events = require("../../../models/events");
const emailSender = require("../../../utils/emailSender");
const sendMsg = async (req, res) => {
  const id = req.params.id;
  const { html, subject } = req.body;
  try {
    const events = await Events.findById(id).select("+registered");
    const registrations = events.registered;
    registrations.forEach((user) => {
      emailSender(user.email, html, subject);
    });
    return res.status(202).send({ msg: "Email will be sent to the registered candidates shortly!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
module.exports = sendMsg;
