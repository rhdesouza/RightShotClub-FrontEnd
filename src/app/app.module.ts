import { LayoutModule } from '@angular/cdk/layout';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectivesModule } from './common/directives/directives.module';
import { GaleriaFotosComponent } from './common/galeria-fotos/galeria-fotos.component';
import { MatErrorMessageModule } from './common/hint-errors-form/mat-error-message.module';
import { HttpConfigInterceptor } from './common/httpService/Interceptor.component';
import { MaterialModule } from './common/material.module';
import { ModalDialogModule } from './common/modal-dialog/modal-giiw.module';
import { Ng2FileModule } from './common/ng2-file-uploader/ng2-file-uploader.module';
import { SnakeBarModule } from './common/snakebar/snakeBar.module';
import { templateModalModule } from './common/templateModal/templateModal.module';
import { TitlePageModalModule } from './common/title-page-modal/title-page-modal.module';
import { translatePaginator } from './common/translator/TranslatePaginator.component';
import { AlertModule } from './common/_alert/alert.module';
import { ModalModule } from './common/_modal/modal.module';
import { TrocaSenhaModule } from './externo/troca-senha/troca-senha.module';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserSettingsComponent } from './userSettings/user-settings.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    UserSettingsComponent,
    GaleriaFotosComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    BrowserModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    NgbModule,
    AlertModule,
    ModalModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    templateModalModule,
    LayoutModule,
    SnakeBarModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    Ng2FileModule,
    DirectivesModule,
    MatErrorMessageModule,
    TitlePageModalModule,
    ModalDialogModule,
    TrocaSenhaModule
  ],
  providers: [
    NgbActiveModal,
    /* { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, */
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: translatePaginator }
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [
    AppComponent
  ],
})
export class AppModule { }
