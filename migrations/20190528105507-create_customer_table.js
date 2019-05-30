'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('customers', {
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

			createdAT: Sequelize.DATE,

			updatedAt: Sequelize.DATE,
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('customers');
	},
};
