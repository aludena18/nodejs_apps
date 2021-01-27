let msg = Buffer.from('hola mundoo!!!')
let msg1 = Buffer.from([64,65,66,67,68,69])

var dgram = require('dgram');
var s = dgram.createSocket('udp4');
//s.send(msg, 31000, 'localhost');

let sendMsg = setInterval(()=>{
    s.send(msg, 31000, 'localhost');
},2000);

sendMsg;