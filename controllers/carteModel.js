const carteModel = require('../models/carteModel');

module.exports.allCartes = (req, res) => {
    carteModel
        .find()
        .sort({ number: 1 })
        .then((docs) => {
            return res.status(200).send(docs);
        })
        .catch((err) => {
            return res.status(400).send("Erreur lors de la récupération des cartes");
        });
}

module.exports.addCarte = async (req, res) => {
    const newCarte = new carteModel({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    });
    try{
        const carte = await newCarte.save();
        console.log(carte);
        return res.status(201).json(carte);

    }catch(err){
        return res.status(400).json({message: "Erreur lors de l'ajout de la carte"});
    }
}

module.exports.getCarte = async (req, res) => {
    const query = {name: req.params.name};
    try{
        const carte = await carteModel.find(query);
        return res.status(200).json(carte);
    }catch(err){
        return res.status(400).json({message: "Erreur lors de la récupération de la carte"});
    }
}

module.exports.updateCarte = async (req, res) => {
    const query = {name: req.params.name};
    try{
        const carte = await carteModel.find(query);
        return res.status(200).json(carte);
    }catch(err){
        return res.status(400).json({message: "Erreur lors de la récupération de la carte"});
    }
}

module.exports.deleteCarte = async (req, res) => {
    const query = {name: req.params.name};
    try{
        const carte = await dresseurModel.findOneAndDelete(query);
        return res.status(200).json(carte);
    }catch(err){
        return res.status(400).json({message: "Erreur lors de la suppression de la carte"});
    }
}