import { TaskCreate } from '@features/task/create';
import { TaskFilter } from '@features/task/filter';
import { TaskList } from '@widgets/task/task-list';

export const MainPage = (): React.JSX.Element => {
  return (
    <main className="flex-1 pt-2">
      <TaskFilter />
      <TaskList />
      <TaskCreate className="absolute bottom-0 right-0" />
    </main>
  );
};
