import {DisplayUser} from "./displayUser";

export interface DecodedJwt {
    user: DisplayUser;
    exp: number;
    iat: number;
}