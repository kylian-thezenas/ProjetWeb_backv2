const typeModel = require('../models/typeModel');

module.exports.allType = (req, res) => {
    typeModel
        .find()
        .sort({ number: 1 })
        .then((docs) => {
            return res.status(200).send(docs);
        })
        .catch((err) => {
            return res.status(400).send("Erreur lors de la récupération des types");
        });
}


module.exports.addType = async (req, res) => {
    const newType = new typeModel({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    });
    try{
        const type = await newType.save();
        console.log(type);
        return res.status(201).json(type);

    }catch(err){
        return res.status(400).json({message: "Erreur lors de l'ajout du type"});
    }
}

module.exports.getType = async (req, res) => {
    const query = {name: req.params.name};
    try{
        const type = await typeModel.find(query);
        return res.status(200).json(type);
    }catch(err){
        return res.status(400).json({message: "Erreur lors de la récupération du type"});
    }
}

module.exports.updateType = async (req, res) => {
    const query = {name: req.params.name};
    try{
        const type = await typeModel.findOneAndUpdate(query, req.body, {new: true});
        return res.status(200).json(type);
    }catch(err){
        return res.status(400).json({message: "Erreur lors de la mise à jour du type"});
    }
}

module.exports.deleteType = async (req, res) => {
    const query = {name: req.params.name};
    try{
        const type = await typenModel.findOneAndDelete(query);
        return res.status(200).json(type);
    }catch(err){
        return res.status(400).json({message: "Erreur lors de la suppression du type"});
    }
}