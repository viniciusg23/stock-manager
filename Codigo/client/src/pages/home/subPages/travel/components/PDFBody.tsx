import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { IPurchasedProduct } from '../ManageTravel';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface IPDFBodyProps {
    produtos: IPurchasedProduct[];
    valorTotal: number;
}

export default function PDFBody(props: IPDFBodyProps) {
    const {produtos, valorTotal} = props;

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const title = [
        {
            margin: [15,20,0,45],
            text: 'RELATÓRIO DE VENDAS', 
            style: 'reportName', 
            alignment: 'center',
            fontSize: 15,
            bold: true,
        }
    ];

    const dados = produtos.map((produto) => {
        return [
            { text: produto.product.name, fontSize: 9, margin: [0,4,0,0] },
            { text: `R$ ${produto.uniquePrice}`, fontSize: 9, margin: [0,4,0,0] },
            { text: produto.quantity, fontSize: 9, margin: [0,4,0,0] },
            { text: `R$ ${produto.total}`, fontSize: 9, margin: [0,4,0,0] }
        ]
    })


    const details = [
        {
            table: {
                headerRows: 1,
                widths: ['*',55,55,55],
                body: [
                    [
                        { text: 'Nome Produto', style: 'tableHeader', fontSize: 10, margin: [0,4,0,0] },
                        { text: 'Valor Unit.', style: 'tableHeader', fontSize: 10, margin: [0,4,0,0] },
                        { text: 'Quantidade', style: 'tableHeader', fontSize: 10, margin: [0,4,0,0] },
                        { text: 'Valor Total', style: 'tableHeader', fontSize: 10, margin: [0,4,0,0] }
                    ],
                    ...dados,
                    [
                        { text: '', fontSize: 10, margin: [0,4,0,0] },
                        { text: '', fontSize: 10, margin: [0,4,0,0] },
                        { text: '', fontSize: 10, margin: [0,4,0,0] },
                        { text: `R$ ${valorTotal}`, style: 'tableHeader',bold:true, fontSize: 10, margin: [0,4,0,0] }
                    ]
                ],
            },
            layout: 'headerLineOnly'
        }
    ];

    function footer (currentPage: any, pageCount: any){
        return {
            layout: 'noBorders',
            margin: [14, 0, 14, 22],
            table: {
            widths: ['auto'],
              body: [
                [
                  {
                    text:
                      '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                    alignment: 'center',
                    fontSize: 5,
                  },
                ],
                [
                  [
                    {
                      text: `Página ${currentPage.toString()} de ${pageCount}`,
                      fontSize: 7,
                      alignment: 'right',
                      /* horizontal, vertical */
                      margin: [3, 0],
                    },
                    {
                      text: '© Complemento',
                      fontSize: 7,
                      alignment: 'center',
                    },
                  ],
                ],
              ],
            },
        };
    }

    const docDefinitions: unknown = {
        pageSize: 'A4',
        pageMargins: [15,50,15,40],

        header: [title],
        content: [details],
        footer: footer
    }

    pdfMake.createPdf(docDefinitions as TDocumentDefinitions).open();
}