const { Pets } = require("../../models/pets");
// const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = removeContact;
