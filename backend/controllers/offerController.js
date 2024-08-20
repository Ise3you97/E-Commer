const Offer = require('../models/offerModel');

// Crear una nueva oferta
exports.createOffer = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    // Verificar si todos los campos están presentes
    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const newOffer = new Offer({
      name,
      description,
      price,
      image
    });

    await newOffer.save();
    res.status(201).json({ message: 'Oferta creada exitosamente', offer: newOffer });
  } catch (error) {
    console.error('Error al crear la oferta:', error);
    res.status(500).json({ message: 'Error al crear la oferta' });
  }
};

// Obtener todas las ofertas
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json({ offers });
  } catch (error) {
    console.error('Error al obtener las ofertas:', error);
    res.status(500).json({ message: 'Error al obtener las ofertas' });
  }
};

// Obtener una oferta por su ID
exports.getOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }

    res.status(200).json({ offer });
  } catch (error) {
    console.error('Error al obtener la oferta:', error);
    res.status(500).json({ message: 'Error al obtener la oferta' });
  }
};
