const express = require('express');
const router = express.Router();

const Cliente = require('./controllers/cliente');

router.get('/',(req, res)=>{
    res.json({titulo:'SNOOPY PetSHop API'});
});

router.post('/clientes',Cliente.create);
router.get('/clientes',Cliente.read);
router.patch('/clientes/:id',Cliente.update);
router.delete('/clientes/:id',Cliente.remove);

module.exports = router;