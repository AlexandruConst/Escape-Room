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
    // Añade una letra más al texto mostrado
    elemento.textContent += texto[indice];
    indice++;

    // Llamo de nuevo a la función con el retraso de 100ms
    // setTimeout(escribirTexto, velocidad);
    setTimeout(function () {
      escribirTexto(id, indice, texto, callback); // Llamada recursiva
    }, 70);

  } else if (callback) {
    // Si el texto está completo, ejecuto el callback
    callback();
  }
}

function finalizarContador() {
  const contador = parseInt(localStorage.getItem('contador'), 10);
  const tiempoTranscurrido = Date.now() - contador; // En milisegundos

  // Convertir a minutos y segundos
  const minutos = Math.floor(tiempoTranscurrido / 60000);
  const segundos = ((tiempoTranscurrido % 60000) / 1000).toFixed(2);

  console.log(`El tiempo total transcurrido es: ${minutos} minutos y ${segundos} segundos`);
  const textoTiempo = `${minutos} M1NUT0S Y ${segundos} SEGUND0S`

  // Limpia el tiempo para futuras sesiones
  localStorage.removeItem('contador');

  return textoTiempo;
}

const contenidoClaveCompleta = document.getElementById("contenidoClaveCompleta");

const texto1 = "Intr0ducid los 4 dígitos obten1dos para detener el ataque:";

const parrafoTexto1 = crearElemento("p", "parrafoTexto1ClaveCompleta");

contenidoClaveCompleta.appendChild(parrafoTexto1);



escribirTexto("parrafoTexto1ClaveCompleta", 0, texto1, function () {
  const inputClaveCompleta = crearElemento("input", "inputClaveCompleta");
  inputClaveCompleta.setAttribute("type", "text");
  inputClaveCompleta.setAttribute("placeholder", "xxxx");
  inputClaveCompleta.setAttribute("autocomplete", "off");
  inputClaveCompleta.setAttribute("maxlength", "4");
  contenidoClaveCompleta.appendChild(inputClaveCompleta);


  const feedback = crearElemento("div", "feedback");
  contenidoClaveCompleta.appendChild(feedback);

  const claveCompleta = "3379";

  inputClaveCompleta.addEventListener("input", function () {
    const respuesta = inputClaveCompleta.value.trim();
    feedback.innerHTML = "";

    if (respuesta === claveCompleta) {
      inputClaveCompleta.setAttribute("disabled", "true");

      parrafoTexto1.remove();

      const mensajeClaveCorrecta1 = crearElemento("h2", "mensajeClaveCorrecta1");
      const mensajeClaveCorrecta2 = crearElemento("h2", "mensajeClaveCorrecta2");

      document.body.style.backgroundColor = "#00FF00";

      feedback.appendChild(mensajeClaveCorrecta1);
      feedback.appendChild(mensajeClaveCorrecta2);

      mensajeClaveCorrecta1.style.color = "black";
      mensajeClaveCorrecta2.style.color = "black";

      const textoMensajeClaveCorrecta1 = "¡¡¡HEMOS DETENIDO EL ATAQUE EN " + finalizarContador() + "!!!"

      escribirTexto("mensajeClaveCorrecta1", 0, textoMensajeClaveCorrecta1, function () {
        escribirTexto("mensajeClaveCorrecta2", 0, "MUCHAS GRACIAS A TODOS :)", function () {
          setTimeout(function () {
            const botonContinuar = crearElemento("button", "botonContinuarClaveCompleta");
            botonContinuar.textContent = "CONT1NUAR :)";

            // Acción del botón: redirigir a "7_noticia.html" al hacer clic
            botonContinuar.onclick = function () {
              window.location.href = "7_noticia.html";
            };

            feedback.appendChild(botonContinuar);
          }, 3000);
        })
      });
    } else {
      const mensajeError = crearElemento("p", "mensajeError");
      mensajeError.textContent = ":(";
      feedback.appendChild(mensajeError);
    }
  });
});
