const descripcion = { // Almacena un objeto con la configuración de la bandera o flag 'descripción' para emplearla en la configración de los comandos
    demand: true, // Si es 'true' indica que la bandera o flag --descripcion es obligatoria
    alias: 'd', // Permite declarar un alias para la propiedad --descripción (en este caso -d)
    desc: 'Descripción de la tarea' // Permite establecer una descripción para la propiedad (Será mostrada con el comando --help como ayuda al usuario)
};

const completado = { // Almacena un objeto con la configuración de la bandera o flag 'completado' para emplearla en la configración de los comandos
    demand: true, // Si es 'true' indica que la bandera completado es obligatoria
    alias: 'c', // Permite declarar un alias para la flag --completado (en este caso -c)
    default: true, // Permite establecer un valor por defecto parala propiedad (en este caso si no se especifica -c = true)
    desc: 'Marca como completado o pendiente una tarea' // Permite establecer una descripción para la propiedad (Será mostrada con el comando --help como ayuda al usuario)
};


const argv = require('yargs') // Hago un llamado al paquete 'yargs' (instalado con el npm) para poder emplear todos sus métodos y propiedades
    .command('crear', 'Crear tarea', { descripcion }) // Declaración del comando 'crear'. Un comando se declara con la sgte estructura '.command('Nombre_del_comando', 'Descripcion_del_comando', {Opciones_del_comando})'
    .command('actualizar', 'Actualizar Tarea', { descripcion, completado }) // Declaración del comando 'actualizar'
    .command('borrar', 'Borrar Tarea', { descripcion }) // Declaración del comando 'borrar'
    .command('listar', 'Mostrar en consola las tareas', { completado })
    .help() // Permite mostrar una ayuda para el usuario (--help)
    .argv; // Objeto 'argv' que almacena los comandos y propiedades escritos en la línea de comandos

module.exports = { argv };