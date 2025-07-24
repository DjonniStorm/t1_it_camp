import { TasksStore } from './model/task-store';
export * from './ui/TaskDetails';
export * from './ui/TaskItem';
export * from './lib/utils';
export * from './lib/is-bage-color';
export * from './hooks/use-tasks-query';
export const tasksStore = new TasksStore();
