import { FormaPagamento } from "../enum/FormaPagamento.enum";
import { SituacaoNotaFiscal } from "../enum/SituacaoNotaFiscal";
import { Auditable } from "./Auditable";
import { Fornecedor } from "./Fornecedor";
import { NotaFiscalItens } from "./NotaFiscalItens";
import { NotaFiscalPagamento } from "./NotaFiscalPagamento";


export interface NotaFiscal extends Auditable{
    id: number | null;
    fornecedor:Fornecedor;
    numero: number;
    valorTotal: string;
    formaPagamento: FormaPagamento;
    parcelas: number;
    itens: NotaFiscalItens[];
    pagamento?: NotaFiscalPagamento;
    situacao?: SituacaoNotaFiscal
}