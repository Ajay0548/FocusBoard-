import React from 'react';
import styles from './Header.module.css';
import { useTaskContext } from '../../context/TaskContext';
import { SearchIcon, PlusIcon, MenuIcon, XIcon } from '../Icons';

interface HeaderProps {
  onToggleMobileDrawer: () => void;
  isMobileDrawerOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileDrawer,
  isMobileDrawerOpen,
}) => {
  const { searchQuery, setSearch, setIsFormOpen, setEditingTask } = useTaskContext();

  const handleOpenNewTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onToggleMobileDrawer}
          aria-label={isMobileDrawerOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
          aria-expanded={isMobileDrawerOpen}
          aria-controls="app-sidebar"
        >
          <MenuIcon size={24} />
        </button>

        <div className={styles.searchContainer}>
          <label htmlFor="task-search" className="sr-only">
            Search tasks by title
          </label>
          <div className={styles.searchIconWrapper}>
            <SearchIcon size={18} />
          </div>
          <input
            id="task-search"
            type="search"
            className={styles.searchInput}
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search tasks by title"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearSearchBtn}
              onClick={() => setSearch('')}
              aria-label="Clear search input"
            >
              <XIcon size={14} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.rightGroup}>
        <button
          type="button"
          className={styles.newTaskButton}
          onClick={handleOpenNewTask}
          aria-label="Create new task"
        >
          <PlusIcon size={18} />
          <span className={styles.newTaskText}>New Task</span>
        </button>
      </div>
    </header>
  );
};
