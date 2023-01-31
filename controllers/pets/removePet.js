const { Pets } = require("../../models/pet");

const removePet = async (req, res) => {
  const { petId } = req.params;

  const pet = await Pets.findById(petId);
  if (!pet) {
    return res
      .status(404)
      .json({ message: "The pet you want to remove, is already removed." });
  } else {
    const removedPet = await Pets.findByIdAndDelete(petId);
    if (!removedPet) {
      return res
        .status(404)
        .json({ message: "This pet doesn`t exist, nothing to remove." });
    }
    res.status(200).json({
      message: `Pet ${pet.name} ${pet.breed} successfully deleted`,
    });
  }
};

module.exports = removePet;
