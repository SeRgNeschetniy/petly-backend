const fs = require("fs/promises");
const path = require("path");

const friendsPath = path.join(__dirname, "sponsors.json");

const getFriends = async (req, res) => {
  const data = await fs.readFile(friendsPath);
  const friends = JSON.parse(data);
  res.status(200).json(friends);
};

module.exports = getFriends;
