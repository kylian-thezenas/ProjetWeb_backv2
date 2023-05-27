const router = require('express').Router();
const auth = require('../middleware/auth');
const pokemonController = require('../controllers/pokemonController');


router.get('/api/pokemon', pokemonController.allPokemons);
router.post('/api/pokemon/', auth, pokemonController.addPokemon);
router.get('/api/pokemon/:number', pokemonController.getPokemon);
router.put('/api/pokemon/:number', pokemonController.updatePokemon);
router.delete('/api/pokemon/:number', pokemonController.deletePokemon);

module.exports = router;