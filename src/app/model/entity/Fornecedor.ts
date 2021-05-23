import { SituacaoFornecedorEnum } from "../enum/SituacaoFornecedor.enum";
import { Auditable } from "./Auditable";

export interface Fornecedor extends Auditable {
    id: number;
    razaoSocial: string;
    nomeFantasia: string;
    cep: string;
    logradouro: string;
    numero: string;
    cidade: string;
    estado: string;
    pais: string;
    cpfCnpj: string;
    inscricaoMunicipal: string;
    inscricaoEstadual: string;
    iss: string;
    email: string;
    telefone: string;
    telefone2: string;
    telefone3: string;
    codBanco: string;
    agencia: string;
    conta: string;
    contatoNome: string;
    contatoCargo: string;
    contatoEmail: string;
    contatoTelefone: string;
    contatoTelefone2: string;
    contatoTelefone3: string;
    situacao: SituacaoFornecedorEnum
}