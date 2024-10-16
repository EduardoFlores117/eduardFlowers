// controllers/EmployeeController.js
const EmployeeService = require('../services/EmployeeService');

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Obtener todos los empleados o filtrarlos por cualquier campo
 *     description: Retorna todos los empleados o los filtra según los parámetros proporcionados en la consulta.
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filtrar por ID de empleado
 *       - in: query
 *         name: employeeName
 *         schema:
 *           type: string
 *         description: Filtrar por nombre del empleado
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrar por correo electrónico
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filtrar por departamento
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
const getRecords = (req, res) => {
    const employees = EmployeeService.getAllEmployees(req.query);
    res.json(employees);
};

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Crear un nuevo empleado
 *     description: Crea un nuevo empleado con la información proporcionada.
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               employeeName:
 *                 type: string
 *               email:
 *                 type: string
 *               department:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Faltan campos obligatorios
 */
const createRecord = (req, res) => {
    const { id, employeeName, email, department, phoneNumber, address } = req.body;

    if (!id || !employeeName || !email || !department || !phoneNumber || !address) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const newEmployee = EmployeeService.createEmployee({ id, employeeName, email, department, phoneNumber, address });
    res.status(201).json({ message: 'Empleado creado', data: newEmployee });
};

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Actualizar un empleado por su ID
 *     description: Actualiza la información de un empleado existente mediante su ID.
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Empleado actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: No se encontró el empleado con el ID especificado
 */
const updateRecord = (req, res) => {
    const { id } = req.params;
    const updatedEmployee = EmployeeService.updateEmployee(id, req.body);

    if (!updatedEmployee) {
        return res.status(404).json({ message: `No se encontró el empleado con el id ${id}` });
    }

    res.json({ message: 'Empleado actualizado', data: updatedEmployee });
};

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Eliminar un empleado por su ID
 *     description: Elimina un empleado existente mediante su ID.
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: No se encontró el empleado con el ID especificado
 */
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
