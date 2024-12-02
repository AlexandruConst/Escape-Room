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

const contenidoClaveCompleta = document.getElementById("contenidoClaveCompleta");

const texto1 = "Introducid los 4 dígitos obtenidos para detener el ataque:";

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

      escribirTexto("mensajeClaveCorrecta1", 0, "¡¡¡HEMOS DETENIDO EL ATAQUE!!!", function () {
        escribirTexto("mensajeClaveCorrecta2", 0, "MUCHAS GRACIAS A TODOS :)", function () {
          setTimeout(function () {
            window.location.href = "7_noticia.html";
          }, 6000);
        })
      });
    } else {
      const mensajeError = crearElemento("p", "mensajeError");
      mensajeError.textContent = ":(";
      feedback.appendChild(mensajeError);
    }
  });
});
