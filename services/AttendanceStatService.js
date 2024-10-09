// services/AttendanceStatService.js
const AttendanceStatRepository = require('../repositories/AttendanceStatRepository');

class AttendanceStatService {
    // Obtener estadísticas de asistencia, opcionalmente filtradas por departamento
    getAttendanceStats(department) {
        if (department) {
            const stats = AttendanceStatRepository.getByDepartment(department);
            if (stats.length === 0) {
                throw new Error(`No se encontraron datos para el departamento: ${department}`);
            }
            return stats;
        }
        return AttendanceStatRepository.getAll();
    }

    // Obtener estadísticas de asistencia por ID
    getAttendanceStatById(id) {
        const stat = AttendanceStatRepository.getById(id);
        if (!stat) {
            throw new Error(`No se encontraron datos para el ID: ${id}`);
        }
        return stat;
    }
}

module.exports = new AttendanceStatService();
