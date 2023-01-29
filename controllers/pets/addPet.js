const { Pets } = require("../../models/pets");

// тут не req.body а прийом з форми

const addPet = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const addNewPet = await Pets.create({ ...req.body, owner });
    res.status(201).json(addNewPet);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = addPet;
