const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//get all user
module.exports.allUser = (req, res) => {
  userModel
    .find()
    .sort({ name: 1 })
    .then((docs) => {
      return res.status(200).send(docs);
    })
    .catch((err) => {
      return res.status(400).send("Erreur lors de la récupération des utilisateurs");
    });
}

//get user
module.exports.getUser = async (req, res) => {
  const query = { name: req.auth.userName };
  console.log('query = ' + query);
  console.log('name = ' + req.auth.userName);
  try {
    const user = await userModel.find(query);
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
}

//add user
module.exports.inscription = async (req, res) => {
  // Hash the password
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const user = new userModel({
      name: req.body.name,
      password: hash,
      role: "user"
    });
    try {
      const newUser = await user.save();
      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(400).json({ message: "Erreur lors de l'ajout de l'utilisateur" });
    }
  });
}

//connexion user
module.exports.connexion = async (req, res) => {
  const query = { name: req.body.name };
  try {
    const user = await userModel.findOne(query);
    //console.log(user);

    if (!user) {
      return res.status(402).json({ error: 'Name or password is incorrect' });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!result) {
        return res.status(402).json({ error: 'Nom ou mot de passe incorrect' });
      }
      return res.status(200).json({
        userName: user.name,
        userRole: user.role,
        token: jwt.sign(
          { userName: user.name, userRole: user.role },
          process.env.TOKEN_SECRET,
          { expiresIn: '1h' })
      });
    });     

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

//update user
module.exports.updateUser = async (req, res) => {
  const query = { name: req.params.name };
  try {
    const user = await userModel.findOneAndReplace(query, { name: req.body.name });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: "Erreur lors de la mise à jour du l'utilisateur" });
  }
}

//delete user
module.exports.deleteUser = async (req, res) => {
  const query = { name: req.params.name };
  try {
    const user = await userModel.findOneAndDelete(query);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
}
