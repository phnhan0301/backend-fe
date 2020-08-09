let models = require("../models");

const findUserByPhoneOrEmail = (email) => {
    return models.user.findAll({
        where: {
            email
        }
    })
}
const registerUser = data =>{
    return models.user.create(data)
}

module.exports = {
    findUserByPhoneOrEmail,
    registerUser
}