//1reto
const usuario = {
  nombre: "Juan Daniel",
  apellido: " Tapias Garcia",
  edad: 25,
  direccion: {
    calle: "Calle 123 #45-67",
    ciudad: "Bucaramanga",
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