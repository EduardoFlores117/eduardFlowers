// repositories/comedorRepository.js

const comedorData = require('../comedorData.json'); // Suponiendo que los datos se guardan en un archivo JSON.

const getAllRecords = (filters) => {
    let filteredData = comedorData;

    if (filters.id) filteredData = filteredData.filter(item => item.id == filters.id);
    if (filters.name) filteredData = filteredData.filter(item => normalizeString(item.name).includes(normalizeString(filters.name)));
    if (filters.date) filteredData = filteredData.filter(item => item.date == filters.date);
    if (filters.status) filteredData = filteredData.filter(item => item.status == filters.status);
    if (filters.department) filteredData = filteredData.filter(item => normalizeString(item.department).includes(normalizeString(filters.department)));

    return filteredData;
};

const addRecord = (record) => {
    comedorData.push(record);
};

const updateRecordStatus = (id, status) => {
    const record = comedorData.find(item => item.id == id);
    if (record) {
        record.status = status;
        return record;
    }
    return null;
};

const deleteRecord = (id) => {
    const index = comedorData.findIndex(item => item.id == id);
    if (index !== -1) {
        return comedorData.splice(index, 1);
    }
    return null;
};

const normalizeString = (str) => {
    return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
};

module.exports = {
    getAllRecords,
    addRecord,
    updateRecordStatus,
    deleteRecord,
};
