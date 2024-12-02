/*
  Autor: Alexandru Constandes
  Fecha: 02/12/2024
*/

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

const contenidoDesencriptado = document.getElementById("contenidoDesencriptado");
const divTextoPrincipio = crearElemento("div", "textoPrincipio");

function textoPrincipio() {
  contenidoDesencriptado.appendChild(divTextoPrincipio);

  const textoParrafoPrincipio1 = "De m0mento hemos c0ns3guido 2 de los 4 díg1tos de la clave.";
  const textoParrafoPrincipio2 = "Recordadlos, los vamos a nec3s1tar...";
  const textoParrafoPrincipio3 = "Para c0nsegu1r el t3rcer dígito t3n3m0s que encontrar la c0ntr4seña escondida en las t4rjetas que hay en la mesa.";
  const textoH2Principio = "El tiemp0 sigue c0rriendo...";

  const parrafoPrincipio1 = crearElemento("p", "parrafoPrincipio1");
  const parrafoPrincipio2 = crearElemento("p", "parrafoPrincipio2");

  divTextoPrincipio.appendChild(parrafoPrincipio1);
  divTextoPrincipio.appendChild(parrafoPrincipio2);

  escribirTexto("parrafoPrincipio1", 0, textoParrafoPrincipio1, function () {
    escribirTexto("parrafoPrincipio2", 0, textoParrafoPrincipio2, function () {
      // Espero 2 segundos después de escribir el segundo párrafo
      setTimeout(function () {
        // Elimino el div que contiene los dos primeros párrafos
        divTextoPrincipio.remove();

        // Creo un nuevo div para el tercer párrafo y el h2
        const divTextoNuevo = crearElemento("div", "textoNuevo");
        contenidoDesencriptado.appendChild(divTextoNuevo);

        const parrafoPrincipio3 = crearElemento("p", "parrafoPrincipio3");
        const h2Principio = crearElemento("h2", "h2Principio");

        divTextoNuevo.appendChild(parrafoPrincipio3);
        divTextoNuevo.appendChild(h2Principio);

        escribirTexto("parrafoPrincipio3", 0, textoParrafoPrincipio3, function () {
          escribirTexto("h2Principio", 0, textoH2Principio, function () {
            // Llamo a la función contenidoDivCodificado después de 3 segundos
            setTimeout(contenidoDivCodificado, 3000);
          });
        });
      }, 2000); // 2 segundos
    });
  });
}

function contenidoDivCodificado() {
  // Elimino el div textoNuevo
  const divTextoNuevo = document.getElementById("textoNuevo");
  if (divTextoNuevo) divTextoNuevo.remove();

  // Creo un nuevo div para el contenido Codificado
  const divCodificado = crearElemento("div", "codificado");
  contenidoDesencriptado.appendChild(divCodificado);

  const textoCodificado = "1ntroducid la c0ntr4señ4";

  const parrafoCodificado = crearElemento("p", "parrafoCodificado");
  divCodificado.appendChild(parrafoCodificado);

  escribirTexto("parrafoCodificado", 0, textoCodificado, function () {
    // Creo el input y lo muestro después de escribir el texto
    const input = crearElemento("input", "inputCodificado");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Nos lo han puesto c0mplicado...");
    input.setAttribute("autocomplete", "off");
    divCodificado.appendChild(input);

    // Div para feedback
    const feedback = crearElemento("div", "feedback");
    divCodificado.appendChild(feedback);

    const contraseña = "banco";

    // Validar la contraseña
    input.addEventListener("input", function () {
      const valor = input.value.toLowerCase().trim();
      feedback.innerHTML = "";

      if (valor === contraseña) {
        input.setAttribute("disabled", "true");

        const mensaje = crearElemento("p", "mensajeCorrecto");
        feedback.appendChild(mensaje);

        escribirTexto("mensajeCorrecto", 0, "¡MUY B13N! AVANZ4M0S...", function () {
          setTimeout(function () {
            contenidoDivCifrado();
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

function contenidoDivCifrado() {
  const divCodificado = document.getElementById("codificado");
  if (divCodificado) divCodificado.remove();

  const divCifrado = crearElemento("div", "cifrado");
  contenidoDesencriptado.appendChild(divCifrado);

  const textoCifrado1 = "Hemos av4nzado mucho, pero no h3m0s t3rm1nado...";
  const textoCifrado2 = "Utilizad la guía de descifrad0 ROT13 :)";


  const parrafoCifrado1 = crearElemento("p", "parrafoCifrado1");
  const h2Cifrado1 = crearElemento("h2", "h2Cifrado1")
  divCifrado.appendChild(parrafoCifrado1);
  divCifrado.appendChild(h2Cifrado1);


  escribirTexto("parrafoCifrado1", 0, textoCifrado1, function () {
    escribirTexto("h2Cifrado1", 0, textoCifrado2, function () {
      // Espero 3 segundos antes de limpiar y mostrar el input
      setTimeout(function () {
        divCifrado.innerHTML = "";

        const parrafoCifrado2 = crearElemento("p", "parrafoCifrado2");
        const h2Cifrado2 = crearElemento("h2", "h2Cifrado2");

        const input = crearElemento("input", "inputCifrado");
        input.setAttribute("type", "text");
        input.setAttribute("autocomplete", "off");

        const feedback = crearElemento("div", "feedbackCifrado");

        divCifrado.appendChild(parrafoCifrado2);
        divCifrado.appendChild(h2Cifrado2);

        escribirTexto("parrafoCifrado2", 0, "Descrifad el sigu1ente mensaje:", function () {
          escribirTexto("h2Cifrado2", 0, "RY AHZREB FRPERGB DHR RFGNVF OHFPNAQB RF FVRGR", function () {
            divCifrado.appendChild(input);
            divCifrado.appendChild(feedback);
          });
        });

        input.addEventListener("input", function () {
          const respuesta = input.value.trim().toUpperCase();
          feedback.innerHTML = "";

          if (comprobarRespuestaCifrado(respuesta)) {
            input.setAttribute("disabled", "true");
            parrafoCifrado2.remove();
            const botonContinuar = crearElemento("button", "botonContinuarCifrado");
            botonContinuar.textContent = "C0NT1NU4R :)";
            botonContinuar.addEventListener("click", function () {
              window.location.href = "5_phishing.html";
            });

            feedback.appendChild(botonContinuar);

          } else {
            const mensajeError = crearElemento("p", "mensajeError");
            mensajeError.textContent = ":(";
            feedback.appendChild(mensajeError);
          }
        });


      }, 3000);
    });
  });
}

function comprobarRespuestaCifrado(respuesta) {
  if (respuesta === "EL NÚMERO SECRETO QUE ESTÁIS BUSCANDO ES SIETE" || respuesta === "EL NUMERO SECRETO QUE ESTAIS BUSCANDO ES SIETE"
    || respuesta === "EL NÚMERO SECRETO QUE ESTAIS BUSCANDO ES SIETE" || respuesta === "EL NUMERO SECRETO QUE ESTÁIS BUSCANDO ES SIETE") {
    return true;
  } else {
    return false;
  }
}


textoPrincipio();