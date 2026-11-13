import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowDown, ArrowDownLeft, ArrowRight, ArrowUpRight, Braces,
  Check, Code2, ExternalLink, Github, Globe2, Layers3, Linkedin, Mail,
  MapPin, Menu, MessageCircle, ShieldCheck, Sparkles, Terminal, X,
} from 'lucide-react'
import { projectCategories, projects, services, skillCategories, skillGroups } from './data/portfolioData.js'
import './portfolio.css'

const serviceIcons = { code: Code2, layers: Layers3, shield: ShieldCheck, sparkles: Sparkles }
const projectIcons = { terminal: Terminal, shield: ShieldCheck }
const skillIcons = { code: Code2, layers: Layers3, terminal: Terminal, shield: ShieldCheck, tools: Braces }

const copy = {
  en: {
    pageTitle: 'Belal Wahid Mohamed — Engineer & Cybersecurity Specialist',
    pageDescription: 'Belal Wahid Mohamed — Frontend Engineer, Full-Stack Developer, and Cybersecurity Specialist. Founder of DevSecure.',
    nav: [
      ['about', 'About'],
      ['services', 'Services'],
      ['projects', 'Projects'],
      ['skills', 'Skills'],
      ['devsecure', 'DevSecure'],
      ['contact', 'Contact'],
    ],
    hire: 'Hire me',
    available: 'Available for freelance',
    eyebrow: 'FRONTEND ENGINEER · FULL-STACK · CYBERSECURITY',
    heroTitle: <>Building high-performance<br />web systems <span>&</span><br />securing digital assets.</>,
    heroText: 'I’m a Computer Science student, frontend engineer, and full-stack developer. As the founder of DevSecure, I bring thoughtful engineering and a security-first mindset to every idea.',
    explore: 'Explore my work',
    chat: 'Let’s talk',
    scroll: 'SCROLL TO EXPLORE',
    aboutLabel: 'A little about me',
    aboutTitle: <>Engineering ideas<br />into <span>real-world impact.</span></>,
    aboutText: 'I’m Belal, a frontend engineer and full-stack developer with a passion for cybersecurity. I care about building products that feel effortless to use and are made to last.',
    aboutText2: 'As the founder of DevSecure, I bring software development and a security-first mindset together—helping turn ambitious ideas into polished, dependable digital products.',
    education: 'Computer Science & Information Technology student',
    university: 'Nahda University (NUB) · Beni Suef, Egypt',
    location: 'Beni Suef, Egypt',
    servicesLabel: 'What I can do for you',
    servicesTitle: <>One partner. From <span>first line</span><br />of code to final launch.</>,
    servicesIntro: 'Thoughtful engineering for ambitious people and growing teams.',
    projectsLabel: 'Selected work',
    projectsTitle: <>A closer look at <span>what I build.</span></>,
    projectsIntro: 'A few areas where design, engineering, and security come together.',
    projectsNote: 'These are clearly labeled demonstration concepts. Add your project URLs and screenshots in the portfolio data file.',
    projectDetails: 'Project details',
    github: 'GitHub',
    liveDemo: 'Live demo',
    comingSoon: 'Coming soon',
    closeDetails: 'Close project details',
    filtersLabel: 'Filter projects',
    skillsLabel: 'The toolkit',
    skillsTitle: <>Practical skills. <span>Thoughtful execution.</span></>,
    skillsIntro: 'The technologies and disciplines I use to take a product from idea to release.',
    skillsNote: 'Skill levels are not shown because verified proficiency ratings have not been provided.',
    brandEyebrow: 'A DEVELOPMENT & CYBERSECURITY STUDIO',
    brandTitle: <>Meet <span>DevSecure.</span></>,
    brandTagline: 'Building Digital Experiences. Securing Digital Futures.',
    brandText: 'DevSecure is my technology brand focused on software development, modern web solutions, and cybersecurity. I founded it to bring thoughtful engineering and security together.',
    brandCta: 'Work with DevSecure',
    contactLabel: 'Have something in mind?',
    contactTitle: <>Let’s build something<br /><span>worth remembering.</span></>,
    contactText: 'Tell me what you’re working on. I’d love to hear about your idea and explore how I can help.',
    email: 'Send me an email',
    whatsapp: 'Message on WhatsApp',
    socials: 'Find me elsewhere',
    linkedin: 'LinkedIn profile coming soon',
    facebook: 'Facebook profile coming soon',
    footer: 'Designed & built with intention.',
    top: 'Back to top',
    menu: 'Open navigation menu',
    close: 'Close navigation menu',
    lang: 'عربي',
    portraitAlt: 'Portrait placeholder for Belal Wahid Mohamed',
    workingAlt: 'Workspace and coding photo placeholder',
    brandAlt: 'DevSecure development and cybersecurity brand visual',
    educationShort: 'Computer Science & IT · Nahda University',
    locationShort: 'Based in Beni Suef, Egypt',
    readMore: 'Let’s discuss your project',
    contactForm: 'Or send a project inquiry',
    formName: 'Your name',
    formEmail: 'Your email',
    formSubject: 'Subject',
    formMessage: 'Tell me about your project',
    formSubmit: 'Prepare email',
    formNotice: 'This opens your default email app with your message. The website does not send or store form submissions.',
    formRequired: 'Please complete every field using a valid email address.',
    formEmailInvalid: 'Enter a valid email address.',
    category: 'Category',
    focusNav: 'Current section',
    footerNav: 'Quick links',
    viewProject: 'View concept details',
    demoConcept: 'DEMO CONCEPT',
    devsecureNav: 'DevSecure',
    brandDevelopment: 'Software development',
    brandSecurity: 'Cybersecurity',
  },
  ar: {
    pageTitle: 'بلال وحيد محمد — مطور Full-Stack ومتخصص أمن سيبراني',
    pageDescription: 'بلال وحيد محمد، مهندس واجهات أمامية ومطور Full-Stack ومؤسس DevSecure للتطوير والأمن السيبراني.',
    nav: [
      ['about', 'عني'],
      ['services', 'الخدمات'],
      ['projects', 'المشاريع'],
      ['skills', 'المهارات'],
      ['devsecure', 'ديف سيكيور'],
      ['contact', 'اتصل بي'],
    ],
    hire: 'اطلب مشروعك',
    available: 'متاح للعمل الحر',
    eyebrow: 'مهندس واجهات أمامية · Full-Stack · أمن سيبراني',
    heroTitle: <>نحوّل أفكارك إلى أنظمة<br />ويب عالية الأداء،<br /><span>ونحمي أصولك الرقمية.</span></>,
    heroText: 'أنا طالب علوم حاسب ومهندس واجهات أمامية ومطور Full-Stack. بصفتي مؤسس DevSecure، بجمع بين التطوير المدروس والتفكير الأمني في كل فكرة.',
    explore: 'اكتشف أعمالي',
    chat: 'خلّينا نتكلم',
    scroll: 'انزل واكتشف',
    aboutLabel: 'نبذة عني',
    aboutTitle: <>بحوّل الأفكار<br /><span>لتجارب حقيقية.</span></>,
    aboutText: 'أنا بلال، مهندس واجهات أمامية ومطور Full-Stack، وشغوف بالأمن السيبراني. بهتم ببناء منتجات سهلة الاستخدام ومصممة عشان تكمل.',
    aboutText2: 'بصفتي مؤسس DevSecure، بجمع بين تطوير البرمجيات والتفكير الأمني من البداية، عشان أحوّل الأفكار الطموحة لمنتجات رقمية متقنة وموثوقة.',
    education: 'طالب علوم الحاسب وتكنولوجيا المعلومات',
    university: 'جامعة النهضة · بني سويف، مصر',
    location: 'بني سويف، مصر',
    servicesLabel: 'أقدر أساعدك إزاي؟',
    servicesTitle: <>شريك واحد من أول<br /><span>سطر كود لحد الإطلاق.</span></>,
    servicesIntro: 'هندسة مدروسة لأصحاب الأفكار الطموحة والفرق اللي بتكبر.',
    projectsLabel: 'نماذج من الأعمال',
    projectsTitle: <>لمحة عن <span>اللي ببنيه.</span></>,
    projectsIntro: 'مساحات بتتقابل فيها التجربة والتطوير والأمان.',
    projectsNote: 'المعروض هنا تصورات تجريبية موضّحة بوضوح. أضف روابط وصور مشاريعك في ملف البيانات.',
    projectDetails: 'تفاصيل المشروع',
    github: 'GitHub',
    liveDemo: 'نسخة مباشرة',
    comingSoon: 'قريبًا',
    closeDetails: 'إغلاق تفاصيل المشروع',
    filtersLabel: 'تصفية المشاريع',
    skillsLabel: 'عدة الشغل',
    skillsTitle: <>مهارات عملية. <span>تنفيذ باهتمام.</span></>,
    skillsIntro: 'تقنيات ومجالات بستخدمها لتحويل المنتج من فكرة لإطلاق.',
    skillsNote: 'لم نعرض مستويات للمهارات لعدم توفر تقييمات مؤكدة.',
    brandEyebrow: 'علامة للتطوير والأمن السيبراني',
    brandTitle: <>ديف <span>سيكيور.</span></>,
    brandTagline: 'نبني تجارب رقمية ونحمي المستقبل الرقمي.',
    brandText: 'DevSecure علامة تقنية تركّز على تطوير البرمجيات وحلول الويب الحديثة والأمن السيبراني. أسستها عشان أجمع بين الهندسة المدروسة والأمان.',
    brandCta: 'اشتغل مع DevSecure',
    contactLabel: 'عندك فكرة؟',
    contactTitle: <>يلا نبني حاجة<br /><span>تستاهل نفتكرها.</span></>,
    contactText: 'احكيلي عن مشروعك. مهتم أعرف فكرتك ونشوف سوا إزاي أقدر أساعدك.',
    email: 'ابعتلي إيميل',
    whatsapp: 'كلمني على واتساب',
    socials: 'تلاقيني كمان هنا',
    linkedin: 'لينكد إن قريبًا',
    facebook: 'فيسبوك قريبًا',
    footer: 'تصميم وتطوير باهتمام.',
    top: 'ارجع لفوق',
    menu: 'افتح قائمة التنقل',
    close: 'اقفل قائمة التنقل',
    lang: 'English',
    portraitAlt: 'مكان مخصص لصورة بلال وحيد محمد',
    workingAlt: 'مكان مخصص لصورة مساحة العمل والبرمجة',
    brandAlt: 'تصميم بصري لعلامة DevSecure للتطوير والأمن السيبراني',
    educationShort: 'علوم الحاسب وتكنولوجيا المعلومات · جامعة النهضة',
    locationShort: 'مقيم في بني سويف، مصر',
    readMore: 'خلّينا نتكلم عن مشروعك',
    contactForm: 'أو ابعت تفاصيل مشروعك',
    formName: 'اسمك',
    formEmail: 'بريدك الإلكتروني',
    formSubject: 'موضوع الرسالة',
    formMessage: 'احكيلي عن مشروعك',
    formSubmit: 'جهّز الرسالة',
    formNotice: 'هيفتح تطبيق البريد الافتراضي برسالتك. الموقع لا يرسل بيانات النموذج أو يخزنها.',
    formRequired: 'من فضلك كمّل كل الحقول واكتب بريدًا إلكترونيًا صحيحًا.',
    formEmailInvalid: 'اكتب بريدًا إلكترونيًا صحيحًا.',
    category: 'التصنيف',
    focusNav: 'القسم الحالي',
    footerNav: 'روابط سريعة',
    viewProject: 'اعرف تفاصيل التصور',
    demoConcept: 'تصور تجريبي',
    devsecureNav: 'ديف سيكيور',
    brandDevelopment: 'تطوير البرمجيات',
    brandSecurity: 'الأمن السيبراني',
  },
}

export default function Portfolio() {
  const [language, setLanguage] = useState(() => window.localStorage.getItem('portfolio-language') === 'ar' ? 'ar' : 'en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [projectFilter, setProjectFilter] = useState('all')
  const [skillFilter, setSkillFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [formMessage, setFormMessage] = useState('')
  const t = copy[language]
  const isArabic = language === 'ar'
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scrollScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const root = document.documentElement
    const previousLang = root.lang
    const previousDir = root.dir
    const previousScroll = root.style.scrollBehavior
    root.lang = language
    root.dir = isArabic ? 'rtl' : 'ltr'
    root.style.scrollBehavior = 'smooth'
    window.localStorage.setItem('portfolio-language', language)
    document.title = copy[language].pageTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy[language].pageDescription)

    return () => {
      root.lang = previousLang
      root.dir = previousDir
      root.style.scrollBehavior = previousScroll
    }
  }, [isArabic, language])

  useEffect(() => {
    const sections = document.querySelectorAll('#home, #about, #services, #projects, #skills, #devsecure, #contact')
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, .15, .4, .7] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen && !selectedProject) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen, selectedProject])

  useEffect(() => {
    if (!selectedProject) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [selectedProject])

  const closeMenu = () => setMenuOpen(false)
  const filteredProjects = projects.filter((project) => projectFilter === 'all' || project.category === projectFilter)
  const filteredSkillGroups = skillGroups.filter((group) => skillFilter === 'all' || group.id === skillFilter)

  const handleContactSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      setFormMessage(t.formRequired)
      return
    }

    const values = new FormData(form)
    const emailSubject = String(values.get('subject')).trim()
    const emailBody = [
      `${t.formName}: ${String(values.get('name')).trim()}`,
      `${t.formEmail}: ${String(values.get('email')).trim()}`,
      '',
      String(values.get('message')).trim(),
    ].join('\n')
    window.location.href = `mailto:belalwahid1@icloud.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    setFormMessage(t.formNotice)
  }

  return (
    <main className={`portfolio-page${isArabic ? ' is-arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <motion.div className="portfolio-scroll-progress" style={{ scaleX: scrollScale }} aria-hidden="true" />
      <header className="portfolio-header">
        <nav className="portfolio-nav portfolio-container" aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}>
          <a className="portfolio-logo" href="#home" onClick={closeMenu} aria-label={isArabic ? 'بلال وحيد محمد - الرئيسية' : 'Belal Wahid Mohamed - home'}>
            <span className="portfolio-logo-mark"><Braces size={20} strokeWidth={2.2} /></span>
            <span className="portfolio-logo-copy"><strong>{isArabic ? 'بلال وحيد محمد' : 'Belal Wahid Mohamed'}</strong><small>DEV<span>SECURE</span></small></span>
          </a>
          <div className={`portfolio-nav-links${menuOpen ? ' is-open' : ''}`} id="portfolio-navigation">
            {t.nav.map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'is-active' : undefined} aria-current={activeSection === id ? 'location' : undefined} onClick={closeMenu}>{label}</a>)}
            <a className="portfolio-mobile-hire" href="#contact" onClick={closeMenu}>{t.hire}<ArrowUpRight size={15} /></a>
          </div>
          <div className="portfolio-nav-actions">
            <button className="portfolio-language" type="button" onClick={() => { setLanguage(isArabic ? 'en' : 'ar'); closeMenu() }} aria-label={isArabic ? 'Switch language to English' : 'تغيير اللغة إلى العربية'}>
              <Globe2 size={15} /><span>{t.lang}</span>
            </button>
            <a className="portfolio-hire" href="#contact">{t.hire}<ArrowUpRight size={15} /></a>
            <button className="portfolio-menu-toggle" type="button" aria-controls="portfolio-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? t.close : t.menu} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </nav>
      </header>

      <section className="portfolio-hero portfolio-container" id="home">
        <motion.div className="portfolio-hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <div className="portfolio-availability"><span className="portfolio-status-dot" />{t.available}</div>
          <p className="portfolio-eyebrow"><span />{t.eyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="portfolio-hero-description">{t.heroText}</p>
          <div className="portfolio-hero-actions">
            <a className="portfolio-button portfolio-button-primary" href="#projects">{t.explore}<ArrowDown size={16} /></a>
            <a className="portfolio-button portfolio-button-secondary" href="https://wa.me/201044147246" target="_blank" rel="noreferrer"><MessageCircle size={16} />{t.chat}</a>
            <a className="portfolio-button portfolio-button-secondary" href="https://github.com/Albob2005" target="_blank" rel="noreferrer"><Github size={16} />GitHub<ExternalLink size={13} /></a>
          </div>
          <div className="portfolio-hero-meta"><span><MapPin size={14} />{t.locationShort}</span><span className="portfolio-meta-divider" /><span><Sparkles size={14} />DevSecure</span></div>
        </motion.div>
        <motion.div className="portfolio-hero-art" aria-label={t.portraitAlt} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .12 }}>
          <div className="portfolio-orbit portfolio-orbit-one" />
          <div className="portfolio-orbit portfolio-orbit-two" />
          <div className="portfolio-portrait">
            <div className="portfolio-portrait-fallback"><span>B</span><small>BW</small></div>
            <img src={`${import.meta.env.BASE_URL}images/hero-portrait.jpg`} alt={t.portraitAlt} onError={(event) => { event.currentTarget.hidden = true }} />
            <div className="portfolio-portrait-caption"><span className="portfolio-caption-spark">✳</span><span><strong>{isArabic ? 'بلال وحيد' : 'Belal Wahid'}</strong><small>{isArabic ? 'مهندس برمجيات' : 'Software engineer'}</small></span><ArrowUpRight size={17} /></div>
          </div>
          <div className="portfolio-float-card portfolio-float-code"><span className="portfolio-code-dot" /><span>secure<span className="portfolio-code-punctuation">.</span>build<span className="portfolio-code-punctuation">()</span></span><Check size={15} /></div>
          <div className="portfolio-float-card portfolio-float-shield"><ShieldCheck size={17} /><span>{isArabic ? 'الأمان من البداية' : 'Secure by design'}</span></div>
          <div className="portfolio-hero-index"><span>01</span><i /><span>04</span></div>
        </motion.div>
        <a className="portfolio-scroll-cue" href="#about"><span>{t.scroll}</span><ArrowDownLeft size={15} /></a>
      </section>

      <section className="portfolio-section portfolio-about" id="about">
        <div className="portfolio-container portfolio-about-grid">
          <div className="portfolio-about-art">
            <div className="portfolio-about-image">
              <div className="portfolio-about-fallback"><Terminal size={42} /><span>hello_world<span>()</span></span></div>
              <img src={`${import.meta.env.BASE_URL}images/about-working.jpg`} alt={t.workingAlt} loading="lazy" onError={(event) => { event.currentTarget.hidden = true }} />
              <span className="portfolio-image-index">FIG. 01 — THE PROCESS</span>
            </div>
            <div className="portfolio-about-stamp"><span>DEV</span><Braces size={20} /><span>SECURE</span></div>
          </div>
          <div className="portfolio-about-copy">
            <p className="portfolio-section-label"><span>01</span>{t.aboutLabel}</p>
            <h2>{t.aboutTitle}</h2>
            <p className="portfolio-body-copy">{t.aboutText}</p>
            <p className="portfolio-body-copy">{t.aboutText2}</p>
            <div className="portfolio-education">
              <span className="portfolio-education-icon"><Code2 size={18} /></span>
              <span><strong>{t.education}</strong><small>{t.university}</small></span>
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-services" id="services">
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div><p className="portfolio-section-label"><span>02</span>{t.servicesLabel}</p><h2>{t.servicesTitle}</h2></div>
            <p>{t.servicesIntro}</p>
          </div>
          <div className="portfolio-service-grid">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon]
              const content = service[language]
              return (
                <motion.article className="portfolio-service-card" key={service.id} whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: .2 }}>
                  <div className="portfolio-card-top"><span className="portfolio-service-icon"><Icon size={20} /></span><span className="portfolio-card-number">{isArabic ? '٠' + service.number.slice(1) : service.number}</span></div>
                  <h3>{content.title}</h3><p>{content.description}</p>
                  <ul className="portfolio-service-details">{content.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  <a href="#contact" aria-label={`${t.readMore}: ${content.title}`}>{t.readMore}<ArrowUpRight size={15} /></a>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-projects" id="projects">
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div><p className="portfolio-section-label"><span>03</span>{t.projectsLabel}</p><h2>{t.projectsTitle}</h2></div>
            <p>{t.projectsIntro}</p>
          </div>
          <div className="portfolio-filter-row" role="group" aria-label={t.filtersLabel}>
            {projectCategories.map((category) => <button key={category.id} type="button" className={projectFilter === category.id ? 'is-selected' : ''} aria-pressed={projectFilter === category.id} onClick={() => setProjectFilter(category.id)}>{category[language]}</button>)}
          </div>
          <div className="portfolio-project-grid">
            <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const Icon = projectIcons[project.icon]
              const content = project[language]
              return (
                <motion.article className={`portfolio-project-card portfolio-project-${project.tone}`} key={project.id} layout initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .2 }}>
                  <div className="portfolio-project-visual">
                    <div className="portfolio-project-gridlines" />
                    <div className="portfolio-project-window"><span /><span /><span /><i /></div>
                    <div className="portfolio-project-glyph"><Icon size={43} strokeWidth={1.2} /></div>
                    <span className="portfolio-project-counter">0{index + 1} / 0{filteredProjects.length}</span>
                    <span className="portfolio-project-chip"><Sparkles size={12} />{t.demoConcept}</span>
                  </div>
                  <div className="portfolio-project-content">
                    <p className="portfolio-project-tag">{content.label}</p>
                    <h3>{content.title}</h3><p>{content.description}</p>
                    <div className="portfolio-tag-list">{content.tags.map((chip) => <span key={chip}>{chip}</span>)}</div>
                    <button className="portfolio-project-details" type="button" onClick={() => setSelectedProject(project)}>{t.viewProject}<ArrowUpRight size={15} /></button>
                  </div>
                </motion.article>
              )
            })}
            </AnimatePresence>
          </div>
          <p className="portfolio-project-note"><span />{t.projectsNote}</p>
        </div>
      </section>

      <section className="portfolio-section portfolio-skills" id="skills">
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div><p className="portfolio-section-label"><span>04</span>{t.skillsLabel}</p><h2>{t.skillsTitle}</h2></div>
            <p>{t.skillsIntro}</p>
          </div>
          <div className="portfolio-filter-row" role="group" aria-label={t.filtersLabel}>
            {skillCategories.map((category) => <button key={category.id} type="button" className={skillFilter === category.id ? 'is-selected' : ''} aria-pressed={skillFilter === category.id} onClick={() => setSkillFilter(category.id)}>{category[language]}</button>)}
          </div>
          <div className="portfolio-skill-grid">
            {filteredSkillGroups.map((group) => {
              const Icon = skillIcons[group.icon]
              const content = group[language]
              return <motion.article className="portfolio-skill-card" layout key={group.id} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><span className="portfolio-skill-icon"><Icon size={19} /></span><h3>{content.title}</h3><div className="portfolio-tag-list">{content.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></motion.article>
            })}
          </div>
          <p className="portfolio-skill-note">{t.skillsNote}</p>
        </div>
      </section>

      <section className="portfolio-brand-section" id="devsecure">
        <div className="portfolio-container portfolio-brand-card">
          <div className="portfolio-brand-copy">
            <p className="portfolio-section-label"><span>✳</span>{t.brandEyebrow}</p>
            <h2>{t.brandTitle}</h2>
            <p className="portfolio-brand-tagline">{t.brandTagline}</p>
            <p>{t.brandText}</p>
            <a className="portfolio-button portfolio-button-primary" href="#contact">{t.brandCta}<ArrowUpRight size={16} /></a>
          </div>
          <div className="portfolio-brand-services"><span><Code2 size={15} />{t.brandDevelopment}</span><span><ShieldCheck size={15} />{t.brandSecurity}</span></div>
          <div className="portfolio-brand-art">
            <div className="portfolio-brand-fallback"><div className="portfolio-brand-emblem"><Braces size={40} /></div><strong>DEV<span>SECURE</span></strong><small>ENGINEERING · SECURITY · TRUST</small></div>
            <img src={`${import.meta.env.BASE_URL}images/devsecure-brand.jpg`} alt={t.brandAlt} loading="lazy" onError={(event) => { event.currentTarget.hidden = true }} />
            <span className="portfolio-brand-orbit portfolio-brand-orbit-one" /><span className="portfolio-brand-orbit portfolio-brand-orbit-two" />
            <span className="portfolio-brand-scan"><i />{isArabic ? 'نظام آمن وجاهز' : 'SYSTEM SECURE · READY'}</span>
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-contact" id="contact">
        <div className="portfolio-container portfolio-contact-grid">
          <div className="portfolio-contact-copy">
            <p className="portfolio-section-label"><span>05</span>{t.contactLabel}</p>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <div className="portfolio-contact-actions">
              <a className="portfolio-button portfolio-button-primary" href="mailto:belalwahid1@icloud.com"><Mail size={16} />{t.email}<ArrowUpRight size={15} /></a>
              <a className="portfolio-button portfolio-button-secondary" href="https://wa.me/201044147246" target="_blank" rel="noreferrer"><MessageCircle size={16} />{t.whatsapp}<ArrowUpRight size={15} /></a>
            </div>
            <a className="portfolio-phone-link" href="tel:+201044147246"><span><MessageCircle size={15} /></span><span dir="ltr">+20 104 414 7246</span></a>
            <form className="portfolio-contact-form" onSubmit={handleContactSubmit}>
              <h3>{t.contactForm}</h3>
              <div className="portfolio-form-grid">
                <label>{t.formName}<input name="name" type="text" autoComplete="name" required maxLength={100} /></label>
                <label>{t.formEmail}<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
                <label className="portfolio-form-wide">{t.formSubject}<input name="subject" type="text" required maxLength={150} /></label>
                <label className="portfolio-form-wide">{t.formMessage}<textarea name="message" rows="4" required maxLength={4000} /></label>
              </div>
              <div className="portfolio-form-submit-row"><button className="portfolio-button portfolio-button-primary" type="submit">{t.formSubmit}<ArrowUpRight size={15} /></button><span>{t.formNotice}</span></div>
              {formMessage && <p className="portfolio-form-message" role="status">{formMessage}</p>}
            </form>
          </div>
          <div className="portfolio-contact-details">
            <span className="portfolio-contact-caption">{t.socials}</span>
            <a href="mailto:belalwahid1@icloud.com"><span className="portfolio-contact-icon"><Mail size={17} /></span><span><small>EMAIL</small><strong>belalwahid1@icloud.com</strong></span><ArrowUpRight size={16} /></a>
            <a href="mailto:Albob201@outlook.com"><span className="portfolio-contact-icon"><Mail size={17} /></span><span><small>EMAIL · ALT</small><strong>Albob201@outlook.com</strong></span><ArrowUpRight size={16} /></a>
            <a href="https://github.com/Albob2005" target="_blank" rel="noreferrer"><span className="portfolio-contact-icon"><Github size={17} /></span><span><small>GITHUB</small><strong>github.com/Albob2005</strong></span><ExternalLink size={15} /></a>
            <a href="https://codeforces.com/profile/Belalw20" target="_blank" rel="noreferrer"><span className="portfolio-contact-icon portfolio-contact-code">CF</span><span><small>CODEFORCES</small><strong>Belalw20</strong></span><ExternalLink size={15} /></a>
            <a href="https://wa.me/201044147246" target="_blank" rel="noreferrer"><span className="portfolio-contact-icon"><MessageCircle size={17} /></span><span><small>WHATSAPP</small><strong dir="ltr">+20 104 414 7246</strong></span><ExternalLink size={15} /></a>
            <div className="portfolio-social-placeholders">
              <span><Linkedin size={14} />{t.linkedin}</span><span><Globe2 size={14} />{t.facebook}</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">
        <div className="portfolio-container portfolio-footer-inner">
          <a className="portfolio-logo" href="#home"><span className="portfolio-logo-mark"><Braces size={19} /></span><span className="portfolio-logo-copy"><strong>{isArabic ? 'بلال وحيد محمد' : 'Belal Wahid Mohamed'}</strong><small>DEV<span>SECURE</span></small></span></a>
          <p>© {new Date().getFullYear()} {isArabic ? 'بلال وحيد محمد' : 'Belal Wahid Mohamed'}. {t.footer}</p>
          <div className="portfolio-footer-links"><span>{t.footerNav}</span>{t.nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
          <div className="portfolio-footer-socials"><a href="https://github.com/Albob2005" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={15} /></a><a href="https://codeforces.com/profile/Belalw20" target="_blank" rel="noreferrer" aria-label="Codeforces">CF</a><a href="mailto:belalwahid1@icloud.com" aria-label="Email"><Mail size={15} /></a></div>
          <a className="portfolio-back-top" href="#home">{t.top}<ArrowRight size={15} /></a>
        </div>
      </footer>
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="portfolio-modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null) }}>
            <motion.section className="portfolio-project-modal" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title" initial={reduceMotion ? false : { opacity: 0, y: 16, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: .98 }} transition={{ duration: .2 }}>
              <button className="portfolio-modal-close" type="button" aria-label={t.closeDetails} onClick={() => setSelectedProject(null)} autoFocus><X size={19} /></button>
              <span className="portfolio-project-tag">{selectedProject[language].label}</span>
              <h2 id="portfolio-modal-title">{selectedProject[language].title}</h2>
              <p>{selectedProject[language].details}</p>
              <div className="portfolio-tag-list">{selectedProject[language].tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="portfolio-modal-actions">
                {selectedProject.githubUrl ? <a className="portfolio-button portfolio-button-secondary" href={selectedProject.githubUrl} target="_blank" rel="noreferrer"><Github size={16} />{t.github}<ExternalLink size={14} /></a> : <button className="portfolio-button portfolio-button-secondary" type="button" disabled><Github size={16} />{t.github} · {t.comingSoon}</button>}
                {selectedProject.demoUrl ? <a className="portfolio-button portfolio-button-primary" href={selectedProject.demoUrl} target="_blank" rel="noreferrer">{t.liveDemo}<ExternalLink size={14} /></a> : <button className="portfolio-button portfolio-button-secondary" type="button" disabled>{t.liveDemo} · {t.comingSoon}</button>}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
