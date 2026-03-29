import { Component, inject, OnInit } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { TaskService } from '../../Services/task.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-list-section',
  standalone: true,
  imports: [TaskCard, CdkDropList, CdkDrag],
  templateUrl: './task-list-section.html',
  styleUrl: './task-list-section.css',
})
export class TaskListSection implements OnInit {
  // Use exatamente estes nomes:
  todoTasks: ITask[] = []; 
  doingTasks: ITask[] = []; 
  doneTasks: ITask[] = []; 

  private readonly _taskService = inject(TaskService);

  ngOnInit() {
    this._taskService.todoTasks.subscribe((list) => {
      this.todoTasks = list;
    });
    this._taskService.doingTasks.subscribe((list) => {
      this.doingTasks = list;
    });
    this._taskService.doneTasks.subscribe((list) => {
      this.doneTasks = list;
    });
  }

  // Método drop com a tipagem correta <ITask[]> para evitar o erro NG5
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data, 
        event.previousIndex, 
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}