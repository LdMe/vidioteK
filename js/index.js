import { PeliculaHtml,VideoClubHtml } from "./clasesHtml.js";
import { buscarLibro, getLibrosFantasia } from "./api.js";
import misDatos from "./datos.js";

async function main(){
    const pelisSection = document.getElementById("pelis");
    const pelisList = document.getElementById("pelis__list");
    const miVideoClub = new VideoClubHtml("videoClub",pelisList);
    const librosBuscados = await buscarLibro("harry potter");
    const librosAdaptados = miVideoClub.adaptarDatosDeApi(librosBuscados.docs);
    miVideoClub.agregarAlCatalogoDesdeArray(librosAdaptados)
    const pelisFantasia = await getLibrosFantasia();
    console.log(pelisFantasia)
    const pelisAdaptadas = miVideoClub.adaptarDatosDeApi(pelisFantasia.works)
    miVideoClub.agregarAlCatalogoDesdeArray(pelisAdaptadas);
}

main();