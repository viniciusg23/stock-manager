import { Category } from "../../../entities/Category";
import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { CreateCategoryDTO } from "./CreateCategoryDTO";

export class CreateCategoryUseCase {
    private categoryRepository: ICategoryRepository;

    public constructor(categoryRepository: ICategoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public async execute(data: CreateCategoryDTO){
        const category = new Category(data.name, data.fiscalCode);

        await this.categoryRepository.create(category);
    }
}