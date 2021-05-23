import { UnidadeNF } from "../enum/UnidadeNF";
import { Produto } from "./Produto";

export interface NotaFiscalItens{

    id: number;
    produto: Produto;
    codigoProduto: string;
    descricaoProduto: string;
    ncmSh: string;
    cst: string;
    cfop: string;
    un: UnidadeNF
    qtd: number;
    valorUnit: string;
    valorTotal: number;
    aliquitaIcms: string;
    aliquitaIpi: string;
    
}