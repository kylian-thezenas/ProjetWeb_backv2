const favorisModel = require('../models/favorisModel');
const userModel = require('../models/userModel');
const pokemonModel = require('../models/pokemonModel');

module.exports.allFavoris = (req, res) => {
    favorisModel
        .find()
        .sort({ number: 1 })
        .then((docs) => {
            return res.status(200).send(docs);
        })
        .catch((err) => {
            return res.status(400).send("Erreur lors de la récupération des favoris");
        });
}


module.exports.addFavoris = async (req, res) => {
    try {
        const { userName, pokemonName } = req.body;

        // Vérifie si le dresseur existe déjà dans la base de données
        const user = await userModel.findOne({ name: userName });
        console.log(user);
        if (!user) {
            return res.status(404).send({ message: 'user not found' });
        }
        // Vérifie si les pokémons existent déjà dans la base de données
        const pokemon = await pokemonModel.findOne({name: pokemonName}) ;
        if (!pokemon) {
            return res.status(404).send({ message: `Pokemon ${pokemonName} not found` });
        }
     
        const newFavoris = new favorisModel({
            userName: userName,
            pokemonName: pokemonName
        });

        console.log(newFavoris);

        try {
            const favoris = await newFavoris.save();
            console.log(favoris);
            return res.status(201).json(favoris);

        } catch (err) {
            return res.status(400).json({ message: "Erreur lors de l'ajout du favoris" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports.getFavoris = async (req, res) => {
    const query = { name: req.params.userName };
    try {
        const favoris = await favorisModel.find(query);
        return res.status(200).json(favoris);
    } catch (err) {
        return res.status(400).json({ message: "Erreur lors de la récupération des favoris" });
    }
}

module.exports.deleteFavoris= async (req, res) => {
    const query = { userName: req.params.userName, pokemonName: req.params.pokemonName };
    try {
        const favoris = await favorisModel.deleteOne(query);
        return res.status(200).json(favoris);
    } catch (err) {
        return res.status(400).json({ message: "Erreur lors de la suppression du favoris" });
    }
}