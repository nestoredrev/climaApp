require('colors');
const inquirer = require('inquirer');

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Qué desea hacer?',
        choices: [
            {
                value: '1',
                name:  `${ '1.'.green } Buscar ciudad`
            },
            {
                value: '2',
                name: `${ '2.'.green } Historial`
            },
            {
                value: '0',
                name:  `${ '0.'.green } Salir`
            }
        ]
    }
];


const pausaQuestions = [
    {
        type: 'input',
        name: 'continuar',
        message: `Precione ${ 'ENTER'.green } para continuar`
    }
];


const inquirerMenu = async() => {

    console.log('======================='.green);
    console.log('Seleccione una opción'.cyan);
    console.log('=======================\n'.green);

    const { opcion } = await inquirer.prompt(menuOpts);
    return opcion;

}


const pausa = async () => {
    
    console.log('\n');
    await inquirer.prompt(pausaQuestions);
    console.clear();
}


const leerInput = async( mensaje ) => {

    const questions = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate ( value ) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(questions);
    return desc;
}


const listarLugaqres = async ( lugares = [] ) => {
    
    const choices = lugares.map( (lugar, index) => {
        
        const idx = `${index + 1}.`.green;

        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombreCompleto }`
        }
    });


    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ];

    const { id } = await inquirer.prompt(questions);
    return id;
}





module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugaqres
}
