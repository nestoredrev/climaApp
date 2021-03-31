require('colors');
const { inquirerMenu, pausa, leerInput, listarLugaqres } = require('./helpers/inquirer');
const { dbConection, dbDisconect } = require('./db/conection');
const { guardarBusqueda, listarHistorial } = require('./db/controls/control.clima');
const { getLugar } = require('./requestsApi/lugar');
const { getClima } = require('./requestsApi/clima');


console.clear();


const conexionDB = async() => {
    await dbConection();
}

const main = async() => {
    
    let opt = '';
    
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                
                // Mostrar mensaje
                const ciudad = await leerInput('Buscar ciudad: '); 
                
                // Buscar lugares
                const lugares = await getLugar(ciudad);
                
                // Seleccionar el lugar
                const idLugar = await listarLugaqres(lugares);
                
                if( idLugar !== '0' )  {
                    const lugarSelecionado = lugares.find( lugar => lugar.id === idLugar);
                                    // Clima
                    const clima = await getClima(lugarSelecionado.lat, lugarSelecionado.lon);

                    // Mostrar resultados
                    console.log('\n Información de la ciudad\n'.green);
                    console.log('Ciudad: ', lugarSelecionado.nombreCompleto);
                    console.log('Latitud: ', lugarSelecionado.lat);
                    console.log('Longitud: ', lugarSelecionado.lon);
                    console.log('Temperatura: ', clima.temperatura + 'ºC');
                    console.log('Mínima: ', clima.minima + 'ºC');
                    console.log('Máxima: ', clima.maxima + 'ºC');
                    console.log('Estado del clima: ', clima.estado.green);

                    // guardar la busqueda en MongoDB
                    const dataToSave = {
                        idCiudadApi: idLugar,
                        nombreCiudad: lugarSelecionado.nombreCompleto,
                        latitud: lugarSelecionado.lat,
                        longitud: lugarSelecionado.lon,
                        temperatura: clima.temperatura,
                        tempMinima: clima.minima,
                        tempMaxima: clima.maxima,
                        estado: clima.estado
                    }
                    await guardarBusqueda(dataToSave);
                }
            break;

            case '2':
                const busquedas = await listarHistorial();
                Object.keys(busquedas).forEach ( (key, index) => {
                    
                    const busqueda = busquedas[key];
                    const posicion = `${ index + 1 }`.green;
                    const { nombreCiudad } = busqueda;

                    console.log(`${ posicion } ${ nombreCiudad }`);
                });

            break;
        }

        await pausa();

        if(opt === '0') await dbDisconect();

    } while ( opt !== '0' );
}


conexionDB();
main();