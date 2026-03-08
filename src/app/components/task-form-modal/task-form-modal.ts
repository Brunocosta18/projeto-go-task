import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { TaskFormModalData } from '../../interfaces/task-form-modal-data.interface';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-task-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-modal.html',
  styleUrl: './task-form-modal.css',
})
export class TaskFormModal {


  readonly _data: TaskFormModalData = inject(DIALOG_DATA);

  taskForm: FormGroup = new FormGroup({
    name: new FormGroup(this._data.formValues.name,[Validators.required, Validators.minLength(10)]),
    description: new FormGroup(this._data.formValues.description,[Validators.required, Validators.minLength(10)]),
  });

  onFormSubmit() {

}

}
