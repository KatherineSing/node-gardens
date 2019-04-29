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
		validate: {
			notEmpty: {
				args: true,
				msg: 'garden_id is required'
			}
		}

	},
	title: {
		field: 'title',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: 'title is required'
			},
			len: {
				args: [3, 30],
				msg: 'title must be between 3 and 30 characters'
			}
			
		}

	},
	status: {
		field: 'status',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: 'status is required'
			}
			
		}
	},
	date: {
		field: 'date',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: 'date is required'
			}
			
		}

	},
	description: {
		field: 'description',
		type: Sequelize.STRING,
		validate: {
			notEmpty: {
				args: true,
				msg: 'description is required'
			},
			len: {
				args: [3, 100],
				msg: 'description must be between 3 and 100 characters'
			}
			
		}

	}
}, {
	timestamps: false
});