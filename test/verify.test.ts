import * as chai from 'chai';
import JWTKeyv, {TokenDestroyedError} from '../src/index';
import {generateId} from "./util";
import {TokenExpiredError} from "jsonwebtoken";
import * as chaiAsPromised from "chai-as-promised";
import Keyv = require("keyv");

describe('Test destroy', () => {

    const {expect} = chai;
    chai.use(chaiAsPromised);

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
                return jwtKeyv.verify(token, key);
            })
            .then(()=>{
                done();
            })
            .catch(done);
    });

    it('2', (done) => {
        const key = generateId(10);
        const payload = {jti: generateId(10)};
        jwtKeyv.sign(payload, key, {expiresIn: '1d'})
            .then((token: string) => {
                return jwtKeyv.verify<{jti: string}>(token, key);
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
        const payload = {jti: generateId(10)};
        jwtKeyv.sign(payload, key, {expiresIn: '0s'})
            .then((token: string) => {
                expect(jwtKeyv.verify<{jti: string}>(token, key)).to.be.rejectedWith(TokenExpiredError);
                done();
            })
            .catch(done);
    });

    it('4', (done) => {
        const key = generateId(10);
        const payload = {jti: generateId(10), exp: new Date().getSeconds()};
        jwtKeyv.sign(payload, key)
            .then((token: string) => {
                expect(jwtKeyv.verify<{jti: string}>(token, key)).to.be.rejectedWith(TokenExpiredError);
                done();
            })
            .catch(done);
    });


});
