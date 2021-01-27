let port = 31000;
let buff = [];

const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

//RECIBE MENSAJES DEL CLIENTE
socket.on("message", (msg, rinfo) => {
    buff = msg;
    console.log(`server got: ${String2Hex(buff)} / from ${rinfo.address}:${rinfo.port}`);
    sendAck(buff, rinfo);
});

function sendAck(data,info){
    let ackArray=[
        data[0],
        data[1],
        data[2],data[3],data[4],data[5],data[6],
        data[7],
        data[8],
        2,
        1,
        data[11],data[12],
        data[10],
        0,
        0,
        0,0,0
    ]

    sendMsg(Buffer.from(ackArray),info);
}

function sendMsg(msg,info){
    socket.send(msg, info.port, info.address);
}

function parseFunction(data,i,f){
    let str = '';
    for(let index=i ; index<f ; index++){
        str += data[index].toString(16) + " ";
    }
    return str
}

function String2Hex(tmp) {
    let str = '';
    for(let i = 0; i < tmp.length; i++) {
        str += tmp[i].toString(16) + " ";
    }
    return str;
}

socket.bind(port);
console.log ("Servidor UDP iniciado en el puerto " + port);