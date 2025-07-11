import { TasksContext } from '@/context/TaskContext';
import { useContext } from 'react';

export function useTasksContext(): TasksContext {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error('используйте контекст только в провайдере');
  }
  return context;
}
