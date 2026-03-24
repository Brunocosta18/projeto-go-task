import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { ITask } from "../interfaces/task.interface";
import { ITaskFormControls } from "../interfaces/task-form-controls.interface";
import { generateUniqueIdWithTimestamp } from "../utils/ganerate-unique-is-with-timestamp";

export enum TaskStatus { // Verifique se abriu a chave aqui
  TODO = 'TODO',
  DONE = 'DONE'
} // VOCÊ PRECISA FECHAR A CHAVE AQUI ANTES DO @INJECTABLE

@Injectable({
  providedIn: 'root'
})

export class TaskService {
    //Tarefas em A fazer
    private readonly TodoTasks$ =  new BehaviorSubject<ITask[]>([]);
    readonly todoTasks = this.TodoTasks$.asObservable().pipe(
        map((task) => structuredClone(task)),
    );

    //Tarefas em Andamento
    private doingTasks$ =  new BehaviorSubject<ITask[]>([]);
    readonly doingTasks = this.doingTasks$.asObservable().pipe(
        map((task) => structuredClone(task)),
    );;

    //Tarefas Concluídas
    private doneTasks$ =  new BehaviorSubject<ITask[]>([]);
    readonly doneTasks = this.doneTasks$.asObservable().pipe(
        map((task) => structuredClone(task)),
    );;

    addTask(taskInfos: ITaskFormControls) {
        const newTask: ITask = {
            ...taskInfos,
            status: TaskStatus.TODO,
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