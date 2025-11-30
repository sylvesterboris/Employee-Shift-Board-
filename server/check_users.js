const sequelize = require('./src/config/database');
const User = require('./src/models/User');

const checkUsers = async () => {
  try {
    await sequelize.authenticate();
    const users = await User.findAll();
    console.log('Users found:', users.map(u => ({ username: u.username, role: u.role })));
  } catch (error) {
    console.error('Error:', error);
  }
};

checkUsers();
