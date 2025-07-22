import { TasksStore } from './model/task-store';
export * from './ui/TaskDetails';
export * from './ui/TaskItem';
export * from './lib/utils';

export const tasksStore = new TasksStore();
