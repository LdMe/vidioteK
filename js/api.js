const BASE_URL ="http://openlibrary.org/";


//solo para metodo GET
async function fetchData(url,parameters={}) {
    try {
        const finalUrl = new URL(BASE_URL + url);
        Object.keys(parameters).forEach(param=>{
            finalUrl.searchParams.append(param,parameters[param]);
        })
        const response =await fetch(finalUrl.toString());
        console.log(response)
        const data = await response.json();
        console.log("data",data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getLibrosFantasia(){
    const url = "subjects/fantasy.json";
    const result = await fetchData(url);
    console.log(result);
    return result;
}
async function buscarLibro(busqueda){
    const url = "search.json";
    const parameters = {
        q:busqueda
    }
    const result = await fetchData(url,parameters);
    return result;
}


export {
    getLibrosFantasia,
    buscarLibro
}