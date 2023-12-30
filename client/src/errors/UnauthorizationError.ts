export class UnauthorizationError extends Error {
    public constructor(){
        super("Invalid authorization token");

        window.localStorage.removeItem("Authorization");
        window.location.href = "/";
    }
}