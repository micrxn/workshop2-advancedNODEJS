const DataService = require("../service/data.service");
const path = require("path");
const {v4: uuid} = require("uuid");
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname, "..", "data", "users.json");

class User {
    constructor(username, password) {
        this.id = uuid();
        this.username = username;
        this.password = password
    }
};

class AuthModel {
    static async getAllUsers(){
        return DataService.readJSONFile(usersPath);
    }

    static async createUser(userData){
        const users = await this.getAllUsers();
        const userExists = users.some(user => user.username === userData.username);
        if(userExists) return Promise.reject({msg: "username taken"});

        const hashedPassword = await bcrypt.hash(userData.password, 8)

        const newUser = new User(
            userData.username,
            hashedPassword
        );
        const updatedUsers = [...users, newUser]

        await DataService.saveJSONFile(usersPath, updatedUsers)

        const {password, ...userWithoutPassword} = newUser

        return userWithoutPassword
    }
    static async loginUser(credentials){
        const {username, password} = credentials;
        const users = await this.getAllUsers();

        const foundUser = users.find(user => user.username === username);
        if(!foundUser) return Promise.reject({msg: "invalid credentials"});

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if(!isPasswordValid) return Promise.reject({msg:"invalid credentials"})

        const {password: hashedPassword, ...userWithoutPassword} = foundUser;

        return userWithoutPassword
    }

}


module.exports = AuthModel