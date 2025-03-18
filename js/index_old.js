const peliculas = [
    { titulo: "El Padrino", autor: "Francis Ford Coppola", fechaLanzamiento: 1972, precio: 12.99, duracion: 175 },
    { titulo: "Interestelar", autor: "Christopher Nolan", fechaLanzamiento: 2014, precio: 14.50, duracion: 169 },
    { titulo: "Parásitos", autor: "Bong Joon-ho", fechaLanzamiento: 2019, precio: 10.99, duracion: 132 },
    { titulo: "Gladiador", autor: "Ridley Scott", fechaLanzamiento: 2000, precio: 11.75, duracion: 155 },
    { titulo: "Mad Max: Furia en la Carretera", autor: "George Miller", fechaLanzamiento: 2015, precio: 13.20, duracion: 120 }
];

function crearHtmlDeLibro(libro){

}
function crearHtmlDePeli(pelicula){
    // definicion de elementos
    const articulo = document.createElement("article");
    const titulo = document.createElement("h2");
    const listaAtributos = document.createElement("ul");
    const atributoAutor = document.createElement("li");
    const atributoFecha = document.createElement("li");
    const atributoPrecio = document.createElement("li");
    const atributoDuracion = document.createElement("li");

    // rellenar elementos
    articulo.classList.add("pelicula","tarjeta");

    titulo.textContent =pelicula.titulo;

    listaAtributos.classList.add("pelicula__atributos");

    atributoAutor.textContent = pelicula.autor;
    atributoDuracion.textContent = pelicula.duracion;
    atributoFecha.textContent = pelicula.fechaLanzamiento;
    atributoPrecio.textContent = pelicula.precio;

    // relacionar elementos
    listaAtributos.append(atributoAutor,atributoDuracion,atributoFecha,atributoPrecio);
    articulo.appendChild(titulo);
    articulo.appendChild(listaAtributos);
    return articulo;
}


const pelisSection = document.getElementById("pelis");
const pelisList = document.getElementById("pelis__list");
// añadir titulo a la saccion de pelis
// const title = document.createElement("h1");
// title.textContent ="Películas";
// pelisSection.appendChild(title);

// añadir listener al boton de añadir

const botonAnadir = document.querySelector("#pelis button");
const botonBorrar = pelisSection.getElementsByTagName("button")[1];
//const botonAnadir2 = pelisSection.getElementsByTagName("button")[0];
let peliActual = 0;
botonAnadir.addEventListener("click",(e)=>{
    console.log("click");
    if(peliActual >= peliculas.length){
        return;
    }
    const tarjetaPeli = crearHtmlDePeli(peliculas[peliActual]);
    pelisList.appendChild(tarjetaPeli);
    peliActual++;
    if(peliActual == peliculas.length){
        botonAnadir.setAttribute("disabled","true");
    }
    
})

botonBorrar.addEventListener("click",()=>{
    pelisList.innerHTML="";
    peliActual = 0;
    botonAnadir.removeAttribute("disabled");
})


