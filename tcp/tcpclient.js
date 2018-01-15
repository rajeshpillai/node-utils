var fs = require('fs');
var os = require('os');
var tls = require('tls');
var options = {
    key: fs.readFileSync('../cert/client.pem'),
    cert: fs.readFileSync('../cert/client-cert.pem'),
    ca: [ fs.readFileSync('../cert/server-cert.pem') ],
    servername: os.hostname()
};
var cleartextStream = tls.connect(8000, options, function() {
    var authorized = cleartextStream.authorized ?
        'authorized' : 'unauthorized';
    console.log('Connected:', authorized);
    process.stdin.pipe(cleartextStream);
});
cleartextStream.setEncoding('utf8');
cleartextStream.on('data', function(data) {
    console.log(data);
});