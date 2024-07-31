import { ValidatorFn, AbstractControl } from '@angular/forms';

export function CardValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const alias = control.value;
    let parametro = sessionStorage.getItem("numbercard");
    if (alias === parametro || (alias.length >= 14 && alias.length <= 16)) {
      return null;
    }else {
      return { 'aliasInvalido': true };
    }
  };
}
