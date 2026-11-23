import React from 'react';
import styles from './StatsCards.module.css';
import { useTaskContext } from '../../context/TaskContext';
import { ListTodoIcon, ClockIcon, CheckCircleIcon, TrendingUpIcon } from '../Icons';

export const StatsCards: React.FC = () => {
  const { stats } = useTaskContext();

  return (
    <section aria-label="Task Performance Statistics" className={styles.grid}>
      {/* Total Tasks */}
      <article className={styles.card} aria-label={`Total tasks: ${stats.total}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Total Tasks</span>
          <div className={`${styles.iconWrapper} ${styles.iconTotal}`} aria-hidden="true">
            <ListTodoIcon size={20} />
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardValue}>{stats.total}</div>
          <span className={styles.cardSubtitle}>All recorded tasks</span>
        </div>
      </article>

      {/* In Progress */}
      <article className={styles.card} aria-label={`In progress tasks: ${stats.inProgress}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>In Progress</span>
          <div className={`${styles.iconWrapper} ${styles.iconInProgress}`} aria-hidden="true">
            <ClockIcon size={20} />
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardValue}>{stats.inProgress}</div>
          <span className={styles.cardSubtitle}>Active focus items</span>
        </div>
      </article>

      {/* Completed */}
      <article className={styles.card} aria-label={`Completed tasks: ${stats.completed}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Completed</span>
          <div className={`${styles.iconWrapper} ${styles.iconCompleted}`} aria-hidden="true">
            <CheckCircleIcon size={20} />
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardValue}>{stats.completed}</div>
          <span className={styles.cardSubtitle}>Tasks closed out</span>
        </div>
      </article>

      {/* Completion Rate */}
      <article className={styles.card} aria-label={`Completion rate: ${stats.completionPercent} percent`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Completion Rate</span>
          <div className={`${styles.iconWrapper} ${styles.iconRate}`} aria-hidden="true">
            <TrendingUpIcon size={20} />
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardValue}>{stats.completionPercent}%</div>
          <div
            className={styles.progressBarTrack}
            role="progressbar"
            aria-valuenow={stats.completionPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Sprint completion progress"
          >
            <div
              className={styles.progressBarFill}
              style={{ width: `${stats.completionPercent}%` }}
            />
          </div>
        </div>
      </article>
    </section>
  );
};
