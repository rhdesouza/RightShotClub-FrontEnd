import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GaleriaFotosModule } from './common/galeria-fotos/galeria-fotos.module';
import { MatErrorMessageModule } from './common/hint-errors-form/mat-error-message.module';
import { HttpConfigInterceptor } from './common/httpService/Interceptor.component';
import { MaterialModule } from './common/material.module';
import { ModalDialogModule } from './common/modal-dialog/modal-giiw.module';
import { Ng2FileModule } from './common/ng2-file-uploader/ng2-file-uploader.module';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { SnakeBarModule } from './common/snakebar/snakeBar.module';
import { templateModalModule } from './common/templateModal/templateModal.module';
import { TitlePageModalModule } from './common/title-page-modal/title-page-modal.module';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserSettingsComponent } from './userSettings/user-settings.component';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    UserSettingsComponent,
    PageNotFoundComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GaleriaFotosModule,

    //Componentes Right Shot Club
    SnakeBarModule,
    Ng2FileModule,
    ModalDialogModule,
    templateModalModule,
    MatErrorMessageModule,
    TitlePageModalModule,
    

    //Componentes de terceiros
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule,
    BreadcrumbModule
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
