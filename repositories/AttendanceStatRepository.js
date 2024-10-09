// repositories/AttendanceStatRepository.js
const attendanceStats = require('../indexData.json'); // Suponiendo que los datos se guardan en un archivo JSON
const AttendanceStat = require('../models/AttendanceStat');

class AttendanceStatRepository {
    // Obtener todas las estadísticas de asistencia
    getAll() {
        return attendanceStats;
    }

    // Obtener estadísticas de asistencia filtradas por departamento
    getByDepartment(department) {
        return attendanceStats.filter(stat => stat.department.toLowerCase() === department.toLowerCase());
    }

    // Obtener estadísticas de asistencia por ID
    getById(id) {
        return attendanceStats.find(stat => stat.id == id);
    }
}

module.exports = new AttendanceStatRepository();
