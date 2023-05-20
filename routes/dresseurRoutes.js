const router = require('express').Router();
const dresseurController = require('../controllers/dresseurController');

router.get('/api/dresseur/', dresseurController.allDresseurs);
router.post('/api/dresseur/', dresseurController.addDresseur);
router.get('/api/dresseur/:name', dresseurController.getDresseur);
router.put('/api/dresseur/:name', dresseurController.updateDresseur);
router.delete('/api/dresseur/:name', dresseurController.deleteDresseur);

module.exports = router;