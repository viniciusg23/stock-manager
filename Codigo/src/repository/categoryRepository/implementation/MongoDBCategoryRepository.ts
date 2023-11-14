import { Category } from "../../../entities/Category";
import { CategoryModel } from "../../../models/Category";
import { ICategoryRepository } from "../ICategoryRepository";

export class MongoDBCategoryRepository implements ICategoryRepository {

    async findById(id: string): Promise<Category | null> {
        const findedCategory = await CategoryModel.findOne({_id: id});

        if(findedCategory){
            return new Category(findedCategory.name, findedCategory.fiscalCode, findedCategory._id.toString());
        }
        return null;
    }

    async findByName(name: string): Promise<Category | null> {
        const findedCategory = await CategoryModel.findOne({name: name});

        if(findedCategory){
            return new Category(findedCategory.name, findedCategory.fiscalCode, findedCategory._id.toString());
        }
        return null;
    }

    async remove(id: string): Promise<void> {

        const deletedCategory = await CategoryModel.deleteOne({_id: id});

        if(!deletedCategory){
            throw new Error("Was not possible to delete this Category");
        }

    }

    async create(category: Category): Promise<void> {

        const findedCategory = await this.findByName(category.getName());

        if(findedCategory){
            throw new Error("This category already exists.");
        }

        await CategoryModel.create({name: category.getName(), fiscalCode: category.getFiscalCode()});
    }

    async findAll(): Promise<Category[]> {
        const allCategorysDB = await CategoryModel.find();
        const allCategorys: Category[] = [];

        for(const category of allCategorysDB){
            allCategorys.push(new Category(category.name, category.fiscalCode, category._id.toString()));
        }

        return allCategorys;
    }
    
}