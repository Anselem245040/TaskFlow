import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "pending" | "completed";
  assignedTo: string | null;
}

interface TaskContextType {
  tasks: Task[];
  createTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, "id">>) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      ...task,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, "id">>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
