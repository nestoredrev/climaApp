const Clima = require('../models/model.clima');

const guardarBusqueda = async (data) => {

    const clima = new Clima(data);

    await clima.save();
}

const listarHistorial = async () => {
    const busquedas = await Clima.find({},'nombreCiudad');
    if(busquedas.length === 0) return 'No hay tareas creadas';
    return busquedas;
}





module.exports = {
    guardarBusqueda,
    listarHistorial
}