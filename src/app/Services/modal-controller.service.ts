import { inject, Injectable } from "@angular/core";
import { Dialog } from "@angular/cdk/dialog";
import { TaskFormModal } from "../components/task-form-modal/task-form-modal";
import { TaskCommentsModal } from "../components/task-comments-modal/task-comments-modal";

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
       return this._dialog.open(TaskFormModal, {
            ...this.modalSizeOptions,

        });
    }

    openEditTaskModal() {
       return this._dialog.open(TaskFormModal, {
            ...this.modalSizeOptions,
        });
    }

    openCommentsModal() {
       return this._dialog.open(TaskCommentsModal, {
            ...this.modalSizeOptions,
        });
    }
}