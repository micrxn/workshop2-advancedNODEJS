const router = require("express").Router();

const OrderController = require("../controller/order.controller")

router.get("/all", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrderById);
router.post("/add", OrderController.addNewOrder);
router.patch("/:id/update", OrderController.updateOrder);
router.patch("/:id/status", OrderController.updateStatus)

module.exports = router