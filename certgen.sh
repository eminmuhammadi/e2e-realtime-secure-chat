#!/usr/bin/env bash

# exit when any command fails
set -ex

# Generate X509 certificate and private key without prompting for any input (using extension file)
rm -rf .tls && mkdir -p .tls

# Generate CA private key (ECDSA curve P-384)
openssl ecparam -genkey -name secp384r1 -out .tls/ca-key.pem

# Generate CA certificate
cat >.tls/ca-config.cnf <<EOF
[req]
distinguished_name = req_distinguished_name
prompt = no

[req_distinguished_name]
CN = ca
EOF
openssl req -x509 -new -nodes -key .tls/ca-key.pem -days 365 -out .tls/ca-cert.pem -config .tls/ca-config.cnf

# Generate server private key (ECDSA curve P-384)
openssl ecparam -genkey -name secp384r1 -out .tls/server-key.pem

# Create server-config
cat >.tls/server-config.cnf <<EOF
[req]
req_extensions = v3_req
distinguished_name = req_distinguished_name
prompt = no

[req_distinguished_name]
CN = server

[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
IP.1 = 127.0.0.1
DNS.1 =
DNS.2 =
EOF

# Generate server certificate
openssl req -new -key .tls/server-key.pem -out .tls/server.csr -config .tls/server-config.cnf

# Sign server certificate
openssl x509 -req -in .tls/server.csr -CA .tls/ca-cert.pem -CAkey .tls/ca-key.pem -CAcreateserial -out .tls/server-cert.pem -days 30 -extensions v3_req -extfile .tls/server-config.cnf

# Generate client private key (ECDSA curve P-384)
openssl ecparam -genkey -name secp384r1 -out .tls/client-key.pem

# Create client-config ext
cat >.tls/client-config.cnf <<EOF
[req]
req_extensions = v3_req
distinguished_name = req_distinguished_name
prompt = no

[req_distinguished_name]
CN = client

[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
extendedKeyUsage = clientAuth
subjectAltName = @alt_names

[alt_names]
IP.1 = 127.0.0.1
DNS.1 =
DNS.2 =
EOF

# Generate client certificate
openssl req -new -key .tls/client-key.pem -out .tls/client.csr -config .tls/client-config.cnf

# Sign client certificate
openssl x509 -req -in .tls/client.csr -CA .tls/ca-cert.pem -CAkey .tls/ca-key.pem -CAcreateserial -out .tls/client-cert.pem -days 30 -extensions v3_req -extfile .tls/client-config.cnf
