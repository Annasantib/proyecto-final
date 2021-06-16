const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	number: /^\d{7,14}$/ // 7 a 14 numeros. permite el + y otros simbolos
}

const campos = {
	name: false,
	mail: false,
	number: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
		case "name":
			validarCampo(expresiones.name, e.target, 'name');
		break;
		case "mail":
			validarCampo(expresiones.mail, e.target, 'mail');
		break;
		case "number":
			validarCampo(expresiones.number, e.target, 'number');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	document.getElementById('formulario__mensaje_error').classList.remove('activo');
	document.getElementById('formulario__mensaje_exito').classList.remove('activo');

	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		campos[campo] = false;
	}
}

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.name && campos.mail && campos.number){
		document.getElementById('formulario__mensaje_error').classList.remove('activo');
		document.getElementById('formulario__mensaje_exito').classList.add('activo');
		formulario.reset();
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
		 	icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje_error').classList.add('activo');
		document.getElementById('formulario__mensaje_exito').classList.remove('activo');
	}
});

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
