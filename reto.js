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