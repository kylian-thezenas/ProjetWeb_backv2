const router = require('express').Router();
const typeController = require('../controllers/typeController');

router.get('/api/type/', typeController.allType);
router.post('/api/type/', typeController.addType);
router.get('/api/type/:name', typeController.getType);
router.put('/api/type/:name', typeController.updateType);
router.delete('/api/type/:name', typeController.deleteType);

module.exports = router;