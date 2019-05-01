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

//-------------
it('should return a status of 404 when the crop does not exist', () => {
	return frisby
	.patch('http://localhost:8000/api/crops/-1')
	.expect('status', 404);
});

it('should return a status of 200 when the crop is updated successfully', () => {
	return frisby
	.patch('http://localhost:8000/api/crops/5', {
		garden_id: 3,
		title: 'Api Test Crop',
		status: 'Ready to Harvest',
		date: '2019/04/29',
		description: 'Tasty Test Crop'
	})
	.expect('status', 200);
});

it('should return a status of 422 when the crop fails to update', () => {
	return frisby
	.patch('http://localhost:8000/api/crops/5', {
		garden_id: '',
		title: 'Ap',
		status: '',
		date: '',
		description: 'Ta'
	})
	.expect('status', 422)
	.expect('json', 'errors[0].message', 'garden_id is required')
	.expect('json', 'errors[1].message', 'title must be between 3 and 30 characters')
	.expect('json', 'errors[2].message', 'status is required')
	.expect('json', 'errors[3].message', 'date is required')
	.expect('json', 'errors[4].message', 'description must be between 3 and 100 characters');
});





