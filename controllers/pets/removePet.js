const { Pets } = require("../../models/pets");
// const { RequestError } = require("../../helpers");

const removePet = async (req, res) => {
  const { petId, nam } = req.params;
  const removedPet = await Pets.findOneAndRemove(petId);
  if (!removedPet) {
    // ! throw RequestError(404, "not found");
    return res
      .status(404)
      .json({ message: "This pet doesn`t exist, nothing to remove" });
  }
  // ! res.json({message: "Book removed"});
  res.status(200).json({
    message: `Pet ${nam} successfully deleted`,
  });
};

module.exports = removePet;
