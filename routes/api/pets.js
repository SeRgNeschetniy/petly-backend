const express = require("express");
const { getUserPets, addPet, removePet } = require("../../controllers/pets");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/uploadFile");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(getUserPets));
router.post("/", authenticate, upload.single("photoPet"), ctrlWrapper(addPet));
router.delete("/:petId", authenticate, ctrlWrapper(removePet));

module.exports = router;
