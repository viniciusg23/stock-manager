import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { MongoDBCategoryRepository } from "../../../repository/categoryRepository/implementation/MongoDBCategoryRepository";
import { Controller } from "../../IController";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


const categoryRepository: ICategoryRepository = new MongoDBCategoryRepository();

const createCategoryUseCase: CreateCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

const createCategoryController: Controller = new CreateCategoryController(createCategoryUseCase);

export {createCategoryUseCase, createCategoryController};