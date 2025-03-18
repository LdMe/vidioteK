class Alquilable {
    static cantidad = 0;
    constructor(titulo,autor,fechaLanzamiento,precio){
        this.id = ++Alquilable.cantidad;
        this.titulo = titulo;
        this.autor = autor;
        this.fechaLanzamiento = fechaLanzamiento;
        this.precio = precio;
        this.alquilado = false;
    }
    alquilar(){
        if(this.alquilado){
            throw new Error("Este alquilable ya ha sido alquilado");
        }
        this.alquilado = true;
    }
    devolver(){
        if(!this.alquilado){
            throw new Error("Este alquilable no estaba alquilado");
        }
        this.alquilado = false;
    }
    aTexto(){
        let result = `${this.constructor.name} ${this.titulo}\n`;
        result += `ID: ${this.id}\n`;
        result += `Autor: ${this.autor}\n`;
        result += `Año de lanzamiento: ${this.fechaLanzamiento}\n`;
        result += `Precio: ${this.precio}€\n`;
        result += `Alquilado: ${this.alquilado ? "si": "no"}`;
        return result;
    }
}

class Libro extends Alquilable{
    constructor(titulo,autor,fechaLanzamiento,precio,paginas){
        super(titulo,autor,fechaLanzamiento,precio);
        this.paginas=paginas;
    }
    aTexto(){
        let result = super.aTexto();
        result += `\nPáginas: ${this.paginas}`;
        return result;
    }
}

class Pelicula extends Alquilable {
    constructor(titulo,autor,fechaLanzamiento,precio,duracion){
        super(titulo,autor,fechaLanzamiento,precio);
        this.duracion=duracion;
    }
    aTexto(){
        let result = super.aTexto();
        result += `\nDuración: ${this.duracion}`;
        return result;
    }
}

class Tienda {
    constructor(nombre){
        this.nombre = nombre;
        this.catalogo = [];
    }
    agregarAlCatalogo(item){
        if(item instanceof Alquilable){
            this.catalogo.push(item);
        }else{
            throw new Error('Los elementos del catalogo deben ser alquilables.');
        }
    }
    agregarAlCatalogoDesdeArray(lista){
        for(let i = 0; i < lista.length; i++){
            const item = new Alquilable(lista[i].titulo,lista[i].autor,lista[i].fechaLanzamiento,lista[i].precio);
            this.agregarAlCatalogo(item);
        }
    }
    buscarEnCatalogo(id){
        const item = this.catalogo.find(item => item.id === id);
        if(item){
            return item;
        }
        throw new AlquilableNotFound("No existe un alquilable con este ID");
    }
    sacarDelCatalogo(id){
        const posicion = this.catalogo.findIndex(item => item.id === id);
        if(posicion === -1){
            throw new AlquilableNotFound("No existe un alquilable con este ID");
        }
        return this.catalogo.splice(posicion,1)[0];
    }
    alquilar(id){
        const item = this.buscarEnCatalogo(id);
        item.alquilar();
        return item;
    }
    devolver(id){
        const item = this.buscarEnCatalogo(id);
        item.devolver();
        return item;
    }
    aTexto(){
        let result = `${this.constructor.name} ${this.nombre}\nCatálogo:`;
        for(let i = 0; i < this.catalogo.length;i++){
            result += `\n--------\n${this.catalogo[i].aTexto()}`;
        }
        return result;
    }
}

class VideoClub extends Tienda{
    agregarAlCatalogo(item){
        if(item instanceof Pelicula){
            this.catalogo.push(item);
        }else{
            throw new Error('Los elementos del catalogo deben ser peliculas.');
        }
    }
    agregarAlCatalogoDesdeArray(lista){
        for(let i = 0; i < lista.length; i++){
            const item = new Pelicula(lista[i].titulo,lista[i].autor,lista[i].fechaLanzamiento,lista[i].precio,lista[i].duracion);
            this.agregarAlCatalogo(item);
        }
    }
}
class Biblioteca extends Tienda{
    agregarAlCatalogo(item){
        if(item instanceof Libro){
            this.catalogo.push(item);
        }else{
            throw new Error('Los elementos del catalogo deben ser libros.');
        }
    }
    agregarAlCatalogoDesdeArray(lista){
        for(let i = 0; i < lista.length; i++){
            const item = new Libro(lista[i].titulo,lista[i].autor,lista[i].fechaLanzamiento,lista[i].precio,lista[i].paginas);
            this.agregarAlCatalogo(item);
        }
    }
}
class AlquilableNotFound extends Error{
    constructor(message){
        super(message);
        this.status = 404;
    }
}



export {
    Pelicula,
    Libro,
    Biblioteca,
    VideoClub
}