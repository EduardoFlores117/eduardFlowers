// controllers/EmployeeController.js
const EmployeeService = require('../services/EmployeeService');

// Obtener todos los empleados o filtrarlos por cualquier campo
const getRecords = (req, res) => {
    const employees = EmployeeService.getAllEmployees(req.query);
    res.json(employees);
};

// Crear un nuevo empleado
const createRecord = (req, res) => {
    const { id, employeeName, email, department, phoneNumber, address } = req.body;

    if (!id || !employeeName || !email || !department || !phoneNumber || !address) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const newEmployee = EmployeeService.createEmployee({ id, employeeName, email, department, phoneNumber, address });
    res.status(201).json({ message: 'Empleado creado', data: newEmployee });
};

// Actualizar un empleado por su ID
const updateRecord = (req, res) => {
    const { id } = req.params;
    const updatedEmployee = EmployeeService.updateEmployee(id, req.body);

    if (!updatedEmployee) {
        return res.status(404).json({ message: `No se encontró el empleado con el id ${id}` });
    }

    res.json({ message: 'Empleado actualizado', data: updatedEmployee });
};

// Eliminar un empleado por su ID
const deleteRecord = (req, res) => {
    const { id } = req.params;
    const deletedEmployee = EmployeeService.deleteEmployee(id);

    if (!deletedEmployee) {
        return res.status(404).json({ message: `No se encontró el empleado con el id ${id}` });
    }

    res.json({ message: 'Empleado eliminado', data: deletedEmployee });
};

module.exports = {
    getRecords,
    createRecord,
    updateRecord,
    deleteRecord,
};
