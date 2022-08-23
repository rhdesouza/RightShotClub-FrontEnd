import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestService } from '../common/httpService/httpService.component';
import { StorageComponent } from '../common/httpService/storage.component';
import { CriptoJsService } from '../common/services/cripto-js.service';
import { TrocaSenhaUserDTO } from '../model/dto/TrocaSenhaUserDTO';
import { Role } from '../model/entity/Role';
import { TipoRequisicaoRestEnum } from '../model/enum/tipo-requisicao-rest.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public usuarioLogadoSubject: BehaviorSubject<any>;
  public usuarioLogado: Observable<any>;

  constructor(
    private rest: RestService,
    private sessionStorage: StorageComponent,
    private router: Router,
    private dialogRef: MatDialog,
    private criptoJsService: CriptoJsService
  ) {
    this.usuarioLogadoSubject = new BehaviorSubject<any>(!!this.sessionStorage.getToken());
    this.usuarioLogado = this.usuarioLogadoSubject.asObservable();
  }

  public login(usuario: string, senha: string): Observable<any> {
    return this.rest.login(usuario, senha);
  }

  public logout() {
    this.dialogRef.closeAll();
    this.sessionStorage.removeSession();
    this.router.navigate(['/login']);
    this.usuarioLogadoSubject.next(!!this.sessionStorage.getToken());
  }

  public getUserInfoSetRoles(): Observable<any> {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, 'user-auth');
  }

  public getUsuatioLogado(): boolean {
    return !!this.sessionStorage.getToken();
  }

  public getUserSettings() {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, 'user-auth');
  }

  public getUserId(idUser: number) {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `user/one/${idUser}`);
  }

  public excluirArquivo(idUser: number) {
    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.GET, `user/deleteImage/${idUser}`);
  }

  public validaRolesUsuario(rolesUsu: string[]): string[] {
    let roles: Role[] = JSON.parse(this.sessionStorage.getRoles());
    let rolesValidadas: string[] = [];

    rolesUsu.forEach(r => {
      if (roles?.find(x => x.name === r))
        rolesValidadas.push(r);
    });

    return rolesValidadas;
  }

  public alterarSenha(id: number, oldPass: string, newPass: string) {
    var infoUser: TrocaSenhaUserDTO = {
      idUser: id,
      confirmPass: this.criptoJsService.encrypt(oldPass),
      newPass: this.criptoJsService.encrypt(newPass)
    };

    return this.rest.gerarSolicitacao(TipoRequisicaoRestEnum.POST, 'user/changePass', undefined, infoUser);
  }

}
