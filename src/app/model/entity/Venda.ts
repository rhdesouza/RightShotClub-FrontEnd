import { FormaPagamento } from "../enum/FormaPagamento.enum";
import { Cliente } from "./Cliente";
import { VendaItens } from "./VendaItens";

export interface Venda {
    id: number;
    cliente: Cliente;
    formaPagamento: FormaPagamento;
    dataHoraVenda: String;
    valorTotalItens: String;
    valorDescontoNota: String;
    valorTotalVenda: String;
    vendaItens: VendaItens[];
    emailEnviado: Boolean;
}
