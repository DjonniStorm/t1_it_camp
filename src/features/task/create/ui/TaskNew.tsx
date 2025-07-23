import { TaskDetails, useAddTask } from '@entities/task';
import { useNavigate } from 'react-router-dom';
import type { Task } from '@shared/types';
import { Flex } from '@mantine/core';

export const TaskNew = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { mutateAsync, isError, error } = useAddTask();
  const handleCancel = () => {
    navigate('/');
  };
  const handleSubmit = async (t: Task) => {
    await mutateAsync(t);
    if (isError) {
      console.error('Error adding task', error);
      return;
    }
    // await new Promise((res) => setTimeout(res, 500));
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
