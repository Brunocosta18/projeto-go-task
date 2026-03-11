import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  private readonly _modalControllerService = inject(ModalControllerService);

  openEditTaskModal() {
    const dialogRef = this._modalControllerService.openEditTaskModal({ name: 'nome Tarefa', description: 'Descrição da tarefa' });

    dialogRef.closed.subscribe((taskForm) =>{
      console.log('Tarefa alterada:', taskForm);
    })
  }

}
