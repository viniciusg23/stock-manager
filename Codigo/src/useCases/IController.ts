import { NextFunction, Request, Response } from "express";

export interface Controller {
    handle(req: Request, res: Response, next?: NextFunction): Promise<Response>;
}