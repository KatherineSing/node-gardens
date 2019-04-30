const { expect } = require('chai');
const Crop = require('./../../../models/crop');

describe('crop', () => {
	describe('title', () => {
		it('should be at least 3 characters', async () => {
			try {
				let crop = new Crop({title: 'aa'});
				await crop.validate();
			} catch(error) {
				expect(error.errors[0].message).to.equal('title must be between 3 and 30 characters');
			}
		});
		it('should be at most 30 characters', async () => {
			try {
				let crop = new Crop({title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaab'});
				await crop.validate();
			} catch(error) {
				expect(error.errors[0].message).to.equal('title must be between 3 and 30 characters');
			}
		});
	});

	describe('description', () => {
		it('should be at least 3 characters', async () => {
			try {
				let crop = new Crop({description: 'aa'});
				await crop.validate();
			} catch(error) {
				expect(error.errors[0].message).to.equal('description must be between 3 and 100 characters');
			}
		});
		it('should be at most 100 characters', async () => {
			try {
				let crop = new Crop({description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab'});
				await crop.validate();
			} catch(error) {
				expect(error.errors[0].message).to.equal('description must be between 3 and 100 characters');
			}
		});
	});
});