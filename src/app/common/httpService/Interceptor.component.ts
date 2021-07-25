import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginService } from 'src/app/login/login.service';
import { SnakeBarService } from '../snakebar/snakebar.service';
import { StorageComponent } from './storage.component';



@Injectable({
    providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private storageComponent: StorageComponent,
        private snakeBarService: SnakeBarService,
        public dialog: MatDialog,
        private roter: Router,
        public loginService: LoginService,
        private spinner: NgxSpinnerService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this.storageComponent.getToken();
        this.spinner.show();
        if (token) {
            if (request.url.indexOf('/viacep.com.br/ws') == -1) /** Exceção para requisição do CEP */
                request = request.clone({ headers: request.headers.set('Authorization', token) });
        }

        if (!request.headers.has('Content-Type')) {
            //request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset-UTF-8') });
        }

        //request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request).pipe(
            retry(0),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //console.log('event--->>>', event.status);
                    this.spinner.hide();
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                //console.log('HttpErrorResponse', error);
                /* this.modalLogin(); */
                //console.log(error.error.error) 
                this.spinner.hide();

                if (error.status == 412) {
                    this.snakeBarService.openSnackBarError(error.error);
                } else if (error.status == 403) {
                    this.snakeBarService.openSnackBarError("Ação não permitida, acesso negado!");
                } else if (data['status'] == 409) {
                    let message: string = error?.error?.message ?? "Registro duplicado ou em conflito.";
                    this.snakeBarService.openSnackBarError(message);
                } else {
                    this.snakeBarService.openSnackBarError("Ocorreu um erro no sistema, entre em contato com o Administrador!")
                    .afterDismissed().subscribe(() => {
                      this.loginService.logout();
                    })
                }
                return throwError(error);
            }));
    }

    public modalLogin() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.width = '50%';

        const modal = this.dialog.open(LoginComponent, dialogConfig)
            .afterClosed().subscribe(data => {
                //console.log(data);
                if (data != 'error' && !!data) {

                } else if (data == 'error') {

                }
            })
    }
}
