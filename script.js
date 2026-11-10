//recordatorio de medicamentos
// Código base (no modificar)
const programarRecordatorio = (medicamento, ms) => new Promise((resolve, reject) => {
  if (ms > 0) {
    setTimeout(() => resolve("Hora de tomar " + medicamento), ms);
  } else {
    reject("Tiempo inválido para " + medicamento);
  }
});

// R1: Programa un recordatorio de "Acetaminofén" a 1000 ms y muestra el mensaje con .then()
// R2: Muestra los errores con .catch() como "Error: <motivo>"
// R3: Agrega .finally() que imprima "Recordatorio cerrado"
programarRecordatorio("Acetaminofén", 1000)
  .then(mensaje => console.log(mensaje))
  .catch(error => console.log("Error: " + error))
  .finally(() => console.log("Recordatorio cerrado"));

// R4: Programa "Vitamina C" con 0 ms (después del primero en el código)
programarRecordatorio("Vitamina C", 0)
  .then(mensaje => console.log(mensaje))
  .catch(error => console.log("Error: " + error))
  .finally(() => console.log("Recordatorio cerrado"));

// R5: Al final del archivo imprime "App lista"
console.log("App lista");

/* 
💭 Respuestas "Para pensar":
1. ¿Por qué su error aparece primero (Vitamina C)? 
R/ Porque 0 ms hace que la promesa entre al bloque 'else' y se rechace de manera inmediata (síncrona) en su creación, enviando el error a la cola de microtareas que se ejecuta casi al instante, mientras que el Acetaminofén debe esperar 1 segundo (1000 ms) en la Web API.

2. ¿Y por qué "App lista" sale antes que todo?
R/ Porque el console.log("App lista") es código síncrono. JavaScript ejecuta primero todo el código síncrono del hilo principal antes de revisar la cola de microtareas (promesas resueltas/rechazadas) y la cola de callbacks (setTimeout).
*/

//cajero automatico
// Código base (no modificar)
const cuenta = { titular: "Camila", pin: "4821", saldo: 300000 };
const COMISION = "1500";
const retirar = (pinIngresado, monto) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (pinIngresado !== cuenta.pin) {
      reject("PIN incorrecto");
    } else if (monto > cuenta.saldo) {
      reject("Saldo insuficiente");
    } else {
      resolve(cuenta.saldo - monto);
    }
  }, 800);
});

// R1: Retira 50000 con el PIN "4821" e imprime "Nuevo saldo: $<saldo>"
retirar("4821", 50000)
  .then(saldo => console.log("Nuevo saldo: $" + saldo))
  .catch(error => console.log("Error: " + error));

// R2: Intenta el retiro con el PIN escrito como número (4821)
retirar(4821, 50000)
  .then(saldo => console.log("Nuevo saldo: $" + saldo))
  .catch(error => console.log("Error: " + error));

// R3: Intenta retirar 500000
retirar("4821", 500000)
  .then(saldo => console.log("Nuevo saldo: $" + saldo))
  .catch(error => console.log("Error: " + error));

// R4: Retira 50000 más la COMISION. Imprime "Con comisión: $<saldo>"
retirar("4821", 50000 + Number(COMISION))
  .then(saldo => {
    console.log("Con comisión: $" + saldo);
    // R5: Cuando termine el R4, imprime el saldo guardado en la cuenta
    console.log("Saldo en la cuenta: $" + cuenta.saldo);
  })
  .catch(error => console.log("Error: " + error));

/*
💭 Respuestas "Para pensar":
1. ¿Qué valor recibió retirar si escribes 50000 + COMISION sin convertir?
R/ Recibió el string "500001500" debido a la concatenación (número + string = string). Como "500001500" es mayor que 300000, arroja "Saldo insuficiente".

2. ¿Por qué la cuenta sigue en $300000 después de retirar?
R/ Porque la función retirar calcula y devuelve la resta (resolve(cuenta.saldo - monto)), pero en ningún momento reasigna ni muta el valor original del objeto cuenta (no hace cuenta.saldo = cuenta.saldo - monto).
*/

//pedido de comida rapida
// Código base (no modificar)
const paso = (nombre, ms) => new Promise((resolve) => setTimeout(() => resolve(nombre), ms));

// R1: Crea let pasos = 0
let pasos = 0;

// R2: Encadena los pasos, suma 1 e imprime. Retorna el siguiente paso.
paso("Pedido recibido", 300)
  .then(estado => {
    console.log(estado);
    pasos += 1;
    return paso("Cocinando", 1000);
  })
  .then(estado => {
    console.log(estado);
    pasos += 1;
    return paso("Empacando", 400);
  })
  .then(estado => {
    console.log(estado);
    pasos += 1;
    return paso("Listo para recoger", 200);
  })
  .then(estado => {
    console.log(estado);
    pasos += 1;
    // R3: En el último .then imprime el total de pasos
    console.log("Total de pasos: " + pasos);
  })
  .catch(error => console.log("Error: " + error))
  // R4: Agrega .finally() con "Gracias por tu compra"
  .finally(() => console.log("Gracias por tu compra"));

// R5: Al final del archivo imprime los pasos
console.log("Pasos al final del archivo: " + pasos);

/*
💭 Respuestas "Para pensar":
1. ¿Por qué la última línea imprime 0 si la cadena suma 4?
R/ Porque el console.log de la última línea es síncrono y se ejecuta inmediatamente al leer el archivo, momento en el cual las promesas asíncronas de los pasos aún no se han resuelto ni han modificado la variable.

2. ¿Qué pasaría si olvidas el return en el .then de "Cocinando"?
R/ El siguiente .then ("Empacando") no esperaría a que la promesa termine. Se ejecutaría inmediatamente recibiendo undefined, rompiendo el orden de ejecución y la sincronía de los tiempos (los setTimeout).
*/

//comparador de vuelos
// Código base (no modificar)
const aerolinea = (nombre, ms, precio) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (precio !== null) {
      resolve({ nombre, precio });
    } else {
      reject(nombre + ": sin sillas");
    }
  }, ms);
});
const buscarVuelos = () => [
  aerolinea("AeroSol", 400, null),
  aerolinea("VuelaYa", 700, 350000),
  aerolinea("Cóndor", 900, 290000),
];

// R1: Promise.race(buscarVuelos()) muestra la primera respuesta o falla
Promise.race(buscarVuelos())
  .then(resultado => console.log(resultado))
  .catch(motivo => console.log("Race falló: " + motivo));

// R2: Promise.any(buscarVuelos()) con destructuración
Promise.any(buscarVuelos())
  .then(({ nombre, precio }) => console.log(`Primera oferta: ${nombre} $${precio}`))
  .catch(error => console.log(error));

// R3: Promise.all de VuelaYa y Cóndor, recorre con ciclo y muestra la más barata
const vuelosDisponibles = [buscarVuelos()[1], buscarVuelos()[2]];

Promise.all(vuelosDisponibles)
  .then(ofertas => {
    let masBarata = ofertas[0];
    for (const oferta of ofertas) {
      if (oferta.precio < masBarata.precio) {
        masBarata = oferta;
      }
    }
    console.log(`Más barata: ${masBarata.nombre} $${masBarata.precio}`);
  })
  .catch(error => console.log("Error: " + error));

/*
💭 Respuestas "Para pensar":
1. Promise.any te dio la oferta más rápida. ¿Es la más barata?
R/ No. Nos dio VuelaYa ($350000) porque respondió en 700ms, ignorando a AeroSol porque falló. Cóndor era más barata ($290000) pero tardó 900ms, así que Promise.any no la esperó.

2. ¿Qué método usarías si lo que importa es el precio y no la velocidad?
R/ Promise.all (o Promise.allSettled si hay posibilidad de rechazos) para esperar a que TODAS las aerolíneas respondan, y luego comparar todos los precios con un ciclo, tal como hicimos en el R3.
*/

//prestamos de la biblioteca
// Código base (no modificar)
const libros = [
  { codigo: "L-01", titulo: "Cien años de soledad", disponibles: 2 },
  { codigo: "L-02", titulo: "La vorágine", disponibles: 0 },
];
const usuarios = [
  { carnet: "220", nombre: "Valentina", multas: 0 },
  { carnet: "315", nombre: "Julián", multas: 1 },
];
const buscarEn = (lista, campo, valor, ms, mensaje) => new Promise((resolve, reject) => {
  setTimeout(() => {
    let encontrado = null;
    for (const item of lista) {
      if (item[campo] === valor) {
        encontrado = item;
      }
    }
    if (encontrado !== null) {
      resolve(encontrado);
    } else {
      reject(mensaje + " " + valor + " no existe");
    }
  }, ms);
});
const buscarLibro = (codigo) => buscarEn(libros, "codigo", codigo, 300, "Libro");
const buscarUsuario = (carnet) => buscarEn(usuarios, "carnet", carnet, 500, "Usuario");
const validar = (condicion, motivo) => new Promise((resolve, reject) => {
  if (condicion) {
    resolve(true);
  } else {
    reject(motivo);
  }
});

// R1: Crea async function prestar(carnet, codigo)
async function prestar(carnet, codigo) {
  // Promise.all y destructuración
  const [usuario, libro] = await Promise.all([
    buscarUsuario(carnet),
    buscarLibro(codigo)
  ]);

  // R2: Rechaza si el usuario tiene multas
  await validar(usuario.multas === 0, `${usuario.nombre} tiene multas pendientes`);

  // R3: Rechaza si no hay ejemplares
  await validar(libro.disponibles > 0, `${libro.titulo} no tiene ejemplares`);

  // R4: Crea el préstamo con spread y modifica disponibles
  const prestamo = { ...libro, disponibles: libro.disponibles - 1 };
  console.log(`✔ ${libro.titulo} prestado a ${usuario.nombre}. Quedarían: ${prestamo.disponibles}`);
  console.log(`  Disponibles en el registro original: ${libro.disponibles}`);
}

// R5: En async function main(), prueba en orden
async function main() {
  try { await prestar("220", "L-01"); } catch (error) { console.log(`✖ ${error}`); }
  try { await prestar("315", "L-01"); } catch (error) { console.log(`✖ ${error}`); }
  try { await prestar("220", "L-02"); } catch (error) { console.log(`✖ ${error}`); }
  try { await prestar(220, "L-01"); } catch (error) { console.log(`✖ ${error}`); }
}

main();

/*
💭 Respuestas "Para pensar":
1. ¿Por qué el último caso dice que el usuario no existe si Valentina tiene carnet 220?
R/ Porque le pasamos el número 220, pero en la base de datos el carnet es el string "220". Como la función buscarEn utiliza validación estricta (===), los tipos no coinciden y no lo encuentra.

2. Si en vez de validar escribieras return { ok: false }, ¿se ejecutaría el .catch()?
R/ No, porque un return dentro de una función asíncrona resuelve (cumple) la promesa con ese valor. Para que el .catch() atrape un error, es obligatorio lanzar una excepción (throw) o devolver un Promise.reject().
*/

//panel del clima
// Código base (no modificar)
const consultarClima = (ciudad, temp, ms) => new Promise((resolve) => {
  setTimeout(() => resolve({ ciudad, temp }), ms);
});

// R1: Crea async function panel()
async function panel() {
  // Consulta con Promise.all
  const datos = await Promise.all([
    consultarClima("Bogotá", "14", 600),
    consultarClima("Medellín", "24", 300),
    consultarClima("Cartagena", "31°", 900)
  ]);

  let sumaTemp = 0;
  let conteoValidos = 0;

  // R2 y R3: Recorre los datos y convierte con Number()
  for (const dato of datos) {
    const tempNum = Number(dato.temp);
    
    if (Number.isNaN(tempNum)) {
      // R3: Si da NaN, imprime dato inválido y no suma
      console.log(`${dato.ciudad}: dato inválido ("${dato.temp}")`);
    } else {
      // R2: Imprime <ciudad>: <t> °C
      console.log(`${dato.ciudad}: ${tempNum} °C`);
      sumaTemp += tempNum;
      conteoValidos += 1;
    }
  }

  // R4: Imprime Promedio solo con los datos válidos
  if (conteoValidos > 0) {
    const promedio = sumaTemp / conteoValidos;
    console.log(`Promedio (${conteoValidos} ciudades): ${promedio} °C`);
  }
}

// R5: Imprime antes y después de llamar a panel()
console.log("Cargando panel...");
panel();
console.log("Mientras tanto, puedes ver las noticias");

/*
💭 Respuestas "Para pensar":
1. Medellín responde primero (300 ms). ¿Por qué Bogotá aparece antes en la lista?
R/ Porque Promise.all respeta el orden del arreglo original que le pasamos. Esperó a que todas las promesas terminaran y agrupó los resultados en el índice exacto donde fueron consultadas (Bogotá índice 0, Medellín índice 1).

2. ¿Qué pasaría con el promedio si sumaras el NaN?
R/ Cualquier operación matemática que involucre un NaN tiene como resultado NaN (Not a Number). Por lo tanto, toda la sumatoria se corrompería y el promedio imprimiría "NaN °C".
*/