import { useState } from 'react'
import Sidebar from './Sidebar'
import { ROLE_COLOR, ROLE_LABEL } from '../data/mock'

const MOB_NAV = {
  admin:   [['dashboard','⊞','Inicio'],['users','👥','Usuarios'],['courses','📚','Cursos'],['messages','✉️','Mensajes'],['calendar','📅','Agenda']],
  teacher: [['dashboard','⊞','Inicio'],['courses','📚','Clases'],['tasks','✅','Tareas'],['messages','✉️','Mensajes'],['calendar','📅','Agenda']],
  student: [['dashboard','⊞','Inicio'],['courses','📚','Clases'],['tasks','✅','Tareas'],['messages','✉️','Mensajes'],['calendar','📅','Agenda']],
  parent:  [['dashboard','⊞','Inicio'],['progress','📊','Progreso'],['grades','🏆','Notas'],['messages','✉️','Mensajes'],['calendar','📅','Agenda']],
}

const PAGE_TITLES = {
  dashboard:'Inicio', users:'Usuarios', courses:'Cursos', tasks:'Tareas',
  messages:'Mensajes', calendar:'Calendario', documents:'Documentos',
  announcements:'Anuncios', reports:'Reportes', progress:'Progreso',
  grades:'Calificaciones',
}

export default function AppShell({ user, page, onNavigate, onLogout, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const color = ROLE_COLOR[user.role]
  const mobNav = MOB_NAV[user.role] ?? MOB_NAV.student

  return (
    <div className="app-shell">

      {/* Desktop sidebar */}
      <aside className="app-sidebar">
        <Sidebar user={user} page={page} onNavigate={onNavigate} onLogout={onLogout} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="overlay" onClick={() => setDrawerOpen(false)} />
      )}
      <div className={`drawer${drawerOpen ? ' open' : ''}`}>
        <Sidebar user={user} page={page}
          onNavigate={onNavigate} onLogout={onLogout}
          onClose={() => setDrawerOpen(false)} />
      </div>

      {/* Main */}
      <div className="app-main">

        {/* Topbar */}
        <header className="topbar">
          <button className="topbar-ham" onClick={() => setDrawerOpen(true)} aria-label="Menú">
            <span /><span /><span />
          </button>
          <div>
            <div className="topbar-title">{PAGE_TITLES[page] ?? 'Campus'}</div>
            <div className="topbar-sub">IDEA Campus · Año 2026–2027</div>
          </div>
          <div className="topbar-space" />
          <div className="topbar-user">
            <div className="topbar-avatar" style={{ background: color }}>
              {user.initials}
            </div>
            <div className="hide-mob">
              <div className="topbar-uname">{user.name.split(' ')[0]}</div>
              <div className="topbar-urole">{ROLE_LABEL[user.role]}</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="app-content" id="main-content">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mob-nav">
        <div className="mob-nav-inner">
          {mobNav.map(([id, icon, label]) => (
            <button key={id}
              className={`mob-nav-btn${page === id ? ' active' : ''}`}
              onClick={() => onNavigate(id)}>
              <span className="mob-nav-icon">{icon}</span>
              <span className="mob-nav-label">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
