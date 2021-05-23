import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestService } from "../common/httpService/httpService.component";
import { InfoRSC } from "../model/entity/InfoSRC";
import { Role } from "../model/entity/Role";
import { User } from "../model/entity/User";
import { TipoRequisicaoRestEnum } from "../model/enum/tipo-requisicao-rest.enum";



@Injectable({
    providedIn: 'root'
})

export class AdmService {
    constructor(
        private rest: RestService,
    ) {

    }

    public saveUser(user: User): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, "user", undefined, user);
    }

    public saveNewUser(user: User): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, "user/saveNewUser", undefined, user);
    }

    public saveRoleUser(user: User): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, "user/saveRoleUser", undefined, user);
    }

    public getAllUsers(): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, 'user/getAllUser');
    }

    public getAllRoles(): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, 'user/getAllRoles');
    }

    public saveRoles(role: Role): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.PUT, 'user/roles/add', undefined, role);
    }

    public desativarUser(idUser: number): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, `user/disabled/${idUser}`);
    }

    public getUserPorId(idUser: number): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `user/one/${idUser}`)
    }

    public saveInfoSRC(infosrc: InfoRSC): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.PUT, `infoRSC/save`, null, infosrc)
    }

    public getInfoSRC(): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `infoRSC/getInfoRSC`)
    }

}