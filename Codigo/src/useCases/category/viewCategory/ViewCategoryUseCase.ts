import { Category } from "../../../entities/Category";
import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";

export class ViewCategoryUseCase {
    private categoryRepository: ICategoryRepository;

    public constructor(categoryRepository: ICategoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public async execute(): Promise<Category[]> {
        const allCategorys = await this.categoryRepository.findAll();

        return allCategorys;
    }
}