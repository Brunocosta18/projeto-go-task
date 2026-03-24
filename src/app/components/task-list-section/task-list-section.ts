import { Component, inject } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { TaskService } from '../../Services/task.service';
@Component({
  selector: 'app-task-list-section',
  imports: [TaskCard],
  templateUrl: './task-list-section.html',
  styleUrl: './task-list-section.css',
})
export class TaskListSection {
  private readonly _taskService = inject(TaskService);

  ngOnInit() {
  this._taskService.todoTasks.subscribe((todoList) => {
    console.log('Lista de TODOS: ', todoList);

    // 1. Verifique se a lista NÃO está vazia antes de acessar o índice [0]
    if (todoList && todoList.length > 0) {
      
      // Agora é seguro acessar o nome
      todoList[0].name = 'Nome Alterado'; 
      
      this._taskService.carregarListasAtuaisDeTodos();
    } else {
      console.log('A lista ainda está vazia, aguardando tarefas...');
    }
  });
}
}
