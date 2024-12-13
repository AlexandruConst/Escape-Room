/*
  Autor: Alexandru Constandes
  Fecha: 02/12/2024
*/

// Crear la función para iniciar el audio
function iniciarAudio() {
  // Crear el objeto de audio
  const audio = new Audio('mp3/audio.mp3');
  audio.loop = true;  // Para que el audio se repita

  // Intentar reproducir el audio
  audio.play().then(() => {
    console.log("Audio iniciado correctamente.");
  }).catch((error) => {
    console.error("Error al intentar reproducir el audio:", error);
  });

  // Guardar en localStorage que el audio ha comenzado
  localStorage.setItem('audioStarted', 'true');
  localStorage.setItem('audioPlaying', 'true');

  // Guardar el objeto de audio en window para poder acceder a él en otras páginas
  window.audio = audio;

  // Almacenar la posición del audio en localStorage
  audio.ontimeupdate = function () {
    localStorage.setItem('audioCurrentTime', audio.currentTime);
  };
}



// Texto que irá aparenciendo poco a poco

const textoTitulo = "Hem0s s1do atac4d0s...";
const textoParrafo1 = "Ten3m0s 2O m1nut0s p4ra sa1var al b4nc0.";
const textoParrafo2 = "¿Estáis pr3p4rad0s?";
const textoTitulo2 = "¡C0M3NZAM0S!";
const textoTituloNo = "Más 0s va1e 3star pr3par4d0s... ¡C0M3NZAM0S!";


// Velocidad en ms a la que irá apareciendo el texto
const velocidad = 70;

// Indice posicion titulos y parrafos
let indiceTitulo = 0;
let indiceParrafo1 = 0;
let indiceParrafo2 = 0;
let indiceTitulo2 = 0;
let indiceTituloNo = 0;

function crearElemento(tipo, id) {
  let elemento = document.createElement(tipo);
  elemento.id = id;
  return elemento;
}

// Creo elementos h1, p y h2

const titulo = crearElemento("h1", "titulo");
const parrafo1 = crearElemento("p", "parrafo1");
const parrafo2 = crearElemento("p", "parrafo2");
const titulo2 = crearElemento("h2", "titulo2");
const tituloNo = crearElemento("h2", "tituloNo");


// Div del index.html
const contenidoIndex = document.getElementById("contenidoIndex");

// Inserto h1 y p dentro del div del html
contenidoIndex.appendChild(titulo);
contenidoIndex.appendChild(parrafo1);
contenidoIndex.appendChild(parrafo2);


function escribirTexto(id, indice, texto, callback) {
  const elemento = document.getElementById(id);

  if (indice < texto.length) {
    // Añade una letra más al texto mostrado
    elemento.textContent += texto[indice];
    indice++;

    // Llamo de nuevo a la función con el retraso de 100ms
    // setTimeout(escribirTexto, velocidad);
    setTimeout(function () {
      escribirTexto(id, indice, texto, callback); // Llamada recursiva
    }, velocidad);

  } else if (callback) {
    // Si el texto está completo, ejecuto el callback
    callback();
  }
}


function crearBotones() {
  const divBotones = crearElemento("div", "divBotones");

  const botonSi = document.createElement("button");
  botonSi.textContent = "SI";

  const botonNo = document.createElement("button");
  botonNo.textContent = "N0";

  botonSi.addEventListener("click", function () {
    divBotones.remove();

    iniciarAudio();

    // Mostrar "¡C0M3NZ4M0S!" después de hacer clic en "SI"
    contenidoIndex.appendChild(titulo2);
    escribirTexto("titulo2", indiceTitulo2, textoTitulo2, function () {
      // Esperar dos segundos antes de redirigir a la siguiente página
      setTimeout(function () {
        window.location.href = "2_rastreoIP.html";
      }, 2000) // 2 segundos
    });
  });

  botonNo.addEventListener("click", function () {
    divBotones.remove();

    iniciarAudio();
    
    // Mostrar "M4s 0s v413 3st4r pr3p4r4d0s. ¡C0M3NZ4M0S!" después de hacer clic en "NO"
    contenidoIndex.appendChild(tituloNo);
    escribirTexto("tituloNo", indiceTituloNo, textoTituloNo, function () {
      // Esperar dos segundos antes de redirigir a la siguiente página
      setTimeout(function () {
        window.location.href = "2_rastreoIP.html";
      }, 2000) // 2 segundos
    });
  });



  contenidoIndex.appendChild(divBotones);
  divBotones.appendChild(botonSi);
  divBotones.appendChild(botonNo);
}

function mostrarBotones() {
  // Mostrar los botones medio seg después de mostrar el parrafo 2
  setTimeout(crearBotones, 500);
}

// Comienza a escribir el título
escribirTexto("titulo", indiceTitulo, textoTitulo, function () {
  // Después de que termine el título escribo el párrafo 1
  escribirTexto("parrafo1", indiceParrafo1, textoParrafo1, function () {
    // Después de que termine el párrafo 1 escribo el párrafo 2
    escribirTexto("parrafo2", indiceParrafo2, textoParrafo2, function () {
      // Después de que termine el párrafo 2 muestro los botones
      mostrarBotones();
    });
  });
});














