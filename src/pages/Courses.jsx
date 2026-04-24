import { useState } from 'react'
import { COURSES, pct } from '../data/mock'

export default function Courses() {
  const [sel, setSel] = useState(null)
  const course = sel ? COURSES.find(c => c.id === sel) : null

  if (course) return (
    <div className="fade-up">
      <button onClick={() => setSel(null)}
        style={{ background:'transparent', border:'none', cursor:'pointer',
          color:'var(--muted)', fontSize:'.82rem', fontWeight:600,
          display:'flex', alignItems:'center', gap:5, marginBottom:18 }}>
        ← Volver a cursos
      </button>

      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:22 }}>
        <div style={{ width:52, height:52, borderRadius:14, background:course.color+'18',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', flexShrink:0 }}>
          {course.icon}
        </div>
        <div>
          <h2 style={{ fontWeight:900, fontSize:'1.3rem' }}>{course.title}</h2>
          <p style={{ fontSize:'.84rem', color:'var(--muted)', marginTop:2 }}>{course.desc}</p>
        </div>
      </div>

      <div className="grid-2">
        {/* Lecciones */}
        <div className="card card-pad">
          <div style={{ fontWeight:700, marginBottom:14 }}>Lecciones ({course.lessons})</div>
          {Array.from({ length: course.lessons }, (_, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:11,
              padding:'9px 11px', borderRadius:10, marginBottom:6,
              background: i < course.done ? course.color+'08' : 'var(--bg)',
              borderLeft:`3px solid ${i < course.done ? course.color : 'transparent'}`,
              border:`1px solid var(--border)`, borderLeftWidth:3 }}>
              <div style={{ width:22, height:22, borderRadius:'50%', flexShrink:0,
                background: i < course.done ? '#D1FAE5' : 'var(--border)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'.6rem', fontWeight:900,
                color: i < course.done ? '#63AE4D' : 'var(--muted)' }}>
                {i < course.done ? '✓' : i + 1}
              </div>
              <span style={{ fontSize:'.84rem', fontWeight: i < course.done ? 600 : 400 }}>
                Lección {i + 1} — {['Introducción','Conceptos básicos','Práctica','Ejercicios','Evaluación'][i % 5]}
              </span>
            </div>
          ))}
        </div>

        {/* Info del curso */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div className="card card-pad">
            <div style={{ fontWeight:700, marginBottom:14 }}>Progreso</div>
            <div style={{ fontSize:'3rem', fontWeight:900, color:course.color, lineHeight:1, marginBottom:6 }}>
              {pct(course.done, course.lessons)}%
            </div>
            <div className="pb-track" style={{ height:8 }}>
              <div className="pb-fill" style={{ width:`${pct(course.done,course.lessons)}%`, background:course.color, height:8 }} />
            </div>
            <div style={{ fontSize:'.78rem', color:'var(--muted)', marginTop:6 }}>
              {course.done} de {course.lessons} lecciones completadas
            </div>
          </div>
          <div className="card card-pad">
            <div style={{ fontWeight:700, marginBottom:12 }}>Detalles</div>
            {[['👨‍🏫','Maestro', course.teacher], ['👥','Alumnos', `${course.students} inscritos`],
              ['📚','Lecciones', `${course.lessons} en total`]].map(([icon,k,v]) => (
              <div key={k} style={{ display:'flex', gap:10, padding:'8px 0',
                borderBottom:'1px solid var(--border)', fontSize:'.86rem' }}>
                <span>{icon}</span>
                <span style={{ color:'var(--muted)', flex:1 }}>{k}</span>
                <span style={{ fontWeight:600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fade-up">
      <div className="page-header">
        <div className="page-title">Cursos</div>
        <div className="page-sub">Accede a tus materias y lecciones</div>
      </div>
      <div className="grid-2">
        {COURSES.map(c => (
          <div key={c.id} className="card card-hover" onClick={() => setSel(c.id)}
            style={{ cursor:'pointer', overflow:'hidden' }}>
            <div style={{ height:5, background:c.color }} />
            <div style={{ padding:18 }}>
              <div style={{ display:'flex', gap:13, marginBottom:13 }}>
                <div style={{ width:46, height:46, borderRadius:13, background:c.color+'18',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:'.93rem' }}>{c.title}</div>
                  <div style={{ fontSize:'.74rem', color:'var(--muted)', marginTop:2 }}>{c.teacher}</div>
                </div>
              </div>
              <p style={{ fontSize:'.8rem', color:'var(--muted)', lineHeight:1.55, marginBottom:13 }}>{c.desc}</p>
              <div className="pb-track" style={{ height:6 }}>
                <div className="pb-fill" style={{ width:`${pct(c.done,c.lessons)}%`, background:c.color, height:6 }} />
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:5 }}>
                <span style={{ fontSize:'.72rem', color:'var(--muted)' }}>{c.done}/{c.lessons} lecciones</span>
                <span style={{ fontSize:'.72rem', fontWeight:700, color:c.color }}>{pct(c.done,c.lessons)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
