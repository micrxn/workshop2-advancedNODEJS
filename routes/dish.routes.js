const router = require("express").Router();
const DishController = require("../controller/dish.controller");


router.get("/all", DishController.getAllDishes);
router.get("/:id", DishController.getDishById);
router.post("/add", DishController.addNewDish);
router.patch("/:id/update", DishController.updateDish);
router.delete("/:id", DishController.deleteDish);
module.exports = router;