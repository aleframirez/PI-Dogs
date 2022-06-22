const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { prueba, getInfo, getByName, getTemperaments, postDogs, getById } = require('../services/breedsService');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', prueba);

router.get('/breeds', getInfo);

router.get('/breeds/search', getByName);

router.get('/breeds/:id', getById);

router.post('/breeds/create', postDogs);

router.get("/temperaments", getTemperaments);


module.exports = router;
