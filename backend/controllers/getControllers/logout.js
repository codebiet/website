module.exports = (req, res) => {
  req.session.destroy(function (err) {
    if (!err) {
        console.log("destroying");
      res.cookie("token", '' , {
        expires: new Date(0),
        httpOnly: false,
      });
      res.cookie("userName", '' , {
        expires: new Date(0),
        httpOnly: false,
      });
      res.cookie("userId", '' , {
        expires: new Date(0),
        httpOnly: false,
      });
      res.cookie("emailVerified", '' , {
        expires: new Date(0),
        httpOnly: false,
      });
      res.cookie("phoneNumberVerified", '' , {
        expires: new Date(0),
        httpOnly: false,
      });
      res.cookie("userLoggedIn", false, {
        expires: new Date(0),
        httpOnly: false,
      });
      res.set("Cache-Control","no-store");
      res.status(200).send({ msg: "Logout success" });
    }
  });
};
