# FocusBoard — Task Dashboard

- **Live URL:** https://focus-board-sepia.vercel.app/
- **GitHub Repo:** https://github.com/Ajay0548/FocusBoard-
- **Loom Video:** https://www.loom.com/share/ea4da7fdec7e460a8f5d918ca06f6c09?t=336

FocusBoard is a single-user task dashboard built with **React 19**, **TypeScript**, and **Vite**. It lets you create, edit, delete, and organize tasks with status and priority filters, search, and built-in statistics — all persisted to `localStorage` so your data survives page reloads.

> ⚠️ Note: Despite the repository folder being named `mfa`, this project is **FocusBoard**, a task management dashboard — not an MFA/multi-factor authentication app.

---

## Features

- **Task CRUD** — Add, edit, and delete tasks with title, description, category, priority, status, and due date
- **Status workflow** — Toggle tasks between Todo, In Progress, and Completed
- **Filters** — Filter by status (All/Todo/In Progress/Completed) and priority (All/Low/Medium/High)
- **Search** — Live search by task title
- **Statistics cards** — Total tasks, in-progress, completed, and completion rate with a progress bar
- **Focus Notes carousel** — Keyboard-navigable carousel with slide indicators and prev/next controls
- **Persistent storage** — Tasks are saved to `localStorage` automatically on every change
- **Responsive design** — Desktop sidebar collapses into a mobile drawer with a backdrop overlay
- **Accessibility** — ARIA labels, keyboard navigation, visible focus rings, and `prefers-reduced-motion`-friendly transitions

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 6 |
| Styling | CSS Modules + CSS custom properties |
| Icons | Custom inline SVG icon components |
| State management | React `useReducer` Context (`TaskContext`) |
| Persistence | Browser `localStorage` |


## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

Output goes to `dist/`.

### Preview the production build

```bash
npm run preview
```

---

## Project Structure

```
mfa/
├── index.html              # HTML entry point (loads /src/main.tsx)
├── package.json            # Scripts and dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── .gitignore
├── dist/                   # Production build output
└── src/
    ├── index.css           # Global CSS variables and base styles
    ├── main.tsx            # App entry point (TaskProvider + App)
    ├── App.tsx             # App shell: Layout + Header + Stats + Carousel + TaskList
    ├── types/
    │   ├── task.ts         # Task, TaskStats, and filter type definitions
    │   └── css-modules.d.ts # CSS Module type declarations
    ├── context/
    │   └── TaskContext.tsx # Reducer-based context: CRUD, filters, search, stats, localStorage
    ├── data/
    │   └── sampleTasks.ts  # Seed data (6 sample tasks)
    └── components/
        ├── Icons.tsx               # Shared inline SVG icon components
        ├── AppLayout/              # Sidebar, mobile drawer, main content wrapper
        ├── Header/                 # Top bar: menu toggle, search, new-task button
        ├── StatsCards/             # Four statistic cards with progress bar
        ├── FocusNotesCarousel/     # Slide carousel with indicators & nav buttons
        ├── TaskList/               # Filter chips, empty state, task grid
        │   ├── TaskList.tsx
        │   ├── TaskItem.tsx        # Individual task card (status toggle, edit, delete)
        │   ├── TaskList.module.css
        │   └── TaskItem.module.css
        └── TaskForm/               # Add/edit task dialog
            ├── TaskForm.tsx
            └── TaskForm.module.css
```


## State Management (`TaskContext`)

All task state lives in `src/context/TaskContext.tsx` using a `useReducer` + `Context` pattern:

- **State**: `tasks`, `searchQuery`, `statusFilter`, `priorityFilter`
- **Derived**: `filteredTasks` (AND logic across search + status + priority) and `stats` (total, in-progress, completed, completion percent)
- **Actions**: `ADD_TASK`, `EDIT_TASK`, `DELETE_TASK`, `UPDATE_STATUS`, `SET_SEARCH`, `SET_STATUS_FILTER`, `SET_PRIORITY_FILTER`
- **Helpers**: `addTask`, `editTask`, `deleteTask`, `updateStatus`, `setSearch`, `setStatusFilter`, `setPriorityFilter`
- **Form state**: `editingTask`, `setEditingTask`, `isFormOpen`, `setIsFormOpen` (used by `Header` and `TaskForm`)
- **Persistence**: `localStorage` key `focusboard_tasks` — tasks load on init and save on every change

Wrap any component that needs task data with `TaskProvider`, or call `useTaskContext()` inside it.

---

## Components Overview

| Component | Responsibility |
|-----------|----------------|
| `App` | Composes the full page inside `AppLayout` |
| `AppLayout` | Responsive sidebar / mobile drawer, main content area, Escape-to-close |
| `Header` | Search input, "New Task" button, mobile menu toggle |
| `StatsCards` | Total / In Progress / Completed / Completion Rate cards |
| `FocusNotesCarousel` | Three-slide focus-notes carousel with indicators |
| `TaskList` | Status & priority filter chips, empty state, task grid |
| `TaskItem` | Single task card: status dropdown, title, description, category, priority badge, due date, edit/delete |
| `TaskForm` | Modal dialog for creating or editing a task (Escape to close) |

---

## Scripts

```json
{
  "dev": "vite",           // Start dev server with HMR
  "build": "tsc && vite build", // Type-check then production build
  "preview": "vite preview" // Preview production build locally
}
```

---

## Accessibility Notes

- All interactive buttons have `aria-label` where no visible text exists
- Focus-visible rings are styled for keyboard users
- The mobile drawer traps focus behavior via Escape key and backdrop click
- The task form dialog uses `role="dialog"`, `aria-modal`, and returns focus on close
- Progress bar uses `role="progressbar"` with `aria-valuenow/min/max`

---

## License

MIT — see `LICENSE`.