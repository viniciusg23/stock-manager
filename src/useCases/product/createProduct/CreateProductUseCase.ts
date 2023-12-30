import { Category } from "../../../entities/Category";
import { Product } from "../../../entities/Product";
import { Supplier } from "../../../entities/Supplier";
import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { ISupplierRepository } from "../../../repository/supplierRepository/ISupplierRepository";
import { ICreateProductRequestDTO } from "./CreateProductDTO";

export class CreateProductUseCase {
  private productRepository: IProductRepository;
  private categoryRepository: ICategoryRepository;
  private supplierRepository: ISupplierRepository;

  public constructor(productRepository: IProductRepository, categoryRepository: ICategoryRepository, supplierRepository: ISupplierRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.supplierRepository = supplierRepository;
  }

  public async execute(data: ICreateProductRequestDTO) {
    // TODO: gerar codigo personalizado do cliente
    // * No momento vou gerar qualquer codigo aleatorio...
    let code = "";

    const category: Category | null = await this.categoryRepository.findById(data.category);
    const supplier: Supplier | null = await this.supplierRepository.findById(data.supplier);

    if(!category){
      throw new Error("Cannot create a product. Invalid category.");
    }

    if(!supplier){
      throw new Error("Cannot create a product. Invalid supplier");
    }

    code += data.isFiscal ? "1" : "2";
    code += String.fromCharCode(65 + data.purchaseMonth - 1) + String.fromCharCode(65 + data.purchaseYear - 2012);
    code += category.getFiscalCode()[0];
    code +=  data.name.substring(0, 3).toUpperCase();
    code += data.costPrice.toFixed(2).replace(".", "").padStart(5, "0");

    /**
    consegue so confirmar pra mim entao? 
2MJ4CIN00790

2- Mostra se é fiscal ou não fiscal
M/J - ano e mes
4- Primeiro digito codigo ncm
CIN - três primeiras letras do produto
00790 - custo 7,90

1 se for fiscal, dois se não for
Ano começa em 2012 a letra A,2013 b… 
Mes- Janeiro a, fevereiro b…
codigo ncm eu peguei a tabela de coisas que ele usa(as categorias) e de acordo com a categoria pega o primeiro dígito do código 
três primeiras letras do produto(acho q pode ser a categoria mesmo)
e o custo pelo que eu entendi não tem muito um padrão mas acho que se fosse 79 seria 07900
eu falaria pra vc pegar o que eu ja fiz pronto, ta tudo funcionando na teoria, mas se não quiser a lógica é essa
     */

    const product = new Product(
      data.isFiscal,
      category,
      data.name,
      data.quantity,
      data.costPrice,
      data.salePrice,
      data.purchaseMonth,
      data.purchaseYear,
      supplier,
      code
    );

    await this.productRepository.create(product);
  }
}
