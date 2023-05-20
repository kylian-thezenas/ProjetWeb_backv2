const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/api/user/', userController.allUser);
router.post('/api/user/login', userController.connexion);
router.post('/api/user/signup', userController.inscription);
router.get('/api/user/connected', auth, userController.getUser);
//router.put('/api/user/:name', userController.updateUser);
router.delete('/api/user/:name', userController.deleteUser);

module.exports = router;