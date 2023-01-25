const express = require("express");
const {
  getUsers,
  getUser,
  getUserOrders,
  createUser,
  updateUser,
  updateInActiveUser,
  deleteUser,
} = require("../controllers/users");

const {body, validationResult} = require("express-validator");
const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.get("/:id/orders", getUserOrders);

userRouter.post("/",  body('firstName').isEmail(), createUser);

userRouter.put("/:id", updateUser);

userRouter.put("/:id/checkinactive", updateInActiveUser);

userRouter.delete("/:id", deleteUser);
module.exports = {
  userRouter,
};
