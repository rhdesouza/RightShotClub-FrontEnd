import { ModuloEnum } from "../enum/Modulo.enum";
import { ModuloAcaoEnum } from "../enum/ModuloAcao.enum";
import { SubModuloEnum } from "../enum/SubModulo.enum";
import { Auditable } from "./Auditable";

export interface Role extends Auditable {

    id: string;
    name: string;
    modulo: ModuloEnum;
    subModulo: SubModuloEnum;
    acao: ModuloAcaoEnum;
    authority: string

}