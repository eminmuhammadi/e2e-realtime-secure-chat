const crypto = require("crypto");

const __ALGORITHM__ = "aes-256-gcm";

function encrypt(plaintext, key) {
    const iv = crypto.randomBytes(16);
    const keyBuffer = Buffer.from(key.toString(16).padStart(64, "0"), "hex");

    const cipher = crypto.createCipheriv(__ALGORITHM__, keyBuffer, iv);
    const chipertext = Buffer.concat([cipher.update(plaintext, "utf-8"), cipher.final()]);

    const authTag = cipher.getAuthTag();

    return {
        chipertext: chipertext.toString("base64"),
        iv: iv.toString("base64"),
        authTag: authTag.toString("base64"),
    };
}

function decrypt(chipertext, iv, authTag, key) {
    const keyBuffer = Buffer.from(key.toString(16).padStart(64, "0"), "hex");
    const ivBuffer = Buffer.from(iv, "base64");
    const authTagBuffer = Buffer.from(authTag, "base64");

    const decipher = crypto.createDecipheriv(__ALGORITHM__, keyBuffer, ivBuffer);
    decipher.setAuthTag(authTagBuffer);

    const decrypted = Buffer.concat([decipher.update(Buffer.from(chipertext, "base64")), decipher.final()]);

    return decrypted.toString("utf-8");
}

module.exports = {
    encrypt,
    decrypt,
};
