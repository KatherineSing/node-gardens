const { expect } = require('chai');
const Garden = require('./../../../models/garden');

describe('garden', () => {
	describe('name', () => {
		it('should be at least 5 characters', async () => {
			try {
				let garden = new Garden({name: 'aaaa'});
				await garden.validate();
			} catch(error) {
				expect(error.errors[0].message).to.equal('name must be between 5 and 100 characters');
			}
		});
		it('should be at most 100 characters', async () => {
			try {
				let garden = new Garden({name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab'});
				await garden.validate();
			} catch(error) {
				expect(error.errors[0].message).to.equal('name must be between 5 and 100 characters');
			}
		});

	});

	describe('address', () => {
		it('should be at least 5 characters', async () => {
			try {
				let garden = new Garden({address: 'aaaa'});
				await garden.validate();
			} catch(error) {
				expect(error.errors[0].message).to.equal('address must be between 5 and 300 characters');
			}
		});
		it('should be at most 300 characters', async () => {
			try {
				let garden = new Garden({address: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab'});
				await garden.validate();
			} catch(error) {
				expect(error.errors[0].message).to.equal('address must be between 5 and 300 characters');
			}
		});
		
	});
});

