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

      todoList[0].name = 'Nome Alterado'; // Modificando o nome da primeira tarefa para teste

      this._taskService.carregarListasAtuaisDeTodos(); // Chamando o método para carregar as listas atuais de TODOS
    });
  };
}
