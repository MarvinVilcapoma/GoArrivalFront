import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-manage-document',
  templateUrl: './manage-document.component.html',
  styleUrls: ['./manage-document.component.css']
})
export class ManageDocumentComponent {
  @Input() defaults: any;
  @Output() select = new EventEmitter<any>(); 
  mode: 'create' | 'update' = 'create';
  checked1 = true;
  checked2 = false;
  checked3 = false;
  checked4 = false;
  nameTip = "F3F05B20-412E-4A1A-BA31-B69B1E6D0392";
  nameTip1 = "DD8D0D83-5E9B-4377-AC1A-A4A806EB0C3A";
  nameTip2 = "7F0B8721-FC7F-4735-A1AD-7DD8EC485A3C";
  nameTip3 = "50FC2C8B-9304-4CEC-AE6A-D88739071B7A";
  lstDocument: any[] = [];
  value1 = "";
  value2 = "";
  value3 = "";
  value4 = "";
  constructor(
  
 
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.defaults.user) {
      this.mode = 'update';
      if(this.defaults.user?.length > 0){
        this.llenarInpUpdate();
      }
    } else {
     
      if(this.defaults.lstCreateDoc?.length > 0){
        this.llenarInp();
      }
    }
  }

  llenarInpUpdate() {
    this.defaults.user.forEach((element: any) => {
      switch (element.documentID) {
        case this.nameTip:
        this.checked1 = true;
        this.value1 = element.documentNumber;
          break;

        case this.nameTip1:
          this.checked2 = true;
          this.value2 = element.documentNumber;
          break;
        case this.nameTip2:
          this.checked3 = true;
          this.value3 = element.documentNumber;
          break;
        case this.nameTip3:
          this.checked4 = true;
          this.value4 = element.documentNumber;
          break;
      }
    });
  }


  llenarInp() {
    this.defaults.lstCreateDoc.forEach((element: any) => {
      switch (element.DocumentID) {
        case this.nameTip:
        this.checked1 = true;
        this.value1 = element.Number;
          break;

        case this.nameTip1:
          this.checked2 = true;
          this.value2 = element.Number;
          break;
        case this.nameTip2:
          this.checked3 = true;
          this.value3 = element.Number;
          break;
        case this.nameTip3:
          this.checked4 = true;
          this.value4 = element.Number;
          break;
      }
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {



    this.armarLstDocs();
    this.select.emit(this.lstDocument);
  /*   this.dialogRef.close(this.lstDocument); */
  }

  updateCustomer() {


    this.armarLstDocs();
    this.select.emit(this.lstDocument);
    /* this.dialogRef.close(this.lstDocument); */
  }

  armarLstDocs() {
    let obj: any = {};
    if (this.value1 != '' && this.checked1) {
      obj.Number = this.value1;
      obj.DocumentID = this.nameTip;
      obj.isActive = true;
      this.lstDocument.push(obj);
      obj = {};
    }
    if (this.value2 != '' && this.checked2) {
      obj.Number = this.value2;
      obj.DocumentID = this.nameTip1;
      obj.isActive = true;
      this.lstDocument.push(obj);
      obj = {};
    }
    if (this.value3 != '' && this.checked3) {
      obj.Number = this.value3;
      obj.DocumentID = this.nameTip2;
      obj.isActive = true;
      this.lstDocument.push(obj);
      obj = {};
    }
    if (this.value4 != '' && this.checked4) {
      obj.Number = this.value4;
      obj.DocumentID = this.nameTip3;
      obj.isActive = true;
      this.lstDocument.push(obj);
      obj = {};
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }


}
