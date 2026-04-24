import { Component, inject, Input, input } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { ITask } from '../../interfaces/task.interface';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {

  @Input({ required: true }) task!: ITask;

  private readonly _modalControllerService = inject(ModalControllerService);
  private readonly _taskService = inject(TaskService);

  openEditTaskModal() {
    const dialogRef = this._modalControllerService.openEditTaskModal({ name: this.task.name, description: this.task.description });

    dialogRef.closed.subscribe((taskForm) =>{
      if(taskForm) {
        this._taskService.updateTaskNameAndDescription(
          this.task.id,
          this.task.status,
          taskForm.name,
          taskForm.description,
        );
      }
    })
  }

openTaskCommentsModal() {
  this.task.comments = [
    {id: '123', description:'Comentário 1'},
    {id: '456', description:'Comentário 2'},
  ]
  this._modalControllerService.openTaskCommentsModal(this.task);  
}

}
