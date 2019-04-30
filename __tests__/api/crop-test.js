const frisby = require('frisby');

const Joi = frisby.Joi;

it('should return a status of 200 when the crop is found', () => {
	return frisby
		.get('http://localhost:8000/api/crops/5')
		.expect('status', 200)
});

it('should return a status of 404 when the crop does not exist', () => {
	return frisby
		.get('http://localhost:8000/api/crops/-1')
		.expect('status', 404)
});

it('should return the crop garden_id, title, status, date, description, and its garden', () => {
	return frisby
		.get('http://localhost:8000/api/crops/5')
		.expect('json', 'garden_id', 1)
		.expect('json', 'title', 'Tomato')
		.expect('json', 'status', 'Just Planted')
		.expect('json', 'date', '2019/04/26')
		.expect('json', 'description', 'Cherry tomatoes planted in the SW corner')
		.expect('jsonTypes', 'garden', {
			id: Joi.number().required(),
			name: Joi.string().required(),
			address: Joi.string().required()
		})

});

it('should create a crop', () => {
	return frisby
		.post('http://localhost:8000/api/crops', {
			garden_id: 1,
			title: "API test apple",
			status: "Just Planted",
			date: "2019/04/28",
			description: "honeycrisp"

		})
		.expect('status', 200)
		.expect('json', 'garden_id', 1)
		.expect('json', 'title', 'API test apple')
		.expect('json', 'status', 'Just Planted')
		.expect('json', 'date', '2019/04/28')
		.expect('json', 'description', 'honeycrisp')
		.expect('jsonTypes', 'id', Joi.number().required());
});

it('should return 404 when deleting a crop that does not exist', () => {
	return frisby
		.del('http://localhost:8000/api/crops/-1')
		.expect('status', 404);
});

it('should return 204 when deleting a crop that exists', () => {
	return frisby
		.del('http://localhost:8000/api/crops/6')
		.expect('status', 204);
});






