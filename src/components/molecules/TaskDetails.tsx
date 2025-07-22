import {
  categoryColors,
  priorityColors,
  statusColors,
  type Task,
} from '@/@types/types';
import { Button, Flex, Group, NativeSelect, TextInput } from '@mantine/core';
import React from 'react';
import { isNotEmpty, useForm } from '@mantine/form';

type TaskDetailsProps = {
  initialValue: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
};

export const TaskDetails = ({
  initialValue,
  onSubmit,
  onCancel,
}: TaskDetailsProps): React.JSX.Element => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: initialValue.title,
      description: initialValue.description,
      status: initialValue.status,
      priority: initialValue.priority,
      category: initialValue.category,
    },
    validate: {
      title: isNotEmpty('Должен быть заголовок'),
      status: isNotEmpty('1'),
      priority: isNotEmpty('2'),
      category: isNotEmpty('3'),
    },
  });

  const handleSubmit = (e: Omit<Task, 'id'>) => {
    const task = { ...e, id: initialValue.id || crypto.randomUUID() };
    onSubmit(task);
  };

  return (
    <section className="w-full h-full p-5 shadow-2xl rounded flex items-center justify-center">
      <Flex className="w-full" justify="center" align="center">
        <form
          className="w-5/12 shadow-2xl p-10 rounded-xl"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Flex direction="column" gap="lg">
            <TextInput
              label="Заголовок"
              placeholder="введите заголовок"
              key={form.key('title')}
              {...form.getInputProps('title')}
            />
            <TextInput
              label="Описание"
              placeholder="введите описание"
              key={form.key('description')}
              {...form.getInputProps('description')}
            />
            <Flex gap="md">
              <NativeSelect
                label="категория"
                description="выбор категории"
                data={Object.keys(categoryColors)}
                key={form.key('category')}
                {...form.getInputProps('category')}
              />
              <NativeSelect
                label="статус"
                description="выбор статуса"
                data={Object.keys(statusColors)}
                key={form.key('status')}
                {...form.getInputProps('status')}
              />
              <NativeSelect
                label="приоритет"
                description="выбор приоритета"
                data={Object.keys(priorityColors)}
                key={form.key('priority')}
                {...form.getInputProps('priority')}
              />
            </Flex>
            <Group justify="center">
              <Button color="black" type="submit">
                Сохранить
              </Button>
              <Button color="red" onClick={onCancel}>
                Отмена
              </Button>
            </Group>
          </Flex>
        </form>
      </Flex>
    </section>
  );
};
