import { Grid } from '@mantine/core';
import React from 'react';
import { TaskItem } from '../molecules/TaskItem';
import { useNavigate } from 'react-router-dom';
import { useTasksContext } from '@/hooks/use-task-context';
import confetti from 'canvas-confetti';

export const TaskList = (): React.JSX.Element => {
  const { getCurrentTasks } = useTasksContext();

  const tasks = getCurrentTasks();
  console.log(tasks);

  const navigate = useNavigate();
  const taskClick = (id: string) => {
    navigate(`task/${id}`);
  };

  return (
    <Grid justify="center" gutter="lg">
      {tasks.length === 0 && // да, так писать плохо, но весело
        (() => {
          {
            const end = Date.now() + 4 * 1000;
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

              requestAnimationFrame(frame);
            };

            frame();
          }
          return true;
        })() && <>все сделано!</>}
      {tasks.length !== 0 &&
        tasks.map((el) => (
          <React.Fragment key={el.id}>
            <Grid.Col span={{ base: 10, md: 3, lg: 3 }}>
              <TaskItem onClick={taskClick} {...el} />
            </Grid.Col>
          </React.Fragment>
        ))}
    </Grid>
  );
};
