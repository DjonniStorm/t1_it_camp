import { Card, Grid, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { tasksStore, TaskItem } from '@entities/task';
import type { Task } from '@shared/types';
import { observer } from 'mobx-react-lite';

export const TaskList = observer((): React.JSX.Element => {
  const { tasks, filteredTasks, fetchTasks, isLoading, error, deleteTask } =
    tasksStore;

  useEffect(() => {
    if (!tasks || tasks.length == 0) {
      fetchTasks();
    }
  }, [tasks, fetchTasks]);
  console.log(tasks);

  const navigate = useNavigate();
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

  if (isLoading && !tasks) {
    return (
      <Card>
        <Title>загрузка...</Title>
      </Card>
    );
  }

  if (error && !tasks) {
    <Card>
      <Title>{error}</Title>
    </Card>;
  }

  return (
    <>
      <Grid justify="center" gutter="lg">
        {filteredTasks.length === 0 && <>все сделано!</>}
        {filteredTasks.length !== 0 &&
          filteredTasks.map((el) => (
            <React.Fragment key={el.id}>
              <Grid.Col span={{ base: 10, md: 5, lg: 3.5 }}>
                <TaskItem
                  onDeleteClick={deleteTask}
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
