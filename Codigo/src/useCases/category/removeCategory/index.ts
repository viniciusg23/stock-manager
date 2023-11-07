import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { MongoDBCategoryRepository } from "../../../repository/categoryRepository/implementation/MongoDBCategoryRepository";
import { Controller } from "../../IController";
import { RemoveCategoryController } from "./RemoveCategoryController";
import { RemoveCategoryUseCase } from "./RemoveCategoryUseCase";


const categoryRepository: ICategoryRepository = new MongoDBCategoryRepository();

const removeCategoryUseCase: RemoveCategoryUseCase = new RemoveCategoryUseCase(categoryRepository);

const removeCategoryController: Controller = new RemoveCategoryController(removeCategoryUseCase);

export {removeCategoryUseCase, removeCategoryController};