import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaFiscal } from 'src/app/model/entity/NotaFiscal';
import { Produto } from 'src/app/model/entity/Produto';
import { TipoProduto } from 'src/app/model/entity/TipoProduto';
import { PageVO } from 'src/app/model/vo/pageVO';
import { RestService } from '../../common/httpService/httpService.component';
import { TipoRequisicaoRestEnum } from '../../model/enum/tipo-requisicao-rest.enum';


@Injectable({
  providedIn: 'root'
})

export class EstoqueService {

  constructor(
    private rest: RestService
  ) { }
  /**
   * Produto
   */
  public getAllProduto(): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `produto/all`);
  }

  public saveProduto(produto: Produto): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.PUT, `produto/add`, null, produto);
  }

  public getProdutoPorId(idProduto: number) {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `produto/one/${idProduto}`);
  }

  public desativarProdutoPorId(idProduto: number) {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, `produto/desativar/${idProduto}`);
  }

  /**
   * NCM
   */
  public getNcmPorId(ncm: string) {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `ncm/one/${ncm}`);
  }

  public isUploadNcm() {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `ncm/isUploadNcm`);
  }

  /**
   * Tipo - Produto
   */
  public getAllTipoProduto(): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `tipoProduto/all`);
  }

  public saveTipoProduto(tipoProduto: TipoProduto): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.PUT, `tipoProduto/add`, null, tipoProduto);
  }

  public getTipoProdutoId(idTipoProduto: number): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `tipoProduto/one/${idTipoProduto}`);
  }

  /**
   * Estoque
   */
  public getAllEstoqueSintetico(): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `estoque/getAllSintetico`);
  }

  public getAllEstoqueSinteticoPageable(sort: string, sortDirection: string, pageIndex: number,
    pageSize: number, changedQuery: Boolean, filterForm?: any): Observable<any> {

    let PageVO: PageVO = {
      sort: sort,
      sortDirection: sortDirection,
      pageIndex: pageIndex,
      pageSize: pageSize,
      changedQuery: changedQuery,
      filterForm: filterForm
    }

    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, `estoque/getAllSinteticoPageable`, null, PageVO);
  }

}