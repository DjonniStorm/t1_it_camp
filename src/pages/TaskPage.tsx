import { useTasksContext } from '@/hooks/use-task-context';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { TaskDetails } from '../components/molecules/TaskDetails';
import type { Task } from '@/@types/types';
import { startTransition } from 'react';

type SearchParams = {
  id?: string;
};

const TaskPage = (): React.JSX.Element => {
  const path: SearchParams = useParams();
  const { tasks, addTask } = useTasksContext();
  const navigate = useNavigate();
  const currentTask = tasks.find((t) => t.id === path.id);
  if (!path.id || !currentTask) {
    return <Navigate to={'/'} />;
  }
  const handleAddTask = async (task: Task) => {
    console.log(task);
    addTask(task);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    startTransition(() => {
      navigate('/');
    });
  };
  const handleCancel = () => {
    navigate('/');
  };
  return (
    <main className="flex-1 flex justify-center items-center">
      <TaskDetails
        onCancel={handleCancel}
        initialValue={currentTask}
        onSubmit={handleAddTask}
      />
    </main>
  );
};

export default TaskPage;
