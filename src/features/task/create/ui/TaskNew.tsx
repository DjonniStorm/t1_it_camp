import { TaskDetails, tasksStore } from '@entities/task';
import { Flex } from '@mantine/core';
import type { Task } from '@shared/types';
import { useNavigate } from 'react-router-dom';

export const TaskNew = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { createTask } = tasksStore;
  const handleCancel = () => {
    navigate('/');
  };
  const handleSubmit = async (t: Task) => {
    await createTask(t);
    await new Promise((res) => setTimeout(res, 500));
    navigate('/');
  };
  return (
    <>
      <Flex justify="center">
        <TaskDetails onSubmit={handleSubmit} onCancel={handleCancel} />
      </Flex>
    </>
  );
};
