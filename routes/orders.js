const express = require("express");

const {
    getOrders,
    getOrder,
   
    createOrders,
    updateOrder,
    deleteOrder,
} = require("../controllers/orders");
const orderRouter = express.Router();

orderRouter.get("/", getOrders);

orderRouter.get("/:id", getOrder);



orderRouter.post("/", createOrders);

orderRouter.put("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);
module.exports = {
  orderRouter,
};
