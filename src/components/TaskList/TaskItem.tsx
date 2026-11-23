import React, { useState } from 'react';
import styles from './TaskItem.module.css';
import { useTaskContext } from '../../context/TaskContext';
import { Task, TaskPriority, TaskStatus } from '../../types/task';
import { CalendarIcon, Edit2Icon, Trash2Icon } from '../Icons';

interface TaskItemProps {
  task: Task;
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const PRIORITY_CLASSES: Record<TaskPriority, string> = {
  low: styles.priorityLow,
  medium: styles.priorityMedium,
  high: styles.priorityHigh,
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateStatus, editTask, deleteTask, setEditingTask, setIsFormOpen } =
    useTaskContext();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleDelete = () => {
    if (window.confirm(`Delete "${task.title}"?`)) {
      deleteTask(task.id);
    }
    setConfirmDelete(false);
  };

  const handleEdit = () => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <label className={styles.statusLabel} htmlFor={`status-${task.id}`}>
          Status
        </label>
        <select
          id={`status-${task.id}`}
          className={styles.statusSelect}
          value={task.status}
          onChange={(e) =>
            updateStatus(task.id, (e.target.value as TaskStatus))
          }
          aria-label={`Set status for "${task.title}"`}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          type="button"
          className={`${styles.actionButton} ${styles.editButton}`}
          onClick={handleEdit}
          aria-label={`Edit "${task.title}"`}
        >
          <Edit2Icon size={16} />
        </button>
        <button
          type="button"
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => setConfirmDelete(true)}
          aria-label={`Delete "${task.title}"`}
        >
          <Trash2Icon size={16} />
        </button>
      </div>

      <h3 className={styles.title}>{task.title}</h3>
      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <div className={styles.meta}>
        <span className={styles.chip}>{task.category}</span>
        <span className={`${styles.priorityBadge} ${PRIORITY_CLASSES[task.priority]}`}>
          <span className={styles.priorityDot} aria-hidden="true" />
          {PRIORITY_LABELS[task.priority]}
        </span>
        <span className={styles.dueDate}>
          <span className={styles.dateIcon} aria-hidden="true">
            <CalendarIcon size={14} />
          </span>
          {new Date(task.dueDate).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      {confirmDelete && (
        <div className={styles.confirmBanner}>
          <span className={styles.confirmText}>
            Task will be deleted permanently.
          </span>
          <button
            type="button"
            className={styles.confirmDeleteBtn}
            onClick={handleDelete}
            aria-label="Confirm delete"
          >
            Delete
          </button>
          <button
            type="button"
            className={styles.confirmCancelBtn}
            onClick={() => setConfirmDelete(false)}
            aria-label="Cancel delete"
          >
            Cancel
          </button>
        </div>
      )}
    </article>
  );
};