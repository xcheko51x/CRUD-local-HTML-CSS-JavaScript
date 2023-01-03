let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || puestoInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {

    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

function mostrarEmpleados() {
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');
    
    const table = document.createElement('table')
    table.setAttribute('id', 'lista')
    table.setAttribute('border', 1)

    const tHead = document.createElement('thead')
    const trHead = document.createElement('tr')
    
    const thId = document.createElement('th')
    const textThId = document.createTextNode('ID')
    thId.appendChild(textThId)

    const thNombre = document.createElement('th')
    const textThNombre = document.createTextNode('NOMBRE')
    thNombre.appendChild(textThNombre)

    const thPuesto = document.createElement('th')
    const textThPuesto = document.createTextNode('PUESTO')
    thPuesto.appendChild(textThPuesto)

    const thEditar = document.createElement('th');
    const textThEditar = document.createTextNode('EDITAR');
    thEditar.appendChild(textThEditar)

    const thBorrar = document.createElement('th');
    const textThBorrar = document.createTextNode('BORRAR');
    thBorrar.appendChild(textThBorrar)

    trHead.appendChild(thId)
    trHead.appendChild(thNombre)
    trHead.appendChild(thPuesto)
    trHead.appendChild(thEditar)
    trHead.appendChild(thBorrar)

    tHead.appendChild(trHead)

    const tBody = document.createElement('tbody')

    listaEmpleados.forEach(empleado => {
        const { id, nombre, puesto } = empleado

        const trBody = document.createElement('tr')

        const tdId = document.createElement('td');
        const textTdId = document.createTextNode(id);
        tdId.appendChild(textTdId)

        const tdNombre = document.createElement('td');
        const textTdNombre = document.createTextNode(nombre);
        tdNombre.appendChild(textTdNombre)

        const tdPuesto = document.createElement('td');
        const textTdPuesto = document.createTextNode(puesto);
        tdPuesto.appendChild(textTdPuesto)

        const tdEditarBoton = document.createElement('td');
        const editarBoton = document.createElement('button');
        editarBoton.setAttribute('id', 'id-btn-editar');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn-editar');
        tdEditarBoton.appendChild(editarBoton);

        let tdEliminarBoton = document.createElement('td');
        let eliminarBoton = document.createElement('button');
        eliminarBoton.setAttribute('id', 'id-btn-eliminar');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn-eliminar');
        tdEliminarBoton.appendChild(eliminarBoton);

        trBody.appendChild(tdId)
        trBody.appendChild(tdNombre)
        trBody.appendChild(tdPuesto)
        trBody.appendChild(tdEditarBoton)
        trBody.appendChild(tdEliminarBoton)

        tBody.appendChild(trBody)
    })
    
    table.appendChild(tHead)
    table.appendChild(tBody)

    divEmpleados.appendChild(table)
}

function cargarEmpleado(empleado) {
    const {id, nombre, puesto} = empleado;

    nombreInput.value = nombre;
    puestoInput.value = puesto;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEmpleado() {

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;

    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;

        }

    });

    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}