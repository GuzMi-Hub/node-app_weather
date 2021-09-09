const axios = require("axios");

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

  async ciudad(lugar = "") {
    try {
      //petición http
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
        params: this.paramsMapbox,
      });

      const resp = await intance.get();

      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }

    return [];
  }
}

module.exports = Busquedas;
