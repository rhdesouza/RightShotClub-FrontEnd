import { Produto } from "./Produto";

export interface PrecificacaoProduto{
    id?: number;
    produto: Produto;
    markupReferncia: String;
    valorMedioNF: String;
    valorProdutoSugerido: String;
    valorProduto: String;
    
}