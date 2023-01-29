const express = require("express");
const getUsersPet = require("../../controllers/pets/getUsersPets");
const addPet = require("../../controllers/pets/addPet");
const removePet = require("../../controllers/pets/removePet");

const router = express.Router();

// ссилка на котроллен getPet

router.get("/", getUsersPet);

router.post("/", addPet);

router.delete("/:petId", removePet);

module.exports = router;
