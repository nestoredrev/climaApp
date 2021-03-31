const axios = require('axios'); //axios es el paquete que permite hacer peticiones http desde node mediante promesas
//request (actualmente deprecated) es el paquete que permite hacer peticiones http desde node mediante callbacks


let getLugar = async ( dir ) => {

    try {
        const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'; // GeoDB Cities
        const apiKey = '38573a9f0fmshcc31f7c9452a762p166945jsn7265be4d92db';
    
        const instance = axios.create({
            baseURL: url,
            headers: {'x-rapidapi-key': apiKey},
            params: {
                namePrefix: dir,
                languageCode: 'es'
            }
        });
    
        const respuesta  = await instance.get();

        if( respuesta.data.data.length === 0 ) {
            throw new Error('Sin resultados o ciudad no valida');
        }
        else {
            return respuesta.data.data.map ( lugar => {
                return {
                    id: lugar.id,
                    nombre: lugar.name,
                    nombreCompleto: `${lugar.name}, ${lugar.country} [${lugar.countryCode}], ${lugar.region}`,
                    lat: lugar.latitude,
                    lon: lugar.longitude
                }
            });
        }
        
    } catch (error) {
        console.log(error);
        return [];
    }


}

module.exports = {
    getLugar
}

