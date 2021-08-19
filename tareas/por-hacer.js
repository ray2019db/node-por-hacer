const fs = require('fs'); // Importa el File System 'fs' para poder usar todos sus métodos y propiedades en este archivo (No hay que instalarlo con npm ya viene con el node instalado)

let pendientes = []; // Arreglo que almacenará las tareas pendientes

const crearTarea = (descripcion) => {
    cargarDB(); // Almacena en el array 'pendientes' el contenido del archivo 'data.json'
    let nuevaTarea = { // Almacena en un objeto la nueva tarea o descripción pasada por parámetro y la key 'completado: false'
        descripcion,
        completado: 'false'
    };
    pendientes.push(nuevaTarea); // Inserta en el arreglo 'pendientes' el objeto anterior
    guardarEnDB(); // Guarda el contenido del arreglo 'pendientes' en el archivo 'data.json'
    return nuevaTarea; // Retorna el nuevo objeto almacenado en 'nuevaTarea'
};

const guardarEnDB = () => {
    let data = JSON.stringify(pendientes); // Almacena en formato JSON el contenido del arreglo 'pendientes'
    fs.writeFile('db/data.json', data, (err) => { // Guarda en el archivo 'db/data.json' el contenido de 'data'
        if (err) { // Si existe un error al guardar 'data' en el archivo 'db/data.json'
            throw new Error('No se pudo crear la tarea', err) // Envía el error y el sgte mensaje
        }
    });
};

const cargarDB = () => {
    try {
        pendientes = require('../db/data.json'); // Almacena el contenido del archivo '../db/data.json' en el arreglo 'pendientes' (si el arreglo no está vacío)
    } catch (error) {
        pendientes = []; // Almacena en 'pendientes' un arreglo vacío [] si existe un error
    }
};

const getListado = (completado) => {
    cargarDB(); // Almacena en el array 'pendientes' en contenido del archivo '../db/data.json'
    if (completado == 'true') { // Si 'completado' es 'true' (o sea si la tarea está completada) haz lo sgte
        let tareasCompletadas = pendientes.filter(tarea => tarea.completado === completado); // Almacena en un arreglo las tareas completadas
        return tareasCompletadas; // Retorna un arreglo con las tareas completadas
    }
    if (completado == 'false') { // Si 'completado' es 'false' (o sea si la tarea está pendiente) haz lo sgte
        let tareasPendientes = pendientes.filter(tarea => tarea.completado == completado); // Almacena en un arreglo las tareas pendientes
        return tareasPendientes; // Retorna un arreglo con las tareas pendientes
    } else {
        throw 'Error al introducir el comando'; // Si completado no es ni 'true' ni 'false' retorna el sgte mensaje de error
    }
};

const actualizar = (descripcion, completado = true) => {
    cargarDB(); // Carga el archivo 'data.json' en el arreglo 'pendientes'
    let index = pendientes.findIndex(tarea => tarea.descripcion === descripcion); // Halla la posición (index) en el arreglo 'pendientes' de la tarea cuya descripción coincida con la descripción pasada por parámetro
    if (index >= 0) {
        pendientes[index].completado = completado;
        guardarEnDB();
        return true
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB(); // Carga el archivo 'data.json' en el arreglo 'pendientes'
    let tareaEliminada = pendientes.filter(tarea => (tarea.descripcion === descripcion)) // Almacena la tarea cuya descripción coincide con la descripción pasada por parámetro
    if (tareaEliminada.length > 0) { // Si la longitud del arreglo 'pendientes' es mayor que 0 (significa que existe una tarea cuya descripción coincide con la pasada por parámetro) haz lo sgte
        pendientes = pendientes.filter(tarea => (tarea.descripcion !== descripcion)); // Almacena en el arreglo 'pendientes' tadas las tareas excepto la que coincide con la descripción pasada por parámetro
        guardarEnDB(); // Guarda en la DB el arreglo 'pendientes' modificado (una vez eliminada la tarea)
        return true; // Retorna 'true' para indicar que la tarea se eliminó con éxito
    } else {
        return false; // Retorna 'false' para indicar que la tarea no se eliminó
    }
}

module.exports = { crearTarea, getListado, actualizar, borrar }; // Exporta los métodos y propiedades que están dentro del objeto para que puedan ser empleados fuera de este archivo