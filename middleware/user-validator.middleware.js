const Joi = require("joi");


const userSchema = Joi.object({
    username: Joi.string().min(2).required(),
    password: Joi.string().min(8).required()
})

const userValidator = (req, res, next) => {
    const userData = req.body;
    const validation = userSchema.validate(userData);
    if(validation?.error){
        res.status(400).send({
            msg: validation.error.details[0].message,
        })
    } else {
        next()
    }
}

module.exports = userValidator;