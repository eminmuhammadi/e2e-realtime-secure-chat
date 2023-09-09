# E2E realtime chat

Uses Diffie-Hellman key exchange to generate a shared secret between two users. The shared secret is used to encrypt (AES-256-GCM) messages sent between the two users.

Keys are generated on client side. Only the public keys are sent to the server. The server does not have access to the private keys and symmetric key.

Example:
```json
{
    "socket_id": "qaY0wQGzyN37QhccAAAj",
    "data": {
        "toPubK": "5668120710338377530452541740064492970077693127994575717295844584863488274332",
        "fromPubK": "31426841429515825643139668174624833013646094687860288273583744204911040821312",
        "message": "q0gi3w==.2xJxABQsA/n5ZIOVI4ASqA==.ooGFkuZqxcgySSB5lWwzPw=="
    },
    "timestamp": 1694292428594
}
```