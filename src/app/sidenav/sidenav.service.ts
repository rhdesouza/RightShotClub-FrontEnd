import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { RestService } from '../common/httpService/httpService.component';
import { TipoRequisicaoRestEnum } from '../model/enum/tipo-requisicao-rest.enum';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    constructor(
        private rest: RestService,
    ) {

    }

    public getMenu(): Observable<any> {
        return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, 'menu/all');
    }

}