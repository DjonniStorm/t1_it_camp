import { TaskNew } from '@features/task/create';

export const TaskCreatePage = (): React.JSX.Element => {
  return (
    <main className="flex-1 p-5 w-full">
      <TaskNew />
    </main>
  );
};
