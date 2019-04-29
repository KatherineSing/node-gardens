const express = require('express'); //connects to express routing lib
const bodyParser = require('body-parser');
const Garden = require('./models/garden');
const Crop = require('./models/crop');

const Sequelize = require('sequelize');

const app = express();

app.use(bodyParser.json());

Garden.hasMany(Crop, {
	foreignKey: 'garden_id'
});

Crop.belongsTo(Garden, {
	foreignKey: "garden_id"
});

app.get('/api/gardens', function(request, response){
	Garden.findAll().then((gardens) => {
		response.json(gardens);
	});
});

app.get('/api/gardens/:id', function(request, response){
	let id = request.params.id;
	Garden.findByPk(id, {
		include: [Crop]
	}).then((garden) => {
		if(garden){
			response.json(garden);
		} else {
			response.status(404).send();
		}
	}); 	
});

app.get('/api/crops', function(request, response){
	Crop.findAll().then((crops) => {
		response.json(crops);
	});
});

app.get('/api/crops/:id', function(request, response){
	let id = request.params.id;
	Crop.findByPk(id, {
		include: [Garden]
	}).then((crop) => {
		if(crop){
			response.json(crop);
		} else {
			response.status(404).send();
		}
	}); 	
});

app.post('/api/crops', function(request, response){
	Crop.create({
		garden_id: request.body.garden_id,
		title: request.body.title,
		status: request.body.status,
		date: request.body.date,
		description: request.body.description
	}).then((crop) => {
		response.json(crop);
	}, (validation) => {
		response.status(422).json({
			errors: validation.errors.map((error) => {
				return {
					attribute: error.path,
					message: error.message
				}
			})
		});
	});
});

app.post('/api/gardens', function(request, response){
	Garden.create({
		name: request.body.name,
		address: request.body.address,
	}).then((garden) => {
		response.json(garden);
	}, (validation) => {
		response.status(422).json({
			errors: validation.errors.map((error) => {
				return {
					attribute: error.path,
					message: error.message
				}
			})
		});
	});
});

app.delete('/api/gardens/:id', function(request, response) {
	let { id } = request.params;
	Garden
		.findByPk(id)
		.then((garden) => {
			if(garden){
				return garden.setCrops([]).then(() => {
					garden.destroy();
				});	
			} else {
				return Promise.reject();
			}
		})
		.then(() => {
			response.status(204).send();

		}, () => {
			response.status(404).send();

		});
});

app.delete('/api/crops/:id', function(request, response) {
	let { id } = request.params;
	Crop
		.findByPk(id)
		.then((crop) => {
			if(crop){
				return crop.destroy();
	
			} else {
				return Promise.reject();
			}
		})
		.then(() => {
			response.status(204).send();
		}, () => {
			response.status(404).send();

		});
});

app.listen(process.env.PORT || 8000);