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

const net = require('net');

let client = new net.Socket();
client.connect(50115, 'localhost', function() {
	console.log('Connected');
    client.write(msg1);
});


client.on('data', function(data) {
	console.log('Received: ' + String2Hex(data));
	client.destroy(); // kill client after server's response
});

function String2Hex(tmp) {
    let str = '';
    for(let i = 0; i < tmp.length; i++) {
        str += tmp[i].toString(16) + " ";
    }
    return str;
}
