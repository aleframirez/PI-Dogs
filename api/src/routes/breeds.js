const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { prueba, allInfo, getFromId, postNewDog, getAllTemperaments } = require('../services/breedsService');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', prueba);

router.get('/breeds', allInfo);

router.get('/breeds/search', allInfo);

router.get('/breeds/:id', getFromId);

router.post('/breeds/create', postNewDog);

router.get("/temperaments", getAllTemperaments);


module.exports = router;
