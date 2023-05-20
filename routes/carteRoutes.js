const router = require('express').Router();
const carteController = require('../controllers/carteController');

router.get('/api/carte', carteController.allCarte)
router.post('/api/carte/', carteController.addCarte);
router.get('/api/carte/:name', carteController.getCarte);
router.put('/api/carte/:name', carteController.updateCarte);
router.delete('/api/carte/:name', carteController.deleteCarte);

module.exports = router;