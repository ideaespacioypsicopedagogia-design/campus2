import { COURSES, TASKS, STUDENTS_LIST, pct } from '../../data/mock'

export default function TeacherDash({ onNavigate }) {
  const myCourses = COURSES.slice(0, 2)
  const pending   = TASKS.filter(t => t.status === 'submitted')

  return (
    <div className="fade-up">
      {/* Welcome */}
      <div className="welcome" style={{ background:'linear-gradient(135deg,#5290DF,#3a75c4)' }}>
        <div className="welcome-blob">👨‍🏫</div>
        <div style={{ fontWeight:900, fontSize:'1.25rem', color:'#fff' }}>¡Hola, Carlos! 👋</div>
        <div style={{ fontSize:'.86rem', color:'rgba(255,255,255,.75)', marginTop:4 }}>
          Matemáticas · IDEA Campus
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {[
          ['📚','2','Mis cursos','#5290DF','#EBF2FC'],
          ['🧒','8','Mis alumnos','#63AE4D','#EBF7E6'],
          ['✅','1','Por calificar','#DF6927','#FDF0E8'],
          ['✉️','3','Mensajes','#795EFA','#F0EDFF'],
        ].map(([icon,val,label,color,bg]) => (
          <div key={label} className="stat-card" style={{ borderTop:`3px solid ${color}` }}>
            <div className="stat-icon" style={{ background:bg }}>
              <span style={{ fontSize:'1.3rem' }}>{icon}</span>
            </div>
            <div>
              <div className="stat-val">{val}</div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Mis cursos */}
        <div className="card card-pad">
          <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:14 }}>Mis Cursos</div>
          {myCourses.map(c => (
            <div key={c.id} className="card-hover" style={{ padding:'12px', borderRadius:12,
              border:'1px solid var(--border)', marginBottom:10, background:'var(--bg)',
              cursor:'pointer', transition:'all .2s' }}
              onClick={() => onNavigate('courses')}>
              <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:10 }}>
                <div style={{ width:40, height:40, borderRadius:11, background:c.color+'18',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:'.88rem' }}>{c.title}</div>
                  <div style={{ fontSize:'.72rem', color:'var(--muted)' }}>{c.students} alumnos · {c.lessons} lecciones</div>
                </div>
              </div>
              <div className="pb-track" style={{ height:6 }}>
                <div className="pb-fill" style={{ width:`${pct(c.done, c.lessons)}%`, background:c.color, height:6 }} />
              </div>
              <div style={{ fontSize:'.7rem', color:'var(--muted)', marginTop:4 }}>
                {c.done}/{c.lessons} lecciones completadas
              </div>
            </div>
          ))}
        </div>

        {/* Tareas por calificar */}
        <div className="card card-pad">
          <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:14 }}>Por calificar</div>
          {pending.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">✅</div>
              <div className="empty-title">Al día</div>
              <div className="empty-sub">No hay entregas pendientes.</div>
            </div>
          ) : pending.map(t => (
            <div key={t.id} style={{ display:'flex', alignItems:'center', gap:12,
              padding:'11px 12px', borderRadius:10, background:'var(--bg)',
              border:'1px solid var(--border)', marginBottom:9 }}>
              <span style={{ fontSize:'1.2rem' }}>📝</span>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:'.85rem' }}>{t.title}</div>
                <div style={{ fontSize:'.72rem', color:'var(--muted)' }}>{t.course} · Entrega: {t.due}</div>
              </div>
              <span className="badge" style={{ background:'#FDF0E8', color:'#DF6927' }}>Revisar</span>
            </div>
          ))}

          {/* Lista alumnos */}
          <div style={{ fontWeight:700, fontSize:'.9rem', margin:'18px 0 12px' }}>Mis Alumnos</div>
          {STUDENTS_LIST.slice(0, 4).map(s => (
            <div key={s.id} style={{ display:'flex', alignItems:'center', gap:11,
              padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:'#5290DF22',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontWeight:700, fontSize:'.78rem', color:'#5290DF', flexShrink:0 }}>
                {s.name[0]}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:'.84rem' }}>{s.name}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <span className="badge" style={{ background:'#63AE4D18', color:'#63AE4D' }}>
                  {s.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
