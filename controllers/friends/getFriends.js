// const { default: mongoose } = require("mongoose");

// const getFriends = async (req, res) => {
//   const result = await mongoose.connection.db
//     .collection("sponsors")
//     .find()
//     .toArray();

//   res.json(result);
// };

const fs = require("fs/promises");
const path = require("path");

const friendsPath = path.join(__dirname, "sponsors.json");
//const friendsPath = path.resolve("./sponsors.json");

const getFriends = async (req, res) => {
  const data = await fs.readFile(friendsPath);
  const friends = JSON.parse(data);
  res.status(200).json(friends);
};

module.exports = getFriends;
