export interface PrecificacaoProdutoListDTO {
    idProduto: number ;
    cod_produto: String;
    descricao: String;
    tipo: String;
    unid_compra: String,
    unid_venda: String;
    id: number;
    valor_produto: String;
    selecionado: boolean; //Para seleção
    qtd_est_real: Number;
}