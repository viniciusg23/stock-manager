export class UnauthorizationError extends Error {
    public constructor(){
        super("Invalid authorization token");
    }
}