// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token de las cabeceras de autorización
    const token = req.headers['authorization'];

    console.log('Token recibido:', token); // Mover aquí para verificar el token
    console.log('Clave secreta usada para verificar:', process.env.JWT_SECRET); // Para depuración

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verificar el token usando la clave secreta
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // token.split(' ')[1] para eliminar el 'Bearer'
        req.user = decoded; // Agregar el usuario decodificado al request para usarlo después
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token, access denied' });
    }
};

module.exports = authMiddleware;
