
function saveToLocalStorage(key,value){
    const stringValue = JSON.stringify(value);
    console.log(stringValue);
    localStorage.setItem(key,stringValue);
}

function getFromLocalStorage(key){
    const resultString = localStorage.getItem(key);
    const result = JSON.parse(resultString);
    console.log("result from local",result)
    return result;
}

function addToLocalStorageArray(key,value){
    const array = getFromLocalStorage(key) || [];
    const index = array.findIndex(element=> element.id ===value.id)
    if(index !== -1){
        return;
    }
    array.push(value);
    saveToLocalStorage(key,array);
}
function removeFromLocalStorageArray(key,value){
    const array = getFromLocalStorage(key);
    if(!array){
        return;
    }
    const index = array.findIndex(element=> element.id ===value.id)
    if(index === -1){
        return;
    }
    array.splice(index,1);
    saveToLocalStorage(key,array);
}
function findInLocalStorageArray(key,value){
    const array  = getFromLocalStorage(key) || [];
    return array.find(element=>element.id===value.id);
}

export {
    saveToLocalStorage,
    getFromLocalStorage,
    addToLocalStorageArray,
    removeFromLocalStorageArray,
    findInLocalStorageArray
}