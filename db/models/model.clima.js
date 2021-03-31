const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const climaSchema = new Schema({
    idCiudadApi : {
      type: String,
      trim: true,
      required: [true, 'El campo idCiudadApi es obligatorio']
    },
    nombreCiudad: {
        type: String,
        trim: true,
        required: [true, 'El campo nombreCiudad es obligatorio']
    },
    latitud: Number,
    longitud: Number,
    temperatura: Number,
    tempMinima: Number,
    tempMaxima: Number,
    estado: String,
    busquedaGuardadaEn: {
        type: Date,
        default: Date.now()
    }
}); 


climaSchema.set('toObject', {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  })

module.exports = mongoose.model('Clima', climaSchema);