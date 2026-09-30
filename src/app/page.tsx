import Link from "next/link";

const projects = [
  {
    number: "01",
    type: "THESIS · OFFLINE AI · RAG",
    title: "EduGuard",
    summary:
      "A privacy-conscious academic assistant designed to run locally. It combines document ingestion, semantic retrieval, Bloom’s taxonomy classification, and guided learning workflows.",
    details: ["Qwen2.5", "FAISS + BGE-small", "llama.cpp", "FedProx"],
    href: "https://github.com/Tahiya07/Eduguard",
    label: "VIEW SOURCE",
    featured: true,
  },
  {
    number: "02",
    type: "UNIVERSITY · RAG · NEXT.JS",
    title: "UAP CSE Assistant",
    summary:
      "A department-focused assistant that retrieves information from a curated knowledge base to help students navigate Computer Science and Engineering resources.",
    details: ["Next.js", "Retrieval-augmented generation", "BGE embeddings", "Capacitor"],
    href: "https://github.com/Tahiya07/Web-scraping",
    label: "VIEW SOURCE",
  },
  {
    number: "03",
    type: "INTERNSHIP PROJECT · CHATBOT",
    title: "Elio",
    summary:
      "A rule-based chatbot experience built as an internship project, with a responsive interface and a path to web and Android delivery—without relying on a hosted LLM.",
    details: ["React", "TypeScript", "Next.js", "Capacitor"],
    href: "https://github.com/Tahiya07/DecodeLabs-Internship",
    label: "VIEW SOURCE",
  },
];

const capabilities = [
  { title: "AI & MACHINE LEARNING", text: "LLMs, retrieval-augmented generation, deep learning, model evaluation, and federated learning." },
  { title: "SOFTWARE ENGINEERING", text: "Full-stack interfaces, API integration, practical application architecture, and deployment." },
  { title: "RESEARCH & EXPERIMENTS", text: "Comparative evaluation, reproducible experiments, model adaptation, and evidence-led iteration." },
];

const technologies = [
  "Python", "PyTorch", "Transformers", "FAISS", "llama.cpp", "FastAPI",
  "TypeScript", "React", "Next.js", "Node.js", "Capacitor", "Git",
];

export default function Home() {
  return (
    <main className="portfolio">
      <header className="site-header">
        <Link className="wordmark" href="#home" aria-label="Tahiya Zareen home">
          <span className="wordmark-mark">TZ</span>
          <span>TAHIYA ZAREEN <small>ENGINEERING PORTFOLIO</small></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="#work">Work</Link>
          <Link href="#research">Research</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        <a className="header-link" href="https://github.com/Tahiya07" target="_blank" rel="noreferrer">
          GITHUB <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-topline">
          <span><i className="status-dot" /> AI / ML ENGINEERING · SOFTWARE DEVELOPMENT</span>
          <span className="hero-index">PORTFOLIO — 2026</span>
        </div>
        <div className="hero-title-wrap">
          <p className="eyebrow">HELLO, I’M TAHIYA</p>
          <h1 className="hero-title"><span>BUILDING</span><span className="hero-title-second">INTELLIGENT<span className="title-period">.</span></span><span>SYSTEMS<span className="title-outline"> THAT MATTER</span></span></h1>
          <div className="hero-aside">
            <span className="aside-rule" />
            <p>I work across machine learning, language technologies, and software engineering—turning experiments into useful, thoughtfully designed systems.</p>
            <a className="text-link" href="#work">EXPLORE SELECTED WORK <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-bottom">
          <span>RESEARCH-MINDED. ENGINEERING-LED.</span>
          <span className="scroll-note"><span className="scroll-line" /> SCROLL TO EXPLORE</span>
          <span>DHAKA, BANGLADESH</span>
        </div>
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-crosshair" aria-hidden="true">+</div>
      </section>

      <section className="intro-band">
        <div className="section-wrap intro-band-inner">
          <p className="eyebrow">01 / THE APPROACH</p>
          <p className="intro-statement">Good engineering connects <span>research, responsible implementation,</span> and the experience of the person using the product.</p>
          <span className="intro-symbol" aria-hidden="true">↘</span>
        </div>
      </section>

      <section className="work-section section-wrap" id="work">
        <div className="section-heading">
          <div><p className="eyebrow">02 / SELECTED WORK</p><h2>Made to <em>solve.</em></h2></div>
          <p className="section-note">A selection of research and software projects. Each project links to its source repository for technical details.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.featured ? "project-card-featured" : ""}`} key={project.number}>
              <div className="project-visual" aria-hidden="true">
                <div className={`visual-art visual-art-${project.number}`}>
                  {project.number === "01" ? <><span className="art-node node-a" /><span className="art-node node-b" /><span className="art-node node-c" /><span className="art-link link-a" /><span className="art-link link-b" /><span className="art-core">E</span><span className="art-caption">LOCAL / RETRIEVAL / GENERATION</span></> :
                   project.number === "02" ? <><span className="art-window"><i /><i /><i /><b>UAP / CSE</b><small>KNOWLEDGE → ANSWERS</small></span><span className="art-grid" /></> :
                   <><span className="elio-orbit elio-orbit-a" /><span className="elio-orbit elio-orbit-b" /><span className="elio-core">e.</span><span className="art-caption">RULE-BASED CONVERSATION</span></>}
                </div>
                <span className="project-number">{project.number}</span>
              </div>
              <div className="project-info">
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <ul className="tag-list">{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                <a className="project-link" href={project.href} target="_blank" rel="noreferrer">{project.label} <span aria-hidden="true">↗</span></a>
              </div>
              <span className="project-index" aria-hidden="true">{project.number} / 03</span>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section" id="research">
        <div className="section-wrap research-inner">
          <div className="research-heading">
            <p className="eyebrow">03 / RESEARCH DIRECTION</p>
            <h2>Small models.<br /><em>Real constraints.</em></h2>
          </div>
          <div className="research-copy">
            <p className="research-lead">My current academic work explores lightweight multimodal language-model systems for privacy-conscious academic assistance in university environments.</p>
            <p>The work brings together local inference, document understanding, semantic retrieval, Bloom’s taxonomy classification, and evaluation of model behavior under practical resource constraints.</p>
            <div className="research-meta"><span>THESIS</span><span>A Lightweight Multi-Modal Tiny LLM Framework for Privacy-Preserving Academic Assistance in University Environments</span></div>
            <a className="text-link" href="https://github.com/Tahiya07/Eduguard" target="_blank" rel="noreferrer">EXPLORE THE IMPLEMENTATION <span aria-hidden="true">↗</span></a>
          </div>
          <div className="research-stamp" aria-hidden="true"><span>LOCAL FIRST</span><b>AI</b><span>MEASURE WHAT MATTERS</span></div>
        </div>
      </section>

      <section className="capabilities-section section-wrap" id="about">
        <div className="section-heading">
          <div><p className="eyebrow">04 / HOW I WORK</p><h2>Curious by nature.<br /><em>Precise by practice.</em></h2></div>
          <p className="section-note">I enjoy moving between model behavior, system architecture, and the interface that makes a tool understandable.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item, index) => <article className="capability-card" key={item.title}><span className="capability-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><span className="capability-arrow" aria-hidden="true">↗</span></article>)}
        </div>
        <div className="technology-row"><p className="eyebrow">TOOLS IN MY WORKFLOW</p><ul>{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
      </section>

      <section className="lab-invite">
        <div className="section-wrap lab-invite-inner">
          <div><p className="eyebrow">A DIFFERENT WAY TO EXPLORE</p><h2>Step inside<br /><em>the lab.</em></h2><p>The original interactive 3D laboratory is still here—now as an optional, immersive view of the portfolio.</p></div>
          <Link className="lab-launch" href="/lab"><span className="lab-launch-icon">↗</span><span>ENTER THE 3D LAB<small>IMMERSIVE EXPERIENCE</small></span></Link>
          <div className="lab-rings" aria-hidden="true"><i /><i /><i /><b>TZ</b></div>
        </div>
      </section>

      <footer className="site-footer section-wrap" id="contact">
        <p className="eyebrow">05 / OPEN CHANNEL</p>
        <h2>Have a thoughtful<br />problem to <em>solve?</em></h2>
        <div className="footer-bottom"><p>Interested in AI engineering, research, or building useful software? I’d be glad to connect.</p><a className="footer-contact" href="https://github.com/Tahiya07" target="_blank" rel="noreferrer">LET’S CONNECT <span aria-hidden="true">↗</span></a><span className="footer-mark">TZH © 2026</span></div>
      </footer>
    </main>
  );
}
