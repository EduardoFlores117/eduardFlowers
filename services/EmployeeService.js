// services/EmployeeService.js
const EmployeeRepository = require('../repositories/EmployeeRepository');
const Employee = require('../models/Employee');

class EmployeeService {
    // Obtener todos los empleados, posiblemente filtrados por query
    getAllEmployees(query) {
        return EmployeeRepository.filterByQuery(query);
    }

    // Crear un nuevo empleado
    createEmployee(data) {
        const newEmployee = new Employee(data.id, data.employeeName, data.email, data.department, data.phoneNumber, data.address);
        return EmployeeRepository.create(newEmployee);
    }

    // Actualizar un empleado por ID
    updateEmployee(id, data) {
        return EmployeeRepository.update(id, data);
    }

    // Eliminar un empleado por ID
    deleteEmployee(id) {
        return EmployeeRepository.delete(id);
    }

    // Obtener un empleado por ID
    getEmployeeById(id) {
        return EmployeeRepository.getById(id);
    }
}

module.exports = new EmployeeService(); // Exportar una instancia de EmployeeService
