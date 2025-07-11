import { TaskFilter } from '../organisms/TaskFilter';
import { TaskList } from '../organisms/TaskList';

export const MainPage = (): React.JSX.Element => {
  return (
    <main className="flex-1 p-5">
      <TaskFilter />
      <TaskList />
    </main>
  );
};
