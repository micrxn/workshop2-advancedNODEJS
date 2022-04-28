const path = require("path");
const DataService = require("../service/data.service");
const {v4: uuid} = require("uuid");

const dishPath = path.join(__dirname, "..", "data", "dishes.json");

class DishModel {
    //get all dishes
    static async getAllDishes() {
        return DataService.readJSONFile(dishPath);
    }

    //get dishes by id
    static async getDishById(dishId){
        const dishes = await this.getAllDishes();
        const findDish = dishes.find(dish => dish.id === dishId)

        if(findDish){
            return findDish
        } else {
            return Promise.reject({msg: "no dish with that id"})
        }
    }
    //add new dish
    static async addNewDish(newDishData){
        const dishes = await this.getAllDishes();
        const dishExists = dishes.some(dish => dish.name === newDishData.name)

        if(dishExists){
            return Promise.reject({msg: "dish with that name already exists"})
        }
        if(newDishData.price > 1000 || newDishData.price < 1) {
            return Promise.reject({msg: "dish price must be more than 1 or less than 1000!"})
        }
        const newDish = {
            id: uuid(),
            ...newDishData
        }

        const updatedDishes = [...dishes, newDish];

        await DataService.saveJSONFile(dishPath, updatedDishes);

        return newDish
    }
    //update dish
    static async patchDish(dishId, newDishData){
        const dishes = await this.getAllDishes();

        const findDish = await this.getDishById(dishId);
        const updatedDish = {...findDish, ...newDishData};

        const updatedDishes = dishes.map(dish => dish.id === findDish.id ? updatedDish : dish);

        await DataService.saveJSONFile(dishPath, updatedDishes);
    }
    //delete dish
    static async deleteDish(dishId){
        const dishes = await this.getAllDishes();

        const updatedDishes = dishes.filter(
            dish => dish.id !== dishId
        );

        if(updatedDishes.length === dishes.length){
            return Promise.reject({msg: "dish not found"})
        }

        await DataService.saveJSONFile(dishPath, updatedDishes)
    }
}

module.exports = DishModel;