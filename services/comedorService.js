// services/comedorService.js

const comedorRepository = require('../repositories/comedorRepository');
const Comedor = require('../models/comedorModel');

const fetchRecords = (filters) => {
    return comedorRepository.getAllRecords(filters);
};

const createRecord = (data) => {
    const { id, name, checkIn, checkOut, date, status, department } = data;
    const newRecord = new Comedor(id, name, checkIn, checkOut, date, status, department);
    comedorRepository.addRecord(newRecord);
    return newRecord;
};

const changeRecordStatus = (id, status) => {
    return comedorRepository.updateRecordStatus(id, status);
};

const removeRecord = (id) => {
    return comedorRepository.deleteRecord(id);
};

module.exports = {
    fetchRecords,
    createRecord,
    changeRecordStatus,
    removeRecord,
};
