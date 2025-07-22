import {
  statusColors,
  priorityColors,
  categoryColors,
  type Status,
  type Priority,
  type Category,
} from '@/@types/types';
import { useTasksContext } from '@/hooks/use-task-context';
import { ActionIcon, Flex, Group, Select, Text, Tooltip } from '@mantine/core';
import { IconCancel } from '@tabler/icons-react';
import React from 'react';

export const TaskFilter = (): React.JSX.Element => {
  const { setFilterParams, clearFilters } = useTasksContext();

  const handleStatusChange = (e: string | null) => {
    if (e) {
      setFilterParams((prev) => ({
        ...prev,
        status: e as Status,
      }));
    }
  };

  const handlePriorityChange = (e: string | null) => {
    if (e) {
      setFilterParams((prev) => ({
        ...prev,
        priority: e as Priority,
      }));
    }
  };

  const handleCategoryChange = (e: string | null) => {
    console.log(e);
    if (e) {
      setFilterParams((prev) => ({
        ...prev,
        category: e as Category,
      }));
    }
  };

  return (
    <>
      <div className="pb-4">
        <Flex gap="md" align="center" justify="end">
          <Group>
            <Text>Статус:</Text>
            <Select
              placeholder="выбрать статус"
              data={Object.keys(statusColors)}
              onChange={handleStatusChange}
            />
          </Group>
          <Group>
            <Text>Приоритет:</Text>
            <Select
              placeholder="выбрать приоритет"
              data={Object.keys(priorityColors)}
              onChange={handlePriorityChange}
            />
          </Group>
          <Group>
            <Text>Категория:</Text>
            <Select
              placeholder="выбрать категорию"
              data={Object.keys(categoryColors)}
              onChange={handleCategoryChange}
            />
          </Group>
          <Tooltip label="нет, кнопка не очищает select">
            <ActionIcon color="black" onClick={clearFilters}>
              <IconCancel />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </div>
    </>
  );
};
