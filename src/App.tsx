import React, { useState } from 'react';
import { AppLayout } from './components/AppLayout/AppLayout';
import { Header } from './components/Header/Header';
import { StatsCards } from './components/StatsCards/StatsCards';
import { FocusNotesCarousel } from './components/FocusNotesCarousel/FocusNotesCarousel';
import { TaskList } from './components/TaskList/TaskList';

export default function App() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  return (
    <AppLayout
      isMobileDrawerOpen={isMobileDrawerOpen}
      setIsMobileDrawerOpen={setIsMobileDrawerOpen}
    >
      <Header
        onToggleMobileDrawer={() =>
          setIsMobileDrawerOpen((open) => !open)
        }
        isMobileDrawerOpen={isMobileDrawerOpen}
      />
      <StatsCards />
      <FocusNotesCarousel />
      <TaskList />
    </AppLayout>
  );
}