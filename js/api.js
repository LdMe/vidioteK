import { apiKey } from "./apikey.js";
const BASE_URL_LIBROS ="http://openlibrary.org/";
const BASE_URL_PELIS = "https://api.themoviedb.org/3/"

//solo para metodo GET
async function fetchDataLibros(url,parameters={}) {
    try {
        const finalUrl = new URL(BASE_URL_LIBROS + url);
        Object.keys(parameters).forEach(param=>{
            finalUrl.searchParams.append(param,parameters[param]);
        })
        const response = await fetch(finalUrl.toString());
        console.log(response)
        const data = await response.json();
        console.log("data",data);
        return data;
    } catch (error) {
        console.error(error);
    }
}
async function fetchDataPelis(url,parameters={}) {
    try {
        const finalUrl = new URL(BASE_URL_PELIS + url);
        Object.keys(parameters).forEach(param=>{
            finalUrl.searchParams.append(param,parameters[param]);
        })
        const response =await fetch(finalUrl.toString(),{
            headers:{
                Authorization: "Bearer " + apiKey
            }
        });
        const data = await response.json();
        console.log("data",data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getLibrosFantasia(){
    const url = "subjects/fantasy.json";
    const result = await fetchDataLibros(url);
    console.log(result);
    return result;
}
async function buscarLibro(busqueda){
    const url = "search.json";
    const parameters = {
        q:busqueda
    }
    const result = await fetchDataLibros(url,parameters);
    return result;
}

async function getPelis(){
    const url = "discover/movie";
    const response = await fetchDataPelis(url);
    return response;
}
async function buscarPelis(busqueda,pagina=1){
    const url ="search/movie";
    const parameters = {
        query: busqueda,
        page:pagina

    }
    const response = await fetchDataPelis(url,parameters);
    return response;
}

export {
    getLibrosFantasia,
    buscarLibro,
    getPelis,
    buscarPelis
}