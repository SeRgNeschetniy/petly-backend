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

const getFriends = async () => {
  try {
    const data = await fs.readFile(friendsPath);
    const friends = JSON.parse(data);
    return friends;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getFriends;
