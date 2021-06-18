const { verifyToken } = require("../token");

module.exports = (req, res) => {
  console.log(req.username);

  res.json({
    posts: [{ title: "Tinder für Hunde" }, { title: "Knut wird Großvater" }],
  });
};
