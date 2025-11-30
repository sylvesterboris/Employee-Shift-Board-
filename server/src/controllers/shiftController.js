const Shift = require('../models/Shift');
const Employee = require('../models/Employee');
const { Op } = require('sequelize');

exports.createShift = async (req, res) => {
  const { employeeId, date, startTime, endTime } = req.body;

  try {
    // Rule 2: Shift Must Be Minimum 4 Hours
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const duration = (end - start) / (1000 * 60 * 60);

    if (duration < 4) {
      return res.status(400).json({ message: 'Shift must be at least 4 hours.' });
    }

    // Rule 1: No Overlapping Shifts
    const existingShift = await Shift.findOne({
      where: {
        employeeId,
        date,
        [Op.or]: [
          {
            startTime: { [Op.between]: [startTime, endTime] }
          },
          {
            endTime: { [Op.between]: [startTime, endTime] }
          },
          {
            startTime: { [Op.lte]: startTime },
            endTime: { [Op.gte]: endTime }
          }
        ]
      }
    });

    if (existingShift) {
      return res.status(400).json({ message: 'Shift overlaps with an existing shift.' });
    }

    const shift = await Shift.create({ employeeId, date, startTime, endTime });
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getShifts = async (req, res) => {
  try {
    const { role, employeeId } = req.user;
    let where = {};

    // Rule 3: Normal Users See Only Their Own Shifts
    if (role === 'user') {
      if (!employeeId) {
          return res.status(403).json({ message: 'User is not linked to an employee record.' });
      }
      where.employeeId = employeeId;
    }

    const shifts = await Shift.findAll({
      where,
      include: [Employee],
      order: [['date', 'ASC'], ['startTime', 'ASC']]
    });
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};
