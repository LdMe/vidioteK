import { Pelicula,VideoClub} from "./poo.js";
import {addToLocalStorageArray,findInLocalStorageArray, removeFromLocalStorageArray} from "./localStorage.js"
class PeliculaHtml extends Pelicula {
    constructor(titulo, autor, fechaLanzamiento, precio, duracion) {
        super(titulo, autor, fechaLanzamiento, precio, duracion);
        this.articulo = null;
    }
    inicializar(elementoPadre){
        this.crearHtml(elementoPadre);
        this.renderizar();
    }
    alquilar(){
        super.alquilar();
        this.articulo.classList.add("alquilado");
    }
    devolver() {
        super.devolver();
        this.articulo.classList.remove("alquilado");
    }
    crearHtml(elementoPadre) {
        this.articulo = document.createElement("article");
        this.articulo.classList.add("pelicula", "tarjeta");

        elementoPadre.appendChild(this.articulo);
    }
    renderizar() {
        const esFavorito = findInLocalStorageArray("pelis",this); 
        // vaciar el articulo
        this.articulo.innerHTML = "";

        const titulo = document.createElement("h2");
        const listaAtributos = document.createElement("ul");
        const atributoAutor = document.createElement("li");
        const atributoFecha = document.createElement("li");
        const atributoPrecio = document.createElement("li");
        const atributoDuracion = document.createElement("li");
        const atributoAlquilado = document.createElement("li");
        const atributoId = document.createElement("li");
        const botonFavoritos = document.createElement("button");



        titulo.textContent = this.titulo;

        listaAtributos.classList.add("pelicula__atributos");

        atributoAutor.classList.add("atributo","autor")
        atributoAutor.textContent = "Autor:"+this.autor;

        atributoDuracion.classList.add("atributo","duracion");
        atributoDuracion.textContent = "Duración en minutos: "+this.duracion;

        atributoFecha.classList.add("atributo","fecha");
        atributoFecha.textContent = "Fecha lanzamiento: "+ this.fechaLanzamiento;

        atributoPrecio.classList.add("atributo","precio");
        atributoPrecio.textContent = "Precio: "+this.precio +"€";

        atributoAlquilado.classList.add("atributo","alquilado");
        atributoAlquilado.textContent = "Alquilado: "+ (this.alquilado ? "si": "no");

        atributoId.classList.add("atributo","id");
        atributoId.textContent = "ID: "+this.id;
        
        if(esFavorito){
            botonFavoritos.textContent="Quitar de favoritos";
        }else{
            botonFavoritos.textContent="Añadir a favoritos";
        }

        // añadir funcionalidad al boton
        botonFavoritos.addEventListener("click",()=>{
            if(esFavorito){
                removeFromLocalStorageArray("pelis",this)
            }else{
                addToLocalStorageArray("pelis",this)
            }
            this.renderizar();
        })
        // relacionar elementos
        listaAtributos.append(atributoId,atributoAutor, atributoDuracion, atributoFecha, atributoPrecio,atributoAlquilado);
        this.articulo.appendChild(titulo);
        this.articulo.appendChild(listaAtributos);
        this.articulo.appendChild(botonFavoritos)
    }
    eliminar(){
        this.articulo.remove();
    }
}

class VideoClubHtml extends VideoClub{
    constructor(nombre,seccion){
        super(nombre);
        this.seccion = seccion;
        this.inicializar();
    }
    inicializar(){
        const seccionAcciones = document.createElement("section");
        const buscador = document.createElement("input");
        const botonAlquilar = document.createElement("button")
        const botonDevolver = document.createElement("button");
        const botonEliminar = document.createElement("button");

        botonAlquilar.textContent ="Alquilar";
        botonDevolver.textContent ="Devolver";
        botonEliminar.textContent="Eliminar";

        // añadir funcionalidades a los botones y al input
        buscador.addEventListener("input",(e)=>{
            console.log(e.target.value);
        });

        botonAlquilar.addEventListener("click",()=>{
            const id = buscador.value;
            if(!id || isNaN(id)){
                return;
            }
            try{
                const item =this.alquilar(parseInt(id));
                item.renderizar();
                console.log("alquilar con id:"+id)
            }catch(error){
                console.error(error);
                alert(error.message);
            }
        })
        botonDevolver.addEventListener("click",()=>{
            const id = buscador.value;
            if(!id || isNaN(id)){
                return;
            }
            try{
                const item =this.devolver(parseInt(id));
                item.renderizar();
                console.log("devolver con id:"+id)
            }catch(error){
                console.error(error);
                alert(error.message);
            }
        })
        botonEliminar.addEventListener("click",()=>{
            const id = buscador.value;
            if(!id || isNaN(id)){
                return;
            }
            try{
                if(confirm("¿Seguro que deseas eliminar el alquilable?")){
                    const item =this.sacarDelCatalogo(parseInt(id));
                    item.eliminar();
                    console.log("eliminar con id:"+id)
                    console.log(this.catalogo)
                }
            }catch(error){
                console.error(error);
                alert(error.message);
            }
        })


        seccionAcciones.append(buscador,botonAlquilar,botonDevolver,botonEliminar);
        this.seccion.appendChild(seccionAcciones);


    }
    agregarAlCatalogo(item){
        super.agregarAlCatalogo(item);
        item.inicializar(this.seccion);
    }

    agregarAlCatalogoDesdeArray(lista){
        for(let i = 0; i < lista.length; i++){
            const item = new PeliculaHtml(lista[i].titulo,lista[i].autor,lista[i].fechaLanzamiento,lista[i].precio,lista[i].duracion);
            this.agregarAlCatalogo(item);
        }
    }
    adaptarDatosDeApiLibros(lista){
        return lista.map(peli =>{
            console.log(peli.author_name)
            return {
                titulo: peli.title,
                autor: peli.authors ? peli.authors[0].name : peli.author_name ? peli.author_name[0]: "Desconocido",
                fechaLanzamiento: peli.first_publish_year || "Desconocida",
                precio: 9.99,
                duracion: 90
            }
        })
    }
    adaptarDatosDeApiPelis(lista){
        return lista.map(peli =>{
            return {
                titulo:peli.title,
                autor: "desconocido",
                fechaLanzamiento: peli.release_date,
                precio: 9.99,
                duracion: 90
            }
        })
    }
}



export{
    PeliculaHtml,
    VideoClubHtml
}