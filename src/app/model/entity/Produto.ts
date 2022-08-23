import { Auditable } from './Auditable';
import { Ncm } from './Ncm';
import { TipoProduto } from './TipoProduto';

export interface Produto extends Auditable {
    id: number;
    codProduto: string;
    descricao: string;
    tipoProduto: TipoProduto;
    estoqueMinimo: number;
    ncm: Ncm;
    dataDesativacao: string;
}