import { COURSES, EVENTS, pct } from '../../data/mock'

export default function ParentDash({ onNavigate }) {
  const totalL  = COURSES.reduce((a,c)=>a+c.lessons,0)
  const doneL   = COURSES.reduce((a,c)=>a+c.done,0)
  const overall = pct(doneL, totalL)

  const gradeMap = { c1:91, c2:97, c3:85, c4:88 }

  return (
    <div className="fade-up">
      {/* Welcome */}
      <div className="welcome" style={{ background:'linear-gradient(135deg,#795EFA,#1A2455)' }}>
        <div className="welcome-blob">👨‍👩‍👦</div>
        <div style={{ fontWeight:900, fontSize:'1.25rem', color:'#fff' }}>¡Hola, Carlos! 👋</div>
        <div style={{ fontSize:'.86rem', color:'rgba(255,255,255,.72)', marginTop:4 }}>
          Siguiendo el progreso de Sebastián
        </div>
      </div>

      {/* Child summary card */}
      <div className="card card-pad" style={{ marginBottom:18, borderLeft:'4px solid #795EFA' }}>
        <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
          <div style={{ width:54, height:54, borderRadius:'50%', background:'#63AE4D',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', fontWeight:900, fontSize:'1.4rem', flexShrink:0 }}>S</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:900, fontSize:'1.05rem' }}>Sebastián López</div>
            <div style={{ fontSize:'.82rem', color:'var(--muted)', marginTop:2 }}>
              5to Primaria · Microschool
            </div>
            <div style={{ marginTop:10 }}>
              <div className="pb-track" style={{ height:7 }}>
                <div className="pb-fill" style={{ width:`${overall}%`, background:'#795EFA', height:7 }} />
              </div>
              <div style={{ fontSize:'.72rem', color:'var(--muted)', marginTop:4 }}>
                {overall}% progreso general · {doneL}/{totalL} lecciones
              </div>
            </div>
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontWeight:900, fontSize:'2rem', color:'#795EFA', lineHeight:1 }}>{overall}%</div>
            <div style={{ fontSize:'.7rem', color:'var(--muted)' }}>Progreso</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid" style={{ marginBottom:22 }}>
        {[
          ['📚', COURSES.length, 'Cursos activos',  '#5290DF','#EBF2FC'],
          ['✅', doneL,          'Lecciones hechas', '#63AE4D','#EBF7E6'],
          ['🏆', '91',           'Promedio general', '#EBBA65','#FDF7EC'],
          ['📅', '2',            'Próximas entregas','#DF6927','#FDF0E8'],
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
        {/* Progreso por curso */}
        <div className="card card-pad">
          <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:14 }}>Progreso por curso</div>
          {COURSES.map(c => {
            const p = pct(c.done, c.lessons)
            return (
              <div key={c.id} style={{ marginBottom:16 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:7 }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:c.color+'18',
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', flexShrink:0 }}>
                    {c.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:'.86rem' }}>{c.title}</div>
                    <div style={{ fontSize:'.7rem', color:'var(--muted)' }}>{c.done}/{c.lessons} lecciones</div>
                  </div>
                  <span style={{ fontWeight:900, fontSize:'.95rem', color:c.color }}>{p}%</span>
                </div>
                <div className="pb-track" style={{ height:6 }}>
                  <div className="pb-fill" style={{ width:`${p}%`, background:c.color, height:6 }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Calificaciones + Eventos */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div className="card card-pad">
            <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:14 }}>Calificaciones</div>
            {COURSES.map(c => (
              <div key={c.id} style={{ display:'flex', alignItems:'center', gap:12,
                padding:'9px 0', borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontSize:'1rem' }}>{c.icon}</span>
                <div style={{ flex:1, fontSize:'.84rem', fontWeight:600 }}>{c.title}</div>
                <span style={{ fontWeight:900, fontSize:'1rem',
                  color: gradeMap[c.id] >= 90 ? '#63AE4D' : gradeMap[c.id] >= 70 ? '#DF6927' : '#BF1002' }}>
                  {gradeMap[c.id]}
                </span>
              </div>
            ))}
          </div>

          <div className="card card-pad">
            <div style={{ fontWeight:700, fontSize:'.95rem', marginBottom:14 }}>Próximos eventos</div>
            {EVENTS.slice(0,3).map(e => (
              <div key={e.id} style={{ display:'flex', gap:12, padding:'9px 0',
                borderBottom:'1px solid var(--border)', alignItems:'center' }}>
                <div style={{ width:9, height:9, borderRadius:'50%', background:e.color, flexShrink:0 }} />
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
