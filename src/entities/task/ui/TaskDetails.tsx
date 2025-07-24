import { Button, Flex, Group, NativeSelect, TextInput } from '@mantine/core';
import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import type { Task, Status, Priority, Category } from '@shared/types';
import { categoryColors, priorityColors, statusColors } from '@shared/config';

type TaskDetailsProps = {
  initialValue?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
};

const unknownText = 'не выбрано';

const availableStatusColors = Object.keys(statusColors);
const availableCategoryColors = Object.keys(categoryColors);
const availablePriorityColors = Object.keys(priorityColors);

const statusColorsList = [unknownText, ...availableStatusColors];
const categoryColorsList = [unknownText, ...availableCategoryColors];
const priorityColorsList = [unknownText, ...availablePriorityColors];

type FormValues = {
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
};

export const TaskDetails = ({
  initialValue,
  onSubmit,
  onCancel,
}: TaskDetailsProps): React.JSX.Element => {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      title: initialValue?.title ?? '',
      description: initialValue?.description ?? '',
      status: initialValue?.status ?? '',
      priority: initialValue?.priority ?? '',
      category: initialValue?.category ?? '',
    },
    validate: {
      title: (value) =>
        typeof value === 'string' && value.trim().length >= 0
          ? null
          : 'Должен быть заголовок',
      status: (value) => (value === unknownText ? 'Выберите статус' : null),
      priority: (value) =>
        value === unknownText ? 'Выберите приоритет' : null,
      category: (value) =>
        value === unknownText ? 'Выберите категорию' : null,
    },
  });

  useEffect(() => {
    if (initialValue) {
      form.setValues({
        title: initialValue.title ?? '',
        description: initialValue.description ?? '',
        status: initialValue.status ?? '',
        priority: initialValue.priority ?? '',
        category: initialValue.category ?? '',
      });
    }
  }, [initialValue]);

  const handleSubmit = (values: FormValues) => {
    const date = new Date();
    const task = {
      ...values,
      id: initialValue?.id || crypto.randomUUID(),
      createdAt: initialValue?.createdAt || date.toLocaleDateString(),
      updatedAt: date.toLocaleDateString(),
      status: values.status as Status,
      priority: values.priority as Priority,
      category: values.category as Category,
    };
    onSubmit(task);
  };

  return (
    <section className="w-full h-screen p-4 flex items-center justify-center">
      <form
        className="w-full h-full md:h-auto md:w-3/4 lg:w-3/5 p-6 md:p-10 shadow-2xl rounded-xl flex flex-col justify-center"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Flex direction="column" gap="lg">
          <TextInput
            label="Заголовок"
            placeholder="введите заголовок"
            key={form.key('title')}
            {...form.getInputProps('title')}
            styles={{
              label: {
                fontSize: '1.125rem',
                fontWeight: 500,
              },
              input: {
                fontSize: '1.125rem',
              },
            }}
          />

          <TextInput
            label="Описание"
            placeholder="введите описание"
            key={form.key('description')}
            {...form.getInputProps('description')}
            styles={{
              label: {
                fontSize: '1.125rem',
                fontWeight: 500,
              },
              input: {
                fontSize: '1.125rem',
              },
            }}
          />

          <div className="flex flex-col md:flex-row gap-4">
            <NativeSelect
              label="Категория"
              description="Выбор категории"
              data={categoryColorsList}
              key={form.key('category')}
              {...form.getInputProps('category')}
              styles={{
                label: {
                  fontSize: '1.125rem',
                  fontWeight: 500,
                },
                input: {
                  fontSize: '1.125rem',
                },
              }}
            />

            <NativeSelect
              label="Статус"
              description="Выбор статуса"
              data={statusColorsList}
              key={form.key('status')}
              {...form.getInputProps('status')}
              styles={{
                label: {
                  fontSize: '1.125rem',
                  fontWeight: 500,
                },
                input: {
                  fontSize: '1.125rem',
                },
              }}
            />

            <NativeSelect
              label="Приоритет"
              description="Выбор приоритета"
              data={priorityColorsList}
              key={form.key('priority')}
              {...form.getInputProps('priority')}
              styles={{
                label: {
                  fontSize: '1.125rem',
                  fontWeight: 500,
                },
                input: {
                  fontSize: '1.125rem',
                },
              }}
            />
          </div>

          <Group justify="center" mt="md">
            <Button color="black" type="submit">
              Сохранить
            </Button>
            <Button color="red" onClick={onCancel}>
              Отмена
            </Button>
          </Group>
        </Flex>
      </form>
    </section>
  );
};
