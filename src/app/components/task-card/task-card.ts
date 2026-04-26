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

    dialogRef.closed.subscribe((taskForm) => {
      if (taskForm) {
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

    const dialogRef = this._modalControllerService.openCommentsModal(this.task);

    dialogRef.closed.subscribe((taskCommentsChanged: any) => {
      if (taskCommentsChanged) {
        //atualizar a fonte de verdade
        console.log('tarefa atualizada!', this.task);
        this._taskService.updateTaskComments(this.task.id, this.task.status, this.task.comments);
      }
    });
  }

  deleteTask() {
    this._taskService.deleteTask(this.task.id, this.task.status as any);
  }

}
