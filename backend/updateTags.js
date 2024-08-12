const mongoose = require('mongoose');
const Product = require('./models/Product'); // Asegúrate de tener la ruta correcta al modelo

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    
    // Actualizar todos los productos para agregar un valor predeterminado para el tag
    return Product.updateMany({}, { $set: { tag: "default-tag" } });
  })
  .then(result => {
    console.log("Productos actualizados:", result);
  })
  .catch(err => {
    console.error("Error al actualizar productos:", err);
  })
  .finally(() => {
    mongoose.connection.close(); // Cerrar la conexión a la base de datos
  });
