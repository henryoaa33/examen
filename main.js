function validarDatos() {
    var nombre = document.getElementById('nombre').value;
    var identidad = document.getElementById('identidad').value;

    var nombreRegex = /^[a-zA-Z\s]+$/;
    if (!nombreRegex.test(nombre) || nombre.split(' ').length < 2) {
        alert('Error en el nombre. Solo se permiten letras y deben ser al menos 2 palabras.');
        document.getElementById('nombre').focus();
        return;
    }

    var identidadRegex = /^[0-1]\d{12}$/;
    if (!identidadRegex.test(identidad)) {
        alert('Error en la identidad. Solo se permiten números, debe tener 13 números y debe iniciar con 0 o 1.');
        document.getElementById('identidad').focus();
        return;
    }


    guardarRegistro(nombre, identidad);
}

function guardarRegistro(nombre, identidad) {
    var fecha = new Date();
    var nuevoRegistro = [
        obtenerUltimoID() + 1,
        nombre,
        identidad,
        fecha.toLocaleDateString(),
        fecha.getHours(),
        fecha.getMinutes()
    ];

    var registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(nuevoRegistro);
    localStorage.setItem('registros', JSON.stringify(registros));


    console.log(registros);
    limpiarFormulario();
    mostrarRegistros();
}

function obtenerUltimoID() {
    var registros = JSON.parse(localStorage.getItem('registros')) || [];
    return registros.length === 0 ? 0 : registros[registros.length - 1][0];
}

function mostrarRegistros() {
    var registros = JSON.parse(localStorage.getItem('registros')) || [];
    var table = document.getElementById('registrosTable');
    table.innerHTML = '';

    var headers = ['ID', 'Nombre', 'Identidad', 'Fecha', 'Hora', 'Minuto'];
    var headerRow = table.insertRow(0);

    for (var i = 0; i < headers.length; i++) {
        var headerCell = headerRow.insertCell(i);
        headerCell.innerHTML = '<b>' + headers[i] + '</b>';
    }

    for (var i = 0; i < registros.length; i++) {
        var row = table.insertRow(i + 1);

        for (var j = 0; j < registros[i].length; j++) {
            var cell = row.insertCell(j);
            cell.innerHTML = registros[i][j];
        }
    }
}

function limpiarFormulario() {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }


    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            inputs[i].focus();
            break;
        }
    }
}

function limpiarVehiculos() {
    var clave = document.getElementById('clave').value;

    if (clave === 'PW12023') {
        var table = document.getElementById('registrosTable');
        table.innerHTML = '';
    } else {
        alert('Clave incorrecta. No se pueden borrar los vehículos.');
    }
}