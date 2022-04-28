const router = require("express").Router();
const dishRouter = require("../routes/dish.routes");
const orderRouter = require("../routes/orders.routes");
const authRouter = require("../routes/auth.routes");

router.use("/dish", dishRouter);
router.use("/order", orderRouter)
router.use("/auth", authRouter)
module.exports = router;