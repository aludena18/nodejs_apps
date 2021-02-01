var net = require('net');

var server = net.createServer();

server.on('connection',(socket)=>{

  var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
  console.log('Nuevo cliente conectado %s',remoteAddress);
  socket.pipe(socket);

  socket.on('data',(data)=>{
    var arrByte = Uint8Array.from(data);
    console.log(`\n${new Date()} (${arrByte.length} bytes) : ${String2Hex(arrByte)}`)
    
    if(data[13]==1){
      socket.pipe(socket)
      socket.write(ack(data),()=>{
        console.log('ACK Eviado!!')
      })
    }

    if(data[13]==2){
      socket.unpipe(socket);
    }
    
  })

  socket.on('drain',()=>{
    console.log('buffer is empty')
  })

  socket.once('close',()=>{
    console.log('Socket is close')
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