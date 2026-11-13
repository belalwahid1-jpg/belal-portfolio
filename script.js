(function () {
  "use strict";

  const data = window.portfolioData;
  const personal = data.personal;
  const projects = data.projects;
  const navKeys = ["about", "services", "projects", "skills", "devsecure", "contact"];
  const serviceIcons = ["code", "layers", "shield", "sparkles"];
  const skillIcons = ["code", "server", "braces", "shield", "terminal"];
  const iconPaths = {
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
    arrowDown: '<path d="M12 5v14m-7-7 7 7 7-7"/>',
    code: '<path d="m8 17-5-5 5-5m8 10 5-5-5-5m-2-12-4 24"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Zm-3-11 2 2 4-4"/>',
    sparkles: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm7 12 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>',
    server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    braces: '<path d="M8 3H6a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2m8-14h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2"/>',
    terminal: '<path d="m4 17 6-6-6-6m8 14h8"/>',
    graduation: '<path d="m22 10-10-5-10 5 10 5 10-5Zm-6 3v5c-2.5 2-7.5 2-10 0v-5m16-3v7"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2M3 17v2a2 2 0 0 0 2 2h2m10 0h2a2 2 0 0 0 2-2v-2M7 12h10"/>',
    message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-7A5.5 5.5 0 0 0 19.8 4 5.1 5.1 0 0 0 19.7 0S18.5-.3 16 1.5a13.4 13.4 0 0 0-7 0C6.5-.3 5.3 0 5.3 0a5.1 5.1 0 0 0-.1 4A5.5 5.5 0 0 0 3.7 8.4c0 5.5 3.2 6.7 6.2 7A3.4 3.4 0 0 0 9 18.1V22"/>',
    map: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    send: '<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>',
  };

  const icon = (name, size) => `<svg width="${size || 18}" height="${size || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.code}</svg>`;
  const heading = (eyebrow, title, intro) => `<div class="section-heading reveal"><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${intro ? `<p>${intro}</p>` : ""}</div>`;
  let language = "en";
  try {
    language = localStorage.getItem("belal-portfolio-language") === "ar" ? "ar" : "en";
  } catch (error) {
    language = "en";
  }
  let activeProject = null;
  let projectFilter = 0;
  let skillFilter = 0;
  let menuOpen = false;
  let translations;

  function renderNavbar(t) {
    const makeLink = (key, mobile) => `<a class="${mobile ? "mobile-nav-link" : "nav-link"}" href="#${key}" data-nav="${key}">${t.nav[key]}</a>`;
    document.getElementById("desktop-nav").innerHTML = navKeys.map((key) => makeLink(key, false)).join("");
    document.getElementById("mobile-nav").innerHTML = navKeys.map((key) => makeLink(key, true)).join("") +
      `<a class="button button-primary mobile-cta" href="#contact">${t.nav.hire}${icon("arrow", 16)}</a>`;
    document.getElementById("nav-cta").textContent = t.nav.hire;
    document.getElementById("language-toggle").textContent = t.nav.language;
    document.getElementById("language-toggle").setAttribute("aria-label", language === "en" ? "Switch to Arabic" : "Switch to English");
    document.getElementById("menu-toggle").setAttribute("aria-label", t.nav.menu);
    document.querySelector(".navbar").setAttribute("aria-label", t.nav.menu);
    document.getElementById("back-to-top").setAttribute("aria-label", t.footer.top);
  }

  function renderHero(t) {
    return `<div class="hero-grid container">
      <div class="hero-copy reveal">
        <div class="availability"><span class="status-dot"></span>${t.hero.availability}</div>
        <p class="hero-eyebrow"><span class="eyebrow-line"></span>${t.hero.eyebrow}</p>
        <h1>${t.hero.headline}</h1>
        <p class="hero-intro">${t.hero.intro}</p>
        <div class="hero-buttons">
          <a class="button button-primary" href="#contact">${t.hero.primary}${icon("arrow", 17)}</a>
          <a class="button button-outline" href="#projects">${t.hero.secondary}${icon("arrowDown", 16)}</a>
        </div>
        <div class="hero-socials">
          <a href="${personal.whatsapp}" target="_blank" rel="noreferrer">${icon("message", 16)} WhatsApp</a>
          <a href="${personal.github}" target="_blank" rel="noreferrer">${icon("github", 16)} GitHub</a>
          <span>${icon("map", 15)}${t.hero.location}</span>
        </div>
      </div>
      <div class="hero-visual-wrap reveal">
        <div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div>
        <div class="hero-visual">
          <img src="./public/images/hero-portrait.jpg" alt="${language === "ar" ? "بلال وحيد محمد" : "Belal Wahid Mohamed"}">
          <div class="visual-caption"><span class="caption-icon">${icon("sparkles", 18)}</span><span>${t.hero.visualLabel}<small>${t.hero.visualCaption}</small></span></div>
          <span class="visual-index">01 / DEVSECURE</span>
        </div>
        <div class="hero-float-card"><span class="float-spark">✳</span><span>Build <b>with intent.</b></span></div>
        <span class="hero-coordinate">29°04'N&nbsp; 31°05'E</span>
      </div>
    </div>
    <div class="hero-bottom container"><span>SCROLL TO EXPLORE</span><span class="hero-bottom-line"></span><span>01 — 07</span></div>`;
  }

  function renderAbout(t) {
    return `<div class="container">
      ${heading(t.about.eyebrow, t.about.title)}
      <div class="about-grid">
        <div class="about-visual reveal">
          <img src="./public/images/about-working.jpg" alt="${t.about.imageAlt}" loading="lazy">
          <div class="about-image-note">${icon("scan", 17)}<span>LEARNING · BUILDING · ITERATING</span></div>
          <div class="about-stamp">BWM<br><small>EST. 2005</small></div>
        </div>
        <div class="about-copy reveal">
          <p>${t.about.body}</p><p>${t.about.second}</p><p>${t.about.third}</p>
          <div class="education-card"><span class="education-icon">${icon("graduation", 21)}</span><div><small>${t.about.educationLabel}</small><strong>${t.about.education}</strong><span>${t.about.university}</span></div><span class="education-arrow">${icon("arrow", 17)}</span></div>
          <div class="focus-line"><span>${t.about.focus}</span><p>${t.about.focusText}</p></div>
          <a class="text-link" href="#contact">${t.aboutLink}${icon("arrow", 16)}</a>
        </div>
      </div>
    </div>`;
  }

  function renderServices(t) {
    const cards = t.services.items.map((service, index) => `<article class="service-card reveal">
      <div class="service-top"><span class="service-icon">${icon(serviceIcons[index], 21)}</span><span class="service-number">0${index + 1}</span></div>
      <h3>${service.title}</h3><p>${service.text}</p>
      <ul>${service.points.map((point) => `<li>${point}</li>`).join("")}</ul>
      <a class="card-link" href="#contact">${t.services.learn}${icon("arrow", 15)}</a>
    </article>`).join("");
    return `<div class="container">${heading(t.services.eyebrow, t.services.title, t.services.intro)}<div class="service-grid">${cards}</div></div>`;
  }

  function renderProjects(t) {
    const filterButtons = t.projects.filters.map((label, index) =>
      `<button type="button" class="filter-chip${index === projectFilter ? " selected" : ""}" data-project-filter="${index}" aria-pressed="${index === projectFilter}">${label}</button>`).join("");
    const cards = projects.map((project, index) => {
      if (projectFilter && project.category !== projects[projectFilter - 1].category) return "";
      const item = t.projects.items[index];
      return `<article class="project-card reveal">
        <button type="button" class="project-visual visual-${project.visual}" data-project-open="${index}" aria-label="${t.projects.details}: ${item.title}">
          <div class="project-window"><span></span><span></span><span></span></div>
          <span class="project-art-icon">${icon(project.icon, 42)}</span>
          <span class="project-art-label">DEV / ${String(index + 1).padStart(2, "0")}</span>
          <span class="demo-tag">${t.projects.demo}</span>
        </button>
        <div class="project-content">
          <div class="project-title-line"><span class="project-category">${t.projects.categories[index]}</span><button type="button" class="icon-button" data-project-open="${index}" aria-label="${t.projects.details}: ${item.title}">${icon("arrow", 18)}</button></div>
          <h3>${item.title}</h3><p>${item.text}</p>
          <div class="tag-row">${item.stack.map((tag) => `<span>${tag}</span>`).join("")}</div>
          <button type="button" class="project-details-link" data-project-open="${index}">${t.projects.details}${icon("arrow", 15)}</button>
        </div>
      </article>`;
    }).join("");
    return `<div class="container">${heading(t.projects.eyebrow, t.projects.title, t.projects.intro)}
      <div class="filter-row" role="group" aria-label="${language === "ar" ? "تصفية المشاريع" : "Filter projects"}">${filterButtons}</div>
      <div class="project-grid">${cards}</div>
    </div>`;
  }

  function renderSkills(t) {
    const filterButtons = t.skills.filters.map((label, index) =>
      `<button type="button" class="filter-chip${index === skillFilter ? " selected" : ""}" data-skill-filter="${index}" aria-pressed="${index === skillFilter}">${label}</button>`).join("");
    const groups = t.skills.groups.map((group, index) => {
      if (skillFilter && index !== skillFilter - 1) return "";
      return `<article class="skill-group reveal">
        <div class="skill-group-title"><span>${icon(skillIcons[index], 18)}</span><h3>${group.name}</h3><small>${String(group.items.length).padStart(2, "0")}</small></div>
        <div class="skill-tags">${group.items.map((item) => `<span>${item}</span>`).join("")}</div>
      </article>`;
    }).join("");
    return `<div class="container">${heading(t.skills.eyebrow, t.skills.title, t.skills.intro)}
      <div class="filter-row" role="group" aria-label="${language === "ar" ? "تصفية المهارات" : "Filter skills"}">${filterButtons}</div>
      <div class="skills-grid">${groups}</div>
    </div>`;
  }

  function renderBrand(t) {
    return `<div class="container"><div class="devsecure-card reveal">
      <div class="brand-orb brand-orb-one"></div><div class="brand-orb brand-orb-two"></div>
      <div class="devsecure-copy">
        <span class="eyebrow">${t.brand.eyebrow}</span>
        <div class="devsecure-wordmark"><span class="devsecure-symbol">D<span>S</span></span><span>DEV<span>SECURE</span></span></div>
        <h2>${t.brand.title}</h2><p class="brand-tagline">${t.brand.tagline}</p><p class="brand-description">${t.brand.text}</p>
        <div class="brand-pillars"><span>${icon("code", 17)}${t.brand.dev}</span><span>${icon("shield", 17)}${t.brand.security}</span></div>
        <a class="button button-primary" href="#contact">${t.brand.contact}${icon("arrow", 17)}</a>
      </div>
      <div class="devsecure-art"><img src="./public/images/devsecure-brand.svg" alt="${t.brand.imageAlt}" loading="lazy"><div class="brand-art-caption"><span class="status-dot"></span>${t.brand.inquiry}</div></div>
      <span class="devsecure-index">DS / 2025</span>
    </div></div>`;
  }

  function renderContact(t) {
    const channels = [
      { icon: "message", label: t.contact.whatsapp, value: personal.phone, href: personal.whatsapp },
      { icon: "mail", label: t.contact.emailLabel, value: personal.email, href: `mailto:${personal.email}` },
      { icon: "phone", label: t.contact.phone, value: personal.phone, href: `tel:${personal.phone.replaceAll(" ", "")}` },
      { icon: "github", label: t.contact.github, value: "Albob2005", href: personal.github },
      { icon: "code", label: t.contact.codeforces, value: "Belalw20", href: personal.codeforces },
    ];
    const contactLinks = channels.map((channel) => `<a class="contact-channel" href="${channel.href}"${channel.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>
      <span class="channel-icon">${icon(channel.icon, 18)}</span><span><small>${channel.label}</small><strong>${channel.value}</strong></span>${icon("arrow", 15)}
    </a>`).join("");
    return `<div class="container">
      ${heading(t.contact.eyebrow, t.contact.title, t.contact.intro)}
      <div class="contact-grid">
        <div class="contact-info reveal">
          <div class="contact-location">${icon("map", 18)}<span>${t.hero.location}</span></div>
          <div class="contact-channel-list">${contactLinks}</div>
          <div class="social-links">
            <a href="${personal.linkedin}" target="_blank" rel="noreferrer">${icon("linkedin", 17)}<span>${t.contact.linkedin}</span>${icon("arrow", 14)}</a>
            <a href="${personal.facebook}" target="_blank" rel="noreferrer">${icon("facebook", 17)}<span>${t.contact.facebook}</span>${icon("arrow", 14)}</a>
          </div>
          <a class="button button-whatsapp" href="${personal.whatsapp}" target="_blank" rel="noreferrer">${icon("message", 17)}${t.contact.whatsappCta}${icon("arrow", 16)}</a>
        </div>
        <form class="contact-form reveal" id="contact-form" novalidate>
          <div class="form-row">
            <label>${t.contact.name}<input name="name" required maxlength="100" autocomplete="name"></label>
            <label>${t.contact.email}<input name="email" type="email" required maxlength="254" autocomplete="email"></label>
          </div>
          <label>${t.contact.subject}<input name="subject" required maxlength="150"></label>
          <label>${t.contact.message}<textarea name="message" required rows="5" maxlength="3000"></textarea></label>
          <button type="submit" class="button button-primary form-submit">${t.contact.send}${icon("send", 16)}</button>
          <p class="form-note" id="form-note" role="status" aria-live="polite">${t.contact.formNote}</p>
        </form>
      </div>
    </div>`;
  }

  function renderFooter(t) {
    const quickLinks = navKeys.map((key) => `<a href="#${key}">${t.nav[key]}</a>`).join("");
    return `<div class="container">
      <div class="footer-main">
        <div class="footer-brand"><a class="brand-lockup" href="#home"><span class="brand-mark">B<span>.</span></span><span class="brand-name">BELAL WAHID<small>DEVELOPER · DEVSECURE</small></span></a><p>${t.footer.tagline}</p><span class="footer-location">${t.footer.location}</span></div>
        <div class="footer-nav"><h3>${t.footer.navigation}</h3><div>${quickLinks}</div></div>
        <div class="footer-connect"><h3>${t.footer.connect}</h3><div><a href="${personal.github}" target="_blank" rel="noreferrer">${icon("github", 17)} GitHub</a><a href="${personal.whatsapp}" target="_blank" rel="noreferrer">${icon("message", 17)} WhatsApp</a></div><a class="footer-email" href="mailto:${personal.email}">${personal.email}</a></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} ${language === "ar" ? personal.nameAr : personal.name}. ${t.footer.rights}</span><span>DEVSECURE · BWM</span><a href="#home">${t.footer.top} ↑</a></div>
    </div>`;
  }

  function renderModal(t) {
    const root = document.getElementById("modal-root");
    if (activeProject === null) {
      root.innerHTML = "";
      return;
    }
    const item = t.projects.items[activeProject];
    root.innerHTML = `<div class="modal-backdrop" data-modal-backdrop>
      <div class="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button class="modal-close" type="button" data-modal-close aria-label="${t.projects.modalClose}">${icon("close", 19)}</button>
        <span class="eyebrow">${t.projects.demo} · ${t.projects.categories[activeProject]}</span>
        <h2 id="modal-title">${item.title}</h2><p>${item.text}</p>
        <h3>${t.projects.stack}</h3><div class="tag-row">${item.stack.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <div class="modal-links"><span>${icon("arrow", 16)}${t.projects.unavailable}</span></div>
      </div>
    </div>`;
    root.querySelector("[data-modal-close]").focus();
  }

  function render() {
    translations = data.translations[language];
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = language === "ar" ? "بلال وحيد محمد | مطور ومؤسس ديف سيكيور" : "Belal Wahid Mohamed | Developer & DevSecure";
    renderNavbar(translations);
    document.getElementById("home").innerHTML = renderHero(translations);
    document.getElementById("about").innerHTML = renderAbout(translations);
    document.getElementById("services").innerHTML = renderServices(translations);
    document.getElementById("projects").innerHTML = renderProjects(translations);
    document.getElementById("skills").innerHTML = renderSkills(translations);
    document.getElementById("devsecure").innerHTML = renderBrand(translations);
    document.getElementById("contact").innerHTML = renderContact(translations);
    document.getElementById("footer").innerHTML = renderFooter(translations);
    renderModal(translations);
    setMenu(false);
    observeReveals();
    observeSections();
    updateProgress();
  }

  function setMenu(open) {
    menuOpen = open;
    const menu = document.getElementById("mobile-nav");
    const button = document.getElementById("menu-toggle");
    menu.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.innerHTML = `<span class="menu-icon" aria-hidden="true">${open ? "×" : "☰"}</span>`;
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach((item) => observer.observe(item));
  }

  function observeSections() {
    if (!("IntersectionObserver" in window)) return;
    if (window.sectionObserver) window.sectionObserver.disconnect();
    window.sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      document.querySelectorAll("[data-nav]").forEach((link) => {
        link.classList.toggle("active", link.dataset.nav === visible[0].target.id);
      });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] });
    document.querySelectorAll("main section[id]").forEach((section) => window.sectionObserver.observe(section));
  }

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    document.documentElement.style.setProperty("--scroll-progress", String(progress));
  }

  document.addEventListener("click", (event) => {
    const languageButton = event.target.closest("#language-toggle");
    if (languageButton) {
      language = language === "en" ? "ar" : "en";
      try {
        localStorage.setItem("belal-portfolio-language", language);
      } catch (error) {
        // The switch remains available when storage is disabled.
      }
      render();
      return;
    }

    const menuButton = event.target.closest("#menu-toggle");
    if (menuButton) {
      setMenu(!menuOpen);
      return;
    }

    if (event.target.closest("#mobile-nav a")) setMenu(false);

    const projectFilterButton = event.target.closest("[data-project-filter]");
    if (projectFilterButton) {
      projectFilter = Number(projectFilterButton.dataset.projectFilter);
      document.getElementById("projects").innerHTML = renderProjects(translations);
      observeReveals();
      return;
    }

    const skillFilterButton = event.target.closest("[data-skill-filter]");
    if (skillFilterButton) {
      skillFilter = Number(skillFilterButton.dataset.skillFilter);
      document.getElementById("skills").innerHTML = renderSkills(translations);
      observeReveals();
      return;
    }

    const projectButton = event.target.closest("[data-project-open]");
    if (projectButton) {
      activeProject = Number(projectButton.dataset.projectOpen);
      renderModal(translations);
      return;
    }

    if (event.target.closest("[data-modal-close]") || event.target.matches("[data-modal-backdrop]")) {
      activeProject = null;
      renderModal(translations);
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id !== "contact-form") return;
    event.preventDefault();
    const form = event.target;
    const fields = new FormData(form);
    const name = String(fields.get("name") || "").trim();
    const email = String(fields.get("email") || "").trim();
    const subject = String(fields.get("subject") || "").trim();
    const message = String(fields.get("message") || "").trim();
    const status = document.getElementById("form-note");

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !subject || !message) {
      status.textContent = translations.contact.invalid;
      return;
    }

    status.textContent = translations.contact.emailReady;
    const body = `${message}\n\n${language === "ar" ? "الاسم" : "Name"}: ${name}\n${language === "ar" ? "البريد الإلكتروني" : "Email"}: ${email}`;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeProject !== null) {
      activeProject = null;
      renderModal(translations);
    }
  });
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  render();
}());
