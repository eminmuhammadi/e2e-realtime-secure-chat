function modExp(base, exponent, modulus) {
  let result = 1n;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
    exponent >>= 1n;
  }
  return result;
}

function isCompositeWitness(witness, n, d, r) {
  let x = modExp(witness, d, n);
  if (x === 1n || x === n - 1n) {
    return false;
  }
  for (let i = 0n; i < r - 1n; i++) {
    x = (x * x) % n;
    if (x === n - 1n) {
      return false;
    }
  }
  return true;
}

function isPrimeMR(n, k = 5) {
  if (n <= 1n) {
    return false;
  }
  if (n <= 3n) {
    return true;
  }
  if (n % 2n === 0n) {
    return false;
  }

  let r = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    r++;
    d >>= 1n;
  }

  for (let i = 0; i < k; i++) {
    const witness = 2n + BigInt(Math.floor(Math.random() * (Number(n) - 3)));
    if (isCompositeWitness(witness, n, d, r)) {
      return false;
    }
  }

  return true;
}

function generateRandomBigInt(bitLength) {
  let randomBits = "1"; // Ensure the highest bit is set for a positive BigInt
  for (let i = 1n; i < bitLength - 1n; i++) {
    randomBits += Math.random() < 0.5 ? "0" : "1";
  }
  randomBits += "1"; // Ensure the lowest bit is set for an odd BigInt
  return BigInt("0b" + randomBits);
}

function generatePrime(bitLength) {
  let candidate;
  bitLength = BigInt(bitLength);
  do {
    candidate = (1n << (bitLength - 1n)) + generateRandomBigInt(bitLength - 2n);
    if (candidate % 2n === 0n) {
      candidate++;
    }
  } while (!isPrimeMR(candidate));

  return BigInt(candidate);
}

module.exports = generatePrime;
