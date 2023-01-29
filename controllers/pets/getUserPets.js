const { Pets } = require("../../models/pets");

const getUsersPet = async (req, res, t) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;

  const AllUsersPets = await Pets.find(
    { owner },
    "-createdAt, -updatedAt, -__v",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");
  res.status(200).json(AllUsersPets);
};

module.exports = getUsersPet;
