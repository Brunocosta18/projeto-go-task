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
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TaskStatus } from '../../types/task-status';
import { TaskStatusEnum } from '../../enums/task-status.enum';

@Component({
  selector: 'app-task-list-section',
  standalone: true,
  imports: [TaskCard, CdkDropList, CdkDrag, AsyncPipe],
  templateUrl: './task-list-section.html',
  styleUrl: './task-list-section.css',
})
export class TaskListSection {
  readonly _taskService = inject(TaskService);

  onCardDrop(event: CdkDragDrop<ITask[]>) {
    this.moveCardtoColumn(event)

    const taskId = event.item.data.id;
    const taskCurrentStatus = event.item.data.status;
    const droppedColumn = event.container.id; // ID da coluna onde o cartão foi solto

    this.updateTaskStatus(taskId, taskCurrentStatus, droppedColumn);
    }
    private updateTaskStatus(taskId: string, taskCurrentStatus: TaskStatus, droppedColumn: string) {
    let taskNextStatus: TaskStatusEnum;

    switch (droppedColumn) {
      case 'to-do-column':
        taskNextStatus = TaskStatusEnum.TODO;
        break; 
      case 'doing-column':
        taskNextStatus = TaskStatusEnum.DOING;
        break; 
      case 'done-column':
        taskNextStatus = TaskStatusEnum.DONE;
        break; 
      default:
        throw Error('Coluna não identificada');
    }

    this._taskService.updateTaskStatus(taskId, taskCurrentStatus, taskNextStatus);
  }
; 

  // Método drop com a tipagem correta <ITask[]> para evitar o erro NG5
  private moveCardtoColumn(event: CdkDragDrop<ITask[]>) {
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