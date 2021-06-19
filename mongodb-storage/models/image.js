const { Schema, model} = require('mongoose');
//Definicion del modelo de la imagen
const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    created_at: { type: Date, default: Date.now() }
});
//para utilizar la definicion necesitamos crear el modelo
module.exports = model('Image',ImageSchema);