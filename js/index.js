import { PeliculaHtml,VideoClubHtml } from "./clasesHtml.js";
import misDatos from "./datos.js";

const pelisSection = document.getElementById("pelis");
const pelisList = document.getElementById("pelis__list");

const miVideoClub = new VideoClubHtml("videoClub",pelisList);
miVideoClub.agregarAlCatalogoDesdeArray(misDatos.peliculas);
