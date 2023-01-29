const express = require("express");
const { getUserPets, addPet, removePet } = require("../../controllers/pets");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

// ссилка на котроллен getPet

router.get("/", authenticate, getUserPets);

router.post("/", authenticate, addPet);

router.delete("/:petId", authenticate, removePet);

module.exports = router;
