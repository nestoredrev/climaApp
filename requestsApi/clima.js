const axios = require('axios'); //axios es el paquete que permite hacer peticiones http desde node mediante promesas

const getClima = async (lat, lon) => {

    try {

        const apiKey = 'd59154e51ffab5b63734f4744769d201';
        const url = 'https://api.openweathermap.org/data/2.5/weather';
    
        const instance = axios.create({
            baseURL: url,
            params: {
                lat,
                lon,
                appid: apiKey,
                units: 'metric',
                lang: 'es'
            }
        });
    
        const respuesta  = await instance.get();
        if( !respuesta.data ) {
            throw new Error('Sin resultados o coordenadas no validas');
        } else {
            const  { main , weather } = respuesta.data;
                return {
                    temperatura: main.temp,
                    minima: main.temp_min,
                    maxima: main.temp_max,
                    estado: weather[0].description
                }
        }
    } catch (error) {
        console.log(error);
        return [];
    }

}

module.exports = {
    getClima
}