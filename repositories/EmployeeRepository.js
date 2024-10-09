// repositories/EmployeeRepository.js
const empleadosData = require('../empleadosData.json'); // Suponiendo que tienes un archivo JSON con los datos
const Employee = require('../models/Employee'); // Modelo de empleado

class EmployeeRepository {
    // Obtener todos los empleados
    getAll() {
        return empleadosData;
    }

    // Obtener un empleado por ID
    getById(id) {
        return empleadosData.find(employee => employee.id == id);
    }

    // Crear un nuevo empleado
    create(employee) {
        empleadosData.push(employee); // Agrega el nuevo empleado a la lista
        return employee;
    }

    // Actualizar un empleado existente
    update(id, updatedData) {
        const employee = this.getById(id); // Encuentra el empleado
        if (employee) {
            Object.assign(employee, updatedData); // Actualiza con los nuevos datos
            return employee;
        }
        return null;
    }

    // Eliminar un empleado
    delete(id) {
        const index = empleadosData.findIndex(employee => employee.id == id);
        if (index !== -1) {
            return empleadosData.splice(index, 1); // Elimina el empleado de la lista
        }
        return null;
    }

    // Filtrar empleados por campos
    filterByQuery(query) {
        return empleadosData.filter(employee => {
            const normalizedEmployeeName = normalizeString(employee.employeeName);
            const normalizedDepartment = normalizeString(employee.department);
            const normalizedPhoneNumber = employee.phoneNumber;

            return (!query.id || employee.id == query.id) &&
                   (!query.employeeName || normalizedEmployeeName.includes(normalizeString(query.employeeName))) &&
                   (!query.department || normalizedDepartment.includes(normalizeString(query.department))) &&
                   (!query.phoneNumber || normalizedPhoneNumber == query.phoneNumber);
        });
    }
}

// Función para normalizar cadenas
const normalizeString = (str) => {
    return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
};

module.exports = new EmployeeRepository(); // Exportar una instancia de EmployeeRepository
