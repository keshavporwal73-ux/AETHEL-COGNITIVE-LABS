import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { DashboardPage } from './pages/DashboardPage';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  public?: boolean;
}

export const routes: RouteConfig[] = [
  {
    name: 'Landing Page',
    path: '/',
    element: <LandingPage />,
    public: true,
  },
  {
    name: 'Main Workspace',
    path: '/app',
    element: <WorkspacePage />,
    public: true,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
    public: true,
  },
  {
    name: 'Fallback',
    path: '*',
    element: <Navigate to="/" replace />,
    public: true,
  }
];
