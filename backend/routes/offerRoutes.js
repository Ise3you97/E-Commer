const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// Ruta para crear una nueva oferta
router.post('/', offerController.createOffer);

// Ruta para obtener todas las ofertas
router.get('/', offerController.getAllOffers);

// Ruta para obtener una oferta por su ID
router.get('/:id', offerController.getOfferById);

module.exports = router;
