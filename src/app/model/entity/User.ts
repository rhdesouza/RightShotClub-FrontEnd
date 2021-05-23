import { SituacaoUser } from '../enum/SituacaoUser.enum';
import { Auditable } from './Auditable';
import { Role } from './Role';

export interface User extends Auditable {

    id: number;
    nomeCompleto: string;
    user: string;
    email: string;
    situacao: SituacaoUser;
    roles: Role[];
}