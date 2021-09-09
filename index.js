require('dotenv').config();

const { pausa, inquirerMenu, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt = "";
  const busquedas = new Busquedas();
  console.log(process.env);

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Mostrar mensaje
        const lugar = await leerInput("Ciudad: ");

        // buscar los lugares
        await busquedas.ciudad(lugar);

        // seleccionar el lugar

        //clima

        //Mostrar resultados
        console.log("\n Información de la ciudad\n".green);
        console.log("Ciudad:");
        console.log("Lat:");
        console.log("Lng:");
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
