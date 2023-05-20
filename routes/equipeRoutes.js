const router = require('express').Router();
const equipeController = require('../controllers/equipeController');

router.get('/api/equipe/', equipeController.allEquipe);
router.post('/api/equipe/', equipeController.addEquipe);
router.get('/api/equipe/:name', equipeController.getEquipe);
router.put('/api/equipe/:name', equipeController.updateEquipe);
router.delete('/api/equipe/:name', equipeController.deleteEquipe);

module.exports = router;