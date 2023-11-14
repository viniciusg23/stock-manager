import * as ExcelJS from "exceljs";
import { Product } from "../../entities/Product";
type MesesDoAno = {
  Janeiro: 1;
  Fevereiro: 2;
  Marco: 3;
  Abril: 4;
  Maio: 5;
  Junho: 6;
  Julho: 7;
  Agosto: 8;
  Setembro: 9;
  Outubro: 10;
  Novembro: 11;
  Dezembro: 12;
};

const mesesDoAno: MesesDoAno = {
  Janeiro: 1,
  Fevereiro: 2,
  Marco: 3,
  Abril: 4,
  Maio: 5,
  Junho: 6,
  Julho: 7,
  Agosto: 8,
  Setembro: 9,
  Outubro: 10,
  Novembro: 11,
  Dezembro: 12,
};

// interface ItemDeCompra {
//   isFiscal: boolean;
//   category: string;
//   name: string;
//   costPrice: number;
//   salePrice: number;
//   purchaseMonth: keyof typeof mesesDoAno;
//   purchaseYear: number;
// }

const categorias: { [codigo: string]: string } = {
    "33,042,010": "Maquiagem",
    "39,269,090": "Chaveiro/lenço crochê",
    "42,021,210": "Bolsa necessaire",
    "42,022,100": "Bolsa etnica",
    "42,022,210": "Bolsa",
    "42,022,220": "Carteira",
    "42,022,900": "Bolsa chutch",
    "42,023,200": "Bolsa necessaire/porta moedas",
    "42,029,200": "Bolsa",
    "42,033,000": "Cinto",
    "42,034,000": "Pulseira/bracelete",
    "61,178,090": "Lenço",
    "62,143,000": "Lenço triangulo",
    "62,144,000": "Lenço franja",
    "66,019,110": "Sombrinha",
    "71,171,900": "Pulseira/brinco/colar",
    "71,179,000": "Anel",
    "76,169,900": "Cinzeiro/porta remédio metal",
    "96,151,100": "Grampo cabelo pequeno",
    "96,151,900": "Grampo cabelo estampado",
    "96,159,000": "Presília",
};

function obterNumeroParaCategoria(categoria: string): string {
  if (categoria === "Maquiagem" || categoria === "Chaveiro/lenço crochê") {
    return "3";
  } else if (
    categoria === "Bolsa" ||
    categoria === "Bolsa necessaire" ||
    categoria === "Bolsa etnica" ||
    categoria === "Bolsa chutch" ||
    categoria === "Bolsa necessaire/porta moedas"
  ) {
    return "4";
  } else if (categoria === "Cinto") {
    return "5";
  } else if (
    categoria === "Lenço" ||
    categoria === "Lenço triangulo" ||
    categoria === "Lenço franja"
  ) {
    return "6";
  } else if (categoria === "Sombrinha") {
    return "7";
  } else if (
    categoria === "Pulseira/bracelete" ||
    categoria === "Pulseira/brinco/colar" ||
    categoria === "Anel"
  ) {
    return "7";
  } else if (categoria === "Carteira") {
    return "8";
  } else if (
    categoria === "Grampo cabelo pequeno" ||
    categoria === "Grampo cabelo estampado"
  ) {
    return "9";
  } else if (categoria === "Presília") {
    return "0";
  } else {
    return "Categoria não encontrada";
  }
}

function incluirLetraParaAno(ano: number): string {
  if (ano >= 2012 && ano <= 2030) {
    const letra = String.fromCharCode(97 + (ano - 2012));
    return letra.toUpperCase();
  } else {
    return "Ano fora do intervalo permitido";
  }
}

function incluirLetraParaMes(mes: keyof typeof mesesDoAno): string {
  const letra = String.fromCharCode(96 + mesesDoAno[mes]);

  if (letra) {
    return letra.toUpperCase();
  } else {
    return "Mês inválido";
  }
}

function incluir3LetrasParaNome(nome: string): string {
  const nomeTratado = nome.trim();

  if (nomeTratado.length >= 3) {
    return nomeTratado.substring(0, 3);
  } else {
    return "Nome muito curto";
  }
}

function formatarPreco(preco: number): string {
  const precoFormatado = preco.toFixed(2);
  const partes = precoFormatado.split(".");
  const parteInteira = partes[0];
  const parteDecimal = partes[1] || "00";
  const parteInteiraComZero = parteInteira.padStart(3, "0");
  return parteInteiraComZero + parteDecimal;
}

function gerarCodigo(objeto: Product): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let novoCodigo: string = "";
    if (objeto.isIsFiscal() == true) {
      novoCodigo += "1";
    } else {
      novoCodigo += "2";
    }
    novoCodigo += incluirLetraParaAno(objeto.getPurchaseYear());
    novoCodigo += incluirLetraParaMes(objeto.getPurchaseMonth());
    novoCodigo += obterNumeroParaCategoria(objeto.getCategory()!.getName());
    novoCodigo += incluir3LetrasParaNome(objeto.getName());
    novoCodigo += formatarPreco(objeto.getSalePrice());
    resolve(novoCodigo.toUpperCase());
  });
}

export async function gerarPlanilha(items: Product[]): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Itens de Compra");

  // Defina o cabeçalho da planilha
  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Categoria", key: "category", width: 20 },
    { header: "Nome", key: "name", width: 30 },
    { header: "Preço de Custo", key: "costPrice", width: 15 },
    { header: "Preço de Venda", key: "salePrice", width: 15 },
    { header: "Mês de Compra", key: "purchaseMonth", width: 15 },
    { header: "Ano de Compra", key: "purchaseYear", width: 15 },
    { header: "Codigo do produto", key: "codigoProduto", width: 15 },
  ];

  // Preencha os dados da planilha com base nos itens
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const codigoProduto = await gerarCodigo(item);
    worksheet.addRow({
      id: index + 1,
      category: item.getCategory(),
      name: item.getName(),
      costPrice: item.getCostPrice(),
      salePrice: item.getSalePrice(),
      purchaseMonth: item.getPurchaseMonth(),
      purchaseYear: item.getPurchaseYear(),
      codigoProduto: codigoProduto,
    });
  }

  const buffer = await workbook.xlsx.writeBuffer();

  await workbook.xlsx.writeFile("itens_de_compra.xlsx");
}

// const itensDeCompra: ItemDeCompra[] = [
//   {
//     isFiscal: true,
//     category: "Maquiagem",
//     name: "Batom",
//     costPrice: 5.0,
//     salePrice: 10.0,
//     purchaseMonth: "Janeiro",
//     purchaseYear: 2023,
//   },
//   {
//     isFiscal: false,
//     category: "Bolsa",
//     name: "Bolsa de Couro",
//     costPrice: 50.0,
//     salePrice: 100.0,
//     purchaseMonth: "Fevereiro",
//     purchaseYear: 2023,
//   },
//   {
//     isFiscal: true,
//     category: "Cinto",
//     name: "Teste",
//     costPrice: 49.0,
//     salePrice: 79.0,
//     purchaseMonth: "Marco",
//     purchaseYear: 2023,
//   },
// ];

// gerarPlanilha(itensDeCompra)
//   .then(() => {
//     console.log("Planilha gerada com sucesso.");
//   })
//   .catch((error) => {
//     console.error("Erro ao gerar a planilha:", error);
//   });
