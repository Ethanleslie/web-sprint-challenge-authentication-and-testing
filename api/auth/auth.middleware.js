const User = require("../../users/users-model");

async function checkIfUsernameFree(req, res, next) {
  try {
    const [user] = await User.find({ username: req.body.username });
    const { username, password } = req.body;
   // console.log('user username:', user.username)
      if (!username || !password) {
        next({ status: 404, message: "username and password required" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkUsernameExists(req, res, next) {
    console.log(req.body)
  try {
    if(!req.body.username || !req.body.password){
        next({ status: 401, message: "username and password required" });
    }
    const [user] = await User.findBy({ username: req.body.username })
    if (!user) {
      console.log("else");
      next({ message: "invalid credentials", status: 401 });
    } else if (req.body.username === user.username) {
      next();
      req.user = user;
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkIfUsernameFree,
  checkUsernameExists,
};
