import { PrecificacaoProduto } from "../entity/PrecificacaoProduto";
import { Produto } from "../entity/Produto";
import { ValorMedioPorProdutoVO } from "../vo/ValorMedioPorProdutoVO";

export interface PrecificacaoProdutoDTO{
    
    markupRSC: String;
    valorMedioPorProdutoVO: ValorMedioPorProdutoVO;
    produto: Produto
    precificacaoProduto: PrecificacaoProduto

}