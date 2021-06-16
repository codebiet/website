const Events = require("../../models/events");
const register = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).send({ errorMsg: "Please fill in all the fields!" });
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email))
    return res.status(400).send({ errorMsg: "Invalid Email!" });
  try {
    // const evnts = await Events.findById(id).select("+registered");
    let event = await Events.findOne({ _id: id, "registered.email": email });
    if (event)
      return res
        .status(400)
        .send({ errorMsg: "This user is already registered!" });
    event = await Events.findById(id).select("+registered").exec();
    event.registered.push({ name, email });
    await event.save();
    //this cookie will be used to check whether user is registered for particular event or not, since we are giving registration without login
    res.cookie(id, true, {
      expires: new Date(event.startsOn),
      httpOnly: false,
    });
    return res.send({ msg: "Registered successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
module.exports = register;
