const path = require("path");
const DataService = require("../service/data.service");
const {v4: uuid} = require("uuid");
const res = require("express/lib/response");

const ordersPath = path.join(__dirname, "..", "data", "orders.json")

class OrdersModel {
    //get all orders
    static async getAllOrders(){
        const orders = await DataService.readJSONFile(ordersPath)
    }
    //get order by id
    static async getOrderById(orderId) {
        const orders = await this.getAllOrders();

        const findOrder = orders.find(order => order.id === orderId)

        if(findOrder){
            return findOrder
        } else {
            return Promise.reject({msg: "theres no order with that id"})
        }
    }
    //add new order
    static async addNewOrder(newOrderData){
        const orders = await this.getAllOrders();

        const newOrder = {
            id: uuid(),
            ...newOrderData
        };

        const updatedOrders = [orders, ...newOrder]

        await DataService.saveJSONFile(ordersPath, updatedOrders)
        return newOrder
    }
    //update order
    static async updateOrder(orderId, updateData){
        const orders = await this.getAllOrders()
        const findOrder = await this.getOrderById(orderId)
        const updateOrder = {...findOrder, ...updateData}

        const updatedOrders = orders.map(order => order.id === findOrder.id ? updateOrder : order)
        
        await DataService.saveJSONFile(ordersPath, updatedOrders)
    }
    //update status
    static async updateStatus(orderId, status) {
        const orders = await this.getAllOrders()
        const findOrder = await this.getOrderById(orderId)
        const updateOrderStatus = {...findOrder, status}
        const updatedOrders = orders.map(order => order.id === findOrder.id ? updateOrderStatus : order)
        
        await DataService.saveJSONFile(ordersPath, updatedOrders)
    }
}
module.exports = OrdersModel