const axios = require("axios");
require('colors');

class Busquedas {
  historial = [];

  constructor() {
    //TODO: leer DB si existe
  }

  get paramsMapbox(){
    return{
          'access_token':process.env.MAPBOX_KEY || '',
          'limit': 5,
          'language': 'es',
        }
  }
  get paramsOpenWeather(){
    return{
          'appid':process.env.OPENWEATHER_KEY || '',
          'units': 'metric',
          'lang': 'es', 
        }
  }



  async buscarLugar(lugar = "") {
    try {
      //petición http
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
        params: this.paramsMapbox,
      });

      const resp = await intance.get();

      return resp.data.features.map((lugar)=>{
        return {
              id: lugar.id, 
              name: lugar.place_name, 
              longitud: lugar.center[0],
              latitud: lugar.center[1]
            }

      })
    } catch (error) {
      console.error(error);
    }

    return [];
  }

  async climaLugar (latitud, longitud){

    try {
      
      const intance = axios.create({
          baseURL: 'https://api.openweathermap.org/data/2.5/weather?',
          params: {...this.paramsOpenWeather, 
                  'lat': latitud,
                  'lon': longitud,}
      });

      const resp = await intance.get();

      const {weather, main} = resp.data;

      return{
        temp: main.temp,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
        description: weather[0].description,
        
      }



    } catch (error) {
      console.error("\n=====================================================================".red);
      console.error(`error peticion a OpenWeather: ${error}`.red );
      console.error("=====================================================================".red);
    }

  }

}

module.exports = Busquedas;
