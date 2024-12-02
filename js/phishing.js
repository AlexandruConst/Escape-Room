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
    elemento.textContent += texto[indice];
    indice++;

    setTimeout(function () {
      escribirTexto(id, indice, texto, callback);
    }, 70);
  } else if (callback) {
    callback();
  }
}

function contenidoPhishing() {
  const contenidoPhishing = document.getElementById("contenidoPhishing");

  const textos = [
    "¡MUY B1EN! Tenem0s 3 de los 4 dig1t0s qu3 nec3s1tamos p4ra deten3r e1 ataqu3.",
    "Ll3gam0s a la últ1m4 prueba.",
    "Vam0s a dem0str4r lo qu3 sab3mos."
  ];


  const faseTextosPhishing = crearElemento("div", "faseTextosPhishing");
  contenidoPhishing.appendChild(faseTextosPhishing);

  const p1 = crearElemento("p", "textoPhishing1");
  const p2 = crearElemento("p", "textoPhishing2");
  const p3 = crearElemento("p", "textoPhishing3");

  faseTextosPhishing.appendChild(p1);
  faseTextosPhishing.appendChild(p2);
  faseTextosPhishing.appendChild(p3);

  escribirTexto("textoPhishing1", 0, textos[0], function () {
    escribirTexto("textoPhishing2", 0, textos[1], function () {
      escribirTexto("textoPhishing3", 0, textos[2], function () {
        mostrarBotonAvanzar(faseTextosPhishing);
      });
    });
  });
}

function mostrarBotonAvanzar(div) {
  const divBotonPhishing = crearElemento("div", "divBotonPhishing");
  const botonAvanzarPhishing = crearElemento("button", "botonAvanzarPhishing");
  botonAvanzarPhishing.textContent = "C0ntinu4r";

  botonAvanzarPhishing.addEventListener("click", function () {
    divBotonPhishing.remove();

    const mensajeTemporalPhishing = crearElemento("h2", "mensajeTemporalPhishing");
    div.appendChild(mensajeTemporalPhishing);

    const texto = "Neces1tam0s el últim0 dígito."

    escribirTexto("mensajeTemporalPhishing", 0, texto, function () {
      setTimeout(function () {
        const ventanaJuego = window.open("https://view.genially.com/67476521dfe57f9580e7ef87/interactive-content-quiz-phising");

        const intervalo = setInterval(function () {
          if (ventanaJuego.closed) {
            clearInterval(intervalo);
            faseTextosPhishing.remove();
            mostrarInputRespuesta();
          }
        }, 1000);
      }, 2000);
    })
  });

  div.appendChild(divBotonPhishing);
  divBotonPhishing.appendChild(botonAvanzarPhishing);
}


// Mostrar input para validar respuesta
function mostrarInputRespuesta() {
  const contenidoPhishing = document.getElementById("contenidoPhishing");

  const faseRespuesta = crearElemento("div", "faseRespuesta");
  contenidoPhishing.appendChild(faseRespuesta);

  const preguntaPhishing = crearElemento("p", "preguntaPhishing");
  faseRespuesta.appendChild(preguntaPhishing);

  const parrafoPreguntaPhishing = crearElemento("p", "parrafoPreguntaPhishing");
  faseRespuesta.appendChild(parrafoPreguntaPhishing);

  const textoPregunta = "¿Habé1s cons3guid0 el últim0 dígito?";
  const textoParrafoPregunta = "Dem0strad1o:";

  escribirTexto("preguntaPhishing", 0, textoPregunta, function () {
    escribirTexto("parrafoPreguntaPhishing", 0, textoParrafoPregunta, function () {
      const input = crearElemento("input", "inputRespuestaPhishing");
      input.setAttribute("type", "text");
      input.setAttribute("placeholder", "4921837560");
      input.setAttribute("autocomplete", "off");
      input.setAttribute("maxlength", "1");
      faseRespuesta.appendChild(input);

      const feedback = crearElemento("div", "feedback");
      faseRespuesta.appendChild(feedback);

      const respuestaCorrecta = "9";


      input.addEventListener("input", function () {
        const valor = input.value.trim();
        feedback.innerHTML = "";

        if (valor === respuestaCorrecta) {
          input.setAttribute("disabled", "true");

          const mensaje = crearElemento("p", "mensajeCorrecto");
          feedback.appendChild(mensaje);

          escribirTexto("mensajeCorrecto", 0, "¡C0RRECT0! VAMOS A DET3NER E1 ATAQUE :)", function () {
            setTimeout(function () {
              window.location.href = "6_claveCompleta.html";
            }, 3000);
          });
        } else {
          const mensajeError = crearElemento("p", "mensajeError");
          mensajeError.textContent = ":(";
          feedback.appendChild(mensajeError);
        }
      });
    })
  });
}


contenidoPhishing();