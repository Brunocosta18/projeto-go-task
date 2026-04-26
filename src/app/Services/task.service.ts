import { Injectable } from "@angular/core";
import { BehaviorSubject, map, tap } from "rxjs";
import { ITask } from "../interfaces/task.interface";
import { ITaskFormControls } from "../interfaces/task-form-controls.interface";
import { generateUniqueIdWithTimestamp } from "../utils/ganerate-unique-is-with-timestamp";
import { TaskStatusEnum } from "../enums/task-status.enum"; // Vamos usar apenas este!
import { TaskStatus } from "../types/task-status";
import { IComment } from "../interfaces/comment.interface";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Subjects privados (Fonte da verdade)
  private readonly todoTasks$ = new BehaviorSubject<ITask[]>(this.loadFromLocalStorage(TaskStatusEnum.TODO));
  private readonly doingTasks$ = new BehaviorSubject<ITask[]>(this.loadFromLocalStorage(TaskStatusEnum.DOING));
  private readonly doneTasks$ = new BehaviorSubject<ITask[]>(this.loadFromLocalStorage(TaskStatusEnum.DONE));

  // Observables públicos para os componentes
  readonly todoTasks = this.todoTasks$.asObservable().pipe(map(t => structuredClone(t)), tap((tasks) => this.saveToLocalStorage()));
  readonly doingTasks = this.doingTasks$.asObservable().pipe(map(t => structuredClone(t)), tap((tasks) => this.saveToLocalStorage()));
  readonly doneTasks = this.doneTasks$.asObservable().pipe(map(t => structuredClone(t)), tap((tasks) => this.saveToLocalStorage()));

  constructor() {
    const savedData = localStorage.getItem('go-task-data');
    if (savedData) {
      try {
        const { todo, doing, done } = JSON.parse(savedData);
        this.todoTasks$.next(todo || []);
        this.doingTasks$.next(doing || []);
        this.doneTasks$.next(done || []);
      } catch (e) {
        console.error("Erro ao recuperar dados do LocalStorage", e);
        this.saveToLocalStorage();
      }
    }
  }

  addTask(taskInfos: ITaskFormControls) {
    // Gere o ID e garanta que ele seja um número válido
    const generatedId = generateUniqueIdWithTimestamp();
    const idAsNumber = generatedId ? Number(generatedId) : Date.now();

    const newTask: ITask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: isNaN(idAsNumber) ? Date.now() : idAsNumber, // Se falhar, usa o timestamp atual
      comments: [],
    };

    this.todoTasks$.next([...this.todoTasks$.value, newTask]);
    this.saveToLocalStorage();
  }

  updateTaskStatus(taskId: number | string, taskCurrentStatus: TaskStatusEnum, taskNextStatus: TaskStatusEnum) {
    const currentListSubject = this.getTaskListByStatus(taskCurrentStatus);
    const nextListSubject = this.getTaskListByStatus(taskNextStatus);

    const taskIndex = currentListSubject.value.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
      const tasks = currentListSubject.value;
      const [task] = tasks.splice(taskIndex, 1); // Remove da lista atual

      task.status = taskNextStatus; // Atualiza o status do objeto

      currentListSubject.next([...tasks]); // Emite a lista atualizada sem a tarefa
      nextListSubject.next([...nextListSubject.value, task]); // Emite a nova lista com a tarefa
      this.saveToLocalStorage();
    }
  }

  updateTaskNameAndDescription(taskId: number | string, taskCurrentStatus: TaskStatus, newTaskName: string, newTaskDescription: string) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const currentTaskIndex = currentTaskList.value.findIndex(task => task.id === taskId);

    if (currentTaskIndex > -1) {
      const updatedTaskList = [...currentTaskList.value];

      updatedTaskList[currentTaskIndex] = {
        ...updatedTaskList[currentTaskIndex],
        name: newTaskName,
        description: newTaskDescription,
      }

      currentTaskList.next(updatedTaskList);
      this.saveToLocalStorage();
    }
  }

  updateTaskComments(taskId: number | string, taskCurrentStatus: TaskStatus, newTaskComment: IComment[]) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const currentTaskIndex = currentTaskList.value.findIndex(task => task.id === taskId);

    if (currentTaskIndex > -1) {
      const updatedTaskList = [...currentTaskList.value];

      updatedTaskList[currentTaskIndex] = {
        ...updatedTaskList[currentTaskIndex],
        comments: [...newTaskComment],
      }

      currentTaskList.next(updatedTaskList);
      this.saveToLocalStorage();
    }
  }

  deleteTask(taskId: number | string, taskStatus: TaskStatusEnum) {
    const currentListSubject = this.getTaskListByStatus(taskStatus);

    const newTaskList = currentListSubject.value.filter(
      (task) => String(task.id) !== String(taskId)
    );

    currentListSubject.next(newTaskList);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    const data = {
      todo: this.todoTasks$.value,
      doing: this.doingTasks$.value,
      done: this.doneTasks$.value
    };

    localStorage.setItem('go-task-data', JSON.stringify(data));
  }

  private loadFromLocalStorage(status: TaskStatusEnum) {
    const savedData = localStorage.getItem('go-task-data');
    if (savedData) {
      const { todo, doing, done } = JSON.parse(savedData);
      switch (status) {
        case TaskStatusEnum.TODO:
          return todo || [];
        case TaskStatusEnum.DOING:
          return doing || [];
        case TaskStatusEnum.DONE:
          return done || [];
      }
    }
    return [];
  }

  private getTaskListByStatus(status: TaskStatusEnum): BehaviorSubject<ITask[]> {
    const taskListObject: Record<TaskStatusEnum, BehaviorSubject<ITask[]>> = {
      [TaskStatusEnum.TODO]: this.todoTasks$,
      [TaskStatusEnum.DOING]: this.doingTasks$,
      [TaskStatusEnum.DONE]: this.doneTasks$,
    };

    return taskListObject[status];
  }
}