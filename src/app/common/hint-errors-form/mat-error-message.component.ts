import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

/**
 * Componente para exibir as mensagens de validação do campo caso tenha regra.
 * Exemplo de uso:
 * <mat-form-field appearance="outline" class="fullSizeInput" floatLabel="always">
      <mat-label>CPF</mat-label>
      <input matInput class="inputField" type="text" mask="000.000.000-99" formControlName="cpf">

      <mat-error>
        <mat-error-message [control]="clienteForms.controls['cpf']"></mat-error-message>
      </mat-error>
    </mat-form-field>
 */

@Component({
  selector: 'mat-error-message',
  templateUrl: './mat-error-message.component.html',
  styleUrls: ['./mat-error-message.component.css']
})
export class MatErrorMessageComponent implements OnInit {

  @Input() control!: AbstractControl;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  public setErrosValidationMenssage() {
    let errors: ValidationErrors | null = this.control.errors;
    if (!!errors) {
      if (errors?.['required'])
        return "Campo obrigatório."

      if (errors?.['minlength'])
        return `Preencha o mínimo de ${errors['minlength'].requiredLength} caracreters. Restam ${errors['minlength'].requiredLength - errors['minlength'].actualLength}.`;

      if (errors?.['cpfInvalido'])
        return "CPF Inválido.";

      if (errors?.['cpnjInvalido'])
        return "CNPJ Inválido.";

      if (errors?.['email'])
        return "E-mail inválido.";

      if (errors?.['mask'])
        return "Preenchimento Incorreto."

      if (errors?.['dataInvalida'])
        return "Data Inválida."

      if (errors?.['errorMinFinanceiro'])
        return `Valor Mínimo não alcançado (R$ ${(errors['valorMin'].toFixed(2))}).`

      if (errors?.['pattern'])
        return "Formato inválido."
    }
    return null;
  }
}