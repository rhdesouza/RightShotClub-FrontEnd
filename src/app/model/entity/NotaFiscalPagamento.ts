import { NotaFiscal } from "./NotaFiscal";

export interface NotaFiscalPagamento{
    id: number;
    parcela: number;
    valorTotal: number;
    dataPagamento: string;
    nf: NotaFiscal;
}