let net = require("net");

//Puerto TCP
const TCP_SERVER_PORT = 50115;

let server = net.createServer();
server.listen(TCP_SERVER_PORT, () => {
  console.log("Servidor escuchando a %j", server.address());
});

server.on("connection", (socket) => {
  var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
  console.log("Nuevo cliente conectado %s", remoteAddress);

  socket.on("data", (data) => {
    //let dataHex = data.toString('hex');
    let dataHex = String2Hex(data);
    console.log(`\n${new Date()} (${data.length} bytes) : ${dataHex}`);
  });

  socket.on("drain", () => {
    console.log("buffer is empty");
  });

  socket.once("close", () => {
    console.log("Socket is close");
  });

  socket.on("end", () => {
    console.log("Socket is end");
  });

  socket.on("error", (e) => {
    console.log("Hay un error : " + e);
  });
});

function String2Hex(tmp) {
  let str = "";
  for (let i = 0; i < tmp.length; i++) {
    str += tmp[i].toString(16) + " ";
  }
  return str;
}
