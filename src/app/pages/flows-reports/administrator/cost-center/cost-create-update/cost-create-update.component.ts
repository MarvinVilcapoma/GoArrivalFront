import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-cost-create-update',
  templateUrl: './cost-create-update.component.html',
  styleUrls: ['./cost-create-update.component.css']
})
export class CostCreateUpdateComponent {

  static id = 0;
  form = this.fb.group({
    id: [CostCreateUpdateComponent.id],
    code: [this.defaults?.code,Validators.required],
    description: [this.defaults?.description,Validators.required],
    budget: [this.defaults?.budget,Validators.required],

    isActive: [this.defaults?.isActive || ''],
  });
  mode: 'create' | 'update' = 'create';
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any | undefined,
    private dialogRef: MatDialogRef<CostCreateUpdateComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as any;
    }

    this.form.patchValue(this.defaults);
  }

  save() {
  
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }

  createCustomer() {
    const customer = this.form.value;

  

    this.dialogRef.close(customer);
  }

  updateCustomer() {
    const customer = this.form.value;

    if (!this.defaults) {
      throw new Error(
        'Customer ID does not exist, this customer cannot be updated'
      );
    }

    customer.id = this.defaults.id;

    this.dialogRef.close(customer);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
