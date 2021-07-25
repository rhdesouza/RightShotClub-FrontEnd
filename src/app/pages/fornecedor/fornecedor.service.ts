import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FornecedorDTO } from 'src/app/model/dto/FornecedorDTO';
import { Fornecedor } from 'src/app/model/entity/Fornecedor';
import { PageVO } from 'src/app/model/vo/pageVO';
import { RestService } from '../../common/httpService/httpService.component';
import { TipoRequisicaoRestEnum } from '../../model/enum/tipo-requisicao-rest.enum';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(
    private rest: RestService
  ) { }

  public getAllFornecedores(): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, 'fornecedores/all');
  }

  
  public getAllFornecedorDTOPageable(sort: string, sortDirection: string, pageIndex: number, 
    pageSize: number, changedQuery: Boolean, filterForm?: any): Observable<PageVO>{
      
      let PageVO: PageVO = {
        sort: sort,
        sortDirection: sortDirection,
        pageIndex: pageIndex, 
        pageSize: pageSize,
        changedQuery: changedQuery,
        filterForm: filterForm
      }

    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, `fornecedores/getAllFornecedorPageable`, null, PageVO);
  }

  public getFornecedorPorId(idFornecedor: number): Observable<any>{
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `fornecedores/one/${idFornecedor}`);
  }

  public getEnderecoPorCep(cep) {
    return this.rest.getEnderecoPorCep(cep);
  }

  public addFornecedor(fornecedor: Fornecedor): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, 'fornecedores/add', undefined, fornecedor);
  }
  
}
