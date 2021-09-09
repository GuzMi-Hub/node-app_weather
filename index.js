require('dotenv').config();

const { pausa, inquirerMenu, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
const colors = require('colors');


const main = async () => {
  let opt = "";
  const busquedas = new Busquedas();
  console.log(process.env);

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Mostrar mensaje
        const ciudadBuscada = await leerInput("Ciudad: ");

        // buscar los lugares
        const lugares = await busquedas.ciudad(ciudadBuscada);

        // seleccionar el lugar
        const id = await listarLugares(lugares);
        const lugarSelecionado = lugares.find(lugar => lugar.id === id)

        //clima

        //Mostrar resultados
        console.log("\n Información de la ciudad\n".green);
        console.log("Ciudad:", colors.magenta(lugarSelecionado.name));
        console.log("Lat:", lugarSelecionado.latitud);
        console.log("Lng:", lugarSelecionado.longitud);
        console.log("Temperatura:");
        console.log("Mínima:");
        console.log("Máxima:");

        break;
      case 2:
        break;

      default:
        break;
    }

    opt !== 0 ? await pausa() : null;
  } while (opt !== 0);
};

main();
