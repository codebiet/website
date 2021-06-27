const feedbackModal = require("../../models/feedback");

const feedback = async (req, res) => {
  const { rating, message } = req.body;
  console.log(rating);
  if (!message)
    return res.status(400).send({ errorMsg: "Reason both are required!" });
  if (message.length < 30)
    return res.status(400).send({
      errorMsg: "Reason too short! Please write in atleast 30 characters",
    });
  try {
    const newfeedback = new feedbackModal({ rating, message });
    await newfeedback.save();
    res.status(200).send({ msg: "success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ errorMsg: "Status-Code:500, Internal Server Error!" });
  }
};

module.exports = feedback;
