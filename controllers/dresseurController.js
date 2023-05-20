const dresseurModel = require('../models/dresseurModel');

module.exports.allDresseurs = (req, res) => {
    dresseurModel
        .find()
        .sort({ number: 1 })
        .then((docs) => {
            return res.status(200).send(docs);
        })
        .catch((err) => {
            return res.status(400).send("Erreur lors de la récupération des dresseurs");
        });
}


module.exports.addDresseur = async (req, res) => {
    const newDresseur = new dresseurModel({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    });
    try{
        const dresseur = await newDresseur.save();
        console.log(dresseur);
        return res.status(201).json(dresseur);

    }catch(err){
        return res.status(400).json({message: "Erreur lors de l'ajout du dresseur"});
    }
}

module.exports.getDresseur = async (req, res) => {
    const query = {name: req.params.name};
    try{
        const dresseur = await dresseurModel.find(query);
        return res.status(200).json(dresseur);
    }catch(err){
        return res.status(400).json({message: "Erreur lors de la récupération du dresseur"});
    }
}

module.exports.updateDresseur = async (req, res) => {
    const query = {name: req.params.name};
    try{
        const dresseur = await dresseurModel.findOneAndUpdate(query, req.body, {new: true});
        return res.status(200).json(dresseur);
    }catch(err){
        return res.status(400).json({message: "Erreur lors de la mise à jour du dresseur"});
    }
}

module.exports.deleteDresseur = async (req, res) => {
    const query = {name: req.params.name};
    try{
        const dresseur = await dresseurModel.findOneAndDelete(query);
        return res.status(200).json(dresseur);
    }catch(err){
        return res.status(400).json({message: "Erreur lors de la suppression du dresseur"});
    }
}