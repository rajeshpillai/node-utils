var fs = require('fs');
var tls = require('tls');
var options = {
    key: fs.readFileSync('../cert/server.pem'),
    cert: fs.readFileSync('../cert/server-cert.pem'),
    ca: [ fs.readFileSync('../cert/client-cert.pem') ],
    requestCert: true
};
var server = tls.createServer(options, function(cleartextStream) {
    var authorized = cleartextStream.authorized ?
        'authorized' : 'unauthorized';
    console.log('Connected:', authorized);
    cleartextStream.write('Welcome!\n');
    cleartextStream.setEncoding('utf8');
    cleartextStream.pipe(cleartextStream);
});
server.listen(8000, function() {
    console.log('Server listening');
});