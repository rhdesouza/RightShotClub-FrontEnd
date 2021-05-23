import { Auditable } from "../entity/Auditable";
import { Produto } from "../entity/Produto";

export interface PrecificacaoProdutoAudDTO extends Auditable{

    id: number;
    produto: Produto;
    markupReferncia: String;
    valorMedioNF: String;
    valorProdutoSugerido: String;
    valorProduto: String;
    
}