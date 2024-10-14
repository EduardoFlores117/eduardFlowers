const express = require('express');
const { check, validationResult } = require('express-validator');
const authService = require('../services/authService');

const router = express.Router();

// Ruta para registrar nuevos usuarios
router.post('/register', [
    check('username').not().isEmpty().withMessage('El nombre de usuario es requerido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
    // Validación de los campos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const newUser = await authService.register(username, password);
        res.status(201).json(newUser); // Devolver el usuario registrado
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de error en el servidor
    }
});

// Ruta para login
router.post('/login', [
    check('username').not().isEmpty().withMessage('El nombre de usuario es requerido'),
    check('password').not().isEmpty().withMessage('La contraseña es requerida')
], async (req, res) => {
    // Validación de los campos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password); // Generar token en el servicio
        res.json({ token }); // Devolver el token JWT
    } catch (error) {
        res.status(400).json({ error: error.message }); // Devolver error de login
    }
});

module.exports = router;
