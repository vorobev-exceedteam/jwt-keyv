# jwt-keyv

This library is just a fork of [jwt-redis](https://github.com/Natashkinsasha/jwt-redis-v2) that uses keyv instead of redis. Readme is an adapted copy of original one.


# Installation

For now, library is available only through git.

npm
```javascript
npm install vorobev-exceedteam/jwt-keyv#master
```
yarn
```javascript
yarn add vorobev-exceedteam/jwt-keyv#master
```


# Quick start

```javascript
var keyv = require('keyv');
var JWTR =  require('jwt-keyv').default;
//ES6 import JWTK from 'jwt-keyv';
var keyvClient = Keyv();
var jwtr = new JWTR(keyvClient);

var secret = 'secret';
var jti = 'test';
var payload = { jti };

// Create a token
jwtk.sign(payload, secret)
    .then(()=>{
            // Token verification
            return jwtk.verify(token, secret);
    })
    .then(()=>{
            // Destroying the token
            return jwtk.destroy(jti, secret);
    });
```

# Expiration time
You can set the lifetime of the token the same way as in the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) library.
The label in redis is deleted when the token expires.
```javascript
    // expiresIn - number of seconds through which the token will not be valid
    await jwtk.sign({}, 'secret', {expiresIn: expiresIn})
    // exp - time at which the token will not be valid
    await  jwtk.sign({exp: exp}, secret)
```

# Create jti

For each token, the claims are added **jti**. **Jti** is the identifier of the token.
You can decide for yourself what it will be equal by adding its values to payload.

```javascript
    var payload = {jti: 'test'};
    await jwtk.sign(payload, secret)
```

If **jti** is not present, then **jti** is generated randomly by the library.

# Destroy token

You can destroy the token through jti.

```javascript
    await jwtk.destroy(jti)
```


# Native Promise

All methods except the decode method (since it is synchronous) can return a native Promise.

```javascript
    jwtk
    .sign({}, secret)
    .then(function (token) {

    })
    .catch(function (err) {

    })
```

# Bluebird

If you want to use **Bluebird**, then after the promiscilation all the methods of the library will be available that return Promise,
Only at the end of each method should you add **Async**.

```javascript
    var Promise = require('bluebird');
    var Keyv = require('keyv');
    var keyv = new Keyv();
    var JWTK =  require('jwt-keyv');
    var jwtk = new JWTK(keyv);

    var jwtkAsync = Promise.promisifyAll(jwtk);

    jwtkAsync
    .signAsync({}, secret)
    .then(function (token) {

    })
    .catch(function (err) {

    })
```

# API

Method for creating a token.
### jwtk.sign(payload, secretOrPrivateKey, [options]): Promise<string> ###

Method for verifying a token
### jwtk.verify<T>(token, secretOrPublicKey, [options]): Promise<T> ###

Method for breaking the token
### jwtk.destroy(jti, [options]): Promise<void> ###

Method for decoding token
### jwtk.decode<T>(token, [options]): T ###

jwt-keyv fully supports all method options that support the library [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).
Therefore, it is better to read their documentation in addition. But there are several options that are available only in jwt-redis.

Also in the options you can specify a prefix for the redis keys. By default it is *jwt_label:*.

```javascript
var options = {
    prefix: 'example'
}
var jwtk = new JWTK(keyv, options);
```

# TypesScript

This library have typing in module.
