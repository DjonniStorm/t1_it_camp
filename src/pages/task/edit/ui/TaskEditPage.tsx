import { TaskDetails, tasksStore } from '@entities/task';
import type { Task } from '@shared/types';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const TaskEditPage = (): React.JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const { fetchTaskById, isLoading, error, updateTask } = tasksStore;
  const tasksId = pathname.replace(/^\/task\//, '');
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTask = async () => {
      if (state) {
        setTask(state as Task);
        return;
      }

      if (error) {
        navigate('/');
      }

      if (tasksId) {
        try {
          const fetchedTask = await fetchTaskById(tasksId);
          if (fetchedTask) {
            setTask(fetchedTask);
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Ошибка загрузки таска:', error);
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    loadTask().then(() => console.log('loaded'));
  }, [state, tasksId, error, navigate, fetchTaskById]);

  const handleUpdateTask = async (task: Task) => {
    await updateTask(task);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isLoading) {
    return <main>Загрузка...</main>;
  }

  if (error) {
    return <main>{error}</main>;
  }

  if (!task) {
    return <main>Загрузка...</main>;
  }

  return (
    <main className="flex-1 flex flex-col justify-center items-center">
      <TaskDetails
        initialValue={task}
        onSubmit={handleUpdateTask}
        onCancel={handleCancel}
      />
    </main>
  );
};
