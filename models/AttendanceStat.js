// models/AttendanceStat.js
class AttendanceStat {
    constructor(id, department, totalEmployees, present, absent, attendancePercentage) {
        this.id = id;
        this.department = department;
        this.totalEmployees = totalEmployees;
        this.present = present;
        this.absent = absent;
        this.attendancePercentage = attendancePercentage;
    }
}

module.exports = AttendanceStat;
