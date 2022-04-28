const DishModel = require("../model/dish.model");

class DishController {
    //get all dishes
    static async getAllDishes(req, res ){
        try {
            const dishes = await DishModel.getAllDishes()
            res.status(200).send(dishes)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    //get dish by id
    static async getDishById(req, res){
        try {
            const {id: dishId} = req.params;

            const dish = await DishModel.getDishById(dishId);
            res.status(200).send(dish)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    //add new dish
    static async addNewDish(req, res) {
        try {
            const newDish = req.body;
            const createDish = await DishModel.addNewDish(newDish);

            res.status(201).send(createDish)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    //update dish
    static async updateDish(req, res) {
        try {
            const dishId = req.params.id;
            const dishUpdate = req.body;

            if(dishUpdate.id) res.status(400).send({msg: "invalid update"})

            await DishModel.patchDish(dishId, dishUpdate);

            res.sendStatus(200)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    //delete dish
    static async deleteDish(req, res){
        try {
            const dishId = req.params.id
            await DishModel.deleteDish(dishId)
            res.sendStatus(200)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    
}
module.exports = DishController