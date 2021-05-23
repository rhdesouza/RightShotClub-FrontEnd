import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { rightshot } from '../common/constantes/RightShotClub';
import { StorageComponent } from '../common/httpService/storage.component';
import { SnakeBarService } from '../common/snakebar/snakebar.service';
import { LoginService } from './login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error!: string
  public form: FormGroup;
  returnUrl: string;

  public tituloAplicacao = rightshot.tituloAplicacao;
  public versao = rightshot.versao;

  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    private route: ActivatedRoute,
    private snakeBarService: SnakeBarService,
    private sessionStorage: StorageComponent,
    private router: Router,
  ) {
    this.form = this./*  */formBuilder.group({
      username: new FormControl('admin', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('admin', [Validators.required, Validators.minLength(5)]),
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
  }

  public submit() {
    this.loginService.login(this.form.value.username, this.form.value.password).subscribe(
      data => {
        this.sessionStorage.setToken(data.access_token);
        this.loginService.getUserInfoSetRoles().subscribe(
          data => {
            this.sessionStorage.setRoles(JSON.stringify(data.roles));
            this.router.navigate(['/dashboard']);
            this.loginService.usuarioLogadoSubject.next(!!this.sessionStorage.getToken());
          },
          err => {
            this.sessionStorage.removeSession();
            console.log(err);
          }
        ) 
      },
      err => {
        this.form.controls.username.setValue(null);
        this.form.controls.password.setValue(null);
        this.snakeBarService.openSnackBarError("Usuário ou senha incorretos, tente novamente.")
        this.sessionStorage.removeSession();
      },
      () => console.log('Logado!')
    )
  }
}