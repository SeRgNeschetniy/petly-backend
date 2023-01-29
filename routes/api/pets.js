const express = require("express");
const { getUserPets, addPet, removePet } = require("../../controllers/pets");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

// ссилка на котроллен getPet

router.get("/", authenticate, ctrlWrapper(getUserPets));

router.post("/", authenticate, ctrlWrapper(addPet));

router.delete("/:petId", authenticate, ctrlWrapper(removePet));

module.exports = router;
