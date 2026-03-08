import { ITaskFormControls } from "./task-form-controls.interface";

export interface TaskFormModalData {
  mode: 'create' | 'edit';
  formValues: ITaskFormControls;
};