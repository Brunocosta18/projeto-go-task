import { TaskStatusEnum } from "../enums/task-status.enum"; 

export interface ITask {
  id: number;
  name: string;
  description: string;
  status: TaskStatusEnum; 
  comments: any[];
}