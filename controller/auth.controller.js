const AuthModel = require("../model/auth.model");

class AuthController {
    static async registerUser(req, res) {
        try {
            const userData = req.body
            const registerNewUser = await AuthModel.createUser(userData);
            res.status(201).send(registerNewUser)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    static async loginUser(req, res){
        try {
            const credentials = req.body;
            const user = await AuthModel.loginUser(credentials);

            req.session.loggedIn = true;
            req.session.userId = user.id;

            res.status(200).send(user)
        } catch (error) {
            console.log(error)
            res.status(401).send(error)
        }
    }
    static logoutUser(req, res){
        try {
            req.session.destroy()
            res.sendStatus(200)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = AuthController