// models/comedorModel.js

class Comedor {
    constructor(id, name, checkIn, checkOut, date, status, department) {
        this.id = id;
        this.name = name;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.date = date;
        this.status = status;
        this.department = department;
    }
}

module.exports = Comedor;
