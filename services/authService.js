const userRepository = require('../repositories/userRepository'); // Asegúrate de que esto funcione correctamente
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'mi_clave_secreta'; // Usar variables de entorno en producción

// Registro de usuarios
async function register(username, password) {
    const users = await userRepository.getUsers();

    // Verificar si el nombre de usuario ya existe
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        throw new Error('El nombre de usuario ya está en uso');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);
    await userRepository.saveUsers(users); // Asegúrate de que esto guarde el archivo correctamente

    return newUser;
}

// Inicio de sesión
async function login(username, password) {
    const users = await userRepository.getUsers();
    const user = users.find(u => u.username === username);

    // Verificar credenciales
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Credenciales inválidas');
    }

    // Generar token JWT
    try {
        const token = jwt.sign(
            { id: user.id, username: user.username },
            secretKey,
            { expiresIn: '5m' } // Tiempo de expiración del token
        );
        return token;
    } catch (error) {
        throw new Error('Error al generar el token');
    }
}

module.exports = {
    register,
    login
};
