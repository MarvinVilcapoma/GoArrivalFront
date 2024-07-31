import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;

        const minLength = 2;
        const maxLength = 150;
        const namePattern = /^[a-zA-Z\s]+$/;

        if (value.length < minLength || value.length > maxLength) {
            return { lengthError: true };
        }

        if (!namePattern.test(value)) {
            return { invalidCharacters: true };
        }

        return null;
    };
}


export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;

        const minLength = 6;
        const maxLength = 150;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (value.length < minLength || value.length > maxLength) {
            return { lengthError: true };
        }

        if (!emailPattern.test(value)) {
            return { invalidFormat: true };
        }

        return null;
    };
}

export function dniValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const isValid = /^[0-9]{8}$/.test(value);
        return isValid ? null : { dni: true };
    };
}

export function passportValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const isValid = /^[a-zA-Z0-9]{6,20}$/.test(value);
        return isValid ? null : { passport: true };
    };
}

export function foreignCardValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const isValid = /^[a-zA-Z0-9]{6,20}$/.test(value);
        return isValid ? null : { foreignCard: true };
    };
}

export function birthDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;

        const datePattern = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
        return datePattern.test(value) ? null : { invalidDate: true };
    };
}

export function formatddmmyyyy(stringDate: string) {
    if (stringDate) {
      const date = new Date(stringDate);
      let dd = date.getDate().toString();
      let mm = (date.getMonth() + 1).toString();
      const yyyy = date.getFullYear();
      if (date.getDate() < 10) {
        dd = '0' + dd;
      }
      if ((date.getMonth() + 1) < 10) {
        mm = '0' + mm;
      }
      // const format = dd + '/' + mm + '/' + yyyy;
      const format = mm + '/' + dd + '/' + yyyy;
      return format;
    } else {
      return '';
    }
  }

  export function formatnumberhour(hourDate: string): number {
    if(hourDate){
      const hoursplit = hourDate.split(":");
      let hourstring = hoursplit[0] + hoursplit[1];
      return parseInt(hourstring);
    }else {
      return 1;
    }
  }


export function ddmmyyyytoDate(cadena: string) {
    let array = cadena.split('/');
    if (array.length >= 3) {
      let d = parseInt(array[1]);
      let m = parseInt(array[0]) - 1;
      let y = parseInt(array[2]);
      return new Date(y, m, d);
    } else {
      return new Date();
    }
  }


  export function formatyyyymmddpare(stringDate: string) {
    if (stringDate) {
      const date = new Date(stringDate);
      let dd = date.getDate().toString();
      let mm = (date.getMonth() + 1).toString();
      const yyyy = date.getFullYear();
      if (date.getDate() < 10) {
        dd = '0' + dd;
      }
      if ((date.getMonth() + 1) < 10) {
        mm = '0' + mm;
      }
      // const format = dd + '/' + mm + '/' + yyyy;
      const format = yyyy + '-' + mm + '-' + dd;
      return format;
    } else {
      return '';
    }
  }


export function formatyyyymmdd(stringDate: string) {
    if (stringDate) {
      const date = new Date(stringDate);
      let dd = date.getDate().toString();
      let mm = (date.getMonth() + 1).toString();
      const yyyy = date.getFullYear();
      if (date.getDate() < 10) {
        dd = '0' + dd;
      }
      if ((date.getMonth() + 1) < 10) {
        mm = '0' + mm;
      }
      // const format = dd + '/' + mm + '/' + yyyy;
      const format = yyyy + '/' + mm + '/' + dd;
      return format;
    } else {
      return '';
    }
  }

  export function formatddmmyyy(stringDate: string) {
    if (stringDate) {
      const date = new Date(stringDate);
      let dd = date.getDate().toString();
      let mm = (date.getMonth() + 1).toString();
      const yyyy = date.getFullYear();
      if (date.getDate() < 10) {
        dd = '0' + dd;
      }
      if ((date.getMonth() + 1) < 10) {
        mm = '0' + mm;
      }
     const format = dd + '/' + mm + '/' + yyyy;
      return format;
    } else {
      return '';
    }
  }