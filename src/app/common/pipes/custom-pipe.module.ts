import { NgModule } from '@angular/core';
import { TelefonePipe } from '../pipes/telefone.pipe'
import { CPFCNPJPipe } from '../pipes/cpfcnpj.pipe';
import { NcmPipe } from './ncm.pipe'
@NgModule({
  declarations: [
    CPFCNPJPipe,
    TelefonePipe,
    NcmPipe
  ],
  imports: [
  ],
  exports: [
    CPFCNPJPipe,
    TelefonePipe,
    NcmPipe
  ]
})
export class CustomPipeModule { }
