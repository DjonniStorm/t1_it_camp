import { TaskDetails, useTaskById, useUpdateTask } from '@entities/task';
import { useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import type { Task } from '@shared/types';
import { Loading } from '@shared/ui';

export const TaskEditPage = (): React.JSX.Element => {
  // задача в стейте при переходе с основной страницы
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const taskId = pathname.replace(/^\/task\//, '');
  // эта же задача на сервере
  const { data: taskData, isPending, error, isError } = useTaskById(taskId);
  const { mutateAsync: updateTask } = useUpdateTask();
  const [task, setTask] = useState<Task | undefined>();
  useEffect(() => {
    if (state && !task) {
      setTask(state as Task);
      return;
    }
    if (taskData && !task) {
      setTask(taskData);
      return;
    }
    // если нет стейта и нет задачи на сервере
    if (!task && !state && !isPending && !taskData) {
      console.error('Нет задачи для редактирования');
      navigate('/');
      return;
    }
  }, [state, task, taskData, isPending, navigate]);

  const handleUpdateTask = async (task: Partial<Task>) => {
    await updateTask({ id: taskId, task });
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  // если нет стейта клиента и ошибка при загрузке с сервера
  if (!state && isError) {
    return (
      <Loading
        isSadImageAllow
        text={error instanceof Error ? error.message : 'ошибка загрузки'}
      />
    );
  }

  // если нет стейта  и задача еще загружается
  if (!state && isPending) {
    return <Loading text="Загрузка" isSadImageAllow={false} />;
  }
  // если есть стейт или задача загружена
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
