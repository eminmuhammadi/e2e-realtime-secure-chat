const { generatePrime, generateRandomBigInt } = require("./prime");
const { modPow } = require("./utils");
const { encrypt, decrypt } = require("./crypto");

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
    pubK = this.decodeB64(pubK);
    privK = this.decodeB64(privK);
    return this.modPow(BigInt(pubK), BigInt(privK), this.N);
  }

  generateKeyPair() {
    const privK = this.generateRandomBigInt();
    const pubK = this.modPow(this.G, privK, this.N);

    return {
      pubK: this.encodeB64(pubK),
      privK: this.encodeB64(privK),
    };
  }

  generatePrime() {
    return generatePrime(256);
  }

  encodeB64(input) {
    return Buffer.from(input.toString()).toString("base64");
  }

  decodeB64(input) {
    return Buffer.from(input.toString(), "base64").toString("ascii");
  }

  generateRandomBigInt() {
    return generateRandomBigInt(256);
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
