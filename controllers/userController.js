const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const getUsers = (req, res) => {
  if (req.query.gender) {
    User.find({ gender: req.query.gender }, { password: 0, __v: 0 })
      .then((resp) => {
        res.json({ type: "SUCCESS", status_code: 200, data: resp });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    User.find({}, { password: 0, __v: 0 })
      .then((resp) => {
        res.json({ type: "SUCCESS", status_code: 200, data: resp });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const my_user = await User.findById(id);
    res.send({ type: "SUCCESS", status_code: 200, data: my_user });
  } catch (err) {
    res.send({ type: "ERROR", message: "Could Not Get User", error: err.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const find_user = await User.findOne({ email: req.body.email });
    if (find_user) {
      res.send({ type: "ERROR", status_code: 401, message: "Email Already Exists" });
      return;
    }
    const encrypt_password = await bcryptjs.hash(req.body.password, 12);
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      dob: req.body.dob,
      password: encrypt_password,
    };
    const create_user = new User(user);
    const resp = await create_user.save();
    resp.password = undefined;
    res.send({ type: "SUCCESS", msg: "Registration Successful", status_code: 201, data: { id: resp._id, first_name: resp.first_name } });
  } catch (err) {
    res.send({ type: "ERROR", message: "Could Not Create User", error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
      password: req.body.password,
    };
    const update_user = await User.findByIdAndUpdate(id, user, { new: true });
    res.send({ type: "SUCCESS", status_code: 200, msg: "Update Successful", data: update_user });
  } catch (err) {
    res.send({ type: "ERROR", message: "Could Not Update User", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.send({ type: "SUCCESS", status_code: 200, message: "User deleted Successfully" });
  } catch (err) {
    res.send({ type: "ERROR", message: "Could Not Delete User", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user_email = req.body.email;
    const user_password = req.body.password;
    if (user_email && user_password) {
      const find_user = await User.findOne({ email: user_email });
      if (!find_user) {
        res.send({ type: "ERROR", message: "User not Found" });
        return;
      }
      const find_password = await bcryptjs.compare(user_password, find_user.password);
      if (!find_password) {
        res.send({ type: "ERROR", message: "Invalid Password" });
        return;
      }
      res.send({type: "SUCCESS",message: "User Login Successful",data: { id: find_user._id, email: find_user.email }});
    } else {
      res.send({ message: "Email and Password Required" });
    }
  } catch (err) {
    res.send({ type: "ERROR", message: "Could not Login User", error: err.message });
  }
};

module.exports = { getUsers, registerUser, updateUser, deleteUser, getSingleUser, loginUser };
