Create certificate files
=============================
That means before you can run any Node examples, you’ll need certificates. The
OpenSSL command-line tools are required for this. If you don’t have them, you
should be able to install them with your operating system’s package manager, or by visiting www.openssl.org.

The openssl tool takes a command as the first argument, and then options as subsequent arguments. For example, openssl req is used for X.509 Certificate Signing Request (CSR) management. To make a certificate signed by an authority you control, you’ll need to issue the following commands:
■ genrsa—Generate an RSA certificate; this is our private key.
■ req—Create a CSR.
■ x509—Sign the private key with the CSR to produce a public key.

When the process is broken down like this, it’s fairly easy to understand: certificates require an authority and must be signed, and we need a public and private key. The process is similar when creating a public and private key signed against a commercial certificate authority, which you’ll do if you want to buy certificates to use with public web servers.

The full command list for creating a public and private key is as follows:



//1. Create server's private key using 1024 bits
openssl genrsa -out server.pem 1024

// 2. Create CSR - this is where you enter your hostname
openssl req -new -key server.pem -out server-csr.pem

// 3. Sign server's private key
openssl x509 -req -in server-csr.pem -signkey server.pem -out server-cert.pem

// 4. Create client's private keys
openssl genrsa -out client.pem 1024

// 5. Create CSR for the client—remember to enter your hostname 
//    here as well
openssl req -new -key client.pem -out client-csr.pem

// 6. Sign client’s private key and output a public key
openssl x509 -req -in client-csr.pem -signkey client.pem -out client-cert.pem



When asked for common name, enter the hostname of your computer (in windows you 
can get it by running "hostname" in the command prompt.)