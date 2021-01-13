import * as chai from 'chai';
import JWTKeyv from '../src/index';
import {generateId} from "./util";
import Keyv = require("keyv");

describe('Test sign', () => {

    const {expect} = chai;

    let jwtKeyv: JWTKeyv;

    before(() => {
        const keyv = new Keyv();
        jwtKeyv = new JWTKeyv(keyv);
    });

    it('1', (done) => {
        const key = generateId(10);
        jwtKeyv.sign({}, key)
            .then((token: string) => {
                expect(token).to.be.a('string')
                done();
            })
            .catch(done);
    });

});
