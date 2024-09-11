import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-notification-create-update',
  templateUrl: './notification-create-update.component.html',
  styleUrls: ['./notification-create-update.component.css']
})
export class NotificationCreateUpdateComponent implements OnInit {
  @Input() isRegister!: boolean;
  @Input() lstPerson: any;
  @Input() dataLoad: any;
  form!: FormGroup;
  static id = 0;
  stateOptions: any = [];
  notificationActive = true;
  notificationGeneral = true;

  selectedUser: any;

  constructor(private fb: FormBuilder, private head: HeaderService) { }

  ngOnInit(): void {
    console.log(this.lstPerson);
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      id: [NotificationCreateUpdateComponent.id],
      title: [this.isRegister ? '' : this.dataLoad?.title, Validators.required],
      description: [this.isRegister ? '' : this.dataLoad?.description, Validators.required],
      isGeneral: [this.isRegister ? '': this.dataLoad?.isGeneral],
      isActive: [this.isRegister ? '': this.dataLoad?.isActive]
    });
    if(!this.isRegister){
      this.notificationActive = this.dataLoad.isActive
      this.notificationGeneral = this.dataLoad.isGeneral
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    }
  }
}
