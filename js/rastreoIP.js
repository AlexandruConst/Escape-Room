/*
  Autor: Alexandru Constandes
  Fecha: 02/12/2024
*/

// PERMITIR VENTANAS EMERGENTES DE JUGAR POR PRIMERA VEZ, SI NO SE BLOQUEAN POR EL NAVEGADOR

const contenidoRastreoIP = document.getElementById("contenidoRastreoIP");

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

function crearBoton(divInstrucciones, parrafo, indiceParrafo, textoParrafo) {
  const divBoton = crearElemento("div", "divBoton");
  const botonEncontrarIP = document.createElement("button");
  botonEncontrarIP.textContent = "Ident1f1car la IP";

  botonEncontrarIP.addEventListener("click", function () {
    divBoton.remove();
    // Mostrar "L33d b13n l4s 1nstrucc10n3s." despues de hacer click y antes de redirigir a genially
    divInstrucciones.appendChild(parrafo);
    escribirTexto("parrafoRastreo4", indiceParrafo, textoParrafo, function () {
      // Esperar dos segundos antes de abrir la ventana
      setTimeout(abrirJuegoRastreoIP, 2000);
    });
  });

  divInstrucciones.appendChild(divBoton);
  divBoton.appendChild(botonEncontrarIP);
}

function mostrarBoton(divInstrucciones, parrafo, indiceParrafo, textoParrafo) {
  // Mostrar el boton medio seg después de mostrar el parrafo 2
  setTimeout(function () {
    crearBoton(divInstrucciones, parrafo, indiceParrafo, textoParrafo)
  }, 500)
}

// Función que genera el texto explicativo previo a la prueba 
function contenidoDivInstrucciones() {
  // Creo el div con id instrucciones
  const instrucciones = crearElemento("div", "instrucciones");

  // Inserto div instrucciones dentro del html
  contenidoRastreoIP.appendChild(instrucciones);

  const textoParrafoRastreo1 = "Para det3ner el ataque t3nem0s que 1dentificar la direcci0n IP desde la que están lanzando las pet1ci0nes.";
  const textoParrafoRastreo2 = "Ten3mos 5 m1nut0s para encontrarla.";
  const textoParrafoRastreo3 = "E1 tiemp0 c0rre...";
  const textoParrafoRastreo4 = "Leed b1en las 1nstrucci0nes.";  

  const p1 = crearElemento("p", "parrafoRastreo1");
  const p2 = crearElemento("p", "parrafoRastreo2");
  const p3 = crearElemento("p", "parrafoRastreo3");
  const p4 = crearElemento("p", "parrafoRastreo4");

  instrucciones.appendChild(p1);
  instrucciones.appendChild(p2);
  instrucciones.appendChild(p3);

  let indiceParrafoRastreo1 = 0;
  let indiceParrafoRastreo2 = 0;
  let indiceParrafoRastreo3 = 0;
  let indiceParrafoRastreo4 = 0;

  escribirTexto("parrafoRastreo1", indiceParrafoRastreo1, textoParrafoRastreo1, function () {
    // Despues de que termine de escribirse el p1 escribo el p2
    escribirTexto("parrafoRastreo2", indiceParrafoRastreo2, textoParrafoRastreo2, function () {
      // Despues de que termine de escribirse el p2 escribo el p3
      escribirTexto("parrafoRastreo3", indiceParrafoRastreo3, textoParrafoRastreo3, function () {
        // Después de que termine el párrafo 3 muestro el boton
        mostrarBoton(instrucciones, p4, indiceParrafoRastreo4, textoParrafoRastreo4);
      })
    });
  });
}

const tiempoLimite = 310000 // 5 min 10 seg

function abrirJuegoRastreoIP() {
  const ventanaJuego = window.open("https://view.genially.com/673dc88be2ce104ede14fc7c/interactive-content-mapamundi-radar-scape")

  // flag para evitar ejecuciones duplicadas al cerrar 
  // la ventana automaticamente
  let flag = false;

  // Cuando pasen 5 minutos 10 segundos cierro la ventana
  setTimeout(function () {
    if (!flag) {
      flag = true;
      ventanaJuego.close();
      introducirIP();
    }

  }, tiempoLimite);


  //Detectar cuando se cierra la ventana
  //Cada segundo reviso si se ha cerrado, y, si está cerrada, pido que se introduzca la IP
  const intervalo = setInterval(function () {
    if (ventanaJuego.closed && !flag) {
      flag = true;
      clearInterval(intervalo);  // Detener el intervalo una vez que la ventana se cierre
      introducirIP();
    }
  }, 1000);
}

function introducirIP() {
  document.getElementById("instrucciones").remove();
  const introducirIP = crearElemento("div", "introducirIP");
  contenidoRastreoIP.appendChild(introducirIP);

  const p1 = crearElemento("p", "parrafoRastreo5");
  introducirIP.appendChild(p1);
  let indiceParrafoRastreo5 = 0;
  const textoParrafoRastreo5 = "¿Habe1s 3nc0ntrad0 la IP?";
  escribirTexto("parrafoRastreo5", indiceParrafoRastreo5, textoParrafoRastreo5);


  const input = crearElemento("input", "inputIP");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "xxx.xxx.xxx.xxx");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("maxlength", "15");

  introducirIP.appendChild(input);

  // En este div se mostrará el botón continuar o la cara triste
  const feedback = crearElemento("div", "feedback");
  introducirIP.appendChild(feedback);

  const ip = "20.130.250.200";
  const ip2 = "020.130.250.200";

  input.addEventListener("input", function () {
    const valor = input.value.trim();

    feedback.innerHTML = "";

    if (valor === ip || valor === ip2) {
      // Si es correcto deshabilito el input y
      // creo el botón continuar que lleva a la siguiente prueba 
      input.setAttribute("disabled", "true");

      const mensaje = crearElemento("p", "mensajeCorrecto");
      feedback.appendChild(mensaje);

      const textoIPCorrecta = "Guardad esta part3 de 1a c1ave: 3";
      let indiceTextoIPCorrecta = 0;

      escribirTexto("mensajeCorrecto", indiceTextoIPCorrecta, textoIPCorrecta, function () {
        // Después de mostrar el texto, espero 2 segundos para mostrar el botón
        setTimeout(function () {
          const botonContinuar = crearElemento("button", "botonContinuar");
          botonContinuar.textContent = "C0NT1NUAR :)";
          botonContinuar.addEventListener("click", function () {
            window.location.href = "3_parejas.html";
          });

          feedback.appendChild(botonContinuar);
        }, 2000);
      });

    } else {
      const caritaTriste = crearElemento("p", "caritaTriste");
      caritaTriste.textContent = ":(";
      feedback.appendChild(caritaTriste);
    }
  });

}

contenidoDivInstrucciones();
