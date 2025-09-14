// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. 
// Aquí deberás desarrollar la lógica para resolver el problema.

// ================================
// VARIABLES GLOBALES
// ================================

//declaración de una variable de tipo array, que almacenará los nombres de los amigos ingresados.
let listaAmigosSorteados = [];
let nombreAmigo = '';
// Expresión regular para validar que el nombre contenga solo letras y espacios.    
const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

// ================================
// FUNCIONES AUXILIARES
// ================================

// Función de validación del contenido ingresado en el campo amigo.
function validarContenidoCampoAmigo(nombreAmigoIngresado) {
    // //Valida la entrada asegurando que el campo no esté vacío. Si está vacío, muestra un mensaje de error: "Por favor, inserte un nombre."
    if (nombreAmigoIngresado === "") {
        alert('⚠️ Por favor, inserte un nombre.');
        return false;
    }

    // Validación de solo letras (permite espacios entre palabras) 
    if (!soloLetras.test(nombreAmigoIngresado)) {
        alert('⚠️ Solo se permiten letras. No se permiten números ni caracteres especiales.');
        return false;
    }

    // Validación de duplicados.
    if (listaAmigosSorteados.includes(nombreAmigoIngresado)) {
        alert(`⚠️ El nombre "${nombreAmigoIngresado}" ya fue agregado.`);
        return false;
    }

    return true; // Si pasa todas las validaciones
}

// Función que valida que haya al menos un amigo en la lista
function validarContenidoListaAmigos() {
    if (listaAmigosSorteados.length === 0) {
        alert("⚠️ No hay amigos en la lista para realizar esta acción.");
        return false;
    }
    return true;
}

//Implementación de la función que recorre el array ListaAmigos y agrega cada nombre como un elemento <li> dentro de una lista HTML.     
function actualizarListaVisual() {
    //Obtener el elemento de la lista utilizando document.getElementById() para seleccionar la lista donde se mostrarán los amigos.
    const ListaAmigosVisual = document.getElementById("listaAmigos");
    //Limpiar la lista antes de agregar nuevos elementos, usando innerHTML.
    ListaAmigosVisual.innerHTML = ""; // Limpiar lista anterior        
    //Iterar sobre el arreglo amigos y crear elementos de lista (<li>) para cada título.
    listaAmigosSorteados.forEach(
        function(amigo) {
            //Agregar elementos a la lista: Para cada amigo, crear un nuevo elemento de lista.
            const li = document.createElement("li");
            li.textContent = amigo;
            ListaAmigosVisual.appendChild(li);
        });
}

// ================================
// FUNCIONES PRINCIPALES
// ================================

/*Implementación de la función para agregar amigos
Permite al usuario ingresar un nombre en el campo de texto y añadirlo a la lista de amigos creada anteriormente.*/
function agregarAmigo() {
    try {
        //Limpia el resultado del sorteo.
        document.getElementById("resultado").innerHTML = "";

        //Captura el valor del campo de entrada    
        const campoEntrada = document.getElementById("amigo");
        const nombreAmigoIngresado = campoEntrada.value.trim().toUpperCase();

        console.log(`nombreAmigoIngresado: ${nombreAmigoIngresado}`);
                    
         // Llamada a la función de validación del contenido del campo de entrada.
        if (!validarContenidoCampoAmigo(nombreAmigoIngresado)) {
            return; // Si alguna validación falla, se detiene la función
        }

        //Actualizar el array de amigos: Si el valor es válido, lo añade al arreglo que almacena los nombre de amigos usando el método.push().
        listaAmigosSorteados.push(nombreAmigoIngresado);    
        
        console.log(listaAmigosSorteados);

        //Limpiar el campo de entrada: Después de añadir el nombre, restablecer el campo de texto a una cadena vacía.
        campoEntrada.value = "";
        
        //Mostrar en pantalla los nombres ingresados
        actualizarListaVisual();

    } catch (error) {
        console.error("❌ Error en agregarAmigo():", error);
        alert("Ocurrió un error al intentar agregar el amigo. Intente de nuevo.");
    }    
}; 

//Implementación de la función que seleccione de manera aleatoria uno de los nombres almacenados en el array listaAmigosSorteados. 
function sortearAmigo() {
    try {
        // 1. Validar que haya amigos disponibles: Antes de sortear, comprobar si el array amigos no está vacío.
        if (!validarContenidoListaAmigos()) return; // Llama a la validación reutilizable.

        // 2. Generar un índice aleatorio usando Math.random() y Math.floor().
        const indiceAleatorio = Math.floor(Math.random() * listaAmigosSorteados.length);

        // 3. Obtener el nombre sorteado utilizando el índice aleatorio para acceder al nombre correspondiente en el arreglo.
        const amigoSorteado = listaAmigosSorteados[indiceAleatorio];

        // 4. Mostrar el resultado en el HTML 
        // actualizando el contenido del elemento de resultado utilizando document.getElementById() e innerHTML para mostrar el amigo sorteado.
        document.getElementById("resultado").innerHTML = `<li>🎉 Amigo secreto: <strong>${amigoSorteado}</strong></li>`;                

     } catch (error) {
        console.error("❌ Error en sortearAmigo():", error);
        alert("Ocurrió un error durante el sorteo. Intente de nuevo.");
    }
}