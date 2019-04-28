const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('garden', {
	id: {
		field: 'garden_id',
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		field: 'name',
		type: Sequelize.STRING,
	},
	address: {
		field: 'address',
		type: Sequelize.STRING,
	}
}, {
	timestamps: false
});