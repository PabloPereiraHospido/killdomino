/**
 * Persists arbitrary game data to localStorage under the key 'data'.
 * @param {*} data - The value to store. It will be serialised with JSON.stringify.
 */
function guardarDatos(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

/**
 * Reads the raw stored game data string from localStorage.
 * @returns {string|null} The serialised data string, or null if nothing has been saved yet.
 */
function leerDatos() {
    return localStorage.getItem('data');
}

/*
let testJson = document.getElementById('testJson');
testJson.textContent = leerDatos();
*/