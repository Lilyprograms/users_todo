const express = require("express");
const { getUsers, registerUser, updateUser, deleteUser, getSingleUser, loginUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.post("/register", registerUser);
router.put("/update/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

module.exports = router;
