import { PeliculaHtml,VideoClubHtml } from "./clasesHtml.js";
import { buscarLibro, buscarPelis, getLibrosFantasia,getPelis } from "./api.js";


function main(){
    const pelisList = document.getElementById("pelis__list");
    const miVideoClub = new VideoClubHtml("videoClub",pelisList);
    buscarPeliDesdeInput("harry potter",miVideoClub);
    buscarPeliDesdeInput("lord of the rings",miVideoClub);
    buscarPeliDesdeInput("avatar",miVideoClub);
    const formulario = document.getElementById("form-buscar");
    formulario.addEventListener("submit",(e)=>{
        e.preventDefault();
        const busqueda = formulario.query.value;
        buscarPeliDesdeInput(busqueda,miVideoClub);
    })

}

async function buscarPeliDesdeInput(busqueda,miVideoClub){
    const pelis = await buscarPelis(busqueda);
    const pelisAdaptadas = miVideoClub.adaptarDatosDeApiPelis(pelis.results)
    miVideoClub.agregarAlCatalogoDesdeArray(pelisAdaptadas);
}

main();
console.log("1hola")
