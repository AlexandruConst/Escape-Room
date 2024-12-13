/*
  Autor: Alexandru Constandes
  Fecha: 02/12/2024
*/

// Verificar si el audio ya ha comenzado en esta sesión
if (localStorage.getItem('audioStarted') === 'true') {
  // Verificar si el objeto 'audio' ya existe en la ventana
  if (!window.audio) {
    // Si el objeto 'audio' no existe, lo creamos
    window.audio = new Audio('mp3/audio.mp3');
    window.audio.loop = true;  // Para que el audio se repita

    // Obtener el tiempo guardado en localStorage y continuar desde allí
    const tiempoGuardado = parseFloat(localStorage.getItem('audioCurrentTime') || '0');
    window.audio.currentTime = tiempoGuardado;

    // Reproducir el audio
    window.audio.play().then(() => {
      console.log("El audio continúa en reproducción.");
    }).catch((error) => {
      console.error("Error al continuar reproduciendo el audio:", error);
    });
  } else {
    // Si el audio ya está presente, simplemente lo reanudamos desde el tiempo guardado
    const tiempoGuardado = parseFloat(localStorage.getItem('audioCurrentTime') || '0');
    window.audio.currentTime = tiempoGuardado;

    window.audio.play().then(() => {
      console.log("El audio sigue en reproducción.");
    }).catch((error) => {
      console.error("Error al continuar reproduciendo el audio:", error);
    });
  }

  // Agregar un evento para actualizar el tiempo de reproducción
  window.audio.ontimeupdate = function () {
    localStorage.setItem('audioCurrentTime', window.audio.currentTime);
  };
} else {
  console.log("El audio no ha comenzado.");
}

function crearElemento(tipo, id) {
  let elemento = document.createElement(tipo);
  elemento.id = id;
  return elemento;
}

function escribirTexto(id, indice, texto, callback) {
  const elemento = document.getElementById(id);

  if (indice < texto.length) {
    elemento.textContent += texto[indice];
    indice++;

    setTimeout(function () {
      escribirTexto(id, indice, texto, callback);
    }, 70);
  } else if (callback) {
    callback();
  }
}

function contenidoParejas() {
  const contenidoParejas = document.getElementById("contenidoParejas");

  const textos = [
    "¡Muy b1en! Habéis s1d0 capaces d3 encontrar la IP.",
    "Para detener el ataque t3nemos qu3 s3gu1r avanzando.",
    "Esta v3z pondr3mos a prueba la mem0ria."
];

  // Creamos un div para la fase de textos
  const faseTextos = crearElemento("div", "faseTextos");
  contenidoParejas.appendChild(faseTextos);

  const p1 = crearElemento("p", "texto1");
  const p2 = crearElemento("p", "texto2");
  const p3 = crearElemento("p", "texto3");

  faseTextos.appendChild(p1);
  faseTextos.appendChild(p2);
  faseTextos.appendChild(p3);

  let indiceTexto1 = 0;
  let indiceTexto2 = 0;
  let indiceTexto3 = 0;

  escribirTexto("texto1", indiceTexto1, textos[0], function () {
    escribirTexto("texto2", indiceTexto2, textos[1], function () {
      escribirTexto("texto3", indiceTexto3, textos[2], function () {
        mostrarBotonAvanzar(faseTextos);
      });
    });
  });
}

function mostrarBotonAvanzar(faseTextos) {
  const divBoton = crearElemento("div", "divBoton");
  const botonAvanzar = crearElemento("button", "botonAvanzar");
  botonAvanzar.textContent = "Av4nzar";

  botonAvanzar.addEventListener("click", function () {
    // Eliminar el botón después de hacer click
    divBoton.remove();

    const mensajeTemporal = crearElemento("h2", "mensajeTemporal");
    faseTextos.appendChild(mensajeTemporal);

    const texto = "Rec0rdad el núm3ro.";  
    let indice = 0;

    
    escribirTexto("mensajeTemporal", indice, texto, function () {
      setTimeout(function () {
        const ventanaJuego = window.open("https://view.genially.com/673b49e11801c08c9d52f605/interactive-content-encuentra-la-pareja");

        const tiempoLimite = 310000; // 5 minutos 10 segundos

        // flag para evitar ejecuciones duplicadas al cerrar 
        // la ventana automaticamente
        let flag = false; 

        // Cerrar la ventana automáticamente después de 5 minutos 10 segundos
        setTimeout(function () {
          if (!flag) {
            flag = true;
            ventanaJuego.close();
            faseTextos.remove();
            mostrarInputRespuesta();
          }
        }, tiempoLimite);

        // Detectar cierre manual de la ventana
        const intervalo = setInterval(function () {
          if (ventanaJuego.closed && !flag) {
            flag = true;
            clearInterval(intervalo); 
            faseTextos.remove(); 
            mostrarInputRespuesta();
          }
        }, 1000);
      }, 2000); 
    });
  });

  faseTextos.appendChild(divBoton);
  divBoton.appendChild(botonAvanzar);
}



// Mostrar input para validar respuesta
function mostrarInputRespuesta() {
  const contenidoParejas = document.getElementById("contenidoParejas");

  // Creo un div para la fase de respuesta
  const faseRespuesta = crearElemento("div", "faseRespuesta");
  contenidoParejas.appendChild(faseRespuesta);

  const pregunta = crearElemento("p", "pregunta");
  faseRespuesta.appendChild(pregunta);

  
  const textoPregunta = "Intr0duc1d el núm3ro para c0nt1nuar:";
  let indicePregunta = 0;

  escribirTexto("pregunta", indicePregunta, textoPregunta, function () {
    // Después de que el texto de la pregunta se haya mostrado, muestro el input
    const input = crearElemento("input", "inputRespuestaParejas");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "4921837560");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("maxlength", "1");
    faseRespuesta.appendChild(input);

    const feedback = crearElemento("div", "feedback");
    faseRespuesta.appendChild(feedback);

    const respuestaCorrecta = "3";

    input.addEventListener("input", function () {
      const valor = input.value.trim();
      feedback.innerHTML = "";

      if (valor === respuestaCorrecta) {
        input.setAttribute("disabled", "true");

        const mensaje = crearElemento("p", "mensajeCorrecto");
        feedback.appendChild(mensaje);

        escribirTexto("mensajeCorrecto", 0, "¡C0RRECT0! Redir1giend0...", function () {
          setTimeout(function () {
            window.location.href = "4_desencriptado.html"; 
          }, 2000);
        });
      } else {
        const mensajeError = crearElemento("p", "mensajeError");
        mensajeError.textContent = ":(";
        feedback.appendChild(mensajeError);
      }
    });
  });
}




contenidoParejas();
