const DishModel = require("../model/dish.model");
const OrdersModel = require("../model/orders.model")

class OrdersController {
    //get all orders
    static async getAllOrders(req, res){
        try {
            const orders = await OrdersModel.getAllOrders()
            res.status(200).send(orders)
        } catch (error) {
            res.status(400).send(error)
        }
        
    };
    //get by id
    static async getOrderById(req, res){
        try {
            const {id: orderId} = req.params;
            const order = await OrdersModel.getOrderById(orderId);
            res.status(200).send(order)
        } catch (error) {
            res.status(400).send(error)
        }
        
    }
    //add new order
    static async addNewOrder(req, res){
        try {
            const newOrder = req.body
            const createOrder = await OrdersModel.addNewOrder(newOrder)
            res.status(201).send(createOrder);
        } catch (error) {
            res.status(400).send(error)
        }
    }
    //update order
    static async updateOrder(req, res){
        try {
            const {id: orderId} = req.params;
            const orderUpdate = req.body;
            if(orderUpdate.id) res.status(400).send({msg: "Invalid update"});
            await OrdersModel.updateOrder(orderId, orderUpdate);

            res.status(200)
        } catch (error) {
            res.status(400).send(error)

        }
    }
    //update status
    static async updateStatus(req, res) {
        try {
            const {id: orderId} = req.params;
            const statusUpdate = req.body;
            
            await OrdersModel.updateStatus(orderId, statusUpdate);
            res.status(200)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}
module.exports = OrdersController;