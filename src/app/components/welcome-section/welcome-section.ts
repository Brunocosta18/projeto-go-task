import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.html',
  styleUrl: './welcome-section.css',
})
export class WelcomeSection {

  private readonly _modalControllerService = inject(ModalControllerService);
  private readonly _taskService = inject(TaskService);
  
  openNewTaskModal() {
    const dialogRef =  this._modalControllerService.openNewTaskModal();

    dialogRef.closed.subscribe((taskForm) => {
      console.log('Tarefa criada:', taskForm);
      if (taskForm) {
        this._taskService.addTask(taskForm);
      }
    });
  }

}
