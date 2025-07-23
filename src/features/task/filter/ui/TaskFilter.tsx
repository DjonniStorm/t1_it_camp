import { type Status, type Priority, type Category } from '@shared/types';
import { Flex, Group, Select, Text } from '@mantine/core';
import {
  availableCategoryColors,
  availablePriorityColors,
  availableStatusColors,
} from '@entities/task';
import { tasksStore } from '@entities/task';
import { observer } from 'mobx-react-lite';

export const TaskFilter = observer((): React.JSX.Element => {
  const { setFilters } = tasksStore;

  const handleStatusChange = (value: string | null) => {
    setFilters({
      status: value as Status,
    });
  };

  const handlePriorityChange = (value: string | null) => {
    setFilters({
      priority: value as Priority,
    });
  };

  const handleCategoryChange = (value: string | null) => {
    setFilters({
      category: value as Category,
    });
  };

  return (
    <>
      <Flex className="pb-4" gap="md" align="center" justify="end" pr="md">
        <Group>
          <Text>Статус:</Text>
          <Select
            placeholder="выбрать статус"
            data={availableStatusColors}
            onChange={handleStatusChange}
            clearable
            allowDeselect
          />
        </Group>
        <Group>
          <Text>Приоритет:</Text>
          <Select
            placeholder="выбрать приоритет"
            data={availablePriorityColors}
            onChange={handlePriorityChange}
            clearable
            allowDeselect
          />
        </Group>
        <Group>
          <Text>Категория:</Text>
          <Select
            placeholder="выбрать категорию"
            data={availableCategoryColors}
            onChange={handleCategoryChange}
            clearable
            allowDeselect
          />
        </Group>
      </Flex>
    </>
  );
});
