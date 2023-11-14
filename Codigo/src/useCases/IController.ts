import { NextFunction, Request, Response } from "express";

export interface IController {
    handle(req: Request, res: Response, next?: NextFunction): Promise<Response>;
}