// models/Employee.js
class Employee {
    constructor(id, employeeName, email, department, phoneNumber, address) {
        this.id = id;
        this.employeeName = employeeName;
        this.email = email;
        this.department = department;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}

module.exports = Employee;
