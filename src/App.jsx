import { useState } from 'react'
import Login from './pages/Login'
import AppShell from './layouts/AppShell'

// Dashboards
import AdminDash   from './pages/dashboards/AdminDash'
import TeacherDash from './pages/dashboards/TeacherDash'
import StudentDash from './pages/dashboards/StudentDash'
import ParentDash  from './pages/dashboards/ParentDash'

// All other pages (tree-shaken by Vite)
import {
  Tasks, Messages, Calendar, Documents,
  Announcements, Users, Reports, Progress, Grades,
} from './pages/AllPages'

// Courses has its own file
import Courses from './pages/Courses'

// Placeholder for pages not yet built
function ComingSoon({ title }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', minHeight:'60vh', gap:16,
      fontFamily:'var(--font)', color:'var(--muted)', textAlign:'center', padding:24 }}>
      <div style={{ fontSize:'3rem' }}>🚧</div>
      <h2 style={{ fontWeight:900, fontSize:'1.3rem', color:'var(--text)' }}>{title}</h2>
      <p style={{ fontSize:'.9rem', maxWidth:320 }}>
        Módulo en construcción. Próximamente disponible en el campus IDEA.
      </p>
    </div>
  )
}

// ── Page router (simple switch, no react-router needed yet) ──
function PageContent({ user, page, onNavigate }) {
  // Dashboard by role
  if (page === 'dashboard') {
    if (user.role === 'admin')   return <AdminDash   onNavigate={onNavigate} />
    if (user.role === 'teacher') return <TeacherDash onNavigate={onNavigate} />
    if (user.role === 'student') return <StudentDash onNavigate={onNavigate} />
    if (user.role === 'parent')  return <ParentDash  onNavigate={onNavigate} />
  }

  // Shared pages
  if (page === 'courses')       return <Courses />
  if (page === 'tasks')         return <Tasks />
  if (page === 'messages')      return <Messages />
  if (page === 'calendar')      return <Calendar />
  if (page === 'documents')     return <Documents />
  if (page === 'announcements') return <Announcements />

  // Admin-only
  if (page === 'users')         return <Users />
  if (page === 'reports')       return <Reports />

  // Parent-only
  if (page === 'progress')      return <Progress />
  if (page === 'grades')        return <Grades />

  return <ComingSoon title={page} />
}

// ── ROOT APP ─────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null) // null = login screen
  const [page, setPage] = useState('dashboard')

  function handleLogin(selectedUser) {
    setUser(selectedUser)
    setPage('dashboard')
  }

  function handleLogout() {
    setUser(null)
    setPage('dashboard')
  }

  function handleNavigate(newPage) {
    setPage(newPage)
    // Scroll to top on page change
    const el = document.getElementById('main-content')
    if (el) el.scrollTop = 0
  }

  if (!user) return <Login onLogin={handleLogin} />

  return (
    <AppShell user={user} page={page} onNavigate={handleNavigate} onLogout={handleLogout}>
      <PageContent user={user} page={page} onNavigate={handleNavigate} />
    </AppShell>
  )
}
