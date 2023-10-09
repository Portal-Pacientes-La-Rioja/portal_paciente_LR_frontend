import { environment } from "../environments/environments.demo";
import JWT from 'jsonwebtoken';

const key = environment.jwtKey;
const keytest = environment.jwtKeyTest;

export function jwtVerify(jwt) {
    console.log('find >>', keytest)
    try {
        return JWT.verify(jwt, key);
    }
    catch (err) {
        return err
    }
}
