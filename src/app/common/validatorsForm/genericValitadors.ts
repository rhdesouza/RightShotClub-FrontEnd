import { FormControl, ValidatorFn, Validators } from "@angular/forms";
import { ignoreElements } from "rxjs/operators";

export class GenericValidator {
  constructor() { }

  static validaCpfCnpj(control) {
    if (control.value == null)
      return null;

    if (control.value.length == 11) {
      if (!control.value)
        return null;

      let cpf = control.value;
      cpf = cpf?.replace(/[^\d]+/g, '');
      let add, rev, i;

      if (!cpf)
        return { cpfInvalido: true };

      // Elimina cpfs invalidos conhecidos	
      if (cpf?.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999") {
        return { cpfInvalido: true };
      }

      add = 0;
      for (i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
      }
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11) {
        rev = 0;
      }
      if (rev != parseInt(cpf.charAt(9))) {
        return { cpfInvalido: true };
      }
      add = 0;
      for (i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
      }
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11) {
        rev = 0;
      }
      if (rev != parseInt(cpf.charAt(10))) {
        return { cpfInvalido: true };
      }
      return null;

    } else if (control.value.length == 14) {
      let cnpj = control.value;

      cnpj = cnpj.replace(/[^\d]+/g, '');

      if (cnpj == '')
        return { cpnjInvalido: true };

      if (cnpj.length != 14)
        return { cpnjInvalido: true };

      // Elimina CNPJs invalidos conhecidos
      if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return { cpnjInvalido: true };

      // Valida DVs
      let tamanho = cnpj.length - 2
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
        return { cpnjInvalido: true };

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
        return { cpnjInvalido: true };

      return null;
    }

    return { mask: true }
  }



  /**
   * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
  */
  static cpfValidator(control) {
    if (!control.value)
      return null;

    let cpf = control.value;
    cpf = cpf?.replace(/[^\d]+/g, '');
    let add, rev, i;

    if (!cpf)
      return { cpfInvalido: true };

    // Elimina cpfs invalidos conhecidos	
    if (cpf?.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999") {
      return { cpfInvalido: true };
    }

    // Valida 1o digito	
    add = 0;

    for (i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) {
      rev = 0;
    }

    if (rev != parseInt(cpf.charAt(9))) {
      return { cpfInvalido: true };
    }

    // Valida 2o digito	
    add = 0;

    for (i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) {
      rev = 0;
    }

    if (rev != parseInt(cpf.charAt(10))) {
      return { cpfInvalido: true };
    }

    return null;
  }

  static dateValidValidator(control) {
    try {
      if (!control.value)
        return null;

      if (control.value.length != 10)
        return { dataInvalida: true };

      let dia = parseInt(control.value.split('/')[0]);
      let mes = parseInt(control.value.split('/')[1]);
      let ano = parseInt(control.value.split('/')[2]);

      let date = new Date(`${ano}-${mes}-${dia}`);

      let diaDate = date.getDate();
      let mesDate = date.getMonth() + 1;
      let anoDate = date.getFullYear();

      if ((dia == diaDate) && (mes == mesDate) && (ano == anoDate))
        return null;
      else
        return { dataInvalida: true };

    } catch (ex) {
      return { dataInvalida: true };
    }

  }



  static valMinFinanceiro(prms): any {
    return (control: FormControl): { [key: string]: any } | any => {
      if (Validators.required(control)) {
        return null;
      }

      let val: number = control.value;

      if (val < prms?.toFixed(2))
        return {
          errorMinFinanceiro: true,
          valorMin: prms
        }
      return null;
    }
  };

}