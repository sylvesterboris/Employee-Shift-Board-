const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee');

const Shift = sequelize.define('Shift', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  }
});

Shift.belongsTo(Employee, { foreignKey: 'employeeId' });
Employee.hasMany(Shift, { foreignKey: 'employeeId' });

module.exports = Shift;
