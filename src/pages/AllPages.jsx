import { useState } from 'react'
import { TASKS, MESSAGES, EVENTS, DOCUMENTS, ANNOUNCEMENTS,
         COURSES, STUDENTS_LIST, ROLE_COLOR, ROLE_LABEL, pct } from '../data/mock'

/* ══════════════════════════════════════════
   TASKS
══════════════════════════════════════════ */
const STATUS_MAP = {
  pending:   { label:'Pendiente',  bg:'#FDF0E8', color:'#DF6927' },
  submitted: { label:'Entregada',  bg:'#EBF2FC', color:'#5290DF' },
  graded:    { label:'Calificada', bg:'#EBF7E6', color:'#63AE4D' },
}

export function Tasks() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? TASKS : TASKS.filter(t => t.status === filter)
  return (
    <div className="fade-up">
      <div className="page-header">
        <div className="page-title">Tareas</div>
        <div className="page-sub">Gestiona y entrega tus tareas asignadas</div>
      </div>
      <div style={{ display:'flex', gap:8, marginBottom:18, flexWrap:'wrap' }}>
        {[['all','Todas'],['pending','Pendientes'],['submitted','Entregadas'],['graded','Calificadas']].map(([v,l]) => (
          <button key={v} onClick={() => setFilter(v)}
            style={{ padding:'7px 16px', borderRadius:99, border:'1.5px solid',
              fontFamily:'var(--font)', fontWeight:600, fontSize:'.82rem', cursor:'pointer',
              borderColor: filter===v ? 'var(--blue)' : 'var(--border)',
              background: filter===v ? 'var(--blue-l)' : '#fff',
              color: filter===v ? 'var(--blue)' : 'var(--muted)' }}>
            {l}
          </button>
        ))}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {filtered.map(t => {
          const st = STATUS_MAP[t.status]
          return (
            <div key={t.id} className="card" style={{ padding:'16px 20px', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
              <div style={{ width:42, height:42, borderRadius:12, background:'#F4F5F7', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 }}>📋</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:'.9rem' }}>{t.title}</div>
                <div style={{ fontSize:'.74rem', color:'var(--muted)', marginTop:3 }}>{t.course} · Entrega: {t.due}</div>
              </div>
              {t.score !== null && (
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontWeight:900, fontSize:'1.4rem', color: t.score>=90?'#63AE4D':t.score>=70?'#DF6927':'#BF1002' }}>{t.score}</div>
                  <div style={{ fontSize:'.66rem', color:'var(--muted)' }}>puntos</div>
                </div>
              )}
              <span className="badge" style={{ background:st.bg, color:st.color }}>{st.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   MESSAGES
══════════════════════════════════════════ */
export function Messages() {
  const [input, setInput] = useState('')
  const [msgs, setMsgs]   = useState(MESSAGES)
  function send() {
    if (!input.trim()) return
    setMsgs(m => [...m, { id:'n'+Date.now(), from:'Yo', role:'student', text:input, time:'ahora', mine:true }])
    setInput('')
  }
  return (
    <div className="fade-up">
      <div className="page-header">
        <div className="page-title">Mensajes</div>
        <div className="page-sub">Comunicación directa con tu comunidad educativa</div>
      </div>
      <div className="card" style={{ overflow:'hidden', maxWidth:680 }}>
        <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:'50%', background:'#5290DF', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'.86rem', flexShrink:0 }}>C</div>
          <div>
            <div style={{ fontWeight:700, fontSize:'.9rem' }}>Prof. Carlos Méndez</div>
            <div style={{ fontSize:'.72rem', color:'var(--muted)' }}>Maestro</div>
          </div>
        </div>
        <div style={{ height:340, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:10 }}>
          {msgs.map(m => (
            <div key={m.id} style={{ display:'flex', justifyContent:m.mine?'flex-end':'flex-start', gap:8 }}>
              {!m.mine && <div style={{ width:26, height:26, borderRadius:'50%', background:'#5290DF', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'.7rem', fontWeight:700, flexShrink:0 }}>C</div>}
              <div className={m.mine?'bbl-me':'bbl-ot'} style={{ maxWidth:'72%', padding:'9px 13px', fontSize:'.84rem', lineHeight:1.55 }}>
                {m.text}
                <div style={{ fontSize:'.62rem', opacity:.55, marginTop:3, textAlign:m.mine?'right':'left' }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding:'10px 12px', borderTop:'1px solid var(--border)', display:'flex', gap:8 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Escribe un mensaje…" className="form-input" style={{ borderRadius:99, padding:'9px 15px', fontSize:'.84rem' }} />
          <button onClick={send} style={{ background:'var(--blue)', color:'#fff', border:'none', borderRadius:99, padding:'9px 18px', fontWeight:700, fontSize:'.84rem' }}>↑</button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   CALENDAR
══════════════════════════════════════════ */
export function Calendar() {
  const DAYS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
  const year = 2026, month = 4, todayN = 23
  const first = new Date(year, month, 1).getDay()
  const total = new Date(year, month+1, 0).getDate()
  const evForDay = d => {
    const ds = `2026-05-${String(d).padStart(2,'0')}`
    return EVENTS.filter(e => e.date === ds)
  }
  const typeIcon = { deadline:'📋', meeting:'👥', exam:'📝', activity:'🎯' }
  const typeName = { deadline:'Entrega', meeting:'Reunión', exam:'Evaluación', activity:'Actividad' }
  return (
    <div className="fade-up">
      <div className="page-header">
        <div className="page-title">Calendario</div>
        <div className="page-sub">Mayo 2026 · Eventos y entregas</div>
      </div>
      <div className="card card-pad">
        <div className="cal-grid" style={{ marginBottom:6 }}>
          {DAYS.map(d => <div key={d} className="cal-day-name">{d}</div>)}
        </div>
        <div className="cal-grid">
          {Array.from({length:first},(_,i)=><div key={'e'+i}/>)}
          {Array.from({length:total},(_,i)=>{
            const d=i+1, evs=evForDay(d)
            return (
              <div key={d} className={`cal-day${d===todayN?' today':''}`}>
                <div className="cal-num" style={{ color:d===todayN?'var(--blue)':'var(--text)' }}>{d}</div>
                {evs.map(e=><div key={e.id} className="cal-ev" style={{ background:e.color }}>{e.title}</div>)}
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ marginTop:20 }}>
        <div style={{ fontWeight:700, fontSize:'.9rem', marginBottom:12, color:'var(--muted)', textTransform:'uppercase', letterSpacing:.5 }}>Próximos eventos</div>
        {EVENTS.sort((a,b)=>a.date.localeCompare(b.date)).map(e=>(
          <div key={e.id} className="card" style={{ padding:'12px 16px', display:'flex', alignItems:'center', gap:13, marginBottom:9 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:e.color+'18', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', flexShrink:0 }}>{typeIcon[e.type]||'📅'}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:'.86rem' }}>{e.title}</div>
              <div style={{ fontSize:'.72rem', color:'var(--muted)', marginTop:2 }}>{e.date}</div>
            </div>
            <span className="badge" style={{ background:e.color+'18', color:e.color }}>{typeName[e.type]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   DOCUMENTS
══════════════════════════════════════════ */
export function Documents() {
  const typeColor = { PDF:'#BF1002', XLSX:'#63AE4D', DOCX:'#5290DF' }
  return (
    <div className="fade-up">
      <div className="page-header">
        <div className="page-title">Documentos</div>
        <div className="page-sub">Archivos y recursos del campus</div>
      </div>
      <div className="card" style={{ overflow:'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Documento</th><th>Tipo</th><th>Tamaño</th><th>Fecha</th><th>Acción</th></tr></thead>
            <tbody>
              {DOCUMENTS.map(d=>(
                <tr key={d.id}>
                  <td><div style={{ display:'flex', alignItems:'center', gap:10 }}><span style={{ fontSize:'1.2rem' }}>📄</span><span style={{ fontWeight:600, fontSize:'.88rem' }}>{d.title}</span></div></td>
                  <td><span className="badge" style={{ background:(typeColor[d.type]||'#6B7280')+'18', color:typeColor[d.type]||'#6B7280' }}>{d.type}</span></td>
                  <td style={{ color:'var(--muted)', fontSize:'.84rem' }}>{d.size}</td>
                  <td style={{ color:'var(--muted)', fontSize:'.84rem' }}>{d.date}</td>
                  <td><button className="btn btn-ghost" style={{ fontSize:'.76rem', padding:'6px 14px' }}>↓ Descargar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   ANNOUNCEMENTS
══════════════════════════════════════════ */
export function Announcements() {
  return (
    <div className="fade-up">
      <div className="page-header">
        <div className="page-title">Anuncios</div>
        <div className="page-sub">Comunicados del campus IDEA</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {ANNOUNCEMENTS.map(a=>(
          <div key={a.id} className="card card-pad">
            <div style={{ display:'flex', gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'#1A245518', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 }}>📢</div>
              <div>
                <div style={{ fontWeight:700, fontSize:'1rem', marginBottom:6 }}>{a.title}</div>
                <p style={{ fontSize:'.88rem', color:'var(--muted)', lineHeight:1.65 }}>{a.body}</p>
                <div style={{ fontSize:'.74rem', color:'var(--muted)', marginTop:10, display:'flex', gap:14 }}>
                  <span>📅 {a.date}</span><span>👤 {a.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   USERS (Admin)
══════════════════════════════════════════ */
const ALL_USERS = [
  { id:'a1', name:'Rocío Martínez',      role:'admin',   email:'admin@ideaeduca.com'   },
  { id:'t1', name:'Prof. Carlos Méndez', role:'teacher', email:'carlos@ideaeduca.com'  },
  { id:'t2', name:'Ms. Laura Reyes',     role:'teacher', email:'laura@ideaeduca.com'   },
  { id:'s1', name:'Sebastián López',     role:'student', email:'sebastian@ideaeduca.com'},
  { id:'s2', name:'Valentina Cruz',      role:'student', email:'valentina@ideaeduca.com'},
  { id:'s3', name:'Mateo Rodríguez',     role:'student', email:'mateo@ideaeduca.com'   },
  { id:'p1', name:'Carlos López',        role:'parent',  email:'papa@ideaeduca.com'    },
]

export function Users() {
  const [filter, setFilter] = useState('all')
  const filtered = filter==='all' ? ALL_USERS : ALL_USERS.filter(u=>u.role===filter)
  return (
    <div className="fade-up">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div>
          <div className="page-title">Usuarios</div>
          <div className="page-sub">{ALL_USERS.length} usuarios registrados</div>
        </div>
        <button className="btn btn-primary">＋ Nuevo usuario</button>
      </div>
      <div style={{ display:'flex', gap:8, marginBottom:18, flexWrap:'wrap' }}>
        {[['all','Todos'],['admin','Admin'],['teacher','Maestros'],['student','Alumnos'],['parent','Padres']].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)}
            style={{ padding:'7px 16px', borderRadius:99, border:'1.5px solid', fontFamily:'var(--font)',
              fontWeight:600, fontSize:'.82rem', cursor:'pointer',
              borderColor:filter===v?'var(--navy)':'var(--border)',
              background:filter===v?'var(--navy)':'#fff', color:filter===v?'#fff':'var(--muted)' }}>
            {l}
          </button>
        ))}
      </div>
      <div className="card" style={{ overflow:'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Usuario</th><th>Rol</th><th>Email</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>
              {filtered.map(u=>(
                <tr key={u.id}>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:34, height:34, borderRadius:'50%', background:`linear-gradient(135deg,${ROLE_COLOR[u.role]},#1A2455)`, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'.8rem', flexShrink:0 }}>{u.name[0]}</div>
                      <span style={{ fontWeight:600, fontSize:'.88rem' }}>{u.name}</span>
                    </div>
                  </td>
                  <td><span className="badge" style={{ background:ROLE_COLOR[u.role]+'18', color:ROLE_COLOR[u.role] }}>{ROLE_LABEL[u.role]}</span></td>
                  <td style={{ color:'var(--muted)', fontSize:'.84rem' }}>{u.email}</td>
                  <td><span className="badge" style={{ background:'#EBF7E6', color:'#63AE4D' }}>Activo</span></td>
                  <td><button className="btn btn-ghost" style={{ fontSize:'.74rem', padding:'5px 12px' }}>Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   REPORTS (Admin)
══════════════════════════════════════════ */
export function Reports() {
  return (
    <div className="fade-up">
      <div className="page-header">
        <div className="page-title">Reportes</div>
        <div className="page-sub">Estadísticas y progreso del campus</div>
      </div>
      <div className="grid-2">
        <div className="card card-pad">
          <div style={{ fontWeight:700, marginBottom:14 }}>Progreso por curso</div>
          {COURSES.map(c=>(
            <div key={c.id} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ fontSize:'.86rem', fontWeight:600 }}>{c.icon} {c.title}</span>
                <span style={{ fontWeight:700, color:c.color }}>{pct(c.done,c.lessons)}%</span>
              </div>
              <div className="pb-track" style={{ height:7 }}>
                <div className="pb-fill" style={{ width:`${pct(c.done,c.lessons)}%`, background:c.color, height:7 }} />
              </div>
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <div style={{ fontWeight:700, marginBottom:14 }}>Rendimiento por alumno</div>
          {STUDENTS_LIST.map(s=>(
            <div key={s.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 0', borderBottom:'1px solid var(--border)' }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:'#63AE4D22', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'.78rem', color:'#63AE4D', flexShrink:0 }}>{s.name[0]}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:'.86rem' }}>{s.name}</div>
                <div style={{ fontSize:'.7rem', color:'var(--muted)' }}>{s.modalidad}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontWeight:900, color:s.avg>=90?'#63AE4D':s.avg>=70?'#DF6927':'#BF1002' }}>{s.avg}</div>
                <div style={{ fontSize:'.66rem', color:'var(--muted)' }}>promedio</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   PROGRESS (Parent)
══════════════════════════════════════════ */
export function Progress() {
  const totalL = COURSES.reduce((a,c)=>a+c.lessons,0)
  const doneL  = COURSES.reduce((a,c)=>a+c.done,0)
  const overall = pct(doneL,totalL)
  return (
    <div className="fade-up">
      <div className="page-header">
        <div className="page-title">Progreso de Sebastián</div>
        <div className="page-sub">Seguimiento académico detallado</div>
      </div>
      <div className="card card-pad" style={{ marginBottom:20, background:'linear-gradient(135deg,#795EFA,#1A2455)', border:'none' }}>
        <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
          <div>
            <div style={{ fontSize:'3rem', fontWeight:900, color:'#fff', lineHeight:1 }}>{overall}%</div>
            <div style={{ fontSize:'.9rem', color:'rgba(255,255,255,.7)', marginTop:4 }}>Progreso general</div>
          </div>
          <div style={{ flex:1, minWidth:160 }}>
            <div className="pb-track" style={{ height:9, background:'rgba(255,255,255,.2)' }}>
              <div className="pb-fill" style={{ width:`${overall}%`, background:'rgba(255,255,255,.8)', height:9 }} />
            </div>
            <div style={{ fontSize:'.78rem', color:'rgba(255,255,255,.6)', marginTop:6 }}>{doneL}/{totalL} lecciones</div>
          </div>
        </div>
      </div>
      <div className="grid-2">
        {COURSES.map(c=>{
          const p=pct(c.done,c.lessons)
          return (
            <div key={c.id} className="card card-pad">
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                <div style={{ width:42, height:42, borderRadius:11, background:c.color+'18', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 }}>{c.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:'.9rem' }}>{c.title}</div>
                  <div style={{ fontSize:'.72rem', color:'var(--muted)' }}>{c.lessons} lecciones</div>
                </div>
                <div style={{ fontWeight:900, fontSize:'1.2rem', color:c.color }}>{p}%</div>
              </div>
              <div className="pb-track" style={{ height:7 }}>
                <div className="pb-fill" style={{ width:`${p}%`, background:c.color, height:7 }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   GRADES (Parent)
══════════════════════════════════════════ */
const GRADE_DATA = {
  c1:{ p1:92, p2:88, final:95, avg:91 },
  c2:{ p1:100,p2:95, final:97, avg:97 },
  c3:{ p1:82, p2:88, final:85, avg:85 },
  c4:{ p1:86, p2:90, final:89, avg:88 },
}

export function Grades() {
  return (
    <div className="fade-up">
      <div className="page-header">
        <div className="page-title">Calificaciones</div>
        <div className="page-sub">Notas de Sebastián · Año 2026–2027</div>
      </div>
      {COURSES.map(c=>{
        const g=GRADE_DATA[c.id]
        return (
          <div key={c.id} className="card" style={{ marginBottom:14, overflow:'hidden' }}>
            <div style={{ height:4, background:c.color }} />
            <div style={{ padding:'14px 18px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                <div style={{ width:40, height:40, borderRadius:11, background:c.color+'18', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' }}>{c.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:'.92rem' }}>{c.title}</div>
                  <div style={{ fontSize:'.74rem', color:'var(--muted)' }}>{c.teacher}</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontWeight:900, fontSize:'1.6rem', lineHeight:1, color:g.avg>=90?'#63AE4D':g.avg>=70?'#DF6927':'#BF1002' }}>{g.avg}</div>
                  <div style={{ fontSize:'.68rem', color:'var(--muted)' }}>promedio</div>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                {[['Parcial 1',g.p1],['Parcial 2',g.p2],['Final',g.final]].map(([label,val])=>(
                  <div key={label} style={{ background:'var(--bg)', borderRadius:10, padding:'10px 12px', textAlign:'center' }}>
                    <div style={{ fontWeight:900, fontSize:'1.1rem', color:val>=90?'#63AE4D':val>=70?'#DF6927':'#BF1002' }}>{val}</div>
                    <div style={{ fontSize:'.7rem', color:'var(--muted)', marginTop:2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
