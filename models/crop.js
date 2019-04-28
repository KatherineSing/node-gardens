const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('crop', {
	id: {
		field: 'crop_id',
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	garden_id: {
		field: 'garden_id',
		type: Sequelize.INTEGER,
	},
	title: {
		field: 'title',
		type: Sequelize.STRING,
	},
	status: {
		field: 'status',
		type: Sequelize.STRING,
	},
	date: {
		field: 'date',
		type: Sequelize.STRING,
	},
	description: {
		field: 'description',
		type: Sequelize.STRING,
	}
}, {
	timestamps: false
});