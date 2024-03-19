export enum TaskType {
  Pending = "pending",
  Done = "done",
}

export interface Task {
  id: string;
  name: string;
  status: TaskType;
}
