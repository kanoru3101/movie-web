import Cookies from 'js-cookie'
import jwt_decode, { JwtPayload } from "jwt-decode";
import {AuthUser} from "./type";
import { JWT_COOKIE_NAME } from "./constants";

const getCookieUser = (): AuthUser | null => {
    const jwtCookie = Cookies.get(JWT_COOKIE_NAME);
    if (jwtCookie) {
        const decoded = jwt_decode<JwtPayload & AuthUser>(jwtCookie);
        return decoded ?? null;
    }

    return null;
}

export default getCookieUser;
