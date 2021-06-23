const { genToken, decrypt } = require("../auth");

const login = (mongo) => {
  return function (req, res) {
    const { username, password } = req.body;

    const db = mongo.db("greenfox");
    const users = db.collection("users");

    // Get all users with the givben username
    users.find({ username: username }).toArray((err, usersWithUsername) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      // Checks if a user with the username aldready exists
      if (usersWithUsername.length === 0) {
        res.json({
          success: false,
          message: "User does not exist or password is wrong",
          code: "wrongCredentials",
        });
        return;
      }

      const user = usersWithUsername[0];

      const passwordIsCorrect = password === decrypt(user.password);

      if (passwordIsCorrect) {
        const accessToken = genToken({ username });
        res.json({ accessToken, success: true });
      } else {
        res.json({
          success: false,
          message: "User does not exist or password is wrong",
          code: "wrongCredentials",
        });
      }
    });
  };
};

module.exports = login;
