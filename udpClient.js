//calamp udp frame, msg type 2
//  83 5 47 64 36 92 2 1 1 1 2 0 1 60 11 ce cb 60 11 ce cb f8 bd 41 f4 d2 1b 68 11 0 0 2f 1 0 0 0 3f 0 0 4 20 2 5e ff b3 22 22 1f 0 26 15 62 0 2 0 0 21 ff ff ff ff 0 0 2e ab 0 0 10 50 0 0 0 0 0 6 9c f9 0 0 3e 70 0 0 3e 70 8b d 61 78 0 0 0 0 0 0 0 7b 0 0 0 1f 0 1d f 85 0 0 20 e9 0 0 20 e9 0 0 0 1f 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 5 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 3e 70 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  / from 176.83.213.220:39881
// 131 5 71 100 54 146 2 1 1 1 2 0 28 96 17 226 97 96 17 226 97 248 189 70 46 210 27 100 223 0 0 33 172 0 0 0 11 0 42 6 32 2 94 255 181 111 12 31 0 255 30 98 0 2 0 0 33 255 255 255 255 0 0 46 201 0 0 16 76 0 0 0 0 0 6 162 110 0 0 62 112 0 0 62 112 139 13 97 120 0 0 0 0 0 0 0 125 0 0 0 31 0 29 15 133 0 0 52 127 0 0 52 127 0 0 0 31 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 11 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 62 112 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  

let msg = Buffer.from('hola mundoo!!!')
let msg1 = Buffer.from(
    [   131, 5, 71, 100, 54, 146, 2, 1, 1, 1, 2, 0, 28, 96, 
        17, 226, 97, 96, 17, 226, 97, 248, 189, 70, 46, 210, 
        27, 100, 223, 0, 0, 33, 172, 0, 0, 0, 11, 0, 42, 6, 32, 
        2, 94, 255, 181, 111, 12, 31, 0, 255, 30, 98, 0, 2, 0, 
        0, 33, 255, 255, 255, 255, 0, 0, 46, 201, 0, 0, 16, 
        76, 0, 0, 0, 0, 0, 6, 162, 110, 0, 0, 62, 112, 0, 0, 
        62, 112, 139, 13, 97, 120, 0, 0, 0, 0, 0, 0, 0, 
        125, 0, 0, 0, 31, 0, 29, 15, 133, 0, 0, 52, 127, 0, 
        0, 52, 127, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 62, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

var dgram = require('dgram');
var s = dgram.createSocket('udp4');
//s.send(msg, 31000, 'localhost');

//ENVIA UN MENSAJE AL SERVER EN INTERVALO DE n SEGS
let sendMsg = setInterval(()=>{
    s.send(msg1, 50115, 'localhost');
},5000);

//RECIBE UN MENSAJE DESDE EL SERVER
s.on("message", (msg, rinfo) => {
    console.log(`from server: ${String2Hex(msg)} / from ${rinfo.address}:${rinfo.port}`);
});

//FUNCION QUE CONVIERTE UN ARRAY A STRING
function String2Hex(tmp) {
    let str = '';
    for(let i = 0; i < tmp.length; i++) {
        str += tmp[i].toString(16) + " ";
    }
    return str;
}

sendMsg;