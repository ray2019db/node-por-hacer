const colors = require('colors'); // Importa el paquete 'colors' instalado por npm para dar color a los textos mostrados en consola

const argv = require('./config/yargs').argv; // Importar el objeto 'argv' ubicado en el archivo './config/yargs'

const porHacer = require('./tareas/por-hacer'); // Importar todas las propiedades y métodos del archivo './tareas/por-hacer'

let comando = argv._[0]; // Almacena primera posición del arreglo [0] en la key '_' (_: [comando, pocisón 2, ...]) dentro del objeto 'argv'

switch (comando) { // Bucle 'switch' para realizar una tarea específica según el valor de 'comando'
    case 'crear':
        let nuevaTarea = porHacer.crearTarea(argv.descripcion); // Almacena lo que retorna el método 'porHacer.crearTarea()' se pasa como parámetro la descripción almacenada en el objeto 'argv' (argv.descripcion)
        console.log(nuevaTarea);
        break;
    case 'listar':
        let tareas = porHacer.getListado(argv.completado); // Este método retorna un arreglo con las tareas que coincidan con 'argv.completado' pasado por parámetro y lo almacena en esta variable
        for (let tarea of tareas) { // Ciclo For para recorrer todas las tareas del arreglo retornado por la función 'getListado()'
            console.log('===============Tareas==============='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('===================================='.green);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado); // Devuelve un 'true' o un 'false' y almacena en el archivo de la DB la tarea actualizada con los datos pasados por parámetros (imprime en consola 'true' si todo OK o 'false' si existe un error)
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion); // Elimina del archivo de la DB la tarea cuya descripción es pasada por parámetro y devuelve un 'true' si todo OK o 'false' si existe un error
        console.log(borrado);
        break;
    default:
        console.log('Comando no reconocido');
}