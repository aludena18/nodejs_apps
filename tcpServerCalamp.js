let net = require("net");

//Puerto TCP
const TCP_SERVER_PORT = 50115;

//Tipo de mensajes del protocolo Calamp
const MSG_NULL = 0;
const MSG_ACK = 1;
const MSG_EVENT_REPORT = 2;
const MSG_ID_REPORT = 3;
const MSG_USER_DATA = 4;
const MSG_APP_DATA = 5;
const MSG_CONFIG = 6;
const MSG_UNIT_REQUEST = 7;
const MSG_LOCATE_REPORT = 8;
const MSG_USER_DATA_ACC = 9;
const MSG_MINI_EVENT_REPORT = 10;
const MSG_MINI_USER_DATA = 11;

//Tipo de servicios del protocolo Calamp
const SERVICE_UNACKNOWLEDGED = 0;
const SERVICE_ACKNOWLEDGED = 1;
const SERVICE_RESPONSE = 2;


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
    
    processData(socket,data);

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

//decodifica mensaje recibido
function processData(skt, data){

  const header = data.subarray(0,2);
  const optionsHeader = data.subarray(4,13);
  const srvType = data.subarray(13,14);
  const msgType = data.subarray(14,15);
  const seqNumber = data.subarray(15,17);

  tipoMsj = msgType.readInt8(0)
  console.log("Tipo de Mensaje = " + tipoMsj)
  if(tipoMsj==MSG_EVENT_REPORT){
    const event = data.subarray(54,55);
    console.log("Evento = " + event.readInt8(0));
  }

  if(srvType.readInt8(0)==SERVICE_ACKNOWLEDGED){
    let res = response(header,optionsHeader,seqNumber,msgType);
    skt.write(res);
  }

  
}

function response(header,opHeader,seq,type) {
  const srvType = Buffer.alloc(1,SERVICE_RESPONSE);
  const msgType = Buffer.alloc(1,MSG_ACK);
  const ackMsg = Buffer.alloc(5,0);

  let rawDataLenInt = opHeader.length + srvType.length + msgType.length + seq.length + type.length + ackMsg.length;
  const rawDataLenBuff = Buffer.alloc(2,0);
  rawDataLenBuff.writeInt8(rawDataLenInt,1);
  
  let dataLen = header.length + rawDataLenBuff.length + rawDataLenInt;

  const dataBuff = Buffer.concat([header,rawDataLenBuff,opHeader,srvType,msgType,seq,type,ackMsg],dataLen);
  console.log(dataBuff)
  return dataBuff;
}

function String2Hex(tmp) {
  let str = "";
  for (let i = 0; i < tmp.length; i++) {
    str += tmp[i].toString(16) + " ";
  }
  return str;
}
