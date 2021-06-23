const { genToken, encrypt } = require("../auth");

const register = (mongo) => {
  return function (req, res) {
    const { username, password, email = "" } = req.body;

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
      if (usersWithUsername.length > 0) {
        res.json({
          success: false,
          message: "Username alredy exists",
          code: "userExists",
        });
        return;
      }

      // Add User to DB
      users
        .insertOne({
          username: username,
          password: encrypt(password),
          email: email,
          joinedAt: Date.now(),
        })
        .then((createdUser) => {
          const accessToken = genToken({ username });

          // Send final response if everything went well
          res.json({
            accessToken,
            success: true,
            username,
            userId: createdUser.insertedId,
          });
        })
        .catch((err) => {
          console.err(err);
          res.json({
            success: false,
            message: err.message,
            code: "somethingWentWrong",
          });
        });
    });
  };
};

module.exports = register;
