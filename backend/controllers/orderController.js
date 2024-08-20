const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { email ,name, address, products, totalAmount } = req.body;
  
  try {
    // Verifica que req.userId esté disponible
    if (!req.userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Crea una nueva orden
    const order = new Order({
      user: req.userId,
      email,
      name,
      address,
      products,
      totalAmount,
    });

    // Guarda la orden en la base de datos
    await order.save();
    
    // Responde con el pedido creado
    res.status(201).json(order);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    // Recupera todas las órdenes sin filtrar por usuario
    const orders = await Order.find().populate('user', 'name email');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
};


// Función para obtener todas las órdenes realizadas por un usuario específico utilizando el ID del token
exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.userId; // Obtener el userId desde el token de autenticación

    // Buscar todas las órdenes que coincidan con el userId
    const orders = await Order.find({ user: userId }).populate('user', 'name email');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Enviar las órdenes encontradas
    res.status(200).json(orders);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
};

exports.getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Obtén el email desde los parámetros de la ruta
    if (!email) {
      return res.status(400).json({ message: 'Email es requerido' });
    }

    const orders = await Order.find({ email: email }); // Consulta las órdenes con el email proporcionado
    if (!orders.length) {
      return res.status(404).json({ message: 'No se encontraron órdenes' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by email:', error);
    res.status(500).json({ message: 'Error al recuperar las órdenes' });
  }
};
