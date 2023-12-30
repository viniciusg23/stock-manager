import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { IRemoveCategoryDTO } from "./RemoveCategoryDTO";

export class RemoveCategoryUseCase {
    private categoryRepository: ICategoryRepository;

    public constructor(categoryRepository: ICategoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public async execute(data: IRemoveCategoryDTO){
        await this.categoryRepository.remove(data.id);
    }
}