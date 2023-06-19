import { environment } from "../environments/environments.demo";
import JWT from 'jsonwebtoken';

const key = environment.jwtKey;

export function jwtVerify(jwt) {
    return JWT.verify(jwt, key);
}
