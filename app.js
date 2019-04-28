let express = require('express'); //connects to express routing lib
let knex = require('knex'); //database
let app = express();
app.get('/api/gardens', function(request, response){
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'database.sqlite'
		}
	});
	connection.select().from('gardens').then((gardens) => {
		response.json([gardens]);
	});
});

app.get('/api/gardens/:id', function(request, response){
	let id = request.params.id;
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'database.sqlite'
		}
	});
	connection
	.select().from('gardens')
	.where('garden_id', id)
	.first()
	.then((garden) => {
		if (garden){
			response.json([garden]);
		} 
		else {
			response.status(404).json({
				error: `Garden ${id} not found`
			});
		}
	});
});
app.listen(process.env.PORT || 8000);