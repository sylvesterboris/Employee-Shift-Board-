const sequelize = require('./src/config/database');
const User = require('./src/models/User');
const Employee = require('./src/models/Employee');
const bcrypt = require('bcryptjs');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // Reset DB

    const hashedPassword = await bcrypt.hash('HireMe@2025!', 10);

    // Seed Employees
    const employees = await Employee.bulkCreate([
        { name: 'John Doe', code: 'E001', department: 'IT' },
        { name: 'Jane Smith', code: 'E002', department: 'HR' },
        { name: 'Alice Johnson', code: 'E003', department: 'Sales' }
    ]);

    // Admin User
    await User.create({
      username: 'hire-me@anshumat.org',
      password: hashedPassword,
      role: 'admin'
    });

    // Normal User (Linked to John Doe)
    await User.create({
      username: 'user@example.com',
      password: hashedPassword,
      role: 'user',
      employeeId: employees[0].id
    });

    console.log('Database seeded successfully.');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
