import { TaskStatusEnum } from "../enums/task-status.unem";

export type TaskStatus = TaskStatusEnum.TODO | TaskStatusEnum.DOING | TaskStatusEnum.DONE;