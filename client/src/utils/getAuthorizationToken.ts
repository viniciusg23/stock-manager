import { UnauthorizationError } from "../errors/UnauthorizationError";

export const getAuthorizationToken = () => {
    const token = localStorage.getItem("authorization");

    if(!token){
        throw new UnauthorizationError();
    }

    return token;
}