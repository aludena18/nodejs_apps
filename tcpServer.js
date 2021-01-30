const net = require("net");

const port = 50115;

// A use-once date server. Clients get the date on connection and that's it!
const server = net.createServer((socket) => {
  socket.setMaxListeners(0)
  socket.on("data", (data) => {
    //console.log(data.toString())
    processData(data);
    if(data[13]==1){
      socket.write(ack(data));
      socket.pipe(socket);
      console.log("ACk enviado = " + String2Hex(ack(data)));
    }
    //socket.pipe(socket);
  });
  socket.on("end", () => {
    console.log("Closed");
  });
  socket.on("error", function (err) {
    console.log(`Error: ${err}`);
  });
  console.log("max listeners = " + socket.getMaxListeners())
});

function processData(d) {
  console.log(`\nserver got ${d.length} bytes : ${String2Hex(d)}`);
}

function String2Hex(tmp) {
  let str = "";
  for (let i = 0; i < tmp.length; i++) {
    str += tmp[i].toString(16) + " ";
  }
  return str;
}

function ack(data) {
  let i = 4;
  let ackArray = [
    //data[0],data[1],data[2],data[3],
    data[i],
    data[i + 1],
    data[i + 2], data[i + 3], data[i + 4], data[i + 5], data[i + 6],
    data[i + 7],
    data[i + 8],
    2,
    1,
    data[i + 11], data[i + 12],
    data[i + 10],
    0,
    0,
    0, 0, 0,
  ];

  return Buffer.from(ackArray);
}

server.maxConnections = 20;
server.listen(port);
console.log("Servidor TCP iniciado en el puerto : " + port);
