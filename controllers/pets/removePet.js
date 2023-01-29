const { Pets } = require("../../models/pets");

const removePet = async (req, res) => {
  const { petId } = req.params;

  const { name, breed } = await Pets.findById(petId);
  const removedPet = await Pets.findByIdAndDelete(petId);
  if (!removedPet) {
    return res
      .status(404)
      .json({ message: "This pet doesn`t exist, nothing to remove" });
  }
  res.status(200).json({
    message: `Pet ${(name, breed)} successfully deleted`,
  });
};

module.exports = removePet;
