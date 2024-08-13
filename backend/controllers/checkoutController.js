// controllers/checkoutController.js
const stripe = require('stripe')('sk_test_51Pn2MJA4rGsRdyPf365ARadpyawil7v0gR9HpFD1kdulGilwyGJloQ85OpsIadbQiI8Yy6ZMCFLDJ4tDzZDqqe4d00dN3cTqvL');

const handleCheckout = async (req, res) => {
  const { name, address, token, totalAmount } = req.body;

  try {
    // Crea un cargo con Stripe
    const charge = await stripe.charges.create({
      amount: Math.round(totalAmount * 100), // Monto en centavos
      currency: 'usd',
      description: 'Compra en tienda',
      source: token,
      receipt_email: 'cliente@ejemplo.com',
    });

    // Puedes guardar la información del pedido en la base de datos aquí

    res.json({ success: true });
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  handleCheckout
};
