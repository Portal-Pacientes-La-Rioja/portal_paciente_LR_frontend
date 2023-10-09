import { environment } from "../environments/environments.demo";
import JWT from 'jsonwebtoken';

const key = environment.jwtKey;

export function jwtVerify(jwt) {
    try {
        return JWT.verify(jwt, key);
    }
    catch (err) {
        return err
    }
}
