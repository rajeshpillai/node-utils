var fs = require('fs');
var https = require('https');
var os = require('os');

var options = {
    key: fs.readFileSync('../cert/client.pem'),
    cert: fs.readFileSync('../cert/client-cert.pem'),
    ca: [ fs.readFileSync('../cert/server-cert.pem') ],
    hostname: os.hostname(),
    port: 8000,
    path: '/',
    method: 'GET'
};
var req = https.request(options, function(res) {
res.on('data', function(d) {
     process.stdout.write(d);
    });
});
req.end();
req.on('error', function(e) {
    console.error(e);
});