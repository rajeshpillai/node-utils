Create certificate files
=============================

openssl genrsa -out server.pem 1024
openssl req -new -key server.pem -out server-csr.pem
openssl x509 -req -in server-csr.pem -signkey server.pem -out server-cert.pem
openssl genrsa -out client.pem 1024
openssl req -new -key client.pem -out client-csr.pem
openssl x509 -req -in client-csr.pem -signkey client.pem -out client-cert.pem

When asked for common name, enter the hostname of your computer (in windows you 
can get it by running "hostname" in the command prompt.)