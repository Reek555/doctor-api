const { Sequelize } = require('sequelize');



// Option 3: Passing parameters separately (other dialects)
/* const sequelize = new Sequelize('myDoctor', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
  });  */

//'postgres://postgres:postgres@localhost:5432/myDoctor'
const sequelize = new Sequelize(process.env.CONNECTION_URI)



async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log ('connected')
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}

checkConnection()


module.exports = sequelize; 

