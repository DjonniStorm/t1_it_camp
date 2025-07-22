import { TaskFilter } from '../../components/organisms/TaskFilter';
import { TaskList } from '../../components/organisms/TaskList';

export const MainPage = (): React.JSX.Element => {
  return (
    <main className="flex-1 p-5">
      <TaskFilter />
      <TaskList />
    </main>
  );
};
