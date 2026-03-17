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
      console.log('Lista de TODOS:', todoList);
    });
  };
}
