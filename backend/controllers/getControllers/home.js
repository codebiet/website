const User = require('../../models/userModal');
const home = async (req,res) => {
    const id = req.session.userId;
    const user = await User.findById(id).exec();
    res.status(200).send(`<h1>Hello, ${user.name}. You're viewing CODE HOMEPAGE</h1>`)
}
module.exports = home;