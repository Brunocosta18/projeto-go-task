import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TaskService {
    //Tarefas em A fazer
    private readonly TodoTasks$ =  new BehaviorSubject<any[]>([]);
    readonly todoTasks = this.TodoTasks$.asObservable();

    //Tarefas em Andamento
    private doingTasks$ =  new BehaviorSubject<any[]>([]);
    readonly doingTasks = this.doingTasks$.asObservable();

    //Tarefas Concluídas
    private doneTasks$ =  new BehaviorSubject<any[]>([]);
    readonly doneTasks = this.doneTasks$.asObservable();
}