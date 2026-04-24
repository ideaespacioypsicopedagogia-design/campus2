import { ROLE_COLOR, ROLE_LABEL } from '../data/mock'

const NAV = {
  admin: [
    { id:'dashboard', icon:'⊞',  label:'Dashboard'     },
    { id:'users',     icon:'👥', label:'Usuarios'       },
    { id:'courses',   icon:'📚', label:'Cursos'         },
    { id:'messages',  icon:'✉️',  label:'Mensajes'       },
    { id:'calendar',  icon:'📅', label:'Calendario'     },
    { id:'announcements',icon:'📢',label:'Anuncios'     },
    { id:'documents', icon:'📁', label:'Documentos'     },
    { id:'reports',   icon:'📊', label:'Reportes'       },
  ],
  teacher: [
    { id:'dashboard', icon:'⊞',  label:'Inicio'         },
    { id:'courses',   icon:'📚', label:'Mis Clases'     },
    { id:'tasks',     icon:'✅', label:'Tareas'         },
    { id:'messages',  icon:'✉️',  label:'Mensajes'       },
    { id:'calendar',  icon:'📅', label:'Calendario'     },
    { id:'documents', icon:'📁', label:'Documentos'     },
    { id:'announcements',icon:'📢',label:'Anuncios'     },
  ],
  student: [
    { id:'dashboard', icon:'⊞',  label:'Inicio'         },
    { id:'courses',   icon:'📚', label:'Mis Clases'     },
    { id:'tasks',     icon:'✅', label:'Tareas'         },
    { id:'messages',  icon:'✉️',  label:'Mensajes'       },
    { id:'calendar',  icon:'📅', label:'Calendario'     },
    { id:'documents', icon:'📁', label:'Documentos'     },
    { id:'announcements',icon:'📢',label:'Anuncios'     },
  ],
  parent: [
    { id:'dashboard', icon:'⊞',  label:'Inicio'         },
    { id:'progress',  icon:'📊', label:'Progreso'       },
    { id:'grades',    icon:'🏆', label:'Calificaciones' },
    { id:'messages',  icon:'✉️',  label:'Mensajes'       },
    { id:'calendar',  icon:'📅', label:'Calendario'     },
    { id:'documents', icon:'📁', label:'Documentos'     },
    { id:'announcements',icon:'📢',label:'Anuncios'     },
  ],
}

export default function Sidebar({ user, page, onNavigate, onLogout, onClose }) {
  const nav   = NAV[user.role] ?? []
  const color = ROLE_COLOR[user.role]
  const label = ROLE_LABEL[user.role]

  return (
    <div style={{ background:'#1A2455', display:'flex', flexDirection:'column', height:'100%' }}>

      {/* Header */}
      <div className="sb-header">
        <div className="sb-logo">
          <div className="sb-logo-ic">💡</div>
          <div>
            <div className="sb-logo-nm">IDEA</div>
            <div className="sb-logo-tg">Campus Virtual</div>
          </div>
        </div>
        {onClose && (
          <button className="sb-close" onClick={onClose} aria-label="Cerrar menú">✕</button>
        )}
      </div>

      {/* Perfil */}
      <div className="sb-profile">
        <div className="sb-av" style={{ background: color }}>
          {user.initials}
        </div>
        <div style={{ overflow:'hidden' }}>
          <div className="sb-pname">{user.name.split(' ')[0]}</div>
          <span className="sb-badge"
            style={{ background: color + '25', color }}>
            {label}
          </span>
        </div>
      </div>

      {/* Nav label */}
      <div className="sb-section">Menú</div>

      {/* Nav items */}
      <nav className="sb-nav">
        {nav.map(item => (
          <button key={item.id}
            className={`sb-item${page === item.id ? ' active' : ''}`}
            onClick={() => { onNavigate(item.id); onClose?.() }}>
            <span className="sb-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="sb-footer">
        <button className="sb-logout" onClick={onLogout}>
          <span>🚪</span><span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  )
}
