import { TaskStatus } from "../Services/task.service";
import { IComment } from "./comment.interface";

export interface ITask {
    id: number;
    name: string;
    description: string;
    comments: IComment[];
    status: TaskStatus;
}