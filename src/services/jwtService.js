import { environment } from "../environments/environments.demo";
import JWT from 'jsonwebtoken';

const key = environment.jwtKey;
// const key = 'i-hate-w1nd0w$$';

export async function jwtVerify(jwt) {
    try {
        // verify a token symmetric
        return JWT.verify(jwt, key);
    } catch (err) {
        console.error(err);
    }
}
