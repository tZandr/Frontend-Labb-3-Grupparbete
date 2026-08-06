import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import DashboardLayout from './components/dashboard/layout/DashboardLayout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DashboardLayout />
  </StrictMode>,
)
