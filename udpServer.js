let port = 31000;

const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

socket.on("message", (msg, rinfo) => {
    //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    console.log("Recibido = " + msg);
    console.log("Desde = " + rinfo.address + ":" + rinfo.port);
});

socket.bind(port);
console.log ("Servidor UDP iniciado en el puerto " + port);