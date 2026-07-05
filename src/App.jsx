import { useEffect, useRef, useMemo, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import pythonLogo from './assets/python.png'
import javaLogo from './assets/java.png'
import physicsLogo from './assets/physics.png'
import databaseLogo from './assets/database.png'
import dockerLogo from './assets/docker.png'
import gitLogo from './assets/git.png'
import nodejsLogo from './assets/node js.png'
import postgresLogo from './assets/postgres.png'
import mugshotImg from './assets/mugshot.png'
import './App.css'

gsap.registerPlugin(Draggable)

const NAV_ITEMS = [
  { id: 'hero', icon: '🏠', label: 'Home' },
  { id: 'about', icon: '👤', label: 'About' },
  { id: 'skills', icon: '⚡', label: 'Skills' },
  { id: 'experience', icon: '🏢', label: 'Experience' },
  { id: 'projects', icon: '🚀', label: 'Projects' },
  { id: 'contact', icon: '✉️', label: 'Contact' },
  { id: 'resume', icon: '📄', label: 'Resume' },
]

const BUBBLE_POSITIONS = [
  { vx: 15, vy: 15, li: 0 }, { vx: 35, vy: 10, li: 1 },
  { vx: 70, vy: 12, li: 2 }, { vx: 85, vy: 25, li: 3 },
  { vx: 10, vy: 45, li: 4 }, { vx: 90, vy: 50, li: 5 },
  { vx: 20, vy: 80, li: 6 }, { vx: 45, vy: 85, li: 7 },
  { vx: 75, vy: 80, li: 0 }, { vx: 92, vy: 75, li: 2 },
  { vx: 80, vy: 40, li: 1 }, { vx: 25, vy: 60, li: 3 },
  { vx: 60, vy: 65, li: 4 }, { vx: 45, vy: 30, li: 5 },
  { vx: 60, vy: 25, li: 6 }, { vx: 95, vy: 15, li: 7 },
]

// ── Correct skills from resume ──
const SKILLS_DATA = [
  {
    category: 'Languages', icon: '💻', color: '#3773a3',
    skills: [
      { name: 'JavaScript', level: 90, icon: '⚡' },
      { name: 'TypeScript', level: 82, icon: '🔷' },
      { name: 'Go', level: 72, icon: '🐹' },
      { name: 'Python', level: 80, icon: '🐍' },
      { name: 'Java', level: 75, icon: '☕' },
    ]
  },
  {
    category: 'Frontend & Frameworks', icon: '🎨', color: '#e879f9',
    skills: [
      { name: 'React.js', level: 88, icon: '⚛️' },
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Express.js', level: 84, icon: '🚂' },
      { name: 'FastAPI', level: 70, icon: '🔌' },
    ]
  },
  {
    category: 'Databases', icon: '🗄️', color: '#336791',
    skills: [
      { name: 'PostgreSQL', level: 82, icon: '🐘' },
      { name: 'MongoDB', level: 80, icon: '🍃' },
      { name: 'Redis', level: 75, icon: '🔴' },
      { name: 'ClickHouse', level: 68, icon: '🏠' },
    ]
  },
  {
    category: 'Tools & Platforms', icon: '🛠️', color: '#68a063',
    skills: [
      { name: 'Docker', level: 78, icon: '🐳' },
      { name: 'Git', level: 90, icon: '🌿' },
      { name: 'Linux', level: 75, icon: '🐧' },
      { name: 'Prisma', level: 72, icon: '🔺' },
    ]
  },
]

// ── Correct experience from resume ──
const EXPERIENCE_DATA = [
  {
    type: 'work',
    title: 'Software Engineer',
    org: 'Namlabs',
    period: 'Jul 2025 – May 2026',
    location: 'Chennai, Tamil Nadu',
    desc: 'Contributed to the development of scalable SaaS products, including observability and GRC platforms. Built and maintained backend services and APIs using Node.js and Go. Worked with PostgreSQL, MongoDB, Redis, and ClickHouse to manage large-scale data. Collaborated with cross-functional teams to design features that improved system monitoring and user experience.',
    color: '#9b59b6', icon: '🚀',
    tech: ['Node.js', 'Go', 'PostgreSQL', 'MongoDB', 'Redis', 'ClickHouse'],
  },
  {
    type: 'work',
    title: 'Software Engineer',
    org: 'Namlabs',
    period: 'May 2024 – Oct 2024',
    location: 'Chennai, Tamil Nadu',
    desc: 'Contributed to backend development and enhancement of an existing SaaS observability platform. Implemented observability features including alerting, forecasting, and anomaly detection. Integrated Azure and AWS Marketplace workflows. Improved authentication mechanisms and implemented Microsoft Teams integrations.',
    color: '#3773a3', icon: '⚙️',
    tech: ['Node.js', 'Redis', 'MongoDB', 'ClickHouse', 'Azure', 'AWS'],
  },
  {
    type: 'intern',
    title: 'Frontend Developer Intern',
    org: 'Senchola University',
    period: 'Oct 2023 – Jan 2024',
    location: 'Chennai, Tamil Nadu',
    desc: 'Developed responsive user interfaces using React.js. Translated UI/UX designs into interactive web applications. Collaborated with design and development teams to enhance user experience.',
    color: '#f89820', icon: '🎨',
    tech: ['React.js', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    type: 'education',
    title: 'B.E. Computer Science Engineering',
    org: 'Thirumalai Engineering College, Anna University',
    period: 'Graduated June 2023',
    location: 'Kanchipuram, Tamil Nadu',
    desc: 'Graduated with 8.19 CGPA. Strong foundation in algorithms, data structures, and software engineering principles. Certified in Full Stack Development (Novitech) and Python Programming (Eduprep).',
    color: '#00a8cc', icon: '🎓',
    tech: ['8.19 CGPA', 'Anna University'],
  },
]

// ── Correct projects from resume ──
const PROJECTS_DATA = [
  {
    id: 'landing-page', title: 'Company Landing page',
    desc: 'A modern, responsive company landing page built with modern web technologies. Focuses on performance, accessibility, and high conversion rate.',
    tech: ['React', 'TailwindCSS', 'Vite'],
    color: '#00a8cc', icon: '🌐',
    github: 'https://github.com/vignesh-s-001/Landing-Page', category: 'Frontend',
    live: 'https://technovasolutions-sigma.vercel.app/',
  },
  {
    id: 'employee-dash', title: 'Employee Management Dashboard',
    desc: 'A comprehensive dashboard for managing employee records, tracking performance, and streamlining HR operations.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    color: '#2496ed', icon: '📊',
    github: 'https://github.com/vignesh-s-001/Employee-Management-Dashboard', category: 'Full Stack',
    live: 'https://employee-management-dashboard-phi.vercel.app/',
  },
  {
    id: 'chat-app', title: 'Real-Time Chat Application',
    desc: 'Built a real-time chat application using the MERN stack with WebSocket-based communication. Implemented real-time messaging using WebSockets for instant message delivery.',
    tech: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Express'],
    color: '#3773a3', icon: '💬',
    github: 'https://github.com/LORDLONELYDEVIL/mern-app', category: 'Full Stack',
  },
  {
    id: 'gmart', title: 'GMart E-Commerce Platform',
    desc: 'Frontend development for an e-commerce platform as part of a team project using React. Built responsive UI components for product listing, cart, and checkout. Integrated frontend components with backend APIs.',
    tech: ['React', 'HTML', 'CSS', 'REST API'],
    color: '#41b883', icon: '🛒',
    github: 'https://github.com/LORDLONELYDEVIL/Gmart-Team-Project', category: 'Frontend',
  },
  {
    id: 'art-site', title: 'Art Gallery Website',
    desc: 'A visually stunning creative art portfolio/gallery website. Showcases digital art with immersive browsing, smooth transitions, and a carefully curated aesthetic.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Animations'],
    color: '#e879f9', icon: '🎨',
    github: 'https://github.com/LORDLONELYDEVIL/Art-site', category: 'Frontend',
  },
  {
    id: 'socket-chat', title: 'Socket Chat App',
    desc: 'A lightweight real-time chat application using Socket.io. Demonstrates low-latency bi-directional event communication with multiple room support.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Socket.io', 'Node.js'],
    color: '#f05032', icon: '🔌',
    github: 'https://github.com/LORDLONELYDEVIL/socket', category: 'Backend',
  },
  {
    id: 'insta-clone', title: 'Instagram UI Clone',
    desc: 'A pixel-perfect recreation of the Instagram UI built with vanilla JavaScript. Strong frontend skills demonstrated — component layout, responsive design, and interactive elements.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
    color: '#f89820', icon: '📸',
    github: 'https://github.com/LORDLONELYDEVIL/Insta-UI-clone', category: 'Frontend',
  },
  {
    id: 'book-store', title: 'Book Store Backend',
    desc: 'Backend service for a Book Store application. Implements robust RESTful APIs, user authentication, and data management.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    color: '#336791', icon: '📚',
    github: 'https://github.com/LORDLONELYDEVIL/bm-backend', category: 'Backend',
  },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const canvasRef = useRef(null)
  const avatarRef = useRef(null)
  const containerRef = useRef(null)
  const bubbleRefs = useRef({})
  const innerRefs = useRef({})
  const activeBolts = useRef([])

  const [activeNav, setActiveNav] = useState('hero')
  const [projectFilter, setProjectFilter] = useState('All')
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formSent, setFormSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContactSubmit = (e) => {
    // FormSubmit native action will handle redirection.
    // We don't prevent default here.
  };

  const logoTypes = useMemo(() => [
    { name: 'python', img: pythonLogo, color: '#3773a3' },
    { name: 'java', img: javaLogo, color: '#f89820' },
    { name: 'physics', img: physicsLogo, color: '#00a8cc' },
    { name: 'database', img: databaseLogo, color: '#41b883' },
    { name: 'docker', img: dockerLogo, color: '#2496ed' },
    { name: 'git', img: gitLogo, color: '#f05032' },
    { name: 'nodejs', img: nodejsLogo, color: '#68a063' },
    { name: 'postgres', img: postgresLogo, color: '#336791' },
  ], [])

  const bubblesList = useMemo(() =>
    BUBBLE_POSITIONS.map((pos, i) => ({
      ...logoTypes[pos.li],
      id: `bubble-${i}`,
      vx: pos.vx, vy: pos.vy,
    }))
    , [logoTypes])

  // ── Track active nav section ──
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map(n => n.id)
    const observers = []
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveNav(id) },
        { rootMargin: '-30% 0px -50% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  // ── Lightning ──
  const getLightningPoints = (sx, sy, ex, ey) => {
    const pts = []; const segs = 14
    const dx = ex - sx; const dy = ey - sy
    const dist = Math.sqrt(dx * dx + dy * dy)
    pts.push({ x: sx, y: sy })
    for (let i = 1; i < segs; i++) {
      const t = i / segs
      const px = sx + dx * t; const py = sy + dy * t
      const nx = -dy / dist; const ny = dx / dist
      const jitter = Math.sin(t * Math.PI) * 32
      const off = (Math.random() - 0.5) * 2 * jitter
      pts.push({ x: px + nx * off, y: py + ny * off })
    }
    pts.push({ x: ex, y: ey })
    return pts
  }

  // ── Canvas render ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const bolts = activeBolts.current
      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i]
        if (bolt.opacity <= 0) { bolts.splice(i, 1); continue }
        const pts = getLightningPoints(bolt.startX, bolt.startY, bolt.endX, bolt.endY)
        ctx.save()
        ctx.globalAlpha = bolt.opacity
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
        pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
        ctx.strokeStyle = bolt.color; ctx.lineWidth = 8
        ctx.shadowColor = bolt.color; ctx.shadowBlur = 32; ctx.stroke()
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
        pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.shadowBlur = 5; ctx.stroke()
        ctx.restore()
        bolt.opacity -= 0.09
      }
      animId = requestAnimationFrame(render)
    }
    render()
    return () => cancelAnimationFrame(animId)
  }, [])

  const handleAvatarClick = () => {
    const el = avatarRef.current
    if (!el || el._isSquishing) return
    el._isSquishing = true
    gsap.timeline({ onComplete: () => { el._isSquishing = false; gsap.set(el, { clearProps: 'scale' }) } })
      .to(el, { scale: 0.85, duration: 0.15, ease: 'power2.out' })
      .to(el, { scale: 1.15, duration: 0.35, ease: 'elastic.out(1.5, 0.4)' })
      .to(el, { scale: 1.0, duration: 0.15 })
  }

  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    window.addEventListener('resize', resize); resize()
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ── Draggable ──
  const setupDraggable = (el, orbitTweens) => {
    Draggable.create(el, {
      type: 'x,y',
      onDragStart() {
        el._isDragging = true
        orbitTweens.forEach(t => t.pause())
        gsap.to(el, { scale: 1.4, zIndex: 50, boxShadow: '0 0 45px rgba(255,255,255,0.5)', duration: 0.18 })
      },
      onDragEnd() {
        const currentX = gsap.getProperty(el, "x");
        const currentY = gsap.getProperty(el, "y");
        const currentLeft = parseFloat(el.style.left || 0);
        const currentTop = parseFloat(el.style.top || 0);

        gsap.set(el, {
          left: currentLeft + currentX,
          top: currentTop + currentY,
          x: 0,
          y: 0
        });

        gsap.to(el, {
          scale: 1.0, zIndex: 10,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          duration: 0.4, ease: 'power2.out',
          onComplete: () => {
            el._isDragging = false
            if (!el.matches(':hover')) orbitTweens.forEach(t => t.play())
          }
        })
      }
    })
  }

  // ── GSAP bubbles ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(avatarRef.current, { y: -18, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      bubblesList.forEach((bubble) => {
        const el = bubbleRefs.current[bubble.id]
        const innerEl = innerRefs.current[bubble.id]
        if (!el) return
        const w = window.innerWidth; const h = window.innerHeight
        const bW = el.offsetWidth || 72; const bH = el.offsetHeight || 72
        const baseLeft = (bubble.vx / 100) * w - bW / 2
        const baseTop = (bubble.vy / 100) * h - bH / 2
        gsap.set(el, { left: baseLeft, top: baseTop, x: 0, y: 0, position: 'absolute' })
        const floatRX = 10 + Math.random() * 14; const floatRY = 10 + Math.random() * 14
        const durX = 3.5 + Math.random() * 2.5; const durY = 3.5 + Math.random() * 2.5
        const floatX = gsap.to(el, { x: floatRX, duration: durX, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        const floatY = gsap.to(el, { y: floatRY, duration: durY, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        floatY.seek(Math.random() * durY)
        gsap.to(innerEl, {
          rotation: (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 8),
          duration: 2.8 + Math.random() * 2,
          repeat: -1, yoyo: true, ease: 'sine.inOut'
        })
        el._orbitTweens = [floatX, floatY]
        setupDraggable(el, [floatX, floatY])
      })
    }, containerRef)
    return () => ctx.revert()
  }, [bubblesList])

  const handleMouseEnter = (id) => {
    const el = bubbleRefs.current[id]
    if (!el || !el._orbitTweens || el._isDragging) return
    el._orbitTweens.forEach(t => t.pause())
    gsap.to(el, { scale: 1.3, zIndex: 25, duration: 0.35, ease: 'power2.out' })
    const inner = innerRefs.current[id]
    if (inner) gsap.to(inner, { rotation: 0, y: 0, duration: 0.35, ease: 'power2.out' })
  }

  const handleMouseLeave = (id) => {
    const el = bubbleRefs.current[id]
    if (!el || !el._orbitTweens || el._isDragging) return
    el._orbitTweens.forEach(t => t.play())
    gsap.to(el, { scale: 1.0, zIndex: 10, duration: 0.35, ease: 'power2.out' })
  }

  const handleLogoClick = (bubble) => {
    const innerEl = innerRefs.current[bubble.id]
    const el = bubbleRefs.current[bubble.id]
    const canvas = canvasRef.current
    if (!innerEl || !el || !canvas || !avatarRef.current) return
    gsap.timeline()
      .to(el, { scaleY: 1.5, scaleX: 0.72, duration: 0.10, ease: 'power2.out' })
      .to(el, { scaleY: 0.72, scaleX: 1.45, duration: 0.10, ease: 'power1.inOut' })
      .to(el, { scaleY: 1.2, scaleX: 0.88, duration: 0.09, ease: 'power1.out' })
      .to(el, { scaleY: 1.0, scaleX: 1.0, duration: 0.22, ease: 'elastic.out(1.2, 0.4)' })
    gsap.timeline()
      .to(innerEl, { scaleY: 0.78, scaleX: 1.15, duration: 0.10, ease: 'power2.out' })
      .to(innerEl, { scaleY: 1.15, scaleX: 0.88, duration: 0.10, ease: 'power1.out' })
      .to(innerEl, { scaleY: 1.0, scaleX: 1.0, duration: 0.20, ease: 'back.out(2)' })
    const logoRect = el.getBoundingClientRect()
    const avatarRect = avatarRef.current.getBoundingClientRect()
    const sx = logoRect.left + logoRect.width / 2
    const sy = logoRect.top + logoRect.height / 2
    const ex = avatarRect.left + avatarRect.width / 2
    const ey = avatarRect.top + avatarRect.height / 2
    for (let k = 0; k < 3; k++) {
      setTimeout(() => {
        activeBolts.current.push({ startX: sx, startY: sy, endX: ex, endY: ey, color: bubble.color, opacity: 1.0 })
      }, k * 65)
    }
    gsap.timeline()
      .to(avatarRef.current, { scale: 1.07, filter: `drop-shadow(0 0 45px ${bubble.color})`, duration: 0.08 })
      .to(avatarRef.current, { scale: 1.00, filter: 'drop-shadow(0 0 15px rgba(170,59,255,0.6))', duration: 0.22, ease: 'power2.out' })
  }

  const filteredProjects = projectFilter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === projectFilter)

  return (
    <div ref={containerRef} className="site-root">

      {/* ── Fixed Dot Nav ── */}
      <nav className="side-nav" aria-label="Page navigation">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className={`side-nav__item${activeNav === item.id ? ' side-nav__item--active' : ''}`}
            onClick={() => scrollToSection(item.id)}
            title={item.label}
          >
            <span className="side-nav__dot" />
            <span className="side-nav__label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* ══════════════ PAGE CONTENT ══════════════ */}
      <main className="page-main">

        {/* ── HERO ── */}
        <section id="hero" className="section section--hero" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* ── Canvas ── */}
          <canvas
            ref={canvasRef}
            className="lightning-canvas"
          />

          {/* ── Floating Bubbles ── */}
          <div className="bubbles-layer" style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 8 }}>
            {bubblesList.map((bubble) => (
              <div
                key={bubble.id}
                ref={el => (bubbleRefs.current[bubble.id] = el)}
                className={`floating-logo logo-${bubble.name}`}
                onMouseEnter={() => handleMouseEnter(bubble.id)}
                onMouseLeave={() => handleMouseLeave(bubble.id)}
                onPointerDown={() => handleLogoClick(bubble)}
                style={{ position: 'absolute', zIndex: 10, pointerEvents: 'auto' }}
              >
                <div ref={el => (innerRefs.current[bubble.id] = el)} style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                  <img src={bubble.img} alt={`${bubble.name} logo`} />
                </div>
              </div>
            ))}
          </div>

          <div className="hero-inner">
            <div ref={avatarRef} className="avatar-wrapper" onClick={handleAvatarClick}>
              <div className="avatar-ring" />
              <div className="avatar-glow" />
              <div className="avatar-img-container">
                <img src={mugshotImg} alt="Vignesh Sankar" className="avatar-img" />
              </div>
            </div>
            <div className="hero-text">
              <p className="hero-greeting">Hey there, I'm</p>
              <h1 className="hero-name glow-text">VIGNESH SANKAR</h1>
              <p className="hero-role">Software Engineer</p>
              <div className="hero-tags">
                <span>⚛️ React</span>
                <span>🟢 Node.js</span>
                <span>🐹 Go</span>
                <span>🐘 PostgreSQL</span>
                <span>🔴 Redis</span>
              </div>
              <div className="hero-cta">
                <button className="btn-primary" onClick={() => scrollToSection('projects')}>View Projects 🚀</button>
                <button className="btn-ghost" onClick={() => scrollToSection('contact')}>Get In Touch ✉️</button>
              </div>
            </div>
          </div>
          <div className="scroll-hint">
            <div className="scroll-hint__wheel" />
            <span>Scroll to explore</span>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="section section--about">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-eyebrow">01 / About</span>
              <h2 className="section-title">Who I Am</h2>
            </div>
            <div className="about-grid">
              <div className="about-photo-col">
                <div className="about-photo-frame">
                  <img src={mugshotImg} alt="Vignesh Sankar" />
                  <div className="about-photo-glow" />
                </div>
                <div className="about-badges">
                  <span className="badge">🇮🇳 Chennai, Tamil Nadu</span>
                  <span className="badge">🎓 B.E. Computer Science · 8.19 CGPA</span>
                  <span className="badge">💼 Software Engineer (Available for opportunities)</span>
                  <span className="badge">🚀 2023 Graduate</span>
                </div>
              </div>
              <div className="about-text-col">
                <h3 className="about-sub">Building products that scale. Solving problems that matter.</h3>
                <p>
                  I'm a Software Engineer with 1+ year of professional experience. Most recently at <em>Namlabs</em>, I built and maintained scalable SaaS products including an <em>Observability Platform</em> and a <em>GRC (Governance, Risk & Compliance)</em> platform. I've worked across backend services (Node.js, Go), real-time data pipelines (ClickHouse, Redis), and cloud integrations (AWS & Azure).
                </p>
                <p className="about-desc">
                  I've also contributed to multiple key products at Namlabs: <em>AtaUs</em>, <em>Klogic</em>, <em>Lowerplane</em>, and <em>MagicDemo</em> — spanning domains from infrastructure observability to business logic automation. I thrive in fast-moving product teams where backend reliability and user-facing quality both matter.
                </p>
                <p>
                  I'm a 2023 CS graduate from Anna University (8.19 CGPA). Outside of work, I build personal projects — real-time chat apps, e-commerce platforms, art galleries, UI clones — always learning, always shipping.
                </p>

                <div className="worked-on">
                  <p className="worked-on-label">Products I've worked on</p>
                  <div className="worked-on-chips">
                    <span className="worked-chip">🔭 Observability</span>
                    <span className="worked-chip">🛡️ GRC</span>
                    <span className="worked-chip">✈️ Lowerplane</span>
                    <span className="worked-chip">📡 Klogic</span>
                    <span className="worked-chip">✨ MagicDemo</span>
                  </div>
                </div>

                <div className="about-stats">
                  <div className="stat-card">
                    <span className="stat-num">1+</span>
                    <span className="stat-label">Yrs. Experience</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num">5+</span>
                    <span className="stat-label">Products Worked</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num">10+</span>
                    <span className="stat-label">Personal Projects</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num">8.19</span>
                    <span className="stat-label">CGPA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="section section--skills">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-eyebrow">02 / Skills</span>
              <h2 className="section-title">Technical Skills</h2>
              <p className="section-sub">Technologies I build with every day</p>
            </div>
            <div className="skills-grid">
              {SKILLS_DATA.map(group => (
                <div key={group.category} className="skill-group">
                  <h3 className="skill-group-title"><span>{group.icon}</span> {group.category}</h3>
                  <div className="skill-items">
                    {group.skills.map(skill => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-header">
                          <span className="skill-name">{skill.icon} {skill.name}</span>
                          <span className="skill-pct">{skill.level}%</span>
                        </div>
                        <div className="skill-bar-track">
                          <div className="skill-bar-fill" style={{ '--fill-width': `${skill.level}%`, '--bar-color': group.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="tools-section">
              <p className="tools-label">Libraries & more:</p>
              <div className="tools-chips">
                {['TypeScript', 'Prisma', 'NumPy', 'Pandas', 'Matplotlib', 'MySQL', 'GitHub', 'FastAPI', 'WebSockets', 'AWS', 'Azure'].map(t => (
                  <span key={t} className="tool-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="section section--experience">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-eyebrow">03 / Experience</span>
              <h2 className="section-title">My Journey</h2>
              <p className="section-sub">Work experience &amp; education</p>
            </div>
            <div className="timeline">
              {EXPERIENCE_DATA.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-left">
                    <div className="timeline-dot" style={{ background: item.color, boxShadow: `0 0 16px ${item.color}` }}>
                      <span>{item.icon}</span>
                    </div>
                    {i < EXPERIENCE_DATA.length - 1 && <div className="timeline-line" />}
                  </div>
                  <div className="timeline-card" style={{ '--card-accent': item.color }}>
                    <div className="timeline-card-top">
                      <div>
                        <h3 className="timeline-title">{item.title}</h3>
                        <p className="timeline-org">{item.org}</p>
                      </div>
                      <div className="timeline-meta">
                        <span className="timeline-period">{item.period}</span>
                        <span className="timeline-location">📍 {item.location}</span>
                      </div>
                    </div>
                    <p className="timeline-desc">{item.desc}</p>
                    <div className="timeline-tech">
                      {item.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                    </div>
                    <span className="timeline-badge" style={{ background: `${item.color}22`, color: item.color, border: `1px solid ${item.color}44` }}>
                      {item.type === 'education' ? '🎓 Education' : item.type === 'work' ? '💼 Full-Time' : '🧑‍💻 Internship'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="section section--projects">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-eyebrow">04 / Projects</span>
              <h2 className="section-title">What I've Built</h2>
              <p className="section-sub">
                Personal projects &amp; side work —{' '}
                <a href="https://github.com/LORDLONELYDEVIL" target="_blank" rel="noreferrer" className="gh-link">
                  View all on GitHub ↗
                </a>
              </p>
            </div>
            <div className="project-filters">
              {['All', 'Full Stack', 'Frontend', 'Backend'].map(cat => (
                <button
                  key={cat}
                  className={`filter-btn${projectFilter === cat ? ' filter-btn--active' : ''}`}
                  onClick={() => setProjectFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <div key={project.id} className="project-card" style={{ '--card-color': project.color }}>
                  <div className="project-card-header">
                    <span className="project-icon">{project.icon}</span>
                    <span className="project-category">{project.category}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="project-link project-link--github">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="project-link project-link--live">↗ Live</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section section--contact">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-eyebrow">05 / Contact</span>
              <h2 className="section-title">Let's Connect</h2>
              <p className="section-sub">Open to opportunities, collaborations, and conversations</p>
            </div>
            <div className="contact-layout">
              <div className="contact-info">
                <p className="contact-blurb">
                  Whether you have a role in mind, a project idea, or just want to say hi — my inbox is always open!
                </p>
                <div className="contact-links">
                  <a href="tel:6369307326" className="contact-link" id="contact-phone">
                    <div className="contact-link-icon" style={{ background: '#41b88322', color: '#41b883' }}>📞</div>
                    <div>
                      <p className="contact-link-label">Phone</p>
                      <p className="contact-link-value">+91 6369307326</p>
                    </div>
                  </a>
                  <a href="mailto:vigneshsankar532@gmail.com" className="contact-link" id="contact-email">
                    <div className="contact-link-icon" style={{ background: '#9b59b622', color: '#9b59b6' }}>✉️</div>
                    <div>
                      <p className="contact-link-label">Email</p>
                      <p className="contact-link-value">vigneshsankar532@gmail.com</p>
                    </div>
                  </a>
                  <a href="https://linkedin.com/in/vignesh-s001" target="_blank" rel="noreferrer" className="contact-link" id="contact-linkedin">
                    <div className="contact-link-icon" style={{ background: '#0a66c222', color: '#0a66c2' }}>in</div>
                    <div>
                      <p className="contact-link-label">LinkedIn</p>
                      <p className="contact-link-value">linkedin.com/in/vignesh-s001</p>
                    </div>
                  </a>
                  <a href="https://github.com/vignesh-s-001" target="_blank" rel="noreferrer" className="contact-link" id="contact-github">
                    <div className="contact-link-icon" style={{ background: '#ffffff11', color: '#fff' }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
                    </div>
                    <div>
                      <p className="contact-link-label">GitHub</p>
                      <p className="contact-link-value">github.com/vignesh-s-001</p>
                    </div>
                  </a>
                  <a href="https://www.instagram.com/vignesh_____sankar?igsh=MTk5YnM1bHJuNjkydg%3D%3D" target="_blank" rel="noreferrer" className="contact-link" id="contact-instagram">
                    <div className="contact-link-icon" style={{ background: '#e1306c22', color: '#e1306c' }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </div>
                    <div>
                      <p className="contact-link-label">Instagram</p>
                      <p className="contact-link-value">instagram.com/vignesh_____sankar</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="contact-form-wrap">
                {formSent ? (
                  <div className="contact-success">
                    <span>🎉</span>
                    <h3>Message Sent!</h3>
                    <p>Thanks for reaching out! I'll reply soon.</p>
                    <button className="btn-primary" onClick={() => setFormSent(false)}>Send Another</button>
                  </div>
                ) : (
                  <form className="contact-form" action="https://formsubmit.co/vigneshsankar532@gmail.com" method="POST">
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_next" value="https://technovasolutions-sigma.vercel.app/" />
                    <div className="form-group">
                      <label htmlFor="cf-name">Your Name</label>
                      <input id="cf-name" type="text" name="name" placeholder="Monkey D Luffy" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cf-email">Email Address</label>
                      <input id="cf-email" type="email" name="email" placeholder="Hikkigaya@gmail.com" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cf-message">Message</label>
                      <textarea id="cf-message" name="message" placeholder="Tell me about your project or opportunity..." rows={5} required />
                    </div>
                    <button type="submit" className="btn-primary" id="contact-submit">
                      Send Message ✈️
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── RESUME ── */}
        <section id="resume" className="section section--resume">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-eyebrow">06 / Resume</span>
              <h2 className="section-title">My Resume</h2>
              <p className="section-sub">Vignesh Sankar — Software Engineer</p>
            </div>

            <div className="resume-download-bar">
              <div className="resume-file-info">
                <span className="resume-file-icon">📄</span>
                <div>
                  <p className="resume-file-name">Vignesh_Sankar_Resume.pdf</p>
                  <p className="resume-file-meta">Software Engineer · 2024</p>
                </div>
              </div>
              <a href="/resume.pdf" download="Vignesh_Sankar_Resume.pdf" className="btn-download" id="resume-download-btn">⬇️ Download PDF</a>
            </div>

            <div className="resume-body">
              <div className="resume-col">
                <div className="resume-section">
                  <h3 className="rs-title">🎯 Summary</h3>
                  <p>Software Engineer with 1+ year of experience building scalable SaaS products. Skilled in full-stack development using MERN, Go, Python, and Java, with a strong focus on backend systems, APIs, and modern web applications. 2023 Computer Science graduate passionate about designing reliable software and solving complex engineering problems.</p>
                </div>

                <div className="resume-section">
                  <h3 className="rs-title">🎓 Education</h3>
                  <div className="resume-edu">
                    <div className="resume-edu-row">
                      <strong>B.E. Computer Science Engineering</strong><span>Jun 2023</span>
                    </div>
                    <p>Anna University · Thirumalai Engineering College, Kanchipuram</p>
                    <p style={{ color: 'hsla(185,90%,55%,0.9)', fontWeight: 600, marginTop: 6 }}>CGPA: 8.19</p>
                  </div>
                </div>

                <div className="resume-section">
                  <h3 className="rs-title">📜 Certifications</h3>
                  <ul className="resume-list">
                    <li>Full Stack Development — <strong>Novitech</strong></li>
                    <li>Python Programming — <strong>Eduprep</strong></li>
                  </ul>
                </div>

                <div className="resume-section">
                  <h3 className="rs-title">🚀 Projects</h3>
                  <ul className="resume-list">
                    <li><strong>GMart E-Commerce</strong> — React frontend with product listing, cart &amp; checkout, backend API integration</li>
                    <li><strong>Real-Time Chat App</strong> — MERN stack + WebSockets for instant messaging</li>
                    <li><strong>Art Gallery Site</strong> — Immersive creative showcase with animations</li>
                    <li><strong>Instagram UI Clone</strong> — Pixel-perfect frontend recreation</li>
                  </ul>
                </div>
              </div>

              <div className="resume-col">
                <div className="resume-section">
                  <h3 className="rs-title">💼 Experience</h3>
                  <div className="resume-exp-list">
                    <div className="resume-exp-item" style={{ '--exp-color': '#9b59b6' }}>
                      <div className="resume-exp-header">
                        <strong>Software Engineer</strong><span>Jul 2025 – May 2026</span>
                      </div>
                      <p className="resume-exp-org">Namlabs, Chennai</p>
                      <ul className="resume-exp-bullets">
                        <li>Scalable SaaS observability &amp; GRC platform development</li>
                        <li>Backend APIs in Node.js and Go</li>
                        <li>PostgreSQL, MongoDB, Redis, ClickHouse at scale</li>
                      </ul>
                    </div>
                    <div className="resume-exp-item" style={{ '--exp-color': '#3773a3' }}>
                      <div className="resume-exp-header">
                        <strong>Software Engineer</strong><span>May 2024 – Oct 2024</span>
                      </div>
                      <p className="resume-exp-org">Namlabs, Chennai</p>
                      <ul className="resume-exp-bullets">
                        <li>Alerting, forecasting &amp; anomaly detection features</li>
                        <li>Azure &amp; AWS Marketplace integrations</li>
                        <li>Microsoft Teams notification integrations</li>
                      </ul>
                    </div>
                    <div className="resume-exp-item" style={{ '--exp-color': '#f89820' }}>
                      <div className="resume-exp-header">
                        <strong>Frontend Developer Intern</strong><span>Oct 2023 – Jan 2024</span>
                      </div>
                      <p className="resume-exp-org">Senchola University, Chennai</p>
                      <ul className="resume-exp-bullets">
                        <li>Responsive UIs with React.js</li>
                        <li>UI/UX design to interactive web app translation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="resume-section">
                  <h3 className="rs-title">🛠️ Skills</h3>
                  <div className="resume-skills-grid">
                    {[
                      { label: 'Languages', tags: ['JavaScript', 'TypeScript', 'Go', 'Python', 'Java', 'C'] },
                      { label: 'Frameworks', tags: ['React.js', 'Node.js', 'Express.js', 'FastAPI'] },
                      { label: 'Databases', tags: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'ClickHouse'] },
                      { label: 'Tools', tags: ['Docker', 'Git', 'Linux', 'Prisma'] },
                    ].map(g => (
                      <div key={g.label} className="rsg">
                        <span className="rsg-label">{g.label}</span>
                        <div className="rsg-tags">
                          {g.tags.map(t => <span key={t} className="rsg-tag">{t}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="site-footer">
          <p>Designed &amp; Built by <strong>Vignesh Sankar</strong></p>
          <p className="footer-sub">
            <a href="https://github.com/vignesh-s-001" target="_blank" rel="noreferrer">GitHub</a>
            &nbsp;·&nbsp;
            <a href="https://linkedin.com/in/vignesh-s001" target="_blank" rel="noreferrer">LinkedIn</a>
            &nbsp;·&nbsp;
            <a href="/resume.pdf" download>Resume</a>
          </p>
        </footer>

      </main>
    </div>
  )
}

export default App
