const bycript = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bycript.genSalt(10);
    const hash =  await bycript.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bycript.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
};

module.exports = helpers;