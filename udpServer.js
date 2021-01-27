console.log("CALAMP UDP SERVER TEST");

const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

socket.bind(31000);

while (true) {
  socket.on("message", (msg, rinfo) => {
    //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    console.log("Recibido = " + msg);
    console.log("Desde = " + rinfo.address + ":" + rinfo.port);
  });
}
