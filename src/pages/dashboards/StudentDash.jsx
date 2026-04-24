import { COURSES, TASKS, EVENTS, pct } from '../../data/mock'

export default function StudentDash({ onNavigate }) {
  const totalL  = COURSES.reduce((a,c)=>a+c.lessons,0)
  const doneL   = COURSES.reduce((a,c)=>a+c.done,0)
  const overall = pct(doneL, totalL)
  const pending = TASKS.filter(t => t.status === 'pending')
  const upcoming = EVENTS.filter(e => e.date >= '2026-05-20').slice(0,3)

  return (
    <div className="fade-up">
      {/* Welcome */}
      <div className="welcome" style={{ background:'linear-gradient(135deg,#EBBA65,#DF6927)' }}>
        <div className="welcome-blob">💡</div>
        <div style={{ fontWeight:900, fontSize:'1.25rem', color:'var(--dark)' }}>
          ¡Hola, Sebastián! 🌟
        </div>
        <div style={{ fontSize:'.86rem', color:'rgba(0,0,0,.55)', marginTop:4 }}>
          5to Primaria · Microschool
        </div>
        <div style={{ marginTop:14, maxWidth:300 }}>
          <div className="pb-track" style={{ height:7, background:'rgba(0,0,0,.15)' }}>
            <div className="pb-fill" style={{ width:`${overall}%`, background:'rgba(0,0,0,.3)', height:7 }} />
          </div>
          <div style={{ fontSize:'.72rem', color:'rgba(0,0,0,.5)', marginTop:4 }}>
            {overall}% progreso general · {doneL}/{totalL} lecciones
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {[
          ['📚', COURSES.length, 'Mis clases',   '#5290DF','#EBF2FC', 'courses'],
          ['✅', doneL,          'Completadas',  '#63AE4D','#EBF7E6', 'courses'],
          ['📋', pending.length, 'Tareas',       '#DF6927','#FDF0E8', 'tasks'],
          ['📊', `${overall}%`,  'Progreso',     '#795EFA','#F0EDFF', null],
        ].map(([icon,val,label,color,bg,nav]) => (
          <div key={label} className="stat-card"
            style={{ borderTop:`3px solid ${color}`, cursor: nav ? 'pointer':'default' }}
            onClick={() => nav && onNavigate(nav)}>
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
          <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:14 }}>Mis Clases</div>
          {COURSES.map(c => (
            <div key={c.id} className="card-hover" style={{ padding:'12px', borderRadius:12,
              border:'1px solid var(--border)', marginBottom:10, background:'var(--bg)' }}
              onClick={() => onNavigate('courses')}>
              <div style={{ display:'flex', gap:11, marginBottom:9 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:c.color+'18',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0 }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:'.86rem' }}>{c.title}</div>
                  <div style={{ fontSize:'.72rem', color:'var(--muted)' }}>{c.lessons} lecciones</div>
                </div>
              </div>
              <div className="pb-track" style={{ height:5 }}>
                <div className="pb-fill" style={{ width:`${pct(c.done,c.lessons)}%`, background:c.color, height:5 }} />
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                <span style={{ fontSize:'.7rem', color:'var(--muted)' }}>{c.done}/{c.lessons}</span>
                <span style={{ fontSize:'.7rem', fontWeight:700, color:c.color }}>{pct(c.done,c.lessons)}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tareas + Próximos eventos */}
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <div className="card card-pad">
            <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:14 }}>
              Tareas pendientes
            </div>
            {pending.map(t => (
              <div key={t.id} style={{ display:'flex', alignItems:'center', gap:12,
                padding:'10px 0', borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontSize:'1.2rem' }}>📋</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:'.85rem' }}>{t.title}</div>
                  <div style={{ fontSize:'.72rem', color:'var(--muted)' }}>{t.course} · {t.due}</div>
                </div>
                <span className="badge" style={{ background:'#FDF0E8', color:'#DF6927' }}>Pendiente</span>
              </div>
            ))}
          </div>

          <div className="card card-pad">
            <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:14 }}>
              Próximos eventos
            </div>
            {upcoming.map(e => (
              <div key={e.id} style={{ display:'flex', alignItems:'center', gap:12,
                padding:'9px 0', borderBottom:'1px solid var(--border)' }}>
                <div style={{ width:10, height:10, borderRadius:'50%', background:e.color, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:'.84rem' }}>{e.title}</div>
                  <div style={{ fontSize:'.72rem', color:'var(--muted)' }}>{e.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
