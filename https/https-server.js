var fs = require('fs');
var https = require('https');
var options = {
    key: fs.readFileSync('../cert/server.pem'),
    cert: fs.readFileSync('../cert/server-cert.pem'),
    ca: [ fs.readFileSync('../cert/client-cert.pem') ],
    requestCert: true
};
var server = https.createServer(options, function(req, res) {
    var authorized = req.socket.authorized
        ? 'authorized' : 'unauthorized';
    res.writeHead(200);
    res.write('Welcome! You are ' + authorized + '\n');
    res.end();
});

server.listen(8000, function() {
    console.log('Server listening');
});