import { CategoriaAirsoftEnum } from '../enum/CategoriaAirsoft.enum';
import { SituacaoAirsoftEnum } from '../enum/SituacaoAirsoft.enum';
import { AirsoftImagem } from './AirsoftImagem';
import { Fornecedor } from './Fornecedor';

export interface Airsoft{

    id: number;
    modelo: string;
    categoria: CategoriaAirsoftEnum;
    especificacoesTecnicas: string;
    descricao: string;
    precoCompra: string;
    fornecedor: Fornecedor | number;
    numeroNFE: string;
    airsoftImagem: AirsoftImagem[];
    dataCadastro: string;
    situacao: SituacaoAirsoftEnum;
}