import { USERS, ROLE_COLOR } from '../data/mock'

const ROLES = [
  { key: 'admin',   icon: '👩‍💼', label: 'Admin',    desc: 'Gestión total de la plataforma', color: '#BF1002' },
  { key: 'teacher', icon: '👨‍🏫', label: 'Maestro',  desc: 'Cursos, lecciones y proyectos',  color: '#5290DF' },
  { key: 'student', icon: '🧒',  label: 'Alumno',   desc: 'Clases, tareas y progreso',      color: '#63AE4D' },
  { key: 'parent',  icon: '👨',  label: 'Familia',  desc: 'Seguimiento de tu hijo/a',       color: '#795EFA' },
]

export default function Login({ onLogin }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'var(--font)' }}>

      {/* ── ASIDE ── */}
      <aside style={{
        flex: '0 0 420px',
        background: 'linear-gradient(160deg, #1A2455 0%, #0d1635 100%)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: 48, position: 'relative', overflow: 'hidden',
      }}>
        {/* Blobs decorativos */}
        <div style={{ position:'absolute', width:280, height:280, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(235,186,101,.22) 0%, transparent 70%)',
          top:-70, right:-70, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:220, height:220, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(82,144,223,.18) 0%, transparent 70%)',
          bottom:-50, left:-50, pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1, textAlign:'center', width:'100%' }}>
          <div style={{ fontSize:52, marginBottom:10 }}>💡</div>
          <div style={{ fontWeight:900, fontSize:'2.8rem', color:'#fff', letterSpacing:-1.5, lineHeight:1 }}>
            IDEA
          </div>
          <div style={{ fontSize:'.82rem', color:'#EBBA65', fontWeight:600, marginTop:6, marginBottom:36 }}>
            Campus Virtual · Espacio y Psicopedagogía
          </div>
          {ROLES.map(r => (
            <div key={r.key} style={{ display:'flex', alignItems:'center', gap:12,
              background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.06)',
              borderRadius:12, padding:'11px 14px', marginBottom:9, textAlign:'left' }}>
              <span style={{ fontSize:'1.1rem' }}>{r.icon}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:'.82rem', color: r.color }}>{r.label}</div>
                <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.5)', marginTop:1 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── FORM ── */}
      <main style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center',
        background:'var(--bg)', padding:'40px 24px' }}>
        <div style={{ width:'100%', maxWidth:400, animation:'fadeUp .4s ease forwards' }}>

          <h1 style={{ fontWeight:900, fontSize:'1.9rem', color:'var(--text)', marginBottom:4 }}>
            Bienvenido
          </h1>
          <p style={{ fontSize:'.86rem', color:'var(--muted)', marginBottom:32 }}>
            Selecciona tu perfil para acceder al campus demo
          </p>

          {/* Botones de acceso por rol */}
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:28 }}>
            {ROLES.map(r => (
              <button key={r.key} onClick={() => onLogin(USERS[r.key])}
                style={{ display:'flex', alignItems:'center', gap:14,
                  background:'#fff', border:`2px solid ${r.color}22`,
                  borderRadius:14, padding:'14px 18px', cursor:'pointer',
                  fontFamily:'var(--font)', textAlign:'left', transition:'all .18s',
                  boxShadow:'0 2px 10px rgba(0,0,0,.06)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = r.color
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = `0 8px 24px ${r.color}28`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = r.color + '22'
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,.06)'
                }}>
                <div style={{ width:44, height:44, borderRadius:12, flexShrink:0,
                  background: r.color + '15', display:'flex',
                  alignItems:'center', justifyContent:'center', fontSize:'1.3rem' }}>
                  {r.icon}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:'.95rem', color:'var(--text)' }}>
                    Entrar como {r.label}
                  </div>
                  <div style={{ fontSize:'.76rem', color:'var(--muted)', marginTop:1 }}>
                    {USERS[r.key].email}
                  </div>
                </div>
                <span style={{ color: r.color, fontSize:'1.1rem' }}>→</span>
              </button>
            ))}
          </div>

          {/* Separador */}
          <div style={{ display:'flex', alignItems:'center', gap:10,
            fontSize:'.72rem', color:'#bbb', fontWeight:600, marginBottom:22 }}>
            <div style={{ flex:1, height:1, background:'var(--border)' }} />
            o accede con tus credenciales
            <div style={{ flex:1, height:1, background:'var(--border)' }} />
          </div>

          {/* Form manual */}
          <form onSubmit={e => e.preventDefault()} style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Correo electrónico</label>
              <input className="form-input" type="email" placeholder="usuario@ideaeduca.com" />
            </div>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label className="form-label">Contraseña</label>
              <input className="form-input" type="password" placeholder="••••••••" />
            </div>
            <div style={{ textAlign:'right' }}>
              <a href="#" style={{ fontSize:'.78rem', color:'var(--blue)', fontWeight:600 }}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:'13px' }}>
              Iniciar sesión
            </button>
          </form>

          <p style={{ marginTop:22, textAlign:'center', fontSize:'.78rem', color:'var(--muted)' }}>
            ¿Problemas para acceder?{' '}
            <a href="mailto:ideaespacioypsicopedagogia@gmail.com"
              style={{ color:'var(--blue)', fontWeight:600 }}>
              Contacta a IDEA
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
