var http = require('http');
var url = require('url');

/*
 * This proxy sits between the client and the server.  Additional 
 * use could be to extend this proxy to cache url, images etc.
 * 
 * NOTE: 
 *  A proxy server offers a level of redirection, which facilitates a variety of useful applications:
    caching, logging, and security-related software. This technique explores how to
    use the core http module to create HTTP proxies. Fundamentally all that’s required is
    an HTTP server that catches requests, and then an HTTP client to clone them.
    The http.createServer and http.request methods can catch and retransmit
    requests. We’ll also need to interpret the original request so we can safely copy it—the
    url core module has an ideal URL-parsing method that can help do this.
*/
//1.  Create standard HTTP Server instance
http.createServer(function(req, res) {
    console.log('start request:', req.url);
    var options = url.parse(req.url);
    options.headers = req.headers;

    // 2.  Create request that copies the original request
    var proxyRequest = http.request(options, function(proxyResponse) {
        // 3. Listen for data and then write back to browser
        proxyResponse.on('data', function(chunk) {
            console.log('proxyResponse length:', chunk.length);
            res.write(chunk, 'binary');
        });

        // 4. Track when proxied request has finished
        proxyResponse.on('end', function() {
            console.log('proxied request ended');
            res.end();
        });

        // 5. Send headers to the browser
        res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    });

    // 6. Capture data sent from browser to the server
    req.on('data', function(chunk) {
        console.log('in request length:', chunk.length);
        proxyRequest.write(chunk, 'binary');
    });

    // 7. Track when original request ends.
    req.on('end', function() {
        console.log('original request ended');
        proxyRequest.end();
    });
}).listen(8080);  // Listen for connections from local browsers