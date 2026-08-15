"use client";

import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import ContactForm from '@/components/ContactForm';

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleOpacity, setRoleOpacity] = useState(1);

  const roles = [
    'Full Stack Developer',
    'React & Node.js Developer',
    'Fintech Product Builder',
    'CS Undergrad @ PCU'
  ];

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  // Role rotator logic with fade out/in animation
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setRoleOpacity(0);
      setTimeout(() => {
        setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setRoleOpacity(1);
      }, 250);
    }, 2600);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, roles.length]);

  // Lenis scrolling and scroll reveal observer setup
  useEffect(() => {
    if (prefersReducedMotion) {
      // If user prefers reduced motion, just reveal elements immediately
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      return;
    }

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth scroll to internal anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(href) as HTMLElement | null;
          if (targetEl) {
            lenis.scrollTo(targetEl);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Scroll reveal observer
    const revealEls = document.querySelectorAll('.reveal');
    let io: IntersectionObserver | null = null;

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(el => io?.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('in'));
    }

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      if (io) {
        revealEls.forEach(el => io?.unobserve(el));
      }
    };
  }, [prefersReducedMotion]);

  const toggleMobileNav = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    setMobileOpen(false);
  };

  // Comprehensive Structured Data (JSON-LD @graph Schema) for Rich Search Snippets
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://rohannandavdekar.com/#website",
        "url": "https://rohannandavdekar.com",
        "name": "Rohan Nandavdekar Portfolio",
        "description": "Full Stack Developer building web platforms and fintech products.",
        "publisher": {
          "@id": "https://rohannandavdekar.com/#person"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Person",
        "@id": "https://rohannandavdekar.com/#person",
        "name": "Rohan Nandavdekar",
        "url": "https://rohannandavdekar.com",
        "jobTitle": "Full Stack Developer",
        "gender": "Male",
        "worksFor": {
          "@type": "Organization",
          "name": "Bee Creativess"
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Pimpri Chinchwad University"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "addressCountry": "India"
        },
        "email": "rohann.developer@gmail.com",
        "telephone": "+918983878718",
        "sameAs": [
          "https://github.com/rohanN8740",
          "https://www.linkedin.com/in/rohan-nandavdekar"
        ],
        "knowsAbout": [
          "Full Stack Development", "React.js", "Next.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "REST APIs", "Fintech", "Docker", "AWS", "Spring Boot", "Apache Kafka", "Redis", "Kubernetes"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://rohannandavdekar.com/#webpage",
        "url": "https://rohannandavdekar.com",
        "name": "Rohan Nandavdekar — Full Stack Developer",
        "isPartOf": {
          "@id": "https://rohannandavdekar.com/#website"
        },
        "about": {
          "@id": "https://rohannandavdekar.com/#person"
        },
        "description": "Full Stack Developer building web platforms and fintech products with React, Node.js and PostgreSQL. Based in Pune, India.",
        "inLanguage": "en-US"
      },
      {
        "@type": "ItemList",
        "name": "Shipped Projects",
        "itemListElement": [
          {
            "@type": "SoftwareApplication",
            "position": 1,
            "name": "Bhatkar & Co",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "url": "https://www.bhatkarco.com",
            "description": "A full-stack perfume e-commerce platform featuring secure payment gateway integrations via Razorpay and order tracking via Shiprocket."
          },
          {
            "@type": "SoftwareApplication",
            "position": 2,
            "name": "Pac-Wallet",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "url": "https://github.com/rohanN8740/Pac-Wallet",
            "description": "A full-stack digital wallet and fintech simulation platform featuring JWT auth and Stripe payments."
          },
          {
            "@type": "SoftwareApplication",
            "position": 3,
            "name": "Blogging Platform",
            "applicationCategory": "PublishingApplication",
            "operatingSystem": "Web",
            "url": "https://github.com/rohanN8740/Blogging-Platform",
            "description": "A responsive blogging platform with dynamic slug-based routing for SEO-friendly URLs."
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Schema.org structured data insertion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      <a href="#main" className="skip-link">Skip to content</a>

      <header>
        <nav className="nav container">
          <a href="#root" className="logo-mark"><span className="bracket">[</span>Rohan Nandavdekar<span className="bracket">]</span></a>
          <div className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`} id="navLinks">
            <a href="#work" onClick={handleNavLinkClick}>Work</a>
            <a href="#experience" onClick={handleNavLinkClick}>Experience</a>
            <a href="#skills" onClick={handleNavLinkClick}>Skills</a>
            <a href="#contact" onClick={handleNavLinkClick}>Contact</a>
            <a href="RN_Resume.pdf" download onClick={handleNavLinkClick}>Download CV ↓</a>
          </div>
          <button 
            className="nav-toggle" 
            id="navToggle" 
            aria-expanded={mobileOpen} 
            aria-controls="navLinks"
            onClick={toggleMobileNav}
          >
            Menu
          </button>
          <a 
            href="mailto:rohann.developer@gmail.com?subject=Project%20Collaboration" 
            className="nav-cta"
          >
            <span className="pulse-dot"></span>
            HIRE ME
          </a>
        </nav>
      </header>

      <main id="main">

        {/* HERO */}
        <section className="hero container" style={{ borderTop: 'none', paddingTop: 0 }}>
          <div className="hero-inner" style={{ position: 'relative', width: '100%', maxWidth: '1120px', margin: '0 auto' }}>
            <span className="eyebrow"><span className="dot"></span>Available for opportunities · Pune, India</span>
            <h1 className="display">Rohan<br />Nandavdekar<br /><em>builds full stack.</em></h1>
            <div className="hero-role">// <span id="roleText" style={{ opacity: roleOpacity, transition: 'opacity .25s ease' }}>{roles[roleIndex]}</span><span className="cursor"></span></div>
            <p className="hero-desc">Computer Science student and full stack developer who ships real products — from a fintech wallet simulation with secure transaction flows, to blogging platforms with clean, SEO-ready reading experiences. I work end to end: interface, API, database, deploy.</p>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">View projects</a>
              <a href="mailto:rohann.developer@gmail.com" className="btn btn-ghost">Get in touch</a>
            </div>

            <aside className="ledger" aria-hidden="true" style={{ right: 0 }}>
              <div className="ledger-head"><span>Session log</span><span>PUNE · IN</span></div>
              <div className="ledger-row"><span>role</span><span>full stack dev</span></div>
              <div className="ledger-row"><span>stack</span><span>react · node · pg</span></div>
              <div className="ledger-row"><span>status</span><span>b.tech · 2027</span></div>
              <div className="ledger-row"><span>focus</span><span>fintech · web apps</span></div>
              <div className="ledger-total"><span>balance</span><span>open to work</span></div>
            </aside>
          </div>
        </section>

        {/* KEY FACTS */}
        <div className="facts reveal">
          <div className="fact">
            <div className="fact-num">10<span className="unit">+</span></div>
            <div className="fact-label"> projects</div>
          </div>
          <div className="fact">
            <div className="fact-num">04</div>
            <div className="fact-label">Years toward B.Tech CSE</div>
          </div>
          <div className="fact">
            <div className="fact-num">10<span className="unit">+</span></div>
            <div className="fact-label">Core technologies</div>
          </div>
          <div className="fact">
            <div className="fact-num">01</div>
            <div className="fact-label">Full stack internship</div>
          </div>
        </div>

        {/* ABOUT */}
        <section id="about">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <span className="section-tag">01 · About</span>
                <h2 className="section-title">Clarity in the code, care in the product.</h2>
              </div>
              <p className="section-note">A snapshot of who's building this.</p>
            </div>
            <div className="about-grid">
              <div className="about-body reveal">
                <p>I'm Rohan, a Computer Science & Engineering student at Pimpri Chinchwad University, Pune, and a full stack developer who's most at home moving between frontend polish and backend logic in the same afternoon.</p>
                <p>My recent work spans a fintech wallet simulation with JWT authentication and Stripe integration, a full-stack e-commerce platform built during my internship at Bee Creativess, and a blogging platform with SEO-friendly routing. I care about secure, dependable systems as much as interfaces that feel effortless to use.</p>
                <p>Currently deepening my backend range with Spring Boot, Apache Kafka, Redis and Kubernetes — building on the REST API and infrastructure experience I already have.</p>
                <a href="RN_Resume.pdf" download className="nav-cta" style={{ display: 'inline-block', marginTop: '28px' }}>Download CV ↓</a>
              </div>
              <div className="about-side reveal">
                <dl>
                  <div className="row"><dt>Based in</dt><dd>Pune, Maharashtra, IN</dd></div>
                  <div className="row">
                    <dt>Education</dt>
                    <dd>B.Tech CSE, Pimpri Chinchwad University</dd>
                  </div>
                  <div className="row"><dt>Graduating</dt><dd>May 2027</dd></div>
                  <div className="row"><dt>Email</dt><dd><a href="mailto:rohann.developer@gmail.com">rohann.developer@gmail.com</a></dd></div>
                  <div className="row"><dt>Phone</dt><dd><a href="tel:+918983878718">+91 89838 78718</a></dd></div>
                  <div className="row"><dt>Currently learning</dt><dd>Spring Boot · Kafka</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <span className="section-tag">02 · Experience</span>
                <h2 className="section-title">Where the work happened.</h2>
              </div>
              <p className="section-note">One entry, real production impact.</p>
            </div>
            <div className="timeline reveal">
              <div className="entry">
                <div className="entry-date">JUL 2026</div>
                <div>
                  <div className="entry-role">Full Stack Developer Intern</div>
                  <div className="entry-org">Bee Creativess · Project: Bhatkar & Co — A full-stack perfume e-commerce</div>
                  <ul>
                    <li>Built and shipped RESTful APIs for user authentication, product management, shopping cart, and order processing, working across the full request lifecycle from client to database.</li>
                    <li>Designed reusable, responsive React components and collaborated with teammates through code review to keep the codebase consistent and maintainable.</li>
                    <li>Implemented input validation, structured error handling, and secure authentication to improve production reliability and reduce defects.</li>
                    <li>Diagnosed and fixed bugs across devices, and optimized cloud-based image storage and delivery to improve page load performance.</li>
                    <li>Integrated Shiprocket for order fulfillment and shipment tracking, syncing order status back to the platform to keep customers and the CRM up to date.</li>
                  </ul>
                  <div className="entry-stack">
                    <span className="tag">Express.js</span>
                    <span className="tag">Next.js</span>
                    <span className="tag">Node.js</span>
                    <span className="tag">MongoDB</span>
                    <span className="tag">Razorpay</span>
                    <span className="tag">Shiprocket</span>
                  </div>
                </div>
                <div className="entry-sidebar">
                  <div className="experience-metric-card">
                    <div className="card-head">Metrics & Impact</div>
                    <div className="card-row"><span>project</span><span>Bhatkar & Co</span></div>
                    <div className="card-row"><span>endpoints shipped</span><span>50+ RESTful APIs</span></div>
                    <div className="card-row"><span>integrations</span><span>Razorpay · Shiprocket</span></div>
                    <div className="card-row"><span>code reviews</span><span>Peer approved</span></div>
                    <div className="card-row"><span>tenure</span><span>JUL 2026</span></div>
                    <div className="card-row text-highlight"><span>impact status</span><span>100% Shipped</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="work">
          <div className="container">
            <div className="section-head reveal" style={{ alignItems: 'flex-start' }}>
              <div>
                <span className="section-tag">03 · Selected work</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 400, marginTop: '8px' }}>Two builds, end to end.</h2>
              </div>
              <p className="section-desc-right" style={{
                maxWidth: '46ch',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--paper-dim)',
                lineHeight: 1.6,
                marginTop: '18px',
                opacity: 0.85
              }}>
                Interface through to database.
              </p>
            </div>
            <div className="projects reveal">
              <div className="project-row">
                <div className="project-meta-col">
                  <span className="project-index">01 / E-Commerce</span>
                  <h3 className="project-title">Bhatkar & Co</h3>
                </div>
                <div className="project-info-col">
                  <p className="project-desc">A full-stack perfume e-commerce platform featuring secure payment gateway integrations, order status tracking, and cart processing. Users browse products, checkout securely via Razorpay, and track order shipments via Shiprocket logistics.</p>
                  <div className="project-stack">
                    <span className="tag">Next.js</span>
                    <span className="tag">Node.js</span>
                    <span className="tag">Express.js</span>
                    <span className="tag">MongoDB</span>
                    <span className="tag">Razorpay</span>
                    <span className="tag">Shiprocket</span>
                  </div>
                  <a href="https://www.bhatkarco.com" target="_blank" rel="noopener noreferrer" className="project-link">Visit Website <span>↗</span></a>
                </div>
              </div>

              <div className="project-row">
                <div className="project-meta-col">
                  <span className="project-index">02 / Fintech</span>
                  <h3 className="project-title">Pac-Wallet</h3>
                </div>
                <div className="project-info-col">
                  <p className="project-desc">A full-stack digital wallet and fintech simulation platform. Users securely manage balances, send peer-to-peer transfers, and track transaction history through a responsive interface — backed by JWT auth, HTTP-only cookies, bcrypt hashing and Stripe sandbox payments.</p>
                  <div className="project-stack">
                    <span className="tag">Node.js</span>
                    <span className="tag">Express.js</span>
                    <span className="tag">React.js</span>
                    <span className="tag">MongoDB</span>
                    <span className="tag">Stripe</span>
                  </div>
                  <a href="https://github.com/rohanN8740/Pac-Wallet" target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub <span>↗</span></a>
                </div>
              </div>

              <div className="project-row">
                <div className="project-meta-col">
                  <span className="project-index">03 / Publishing</span>
                  <h3 className="project-title">Blogging Platform</h3>
                </div>
                <div className="project-info-col">
                  <p className="project-desc">A responsive blogging platform with full CRUD, dynamic slug-based routing for SEO-friendly URLs, and a search feature to filter posts by title and keyword. State is managed with React Hooks and persisted across sessions via local storage.</p>
                  <div className="project-stack">
                    <span className="tag">Next.js</span>
                    <span className="tag">React.js</span>
                    <span className="tag">JavaScript</span>
                    <span className="tag">Bootstrap</span>
                  </div>
                  <a href="https://github.com/rohanN8740/Blogging-Platform" target="_blank" rel="noopener noreferrer" className="project-link">View on GitHub <span>↗</span></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <span className="section-tag">04 · Skills</span>
                <h2 className="section-title">The stack, itemized.</h2>
              </div>
              <p className="section-note">Grouped like an inventory ledger sheet.</p>
            </div>

            <div className="reveal">
              <table className="skills-ledger">
                <thead>
                  <tr>
                    <th className="category-col">Category</th>
                    <th className="tech-col">Technologies</th>
                    <th className="detail-col">Sub-context & Tools</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="category-col">Languages</td>
                    <td className="tech-col">Java, JavaScript, TypeScript, Python, HTML, CSS</td>
                    <td className="detail-col">SQL (MySQL, PostgreSQL)</td>
                  </tr>
                  <tr>
                    <td className="category-col">Frameworks & Libraries</td>
                    <td className="tech-col">React, Node.js, Express.js, Next.js, Tailwind</td>
                    <td className="detail-col">Responsive styling & MVC backends</td>
                  </tr>
                  <tr>
                    <td className="category-col">Databases & Cloud</td>
                    <td className="tech-col">PostgreSQL, MySQL, MongoDB, AWS</td>
                    <td className="detail-col">S3, DynamoDB, Lambda, API Gateway</td>
                  </tr>
                  <tr>
                    <td className="category-col">Developer Tools</td>
                    <td className="tech-col">Git & GitHub workflows, Docker, Postman</td>
                    <td className="detail-col">Containers & CI/CD workflows</td>
                  </tr>
                  <tr>
                    <td className="category-col">Software Engineering</td>
                    <td className="tech-col">REST API design, unit testing (Jest), Agile/Scrum basics</td>
                    <td className="detail-col">Code review, secure coding practices</td>
                  </tr>
                  <tr>
                    <td className="category-col">Core CS</td>
                    <td className="tech-col">Data Structures & Algorithms, OOP, Operating Systems, DBMS, Computer Networks</td>
                    <td className="detail-col">Academic core syllabus</td>
                  </tr>
                  <tr>
                    <td className="category-col">Currently Learning</td>
                    <td className="tech-col">Spring Boot, Apache Kafka, Redis</td>
                    <td className="detail-col">Kubernetes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        {/* CONTACT */}
        <footer id="contact">
          <div className="container" style={{ position: 'relative' }}>
            <div className="contact-section-layout reveal">
              <div className="contact-info-col">
                <span className="section-tag">05 · Contact</span>
                <h2 className="contact-title">Have a project<br />in mind? <em>Let's build it.</em></h2>
                <p className="contact-subtitle">
                  Have an upcoming project, architecture query, or want to discuss full-stack & fintech builds? Send a message or drop an email.
                </p>
              </div>

              <div className="contact-form-col">
                <ContactForm />
              </div>
            </div>

            {/* Footer Navigation & Columns */}
            <div className="main-footer-grid reveal">
              <div className="footer-col footer-col-brand">
                <div className="footer-logo">Rohan Nandavdekar</div>
                <p className="footer-bio">
                  Full-stack developer & CS undergrad building fast, thoughtful digital experiences from India, for clients worldwide.
                </p>
              </div>

              <div className="footer-col">
                <div className="footer-heading">SITEMAP</div>
                <ul className="footer-links">
                  <li><a href="#root">Home</a></li>
                  <li><a href="#work">Work</a></li>
                  <li><a href="#skills">About</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <div className="footer-heading">CONNECT</div>
                <ul className="footer-links">
                  <li><a href="https://github.com/rohanN8740" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                  <li><a href="https://www.linkedin.com/in/rohan-nandavdekar" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <div className="footer-heading">DIRECT</div>
                <ul className="footer-links">
                  <li><a href="mailto:rohann.developer@gmail.com">Email me</a></li>
                  <li><a href="tel:+918983878718">+91 89838 78718</a></li>
                </ul>
              </div>
            </div>

            <div className="foot-bottom">
              <span>© 2026 Rohan Nandavdekar. All rights reserved.</span>
              <span>Pune, Maharashtra, India</span>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
