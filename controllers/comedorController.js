// controllers/comedorController.js

const comedorService = require('../services/comedorService');

const getRecords = (req, res) => {
    const { id, name, date, status, department } = req.query;
    const filters = { id, name, date, status, department };
    
    const records = comedorService.fetchRecords(filters);
    res.json(records);
};

const createRecord = (req, res) => {
    const { id, name, checkIn, checkOut, date, status, department } = req.body;
    
    if (!id || !name || !checkIn || !checkOut || !date || !status || !department || (status !== 'activo' && status !== 'no activo')) {
        return res.status(400).json({ message: 'Faltan campos obligatorios o el estado no es válido (activo/no activo)' });
    }
    
    const newRecord = comedorService.createRecord(req.body);
    res.status(201).json({ message: 'Registro de comedor creado', data: newRecord });
};

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
