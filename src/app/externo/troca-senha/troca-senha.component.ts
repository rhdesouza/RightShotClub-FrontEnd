import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { rightshot } from 'src/app/common/constantes/RightShotClub';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { LoginService } from 'src/app/login/login.service';
import { User } from 'src/app/model/entity/User';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.css']
})
export class TrocaSenhaComponent implements OnInit {

  public error!: string;
  public form: FormGroup;
  returnUrl: string;

  public tituloAplicacao = rightshot.tituloAplicacao;
  public versao = rightshot.versao;
  public user: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private snakeBarService: SnakeBarService,
  ) {
    this.form = this.formBuilder.group({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!params.info) {
        this.snakeBarService.openSnackBarError("Ocorreu um erro, entre em contato com o Adm.").afterDismissed().subscribe(() => {
          this.loginService.logout();
        });
      } else {
        this.user = JSON.parse(atob(params.info));
      }
    });
  }

  public submit() {
    if (this.validatePassword()) {
      this.loginService.alterarSenha(this.user!.id, this.form.get("oldPassword")?.value, this.form.get("newPassword")?.value).subscribe(
        data => {
          this.snakeBarService.openSnackBarSuccess("Senha alterada com sucesso! Você será redirecionado para login.")
            .afterDismissed()
            .subscribe(() => {
              this.loginService.logout();
            });
        },
        err => {
          console.log(err);
        },
        () => console.log("Alteração de senha com sucesso!")
      );
    }
  }

  private validatePassword(): Boolean {
    if (this.form.value.newPassword != this.form.value.confirmPassword) {
      this.snakeBarService.openSnackBarError("O campo senha e confirmação devem ser idênticos. Refaça sua ação.");
      this.form.get("newPassword")?.setValue(null);
      this.form.get("confirmPassword")?.setValue(null);
      return false;
    }
    return true;
  }
}
