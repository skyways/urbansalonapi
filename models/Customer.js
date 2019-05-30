const Sequelize = require('sequelize');
const Customer = sequelize.define('customer', {
	customerid: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},

	name: Sequelize.STRING(300),

	phone: {
		type: Sequelize.STRING(20),
		allowNull: false,
		primaryKey: true,
	},

	password: Sequelize.STRING(255),

	avatar: Sequelize.STRING(300),
});

module.exports = Customer;
