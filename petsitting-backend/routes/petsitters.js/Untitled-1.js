

const express = require('express');
const router = express.Router();
const petsitterController = require('../controllers/petsitterController'); 

//Rotas para Petsitters

router.post('/', petsitterController.createPetsitter);          
router.get('/', petsitterController.getPetsitters);               
router.get('/:id', petsitterController.getPetsitterById);         
router.put('/:id', petsitterController.updatePetsitter);          
router.delete('/:id', petsitterController.deletePetsitter);       

module.exports = router;