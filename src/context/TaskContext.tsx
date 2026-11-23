import React, { createContext, useContext, useReducer, useEffect, useMemo, useState } from 'react';
import { Task, TaskStatus, TaskPriority, TaskStats, StatusFilter, PriorityFilter } from '../types/task';
import { initialTasks } from '../data/sampleTasks';

const STORAGE_KEY = 'focusboard_tasks';

interface TaskState {
  tasks: Task[];
  searchQuery: string;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id'> & { id?: string } }
  | { type: 'EDIT_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UPDATE_STATUS'; payload: { id: string; status: TaskStatus } }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_STATUS_FILTER'; payload: StatusFilter }
  | { type: 'SET_PRIORITY_FILTER'; payload: PriorityFilter };

const loadInitialTasks = (): Task[] => {
  if (typeof window === 'undefined') return initialTasks;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading localStorage for focusboard_tasks:', error);
  }
  return initialTasks;
};

const initialState: TaskState = {
  tasks: loadInitialTasks(),
  searchQuery: '',
  statusFilter: 'all',
  priorityFilter: 'all',
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask: Task = {
        ...action.payload,
        id: action.payload.id || `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      };
      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };
    }
    case 'EDIT_TASK': {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...action.payload } : task
        ),
      };
    }
    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    }
    case 'UPDATE_STATUS': {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, status: action.payload.status } : task
        ),
      };
    }
    case 'SET_SEARCH': {
      return {
        ...state,
        searchQuery: action.payload,
      };
    }
    case 'SET_STATUS_FILTER': {
      return {
        ...state,
        statusFilter: action.payload,
      };
    }
    case 'SET_PRIORITY_FILTER': {
      return {
        ...state,
        priorityFilter: action.payload,
      };
    }
    default:
      return state;
  }
}

interface TaskContextType {
  tasks: Task[];
  searchQuery: string;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  filteredTasks: Task[];
  stats: TaskStats;
  dispatch: React.Dispatch<TaskAction>;
  addTask: (task: Omit<Task, 'id'> & { id?: string }) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateStatus: (id: string, status: TaskStatus) => void;
  setSearch: (query: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setPriorityFilter: (filter: PriorityFilter) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Persist tasks in localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    } catch (error) {
      console.error('Error writing to localStorage for focusboard_tasks:', error);
    }
  }, [state.tasks]);

  // Derived filtered tasks with AND logic
  const filteredTasks = useMemo(() => {
    const trimmedQuery = state.searchQuery.trim().toLowerCase();

    return state.tasks.filter((task) => {
      // Search matching (case-insensitive title)
      const matchesSearch = trimmedQuery === '' || task.title.toLowerCase().includes(trimmedQuery);

      // Status filter
      const matchesStatus = state.statusFilter === 'all' || task.status === state.statusFilter;

      // Priority filter
      const matchesPriority = state.priorityFilter === 'all' || task.priority === state.priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [state.tasks, state.searchQuery, state.statusFilter, state.priorityFilter]);

  // Derived calculated statistics
  const stats: TaskStats = useMemo(() => {
    const total = state.tasks.length;
    const inProgress = state.tasks.filter((t) => t.status === 'in-progress').length;
    const completed = state.tasks.filter((t) => t.status === 'completed').length;
    const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      inProgress,
      completed,
      completionPercent,
    };
  }, [state.tasks]);

  // Action helpers
  const addTask = (task: Omit<Task, 'id'> & { id?: string }) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const editTask = (task: Task) => {
    dispatch({ type: 'EDIT_TASK', payload: task });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const updateStatus = (id: string, status: TaskStatus) => {
    dispatch({ type: 'UPDATE_STATUS', payload: { id, status } });
  };

  const setSearch = (query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  const setStatusFilter = (filter: StatusFilter) => {
    dispatch({ type: 'SET_STATUS_FILTER', payload: filter });
  };

  const setPriorityFilter = (filter: PriorityFilter) => {
    dispatch({ type: 'SET_PRIORITY_FILTER', payload: filter });
  };

  const value = {
    tasks: state.tasks,
    searchQuery: state.searchQuery,
    statusFilter: state.statusFilter,
    priorityFilter: state.priorityFilter,
    filteredTasks,
    stats,
    dispatch,
    addTask,
    editTask,
    deleteTask,
    updateStatus,
    setSearch,
    setStatusFilter,
    setPriorityFilter,
    editingTask,
    setEditingTask,
    isFormOpen,
    setIsFormOpen,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
