import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITask } from "../interfaces/task.interface";
@Injectable({
    providedIn: "root",
})
export class TaskService {
    //Tarefas em A fazer
    private readonly TodoTasks$ =  new BehaviorSubject<ITask[]>([]);
    readonly todoTasks = this.TodoTasks$.asObservable();

    //Tarefas em Andamento
    private doingTasks$ =  new BehaviorSubject<ITask[]>([]);
    readonly doingTasks = this.doingTasks$.asObservable();

    //Tarefas Concluídas
    private doneTasks$ =  new BehaviorSubject<ITask[]>([]);
    readonly doneTasks = this.doneTasks$.asObservable();
}