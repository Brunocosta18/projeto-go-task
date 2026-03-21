import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITask } from "../interfaces/task.interface";
import { ITaskFormControls } from "../interfaces/task-form-controls.interface";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { generateUniqueIdWithTimestamp } from "../utils/ganerate-unique-is-with-timestamp";
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

    addTask(taskInfos: ITaskFormControls) {
        const newTask: ITask = {
            ...taskInfos,
            status: TaskStatusEnum.TODO,
            id: Number(generateUniqueIdWithTimestamp()),
            comments:[],
        };

        const currentTasks = this.TodoTasks$.value;

        this.TodoTasks$.next([...currentTasks, newTask]);
    }

    carregarListasAtuaisDeTodos() {
        console.log('Lista de TODOS:', this.TodoTasks$.value);
    }
}