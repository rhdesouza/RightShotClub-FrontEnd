import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { TipoRequisicaoRestEnum } from 'src/app/model/enum/tipo-requisicao-rest.enum';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

const headers = new HttpHeaders()
  .set('Content-Type', 'application/json; charset-UTF-8')
  .set('Cache-Control', 'no-cache')
  .set('Pragma', 'no-cache')
  .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Gera uma solicitação de consulta de acordo com o tipo da requisição.
   *
   * @param tipoRequisicao
   * @param path
   * @param params
   * @param body
   * @param url
   */
  gerarSolicitacao(
    tipoRequisicao: TipoRequisicaoRestEnum,
    path: string,
    params?: HttpParams | null,
    body?: any | null,
    url?: string
  ) {
    const headers = {
      /* 'Authorization': this.sessionStorage.getToken(), */
      'Content-Type': 'application/json; charset-UTF-8'
    }

    let solicitacao$: Observable<any>;
    switch (tipoRequisicao) {
      case TipoRequisicaoRestEnum.GET: {
        solicitacao$ = this.get(path, params!, url, headers);
        break;
      } case TipoRequisicaoRestEnum.POST: {
        solicitacao$ = this.post(path, body, url, headers, params!);
        break;
      } case TipoRequisicaoRestEnum.PUT: {
        solicitacao$ = this.put(path, body, url, headers);
        break;
      } case TipoRequisicaoRestEnum.DELETE: {
        solicitacao$ = this.delete(path, body, url, headers);
        break;
      } default: {
        solicitacao$ = throwError(() => 'Somente é permitido um dos seguintes tipos de requisição: GET, POST, PUT ou DELETE');
        break;
      }
    }
    return solicitacao$;
  }

  /**
   * Requisição GET.
   *
   * @param path
   * @param params
   * @param url
   */
  private get(path: string, params?: HttpParams, url?: string, headers?: any) {
    //return this.http.get(url ? url : API + path, { headers }).pipe(take(1));
    return this.http.get(
      url ? url : API + path,
      { headers, params }
    ).pipe(take(1));
    /* return this.http.get(url ? url : API + path, {
      headers: headers,
      params: params,
      reportProgress: true
    }); */
  }

  /**
   * Requisição POST.
   *
   * @param path
   * @param body
   * @param url
   */
  private post(path: string, body?: any, url?: string, headers?: any, params?: HttpParams) {
    let bodyJson = body ? JSON.stringify(body) : undefined;

    return this.http.post(url ? url : API + path, bodyJson, { headers, params }).pipe(take(1));

    //return this.http.post(url ? url : API + path, bodyJson, { headers }).pipe(take(1));
  }

  /**
   * Requisição PUT.
   *
   * @param path
   * @param body
   * @param url
   */
  private put(path: string, body?: any, url?: string, headers?: any) {
    let bodyJson = body ? JSON.stringify(body) : undefined;
    return this.http.put(url ? url : API + path, bodyJson, { headers }).pipe(take(1));
  }

  /**
   * Requisição DELETE.
   *
   * @param path
   * @param body
   * @param url
   */
  private delete(path: string, body: any, url?: string, headers?: any) {
    return this.http.delete((url ? url : API + path) + (!!body ? ('/' + body) : '')).pipe(take(1));
  }

  /**
   * @param login 
   * @param password 
   * TODO: Criptografar para o back-end o usuário e senha
   */
  public login(login: string, password: string): Observable<any> {
    const headers = { 'Authorization': environment.Authorization }
    var formdata = new FormData();

    formdata.append("grant_type", "password");
    formdata.append("username", login);
    formdata.append("password", password);

    return this.http.post(`${environment.API}oauth/token`, formdata, { headers }).pipe(take(1));
  }

  public getEnderecoPorCep(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(take(1));
  }
}
