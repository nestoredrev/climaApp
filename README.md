## ClimaApp

Para incializar la aplicacion
```
npm install
npm run start
```

La aplicacion consiste en mediante el linea de comandos de node introducir el lugar que queremos obtener la temperatura actual.

Para obtener las coordenas de la ciudad se ha utilizado la API de [GeoDB Cities](https://rapidapi.com/wirefreethought/api/geodb-cities) y mediante las coordenas obtenemos la tempatura del lugar con la API de [Open Weather](https://openweathermap.org/)

Todas las pusquedas se guardan en MongoDB
