var net = require('net');

var server = net.createServer();

server.on('connection',(socket)=>{

  var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
  console.log('Nuevo cliente conectado %s',remoteAddress);

  socket.on('data',(data)=>{
    var arrByte = Uint8Array.from(data);
    console.log('Data desde %s : %s',remoteAddress,String2Hex(arrByte))
    socket.write(ack(arrByte),()=>{
      console.log('Ack Enviado')
    })
  })

  socket.once('close',()=>{

  })

  socket.on('error',()=>{

  })


})

server.listen(50115,()=>{
  console.log('Servidor escuchando a %j',server.address())
})




//FUNCIONES COMPLEMENTARIAS CALAMP

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
    0, 0, 0
  ];

  let buffer = Uint8Array.from(ackArray);
  console.log("ACK = " + String2Hex(buffer));
  return buffer;
}

function String2Hex(tmp) {
  let str = "";
  for (let i = 0; i < tmp.length; i++) {
    str += tmp[i].toString(16) + " ";
  }
  return str;
}