import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './styles/main.scss'

document.documentElement.setAttribute(
  "data-theme",
  localStorage.getItem("theme") || "light"
);
document.documentElement.setAttribute(
  "data-font",
  localStorage.getItem("fontSize") || "medium"
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
