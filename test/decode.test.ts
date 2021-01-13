import * as chai from 'chai';
import JWTKeyv from '../src/index';
import {generateId} from "./util";
import Keyv = require("keyv");

describe('Test decode', () => {

    const {expect} = chai;

    let jwtKeyv: JWTKeyv;

    before(() => {
        const keyv = new Keyv();
        jwtKeyv = new JWTKeyv(keyv);
    });

    it('1', (done) => {
        const key = generateId(10);
        const payload = {jti: generateId(10)};
        jwtKeyv.sign(payload, key)
            .then((token: string) => {
                return jwtKeyv.decode<{jti: string}>(token);
            })
            .then((decoded)=>{
                expect(decoded).to.have.property('iat');
                expect(payload.jti).to.be.deep.equal(decoded.jti);
                done();
            })
            .catch(done);
    });

    it('2', (done) => {
        const key = generateId(10);
        const payload = {jti: generateId(10)};
        jwtKeyv.sign(payload, key, {expiresIn: '1d'})
            .then((token: string) => {
                return jwtKeyv.decode<{jti: string}>(token);
            })
            .then((decoded)=>{
                expect(decoded).to.have.property('iat');
                expect(decoded).to.have.property('exp');
                expect(payload.jti).to.be.deep.equal(decoded.jti);
                done();
            })
            .catch(done);
    });

    it('3', (done) => {
        const key = generateId(10);
        const payload = {jti: generateId(10), exp: new Date().getSeconds()};
        jwtKeyv.sign(payload, key)
            .then((token: string) => {
                return jwtKeyv.decode<{jti: string}>(token);
            })
            .then((decoded)=>{
                expect(decoded).to.have.property('iat');
                expect(decoded).to.have.property('exp');
                expect(payload.jti).to.be.deep.equal(decoded.jti);
                done();
            })
            .catch(done);
    });

});
