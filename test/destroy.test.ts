import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised'
import JWTKeyv, {TokenDestroyedError} from '../src/index';
import {generateId} from "./util";
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
                return jwtKeyv.destroy(payload.jti)
                    .then((is)=>{
                        expect(is).to.equal(true);
                        expect(jwtKeyv.verify(token, key)).to.be.rejectedWith(TokenDestroyedError);
                        done();
                    })
            })
            .catch(done);
    });

    it('2', () => {
        return jwtKeyv.destroy('jti')
            .then((is) => {
                expect(is).to.equal(false);
            })
    });

});
