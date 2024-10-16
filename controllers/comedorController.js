// controllers/comedorController.js

const comedorService = require('../services/comedorService');

/**
 * @swagger
 * /api/comedor:
 *   get:
 *     summary: Obtener registros del comedor
 *     description: Retorna una lista de registros del comedor con la posibilidad de aplicar filtros por id, nombre, fecha, estado y departamento.
 *     tags: [Comedor]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID del registro
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del empleado
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha del registro
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [activo, no activo]
 *         description: Estado del registro
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Departamento del empleado
 *     responses:
 *       200:
 *         description: Lista de registros del comedor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
const getRecords = (req, res) => {
    const { id, name, date, status, department } = req.query;
    const filters = { id, name, date, status, department };
    
    const records = comedorService.fetchRecords(filters);
    res.json(records);
};

/**
 * @swagger
 * /api/comedor:
 *   post:
 *     summary: Crear un nuevo registro de comedor
 *     description: Crea un nuevo registro de entrada o salida del comedor para un empleado.
 *     tags: [Comedor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - checkIn
 *               - checkOut
 *               - date
 *               - status
 *               - department
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [activo, no activo]
 *               department:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro de comedor creado
 *       400:
 *         description: Faltan campos obligatorios o el estado no es válido (activo/no activo)
 */
const createRecord = (req, res) => {
    const { id, name, checkIn, checkOut, date, status, department } = req.body;
    
    if (!id || !name || !checkIn || !checkOut || !date || !status || !department || (status !== 'activo' && status !== 'no activo')) {
        return res.status(400).json({ message: 'Faltan campos obligatorios o el estado no es válido (activo/no activo)' });
    }
    
    const newRecord = comedorService.createRecord(req.body);
    res.status(201).json({ message: 'Registro de comedor creado', data: newRecord });
};

/**
 * @swagger
 * /api/comedor/{id}:
 *   put:
 *     summary: Actualizar el estado de un registro de comedor
 *     description: Actualiza el estado (activo/no activo) de un registro de comedor existente.
 *     tags: [Comedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro de comedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [activo, no activo]
 *     responses:
 *       200:
 *         description: Estado del registro actualizado
 *       400:
 *         description: El estado no es válido (activo/no activo)
 *       404:
 *         description: No se encontró el registro
 */
const updateRecord = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || (status !== 'activo' && status !== 'no activo')) {
        return res.status(400).json({ message: 'El estado debe ser "activo" o "no activo"' });
    }

    const updatedRecord = comedorService.changeRecordStatus(id, status);
    if (!updatedRecord) {
        return res.status(404).json({ message: `No se encontró el registro del comedor con el id ${id}` });
    }

    res.json({ message: 'Estado del registro actualizado', data: updatedRecord });
};

/**
 * @swagger
 * /api/comedor/{id}:
 *   delete:
 *     summary: Eliminar un registro de comedor
 *     description: Elimina un registro de comedor existente por su ID.
 *     tags: [Comedor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del registro de comedor
 *     responses:
 *       200:
 *         description: Registro del comedor eliminado
 *       404:
 *         description: No se encontró el registro
 */
const deleteRecord = (req, res) => {
    const { id } = req.params;

    const deletedRecord = comedorService.removeRecord(id);
    if (!deletedRecord) {
        return res.status(404).json({ message: `No se encontró el registro del comedor con el id ${id}` });
    }

    res.json({ message: 'Registro del comedor eliminado', data: deletedRecord });
};

module.exports = {
    getRecords,
    createRecord,
    updateRecord,
    deleteRecord,
};
