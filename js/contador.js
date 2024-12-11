
// Verifica si ya hay un tiempo inicial guardado
if (!localStorage.getItem('contador')) {
  // Si no existe, establece el tiempo inicial
  localStorage.setItem('contador', Date.now());
}

// Calcula y muestra el tiempo transcurrido hasta el momento
function showTiempoTranscurrido() {
  const contador = parseInt(localStorage.getItem('contador'), 10);
  const tiempoTranscurrido = Date.now() - contador; // En milisegundos

  // Convertir a minutos y segundos
  const minutos = Math.floor(tiempoTranscurrido / 60000); // 1 minuto = 60000 ms
  const segundos = ((tiempoTranscurrido % 60000) / 1000).toFixed(2); // Segundos restantes

  console.log(`Tiempo transcurrido desde el inicio: ${minutos} minutos y ${segundos} segundos`);
}

// Llama a esta función en cada página para ver el progreso
showTiempoTranscurrido();

// Si estás en la última página, calcula el tiempo total y resetea el contador
function finalizarContador() {
  const contador = parseInt(localStorage.getItem('contador'), 10);
  const tiempoTranscurrido = Date.now() - contador; // En milisegundos

  // Convertir a minutos y segundos
  const minutos = Math.floor(tiempoTranscurrido / 60000);
  const segundos = ((tiempoTranscurrido % 60000) / 1000).toFixed(2);

  console.log(`El tiempo total transcurrido es: ${minutos} minutos y ${segundos} segundos`);

  // Limpia el tiempo para futuras sesiones
  localStorage.removeItem('contador');
}
