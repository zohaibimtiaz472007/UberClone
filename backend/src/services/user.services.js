const usermodel = require('../models/user.model');

module.exports.createUser = async ({
    firstName,
    lastname,
    email,
    password
}) => {
    if (!firstName || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = usermodel.create({
        fullname: {
            firstName,
            lastname
        },
        email,
        password
    });
    return user;
}