/*
  Autor: Alexandru Constandes
  Fecha: 02/12/2024
*/

const contenidoNoticia = document.getElementById("contenidoNoticia");

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


const texto = "SALIMOS EN LAS NOTICIAS";

const h2Noticia = crearElemento("h2", "h2Noticia");

contenidoNoticia.appendChild(h2Noticia);




escribirTexto("h2Noticia", 0, texto, function () {
  // Cuando el texto termina de escribirse, añadir imagen 
  const imagenNoticia = crearElemento("img", "imagenNoticia");
  imagenNoticia.src = "./img/noticia1.png";
  imagenNoticia.alt = "Noticia";

  contenidoNoticia.appendChild(imagenNoticia);
});

// Detener el audio y limpiar el estado en localStorage cuando el juego termine
if (window.audio && localStorage.getItem('audioPlaying') === 'true') {
  window.audio.pause();  // Detenemos el audio
  localStorage.removeItem('audioStarted');  // Limpiamos el estado de inicio
  localStorage.removeItem('audioPlaying');
  localStorage.removeItem('audioCurrentTime');  // Limpiamos la posición actual del audio
  console.log("Audio detenido y estado limpiado.");
}
