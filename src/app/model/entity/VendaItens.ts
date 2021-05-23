import { Produto } from "./Produto";

export interface VendaItens{
    id: number;
    produto: Produto;
    tipoUnidade: String;
    qtd: number;
    valorProduto: String;
    valorDesconto: String;
    valorVenda: String;
}
