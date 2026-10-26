
const BOTONENVIAR = document.getElementById("btnEnviar");

BOTONENVIAR.addEventListener("click", () => {
    const inputMessage = document.getElementById("message");
    const message = inputMessage.value;
    alert(`Wow que sepas ${message} esta increible.`)
});