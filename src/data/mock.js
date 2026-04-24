// src/data/mock.js — datos de prueba para el campus demo

export const USERS = {
  admin: {
    id: 'a1', role: 'admin', name: 'Rocío Martínez', email: 'admin@ideaeduca.com',
    avatar: '👩‍💼', initials: 'RM',
  },
  teacher: {
    id: 't1', role: 'teacher', name: 'Prof. Carlos Méndez', email: 'carlos@ideaeduca.com',
    avatar: '👨‍🏫', initials: 'CM', subject: 'Matemáticas',
  },
  student: {
    id: 's1', role: 'student', name: 'Sebastián López', email: 'sebastian@ideaeduca.com',
    avatar: '🧒', initials: 'SL', grade: '5to Primaria', modalidad: 'Microschool',
  },
  parent: {
    id: 'p1', role: 'parent', name: 'Carlos López', email: 'papa@ideaeduca.com',
    avatar: '👨', initials: 'CL', childName: 'Sebastián López',
  },
}

export const COURSES = [
  { id: 'c1', title: 'Matemáticas Avanzadas', icon: '🔢', color: '#5290DF', teacher: 'Prof. Carlos Méndez', students: 8,  lessons: 12, done: 8,  desc: 'Álgebra, geometría y razonamiento lógico.' },
  { id: 'c2', title: 'Ciencias y Tecnología', icon: '🔬', color: '#63AE4D', teacher: 'Ms. Laura Reyes',     students: 6,  lessons: 10, done: 10, desc: 'Exploración científica y proyectos.' },
  { id: 'c3', title: 'Rise & Lead',           icon: '🚀', color: '#1A2455', teacher: 'Prof. Carlos Méndez', students: 12, lessons: 8,  done: 5,  desc: 'Liderazgo y habilidades socioemocionales.' },
  { id: 'c4', title: 'Música y Arte',          icon: '🎨', color: '#DF6927', teacher: 'Ms. Laura Reyes',     students: 9,  lessons: 9,  done: 6,  desc: 'Expresión artística y creatividad.' },
]

export const TASKS = [
  { id: 'tk1', title: 'Fracciones — ejercicios 1–20', course: 'Matemáticas', due: '2026-05-28', status: 'pending',   score: null },
  { id: 'tk2', title: 'Volcán químico — reporte',     course: 'Ciencias',    due: '2026-05-30', status: 'submitted', score: 95   },
  { id: 'tk3', title: 'Presentación de liderazgo',    course: 'Rise & Lead', due: '2026-06-10', status: 'graded',    score: 88   },
  { id: 'tk4', title: 'Dibujo libre — tema natura',   course: 'Arte',        due: '2026-06-05', status: 'pending',   score: null },
]

export const MESSAGES = [
  { id: 'm1', from: 'Prof. Carlos', role: 'teacher', text: '¡Hola Sebastián! Recuerda completar álgebra esta semana 📚', time: '10:30', mine: false },
  { id: 'm2', from: 'Yo',           role: 'student', text: 'Hola Prof., tengo dudas sobre fracciones.',                 time: '11:15', mine: true  },
  { id: 'm3', from: 'Prof. Carlos', role: 'teacher', text: '¡Claro! Te agendo sesión el jueves a las 3pm 📅',           time: '11:22', mine: false },
]

export const EVENTS = [
  { id: 'e1', title: 'Entrega: Fracciones',     date: '2026-05-28', color: '#DF6927', type: 'deadline'  },
  { id: 'e2', title: 'Reunión de padres',       date: '2026-05-30', color: '#795EFA', type: 'meeting'   },
  { id: 'e3', title: 'Evaluación final',        date: '2026-06-20', color: '#BF1002', type: 'exam'      },
  { id: 'e4', title: 'Taller liderazgo',        date: '2026-06-05', color: '#63AE4D', type: 'activity'  },
  { id: 'e5', title: 'Entrega: Volcán',         date: '2026-05-30', color: '#DF6927', type: 'deadline'  },
]

export const ANNOUNCEMENTS = [
  { id: 'an1', title: 'Inicio Año Escolar 2026–2027', body: '¡Bienvenidos! Nuevas modalidades y herramientas disponibles en el campus.', date: '2026-05-01', author: 'Admin' },
  { id: 'an2', title: '10% Descuento Rise & Lead',    body: 'Inscríbete antes del 31 de mayo y obtén un 10% de descuento en la matrícula.', date: '2026-05-10', author: 'Admin' },
]

export const DOCUMENTS = [
  { id: 'd1', title: 'Contrato de matrícula',          type: 'PDF',  size: '1.2 MB', date: '2026-05-01' },
  { id: 'd2', title: 'Reglamento estudiantil',         type: 'PDF',  size: '856 KB', date: '2026-05-01' },
  { id: 'd3', title: 'Calendario académico 2026–2027', type: 'XLSX', size: '320 KB', date: '2026-05-02' },
  { id: 'd4', title: 'Guía para familias',             type: 'PDF',  size: '2.1 MB', date: '2026-05-05' },
]

export const STUDENTS_LIST = [
  { id: 's1', name: 'Sebastián López',  grade: '5to Primaria', modalidad: 'Microschool',  progress: 72, avg: 91 },
  { id: 's2', name: 'Valentina Cruz',   grade: 'Secundaria',   modalidad: 'Rise & Lead',  progress: 88, avg: 95 },
  { id: 's3', name: 'Mateo Rodríguez',  grade: '3ro Primaria', modalidad: 'Homeschooling', progress: 60, avg: 83 },
  { id: 's4', name: 'Luciana Pérez',    grade: '6to Primaria', modalidad: 'Microschool',  progress: 95, avg: 98 },
  { id: 's5', name: 'Rafael Sánchez',   grade: 'Secundaria',   modalidad: 'Rise & Lead',  progress: 45, avg: 77 },
]

export const ROLE_COLOR = { admin: '#BF1002', teacher: '#5290DF', student: '#63AE4D', parent: '#795EFA' }
export const ROLE_LABEL = { admin: 'Admin', teacher: 'Maestro', student: 'Alumno', parent: 'Familia' }

export const pct = (d, t) => t ? Math.round(d / t * 100) : 0
