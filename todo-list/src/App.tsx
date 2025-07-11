import { Outlet } from 'react-router-dom';
import { TasksProvider } from './context/TaskContext';
import { Suspense } from 'react';
import { ConfettiLoader } from './components/atoms/confetti';

function App() {
  return (
    <TasksProvider>
      <Suspense fallback={<ConfettiLoader />}>
        <Outlet />
      </Suspense>
      <footer className="w-full bg-slate-50 shadow-inner p-2">
        <p>t1-лагерь 2025 дз1</p>
      </footer>
    </TasksProvider>
  );
}

export default App;
