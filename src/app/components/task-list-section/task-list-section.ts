import { Component, inject } from '@angular/core';
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
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-task-list-section',
  imports: [TaskCard,CdkDropList, CdkDrag, AsyncPipe],
  templateUrl: './task-list-section.html',
  styleUrl: './task-list-section.css',
})
export class TaskListSection {
  todoTask: ITask [] = []; 
  doingTask: ITask [] = []; 
  doneTask: ITask [] = []; 

  private readonly _taskService = inject(TaskService);
todoTasks: any;

  ngOnInit() {
  this._taskService.todoTasks.subscribe((todoList) => {
    this.todoTask = todoList;
  });
  this._taskService.doingTasks.subscribe((doingTask) => {
    this.doingTask = doingTask;
  });
  this._taskService.doneTasks.subscribe((doneTask) => {
    this.doneTask = doneTask;
  });
 }

   drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
