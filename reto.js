//1reto
const usuario = {
  nombre: "Jesus",
  apellido: " Perez",
  edad: 26,
  direccion: {
    calle: "Carrera 15A # 23-45",
    ciudad: "San Gil",
    pais: "Colombia",
  },
  presentarse() {
    return `Hola, soy ${this.nombre} ${this.apellido}, tengo ${this.edad} años y vivo en ${this.direccion.ciudad}, ${this.direccion.pais}.`;
  },
};

const {
  direccion: { ciudad, pais },
} = usuario;

console.log(ciudad);
console.log(pais); 

console.log(usuario.presentarse());

//2reto

const estudiantes = [
  { id: 1, nombre: "Ana", edad: 20 },
  { id: 2, nombre: "Juan", edad: 22 },
  { id: 3, nombre: "María", edad: 21 },
];

const estudianteId2 = estudiantes.find((estudiante) => estudiante.id === 2);
console.log("R1: " + estudianteId2.nombre);

const estudianteMaria = estudiantes.find(
  (estudiante) => estudiante.nombre.toLowerCase() === "maría"
);
console.log("R2:", estudianteMaria);

const mayoresDe20 = estudiantes.filter((estudiante) => estudiante.edad > 20);
console.log("R3:", mayoresDe20);

const nombres = estudiantes.map((estudiante) => estudiante.nombre);
console.log("R4:", nombres);

const buscarEstudiante = (campo, valor) =>
  estudiantes.find((estudiante) => estudiante[campo] === valor);

console.log("R5:", buscarEstudiante("nombre", "Ana"));

const buscarEstudianteAsync = (campo, valor) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const estudiante = estudiantes.find((item) => item[campo] === valor);

      if (estudiante) {
        resolve(estudiante);
      } else {
        reject(`No se encontró ningún estudiante con ${campo}: ${valor}`);
      }
    }, 500);
  });

buscarEstudianteAsync("id", 2)
  .then((estudiante) => console.log("Then - estudiante encontrado:", estudiante))
  .catch((error) => console.log("Catch - error:", error));

buscarEstudianteAsync("nombre", "Pedro")
  .then((estudiante) => console.log("Then - estudiante encontrado:", estudiante))
  .catch((error) => console.log("Catch - error:", error));

const promesa = new Promise((resolve, reject) => {
  const ok = true;

  if (ok) {
    resolve("La promesa se cumplió");
  } else {
    reject("La promesa falló");
  }
});

promesa
  .then((mensaje) => console.log("Resultado:", mensaje))
  .catch((error) => console.log("Error de la promesa:", error));

console.log("Fin del ejercicio");
