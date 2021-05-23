export interface InfoRSC {
    //Empresa
    id: String;
    cnpj: String;
    nomeEmpresa: String;
    nomeFantasia: String;
    telefone1: String;
    telefone2?: String;
    emailEmpresa: String;

    logradouro?: String;
    numero?: String;
    cep?: String;
    complemento?: String;
    bairro?: String;
    municipio?: String;
    uf?: String;

    socio1: String;
    emailSocio1: String;
    socio2?: String;
    emailSocio2?: String;

    //Financeiro
    markup?: String;
}