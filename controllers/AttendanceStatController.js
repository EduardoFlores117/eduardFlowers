// controllers/AttendanceStatController.js
const express = require('express');
const router = express.Router();
const AttendanceStatService = require('../services/AttendanceStatService');

// Endpoint para obtener estadísticas de asistencia (con opción de filtrar por departamento)
router.get('/attendance-stats', (req, res) => {
    const department = req.query.department;
    
    try {
        const stats = AttendanceStatService.getAttendanceStats(department);
        res.json(stats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Endpoint para obtener estadísticas de asistencia por ID
router.get('/attendance-stats/:id', (req, res) => {
    const id = req.params.id;
    
    try {
        const stat = AttendanceStatService.getAttendanceStatById(id);
        res.json(stat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
