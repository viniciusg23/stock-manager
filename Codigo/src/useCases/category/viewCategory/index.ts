import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { MongoDBCategoryRepository } from "../../../repository/categoryRepository/implementation/MongoDBCategoryRepository";
import { Controller } from "../../IController";
import { ViewCategoryController } from "./ViewCategoryController";
import { ViewCategoryUseCase } from "./ViewCategoryUseCase";

const categoryRepository: ICategoryRepository = new MongoDBCategoryRepository();

const viewCategoryUseCase: ViewCategoryUseCase = new ViewCategoryUseCase(categoryRepository);

const viewCategoryController: Controller = new ViewCategoryController(viewCategoryUseCase);

export {viewCategoryUseCase, viewCategoryController};