const frisby = require('frisby');

const Joi = frisby.Joi;

it('should return a status of 200 when the garden is found', () => {
	return frisby
		.get('http://localhost:8000/api/gardens/2')
		.expect('status', 200)
});

it('should return a status of 404 when the garden does not exist', () => {
	return frisby
		.get('http://localhost:8000/api/gardens/-1')
		.expect('status', 404)
});

it('should return the crop garden-id, title, status, date, description, and its garden', () => {
	return frisby
		.get('http://localhost:8000/api/gardens/2')
		.expect('json', 'name', 'Good Earth Community Garden')
		.expect('json', 'address', '5546-5598 Boden St, Los Angeles, CA 90016')
		.expect('jsonTypes', 'crops.*', {
			id: Joi.number().required(),
			garden_id: Joi.number().required(),
			title: Joi.string().required(),
			status: Joi.string().required(),
			date: Joi.string().required(),
			description: Joi.string().required()
		})
});

it('should create a garden', () => {
	return frisby
		.post('http://localhost:8000/api/gardens', {
			name: "API test garden",
			address: "123 Street Rd"

		})
		.expect('status', 200)
		.expect('json', 'name', 'API test garden')
		.expect('json', 'address', '123 Street Rd')
		.expect('jsonTypes', 'id', Joi.number().required());
});


it('should return 404 when deleting a garden that does not exist', () => {
	return frisby
		.del('http://localhost:8000/api/gardens/-1')
		.expect('status', 404);
});












