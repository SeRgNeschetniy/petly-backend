const { Pets } = require("../../models/pet");

const removePet = async (req, res) => {
  const { petId } = req.params;
  const { _id: owner } = req.user;

  const removedPet = await Pets.findByOneAndDelete({ _id: petId, owner });
  if (!removedPet) {
    return res
      .status(404)
      .json({ message: "This pet doesn`t exist, nothing to remove." });
  }

  res.status(200).json({
    message: `Pet ${removedPet.name} ${removedPet.breed} successfully deleted`,
  });
};

module.exports = removePet;
