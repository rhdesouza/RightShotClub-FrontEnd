
export interface EstoqueDTO {
    id_produto: number;
    descricao: string;
    qtd_nota: number;
    qtd_estoque: number;
    estoque_minimo: number;
    qtd_venda: number;
    qtd_est_real: number;
    tipo: string;
    unid_compra: string;
    unid_venda: string;
}