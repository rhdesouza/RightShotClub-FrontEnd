import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../common/httpService/httpService.component';
import { TipoRequisicaoRestEnum } from '../../model/enum/tipo-requisicao-rest.enum';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private rest: RestService
  ) { }

  public getQtdClientePorSituacaoGraf(){
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, 'dashboard/qtdClienteSituacao');
  }

  public getQtdFornecedorPorSituacaoGraf(){
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, 'dashboard/qtdFornecedorSituacao');
  }

  

}
