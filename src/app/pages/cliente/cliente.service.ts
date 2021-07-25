import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/entity/Cliente';
import { PageVO } from 'src/app/model/vo/pageVO';
import { RestService } from '../../common/httpService/httpService.component';
import { TipoRequisicaoRestEnum } from '../../model/enum/tipo-requisicao-rest.enum';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private rest: RestService
  ) { }

  public getAllClientes(): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, 'clientes/all');
  }

  public getAllClienteDTOPageable(sort: string, sortDirection: string, pageIndex: number, 
    pageSize: number, changedQuery: Boolean, filterForm?: any,): Observable<any>{

      let PageVO: PageVO = {
        sort: sort,
        sortDirection: sortDirection,
        pageIndex: pageIndex, 
        pageSize: pageSize,
        changedQuery: changedQuery,
        filterForm: filterForm
      }

    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, `clientes/getAllClientePageable`, null, PageVO);
  }

  public getClientePorId(idCliente: number): Observable<any>{
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `clientes/one/${idCliente}`);
  }

  public getEnderecoPorCep(cep) {
    return this.rest.getEnderecoPorCep(cep);
  }

  public addCliente(Cliente: Cliente): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, 'clientes/add', undefined, Cliente);
  }

  public getFotoCliente(idFotoCliente: number): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `clientes/getFotoCliente/${idFotoCliente}`, undefined, );
  }

  public buscarClientePorCpf(cpf: String): Observable<Cliente> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `clientes/getClientePorCpf/${cpf}`, undefined, );
  }
}
