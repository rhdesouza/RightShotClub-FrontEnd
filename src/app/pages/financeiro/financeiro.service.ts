import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/common/httpService/httpService.component';
import { NotaFiscal } from 'src/app/model/entity/NotaFiscal';
import { PrecificacaoProduto } from 'src/app/model/entity/PrecificacaoProduto';
import { TipoRequisicaoRestEnum } from 'src/app/model/enum/tipo-requisicao-rest.enum';
import { PageVO } from 'src/app/model/vo/pageVO';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  constructor(
    private rest: RestService
  ) { }

  /**
  * Nota Fiscal
  */

  public saveNotaFiscal(nf: NotaFiscal): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.PUT, `nf/add`, null, nf);
  }

  public getNotaFiscalId(idNotaFiscal: number): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `nf/one/${idNotaFiscal}`);
  }

  public getAllNotaFiscal(): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `nf/getAll`);
  }

  public gerarEstoquePorIdNF(idNF: number): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, `nf/add/estoque/${idNF}`);
  }


  /**
   * Serviços para Precificação
   */
  public getAllProdutosPrecificacao(sort: string, sortDirection: string, pageIndex: number,
    pageSize: number, changedQuery: Boolean, filterForm?: any): Observable<any> {

    let PageVO: PageVO = {
      sort: sort,
      sortDirection: sortDirection,
      pageIndex: pageIndex,
      pageSize: pageSize,
      changedQuery: changedQuery,
      filterForm: filterForm
    }

    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, `precificacao/precificacaoProdutoList`, null, PageVO);
  }

  public getPrecificacaoProduto(idProduto: number): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `precificacao/precificacaoProduto/${idProduto}`);
  }

  public savePrecificacaoProduto(precificacaoProduto: PrecificacaoProduto): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, `precificacao/save`, null, precificacaoProduto);
  }

  public limparPrecificacaoProduto(idProduto: number): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, `precificacao/deletePrecificacao/${idProduto}`);
  }

  public getHistoricoPrecificacaoProduto(idProduto: number): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `precificacao/historicoPrecificacaoProduto/${idProduto}`);
  }

}
