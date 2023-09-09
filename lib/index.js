const generatePrime = require("./prime");
const {modPow} = require("./utils");
const {encrypt, decrypt} = require("./crypto");

class SecureCommunication {
    constructor() {
        this.N = this.generatePrime();
        this.G = this.generatePrime();
    }

    setN(N = this.generatePrime()) {
        this.N = N;
    }

    setG(G = this.generatePrime()) {
        this.G = G;
    }

    getN() {
        return this.N;
    }

    getG() {
        return this.G;
    }

    generateSymmetricKey(pubK, privK) {
        return this.modPow(pubK, privK, this.N);
    }

    generateKeyPair() {
        const privK = this.generatePrime();
        const pubK = this.modPow(this.G, privK, this.N);

        return {
            pubK,
            privK,
        };
    }

    generatePrime() {
        return generatePrime(256);
    }

    modPow(base, exponent, modulus) {
        return modPow(base, exponent, modulus);
    }

    encrypt(text, key) {
        return encrypt(text, key);
    }

    decrypt(chipertext, iv, authTag, key) {
        return decrypt(chipertext, iv, authTag, key);
    }
}

module.exports = SecureCommunication;
