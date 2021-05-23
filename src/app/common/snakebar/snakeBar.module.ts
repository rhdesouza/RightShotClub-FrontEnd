import { NgModule } from '@angular/core';
/* import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; */
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material.module';
import { SnackbarComponent } from './snakebar.component';


@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    MaterialModule
  ],
  declarations: [SnackbarComponent],
  exports: [SnackbarComponent],
  bootstrap: [SnackbarComponent],
  entryComponents: []
})
export class SnakeBarModule { }
