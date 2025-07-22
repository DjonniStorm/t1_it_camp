import {
  type Category,
  type Priority,
  type Status,
  type Task,
} from '@/@types/types';
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useState,
} from 'react';

type TasksContext = {
  tasks: Array<Task>;
  addTask: (newTask: Task) => void;
  getCurrentTasks: () => Task[];
  setFilterParams: React.Dispatch<
    React.SetStateAction<FilterParams | undefined>
  >;
  clearFilters: () => void;
};

type FilterParams = {
  status?: Status;
  category?: Category;
  priority?: Priority;
};

const defaultTasks: Array<Task> = [
  {
    id: crypto.randomUUID(),
    title: 'Разработать дизайн главной страницы',
    description: 'Создать прототип в Figma с акцентом на UX/UI',
    category: 'Feature',
    status: 'InProgress',
    priority: 'HIGH',
  },
  {
    id: crypto.randomUUID(),
    title: 'Настроить CI/CD для проекта',
    description: 'Интегрировать GitHub Actions для автоматического деплоя',
    category: 'Feature',
    status: 'TODO',
    priority: 'MEDIUM',
  },
  {
    id: crypto.randomUUID(),
    title: 'Провести тестирование API',
    description: 'Проверить все эндпоинты с помощью Postman',
    category: 'Test',
    status: 'DONE',
    priority: 'LOW',
  },
  {
    id: crypto.randomUUID(),
    title: 'Написать документацию для модуля',
    description: 'Описать функционал модуля авторизации',
    category: 'Documentation',
    status: 'InProgress',
    priority: 'MEDIUM',
  },
  {
    id: crypto.randomUUID(),
    title: 'Оптимизировать запросы к базе данных',
    description: 'Уменьшить время выполнения SQL-запросов для отчётов',
    category: 'Refactor',
    status: 'TODO',
    priority: 'HIGH',
  },
  {
    id: crypto.randomUUID(),
    title: 'Создать компонент фильтрации',
    description: 'Добавить фильтры по категориям и статусам на странице задач',
    category: 'Feature',
    status: 'DONE',
    priority: 'MEDIUM',
  },
  {
    id: crypto.randomUUID(),
    title: 'Рефакторинг компонента авторизации',
    description: 'Упростить логику обработки ошибок и улучшить читаемость кода',
    category: 'Refactor',
    status: 'TODO',
    priority: 'HIGH',
  },
  {
    id: crypto.randomUUID(),
    title: 'Подготовить презентацию для клиента',
    description: 'Создать слайды с демонстрацией новых фич продукта',
    category: 'Feature',
    status: 'InProgress',
    priority: 'MEDIUM',
  },
  {
    id: crypto.randomUUID(),
    title: 'Настроить мониторинг серверов',
    description: 'Добавить логирование и алерты для критических ошибок',
    category: 'Feature',
    status: 'DONE',
    priority: 'LOW',
  },
];

const TasksContext = createContext<TasksContext | null>(null);

const TasksProvider = ({ children }: PropsWithChildren): React.JSX.Element => {
  const [tasks, setTasks] = useState<Array<Task>>(() => defaultTasks);

  const [filterParams, setFilterParams] = useState<FilterParams>();

  const useCurrentTasks = useCallback(() => {
    let items = [...tasks];
    if (filterParams?.category) {
      items = items.filter((item) => item.category == filterParams.category);
    }
    if (filterParams?.status) {
      items = items.filter((item) => item.status == filterParams.status);
    }
    if (filterParams?.priority) {
      items = items.filter((item) => item.priority == filterParams.priority);
    }
    return items;
  }, [
    filterParams?.category,
    filterParams?.priority,
    filterParams?.status,
    tasks,
  ]);

  const addTask = (newTask: Task) => {
    const filtered = tasks.filter((t) => t.id != newTask.id);
    setTasks(() => [...filtered, newTask]);
  };

  const clearFilters = () => {
    setFilterParams(undefined);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: tasks,
        addTask: addTask,
        getCurrentTasks: useCurrentTasks,
        setFilterParams: setFilterParams,
        clearFilters: clearFilters,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
