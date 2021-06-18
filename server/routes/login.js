const { genToken } = require("../token");

const login = (req, res) => {
  const { username, password } = req.body;

  // User kontrollieren ob in db existent und mit Password richtig

  const accessToken = genToken({ username });

  res.json({ accessToken, success: true });
};

module.exports = login;
