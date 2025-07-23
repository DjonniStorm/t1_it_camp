import { tasksStore, TaskItem, useTasks, useDeleteTask } from '@entities/task';
import { Card, Grid, Space, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import type { Task } from '@shared/types';
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ZodError } from 'zod/v4';

export const TaskList = observer((): React.JSX.Element => {
  const { data: tasks, isError, error, isPending } = useTasks();
  const { mutateAsync: deleteTask } = useDeleteTask();

  const navigate = useNavigate();

  const filteredTasks = tasksStore.getFilteredTasks(tasks || []);

  const taskClick = (task: Task) => {
    navigate(`task/${task.id}`, {
      state: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        category: task.category,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });
  };

  useEffect(() => {
    if (filteredTasks.length === 0) {
      let animationFrameId: number;
      const end = Date.now() + 2 * 1000;
      const colors = ['#a688f7', '#f78fbc', '#f8b89f', '#f5d7a2'];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        animationFrameId = requestAnimationFrame(frame);
      };

      animationFrameId = requestAnimationFrame(frame);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [filteredTasks]);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    await new Promise((res) => setTimeout(res, 500));
  };

  if (isPending && !tasks) {
    return (
      <Card>
        <Title>загрузка...</Title>
      </Card>
    );
  }

  if (isError && !tasks) {
    return (
      <>
        <Card>
          <Title>
            {error instanceof ZodError ? error.message : 'ошибка загрузки'}
          </Title>
        </Card>
        ;
      </>
    );
  }

  return (
    <>
      <Grid justify="center" gutter="lg" overflow="hidden">
        {filteredTasks.length === 0 && <Space p="md">все сделано!</Space>}
        {filteredTasks.length !== 0 &&
          filteredTasks.map((el) => (
            <React.Fragment key={el.id}>
              <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3.5 }}>
                <TaskItem
                  onDeleteClick={handleDelete}
                  onEditClick={() => taskClick(el)}
                  {...el}
                />
              </Grid.Col>
            </React.Fragment>
          ))}
      </Grid>
    </>
  );
});
