let net = require('net');

const TCP_SERVER_PORT = 50115;

let server = net.createServer();
server.listen(TCP_SERVER_PORT,()=>{
  console.log('Servidor escuchando a %j',server.address())
})


server.on('connection',(socket)=>{

  var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
  console.log('Nuevo cliente conectado %s',remoteAddress);

  //socket.pipe(socket);

  socket.on('data',(data)=>{
    //let dataHex = data.toString('hex');
    let dataHex = String2Hex(data);
    var arrByte = Uint8Array.from(data);
    console.log(`\n${new Date()} (${arrByte.length} bytes) : ${dataHex}`)
    
    //if(data[13]==1){
      socket.write(ack(data))
    //}

    //if(data[13]==2){
    //}
    
  })

  socket.on('drain',()=>{
    console.log('buffer is empty')
  })

  socket.once('close',()=>{
    console.log('Socket is close')
  })

  socket.on('end',()=>{
    console.log('Socket is end')
  })

  socket.on('error',(e)=>{
    console.log('Hay un error : ' + e)
  })


})







//FUNCIONES COMPLEMENTARIAS CALAMP

function ack(data) {
  let i = 4;
  let ackArray = [
    data[i-4],data[i-3],data[i-2],data[i-1],
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