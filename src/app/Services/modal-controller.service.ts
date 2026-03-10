import { inject, Injectable } from "@angular/core";
import { Dialog } from "@angular/cdk/dialog";
import { TaskFormModal } from "../components/task-form-modal/task-form-modal";
import { TaskCommentsModal } from "../components/task-comments-modal/task-comments-modal";
import { ITaskFormControls } from "../interfaces/task-form-controls.interface";

@Injectable({
    providedIn: 'root',
})
export class ModalControllerService {
    private readonly modalSizeOptions = {
        width: '95%',
        maxHeight:'620px',
    }  
    
    private readonly _dialog = inject(Dialog);

    openNewTaskModal() {
       return this._dialog.open<ITaskFormControls>(TaskFormModal, {
            ...this.modalSizeOptions,
            disableClose: true,
                data: {
                    mode:'create',
                    formValues: {
                        name: '',
                        description: '',
                    },
                },

        });
    }

    openEditTaskModal(formValues: ITaskFormControls) {
       return this._dialog.open<ITaskFormControls>(TaskFormModal, {
            ...this.modalSizeOptions,
            disableClose: true,
                data: {
                    mode:'edit',
                    formValues,
                },
        });
    }

    openCommentsModal() {
       return this._dialog.open(TaskCommentsModal, {
            ...this.modalSizeOptions,
        });
    }
}