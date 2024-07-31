import * as CryptoJS from 'crypto-js';

const KEY = 'A/*25lkTMh205@$AdvQRvn';

export function encryptUsingTripleDES(res: string): string {
    var keyHex = CryptoJS.enc.Utf8.parse(KEY);
    keyHex = CryptoJS.MD5(keyHex);
    keyHex.words.push(keyHex.words[0], keyHex.words[1]);
    var options = { mode: CryptoJS.mode.ECB };
    const encrypted = CryptoJS.TripleDES.encrypt(res, keyHex, options);
    return encrypted.toString();
  }

  export function removeWhiteSpace(srt: string){
    return srt.replace(/\s+/g, '');
  }

  export function ddmmyyyytoDate(cadena: any): any {
    let array = cadena.split('/');
    if (array.length >= 3) {
      let d = parseInt(array[0]);
      let m = parseInt(array[1]) - 1;
      let y = parseInt(array[2]);
      return new Date(y, m, d);
    } else {
      return new Date();
    }
  }

  export function formatddmmyyyy(stringDate: any) {
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
      const format = yyyy + '-' + mm + '-' + dd;
      return format;
    } else {
      return '';
    }
  }