import { Task } from './task.interface';

export interface Lane {
  title: string;
  id: string;
  tasks: Task[];
}