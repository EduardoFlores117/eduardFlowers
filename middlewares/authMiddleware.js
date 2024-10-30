// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token de las cabeceras de autorización
    const authHeader = req.headers['authorization'];
    
    console.log('Token recibido:', authHeader); // Mover aquí para verificar el token
    console.log('Clave secreta usada para verificar:', process.env.JWT_SECRET); // Para depuración

    // Comprobar que el token tenga el formato correcto
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Extraer el token después de 'Bearer '
    const token = authHeader.split(' ')[1];

    try {
        // Verificar el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agregar el usuario decodificado al request para usarlo después
        next(); // Pasar al siguiente middleware o controlador
    } catch (err) {
        console.error('Error al verificar el token:', err);
        return res.status(403).json({ message: 'Invalid token, access denied' });
    }
};

module.exports = authMiddleware;
