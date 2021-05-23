import { Produto } from "../entity/Produto";
import { PrecificacaoProdutoAudDTO } from "./PrecificacaoProdutoAudDTO";

export interface PrecificacaoProdutoHistoricoDTO {

    produto: Produto;
    historicoPrecificacao?: PrecificacaoProdutoAudDTO[];

}