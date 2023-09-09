const SecureCommunication = require("./index");

const SC = new SecureCommunication();

const A = SC.generateKeyPair();
const B = SC.generateKeyPair();

const key_A = SC.generateSymmetricKey(B.pubK, A.privK);
const key_B = SC.generateSymmetricKey(A.pubK, B.privK);

const plaintext = "Hello World!";

const { chipertext, iv, authTag } = SC.encrypt(plaintext, key_A);
const _plaintext = SC.decrypt(chipertext, iv, authTag, key_B);

console.table([plaintext, _plaintext]);
