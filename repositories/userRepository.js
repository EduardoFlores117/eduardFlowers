const fs = require('fs-extra');
const User = require('../models/userModel');

const filePath = './data/users.json';

async function saveUsers(users) {
    try {
        await fs.writeJson(filePath, users);
    } catch (error) {
        console.error(error);
    }
}

async function getUsers() {
    try {
        const data = await fs.readJson(filePath);
        return data.map(user => new User(user.id, user.username, user.password));
    } catch (error) {
        console.error(error);
        return []; // Devuelve un array vacío en caso de error
    }
}

module.exports = {
    saveUsers,
    getUsers
};
