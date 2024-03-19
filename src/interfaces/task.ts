export interface Task {
  id: string;
  name: string;
  isDone: boolean;
}

export enum TaskType {
  Pending = "pending",
  Done = "done",
}
