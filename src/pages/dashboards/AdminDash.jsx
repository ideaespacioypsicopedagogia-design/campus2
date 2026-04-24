import { COURSES, STUDENTS_LIST, ANNOUNCEMENTS } from '../../data/mock'

export default function AdminDash({ onNavigate }) {
  return (
    <div className="fade-up">
      {/* Welcome */}
      <div className="welcome" style={{ background:'linear-gradient(135deg,#1A2455,#0d1635)' }}>
        <div className="welcome-blob">👩‍💼</div>
        <div style={{ fontWeight:900, fontSize:'1.25rem', color:'#fff' }}>
          ¡Bienvenida, Rocío! 👋
        </div>
        <div style={{ fontSize:'.86rem', color:'rgba(255,255,255,.7)', marginTop:4 }}>
          Panel de administración · IDEA Campus 2026–2027
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {[
          ['👥','23','Usuarios',     '#5290DF','#EBF2FC', () => onNavigate('users')],
          ['📚','4', 'Cursos activos','#63AE4D','#EBF7E6', () => onNavigate('courses')],
          ['🧒','12','Alumnos',      '#DF6927','#FDF0E8', null],
          ['✉️','8', 'Mensajes nuevos','#795EFA','#F0EDFF', () => onNavigate('messages')],
        ].map(([icon,val,label,color,bg,fn]) => (
          <div key={label} className="stat-card"
            onClick={fn} style={{ cursor: fn ? 'pointer' : 'default', borderTop:`3px solid ${color}` }}>
            <div className="stat-icon" style={{ background: bg }}>
              <span style={{ fontSize:'1.3rem' }}>{icon}</span>
            </div>
            <div>
              <div className="stat-val">{val}</div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: cursos + alumnos */}
      <div className="grid-2">

        {/* Cursos */}
        <div className="card card-pad">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:'.95rem' }}>Cursos activos</div>
            <button className="btn btn-ghost" style={{ fontSize:'.76rem', padding:'6px 14px' }}
              onClick={() => onNavigate('courses')}>Ver todos</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {COURSES.map(c => (
              <div key={c.id} style={{ display:'flex', alignItems:'center', gap:12,
                padding:'10px 12px', borderRadius:10, background:'var(--bg)', border:'1px solid var(--border)' }}>
                <div style={{ width:36, height:36, borderRadius:10, background:c.color+'18',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0 }}>
                  {c.icon}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:'.86rem' }}>{c.title}</div>
                  <div style={{ fontSize:'.72rem', color:'var(--muted)' }}>{c.teacher} · {c.students} alumnos</div>
                </div>
                <span className="badge" style={{ background:c.color+'18', color:c.color }}>
                  {c.students}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alumnos */}
        <div className="card card-pad">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:'.95rem' }}>Alumnos recientes</div>
            <button className="btn btn-ghost" style={{ fontSize:'.76rem', padding:'6px 14px' }}
              onClick={() => onNavigate('users')}>Ver todos</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {STUDENTS_LIST.slice(0,4).map(s => (
              <div key={s.id} style={{ display:'flex', alignItems:'center', gap:12,
                padding:'9px 0', borderBottom:'1px solid var(--border)' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background:'#63AE4D22',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontWeight:700, fontSize:'.8rem', color:'#63AE4D', flexShrink:0 }}>
                  {s.name[0]}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:'.85rem' }}>{s.name}</div>
                  <div style={{ fontSize:'.72rem', color:'var(--muted)' }}>{s.grade} · {s.modalidad}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontWeight:700, fontSize:'.86rem', color:'#63AE4D' }}>{s.avg}</div>
                  <div style={{ fontSize:'.68rem', color:'var(--muted)' }}>promedio</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Anuncios */}
      <div className="card card-pad" style={{ marginTop:18 }}>
        <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:14 }}>Anuncios recientes</div>
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} style={{ display:'flex', gap:14, padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
            <div style={{ width:38, height:38, borderRadius:10, background:'#1A245518',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', flexShrink:0 }}>📢</div>
            <div>
              <div style={{ fontWeight:700, fontSize:'.88rem' }}>{a.title}</div>
              <div style={{ fontSize:'.8rem', color:'var(--muted)', marginTop:3 }}>{a.body}</div>
              <div style={{ fontSize:'.72rem', color:'var(--muted)', marginTop:5 }}>{a.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
