export interface Task {
  id: string;
  task: string;
  status_id: string;
  start_date?: string | null;
  final_date?: string | null;
  user_id?: string;
  comments?: string | null;
}

export interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  loading: boolean;
  error: string | null;
}

export type CreateTaskDTO = Omit<Task, "id">;
export type UpdateTaskDTO = Partial<Omit<Task, "id">>;
