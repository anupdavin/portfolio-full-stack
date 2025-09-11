import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Portfolio from './pages/Portfolio.tsx'
import Layout from './pages/Layout.tsx'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Portfolio /> },
    ],
  },
]
const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
