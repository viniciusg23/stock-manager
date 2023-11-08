import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";
import { MongoDBSaleRepository } from "../../../repository/saleRepository/implementation/MongoDBSaleRepository";
import { Controller } from "../../IController";
import { ViewSaleController } from "./ViewSaleController";
import { ViewSaleUseCase } from "./ViewSaleUseCase";

const saleRepository: ISaleRepository = new MongoDBSaleRepository();

const viewSaleUseCase: ViewSaleUseCase = new ViewSaleUseCase(saleRepository);

const viewSaleController: Controller = new ViewSaleController(viewSaleUseCase);

export {viewSaleUseCase, viewSaleController};