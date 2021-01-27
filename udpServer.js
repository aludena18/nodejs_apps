let port = 31000;
let buff = [];

const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

socket.on("message", (msg, rinfo) => {
    buff = msg;
    console.log(`server got: ${String2Hex(buff)} / from ${rinfo.address}:${rinfo.port}`);
    console.log("id = " + parseFunction(buff,0,4));
});

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