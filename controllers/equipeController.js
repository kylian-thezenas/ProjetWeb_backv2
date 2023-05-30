const equipeModel = require('../models/equipeModel');
const dresseurModel = require('../models/dresseurModel');
const pokemonModel = require('../models/pokemonModel');

module.exports.allEquipe = (req, res) => {
    equipeModel
        .find()
        .sort({ number: 1 })
        .then((docs) => {
            return res.status(200).send(docs);
        })
        .catch((err) => {
            return res.status(400).send("Erreur lors de la récupération des équipes");
        });
}


module.exports.addEquipe = async (req, res) => {
    try {
        const { nameDresseur, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6 } = req.body;

        // Vérifie si le dresseur existe déjà dans la base de données
        const dresseur = await dresseurModel.findOne({ name: nameDresseur });
        if (!dresseur) {
            return res.status(404).send({ message: 'Dresseur not found' });
        }
        // Vérifie si les pokémons existent déjà dans la base de données
        const pokemonArray = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6];
        for (const pokemonId of pokemonArray) {
            if (pokemonId) {
                const pokemon = await pokemonModel.findOne({ number: pokemonId });
                if (!pokemon) {
                    return res.status(404).send({ message: `Pokemon ${pokemonId} not found` });
                }
            }
        }

        const newEquipe = new equipeModel({
            nameDresseur,
            pokemon1,
            pokemon2,
            pokemon3,
            pokemon4,
            pokemon5,
            pokemon6
        });

        console.log(newEquipe);

        try {
            const equipe = await newEquipe.save();
            console.log(equipe);
            return res.status(201).json(equipe);

        } catch (err) {
            return res.status(400).json({ message: "Erreur lors de l'ajout de l'équipe" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports.getEquipe = async (req, res) => {
    const query = { nameDresseur: req.params.name };
    try {
        const equipe = await equipeModel.findOne(query);
        return res.status(200).json(equipe);
    } catch (err) {
        return res.status(400).json({ message: "Erreur lors de la récupération de l'équipe" });
    }
}

module.exports.updateEquipe = async (req, res) => {
    const query = { name: req.params.name };
    try {
        const equipe = await equipeModel.findOneAndUpdate(query, req.body, { new: true });
        return res.status(200).json(equipe);
    } catch (err) {
        return res.status(400).json({ message: "Erreur lors de la mise à jour de l'équipe" });
    }
}

module.exports.deleteEquipe = async (req, res) => {
    const query = { name: req.params.name };
    try {
        const equipe = await equipeModel.findOneAndDelete(query);
        return res.status(200).json(equipe);
    } catch (err) {
        return res.status(400).json({ message: "Erreur lors de la suppression de l'équipe" });
    }
}