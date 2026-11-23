import React, { useState, useEffect } from 'react';
import styles from './AppLayout.module.css';
import { LayoutDashboardIcon, ListTodoIcon, SparklesIcon, XIcon } from '../Icons';

interface AppLayoutProps {
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
  isMobileDrawerOpen: boolean;
  setIsMobileDrawerOpen: (open: boolean) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  headerSlot,
  isMobileDrawerOpen,
  setIsMobileDrawerOpen,
}) => {
  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileDrawerOpen, setIsMobileDrawerOpen]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  return (
    <div className={styles.container}>
      {/* Mobile Drawer Backdrop */}
      <div
        className={`${styles.drawerOverlay} ${isMobileDrawerOpen ? styles.drawerOverlayOpen : ''}`}
        onClick={() => setIsMobileDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar / Mobile Drawer */}
      <aside
        id="app-sidebar"
        className={`${styles.sidebar} ${isMobileDrawerOpen ? styles.sidebarOpen : ''}`}
        aria-label="Application Navigation"
      >
        <div className={styles.brand}>
          <div className={styles.brandLogo} aria-hidden="true">
            F
          </div>
          <span className={styles.brandText}>FocusBoard</span>
          <span className={styles.brandBadge}>v1.0</span>

          <button
            type="button"
            className={styles.closeDrawerBtn}
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-label="Close navigation menu"
          >
            <XIcon size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          <button
            type="button"
            className={`${styles.navItem} ${styles.navItemActive}`}
            aria-current="page"
          >
            <LayoutDashboardIcon size={20} />
            <span>Dashboard</span>
          </button>
          <button
            type="button"
            className={styles.navItem}
            onClick={() => setIsMobileDrawerOpen(false)}
          >
            <ListTodoIcon size={20} />
            <span>All Tasks</span>
          </button>
          <button
            type="button"
            className={styles.navItem}
            onClick={() => setIsMobileDrawerOpen(false)}
          >
            <SparklesIcon size={20} />
            <span>Focus Notes</span>
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userAvatar} aria-hidden="true">
            FB
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Productive User</span>
            <span className={styles.userRole}>Single-user Workspace</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainWrapper}>
        {headerSlot}
        <main className={styles.mainContent} id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};
