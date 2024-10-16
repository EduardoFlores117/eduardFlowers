// controllers/AttendanceStatController.js
const express = require('express');
const router = express.Router();
const AttendanceStatService = require('../services/AttendanceStatService');
const authMiddleware = require('../middlewares/authMiddleware');  // Importar el middleware

/**
 * @swagger
 * /api/attendance-stats:
 *   get:
 *     summary: Obtener estadísticas de asistencia
 *     description: Retorna estadísticas de asistencia con la opción de filtrar por departamento.
 *     tags: [AttendanceStats]
 *     parameters:
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Nombre del departamento para filtrar estadísticas
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Estadísticas de asistencia obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No se encontraron estadísticas
 */
router.get('/', authMiddleware, (req, res) => {
    const department = req.query.department;
    
    try {
        const stats = AttendanceStatService.getAttendanceStats(department);
        res.json(stats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/attendance-stats/{id}:
 *   get:
 *     summary: Obtener estadísticas de asistencia por ID
 *     description: Retorna las estadísticas de asistencia de un empleado específico por ID.
 *     tags: [AttendanceStats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de las estadísticas de asistencia
 *     security:
 *       - bearerAuth: []  # Requiere autenticación con JWT
 *     responses:
 *       200:
 *         description: Estadísticas de asistencia obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: No se encontraron estadísticas para el ID especificado
 */
router.get('/:id', authMiddleware, (req, res) => {
    const id = req.params.id;
    
    try {
        const stat = AttendanceStatService.getAttendanceStatById(id);
        res.json(stat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
