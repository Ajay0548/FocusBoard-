import React from 'react';
import styles from './TaskList.module.css';
import { useTaskContext } from '../../context/TaskContext';
import { Task, TaskPriority, TaskStatus } from '../../types/task';
import { TaskItem } from './TaskItem';
import { TaskForm } from '../TaskForm/TaskForm';
import { ListTodoIcon, PlusIcon } from '../Icons';

const STATUS_FILTERS: { value: TaskStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const PRIORITY_FILTERS: { value: TaskPriority | 'all'; label: string }[] = [
  { value: 'all', label: 'All Priority' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export const TaskList: React.FC = () => {
  const {
    filteredTasks,
    stats,
    statusFilter,
    priorityFilter,
    setStatusFilter,
    setPriorityFilter,
    setEditingTask,
    setIsFormOpen,
  } = useTaskContext();

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  return (
    <section className={styles.section} aria-label="Tasks">
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <ListTodoIcon size={20} />
          <div>
            <h2 className={styles.title}>Tasks</h2>
            <span className={styles.count}>
              {filteredTasks.length} of {stats.total} tasks
            </span>
          </div>
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddTask}
          aria-label="Create new task"
        >
          <PlusIcon size={18} />
          <span>New Task</span>
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Status</span>
          <div className={styles.chipRow}>
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`${styles.chip} ${
                  statusFilter === filter.value ? styles.chipActive : ''
                }`}
                onClick={() => setStatusFilter(filter.value)}
                aria-pressed={statusFilter === filter.value}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Priority</span>
          <div className={styles.chipRow}>
            {PRIORITY_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`${styles.chip} ${
                  priorityFilter === filter.value ? styles.chipActive : ''
                }`}
                onClick={() => setPriorityFilter(filter.value)}
                aria-pressed={priorityFilter === filter.value}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No tasks match your filters</p>
          <p className={styles.emptyBody}>
            Try adjusting the status or priority filters, or clear the search.
          </p>
        </div>
      ) : (
        <ul className={styles.list} role="list">
          {filteredTasks.map((task: Task) => (
            <li key={task.id} className={styles.listItem}>
              <TaskItem task={task} />
            </li>
          ))}
        </ul>
      )}

      <TaskForm />
    </section>
  );
};