import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import { Layout } from './components/Layout'
import { Dashboard } from './routes/Dashboard'
import { Learn } from './routes/Learn'
import { Session } from './routes/Session'
import { Results } from './routes/Results'
import { Reference } from './routes/Reference'
import { Settings } from './routes/Settings'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'learn', element: <Learn /> },
        { path: 'session', element: <Session /> },
        { path: 'results', element: <Results /> },
        { path: 'reference', element: <Reference /> },
        { path: 'settings', element: <Settings /> },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename },
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
