import { Auditable } from './Auditable';
import { Ncm } from './Ncm';
import { TipoProduto } from './TipoProduto';

export interface Produto extends Auditable {
    id: number;
    codProduto: string;
    descricao: string;
    tipoProduto: TipoProduto | number;
    estoqueMinimo: number;
    ncm: Ncm | string;
    dataDesativacao: string;
}