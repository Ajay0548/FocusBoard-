import React, { useEffect, useState } from 'react';
import styles from './TaskForm.module.css';
import { useTaskContext } from '../../context/TaskContext';
import { TaskPriority, TaskStatus } from '../../types/task';
import { CalendarIcon, XIcon } from '../Icons';

interface TaskFormValues {
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export const TaskForm: React.FC = () => {
  const {
    editingTask,
    isFormOpen,
    setIsFormOpen,
    setEditingTask,
    addTask,
    editTask,
    deleteTask,
  } = useTaskContext();

  const [values, setValues] = useState<TaskFormValues>({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
  });

  const isEditing = editingTask != null;

  useEffect(() => {
    if (!isFormOpen) return;
    setValues({
      title: editingTask?.title ?? '',
      description: editingTask?.description ?? '',
      category: editingTask?.category ?? '',
      priority: editingTask?.priority ?? 'medium',
      status: editingTask?.status ?? 'todo',
      dueDate: editingTask?.dueDate ?? '',
    });
  }, [editingTask, isFormOpen]);

  // Close form on Escape key
  useEffect(() => {
    if (!isFormOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFormOpen]);

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleChange = (key: keyof TaskFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleDelete = () => {
    if (!isEditing || !editingTask) return;
    if (window.confirm(`Delete "${editingTask.title}"?`)) {
      deleteTask(editingTask.id);
      handleClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...values };
    if (isEditing && editingTask) {
      editTask({ ...editingTask, ...payload });
    } else {
      addTask(payload);
    }
    handleClose();
  };

  if (!isFormOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={handleClose} aria-hidden="true" />
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={isEditing ? 'Edit task' : 'New task'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            {isEditing ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close task form"
          >
            <XIcon size={20} />
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="task-title">
              Title <span className={styles.required}>*</span>
            </label>
            <input
              id="task-title"
              className={styles.input}
              type="text"
              value={values.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title"
              required
              aria-required="true"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="task-description">
              Description
            </label>
            <textarea
              id="task-description"
              className={styles.textarea}
              value={values.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add details about this task"
              rows={3}
            />
          </div>

          <div className={styles.fieldsRow}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="task-category">
                Category
              </label>
              <input
                id="task-category"
                className={styles.input}
                type="text"
                value={values.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="e.g. Development"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="task-priority">
                Priority
              </label>
              <select
                id="task-priority"
                className={styles.select}
                value={values.priority}
                onChange={(e) =>
                  handleChange('priority', e.target.value as TaskPriority)
                }
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="task-due-date">
                Due Date
              </label>
              <div className={styles.dateWrapper}>
                <span className={styles.dateIcon} aria-hidden="true">
                  <CalendarIcon size={14} />
                </span>
                <input
                  id="task-due-date"
                  className={`${styles.input} ${styles.dateInput}`}
                  type="date"
                  value={values.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="task-status">
              Status
            </label>
            <select
              id="task-status"
              className={styles.select}
              value={values.status}
              onChange={(e) =>
                handleChange('status', e.target.value as TaskStatus)
              }
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={handleClose}>
              Cancel
            </button>
            {isEditing && (
              <button type="button" className={styles.deleteButton} onClick={handleDelete}>
                Delete
              </button>
            )}
            <button type="submit" className={styles.saveButton}>
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};