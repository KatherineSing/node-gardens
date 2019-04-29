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
		validate: {
			notEmpty: {
				args: true,
				msg: 'name is required'
			},
			len: {
				args: [5, 100],
				msg: 'name must be between 5 and 100 characters'
			}
			
		}
	},
	address: {
		field: 'address',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: 'address is required'
			},
			len: {
				args: [5, 300],
				msg: 'title must be between 5 and 300 characters'
			}
			
		}
	}
}, {
	timestamps: false
});