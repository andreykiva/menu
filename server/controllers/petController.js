const Pet = require('../models/Pet');

class PetController {
	async getPetsByKind(req, res) {
		try {
			const pets = await Pet.find({ kind: req.params.kind });
			res.json(pets);
		} catch (e) {
			console.log(e);
		}
	}

	async getPet(req, res) {
		try {
			const pet = await Pet.findOne({ _id: req.params.id });
			res.json(pet);
		} catch (e) {
			console.log(e);
		}
	}

	async createPet(req, res) {
		try {
			const newPet = new Pet(req.body);
			await newPet.save();
			res.json(newPet);
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new PetController();
