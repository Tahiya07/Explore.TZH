import Link from "next/link";
import ScrollEffects from "./scroll-effects";
import NeuralOrbit from "@/components/NeuralOrbit";

const projects = [
  {
    number: "01",
    type: "THESIS · OFFLINE AI · RAG",
    title: "EduGuard",
    summary:
      "A privacy-conscious academic assistant designed to run locally. It combines document ingestion, semantic retrieval, Bloom’s taxonomy classification, and guided learning workflows.",
    details: ["Qwen2.5", "FAISS + BGE-small", "llama.cpp", "FedProx"],
    href: "https://github.com/Tahiya07/Eduguard",
    accent: "blue",
  },
  {
    number: "02",
    type: "UNIVERSITY · RAG · NEXT.JS",
    title: "UAP CSE Assistant",
    summary:
      "A department-focused assistant that retrieves information from a curated knowledge base to help students navigate Computer Science and Engineering resources.",
    details: ["Next.js", "RAG", "BGE embeddings", "Capacitor"],
    href: "https://github.com/Tahiya07/Web-scraping",
    accent: "violet",
  },
  {
    number: "03",
    type: "INTERNSHIP · RULE-BASED CHATBOT",
    title: "Elio",
    summary:
      "A rule-based chatbot experience built as an internship project, with a responsive interface and a path to web and Android delivery without relying on a hosted LLM.",
    details: ["React", "TypeScript", "Next.js", "Capacitor"],
    href: "https://github.com/Tahiya07/DecodeLabs-Internship",
    accent: "magenta",
  },
];

const capabilities = [
  {
    index: "01",
    title: "AI / ML",
    text: "LLMs, retrieval-augmented generation, deep learning, evaluation, and federated learning.",
  },
  {
    index: "02",
    title: "SOFTWARE",
    text: "Full-stack interfaces, APIs, application architecture, and practical deployment.",
  },
  {
    index: "03",
    title: "RESEARCH",
    text: "Comparative experiments, model adaptation, reproducibility, and evidence-led iteration.",
  },
];

const technologies = [
  "Python",
  "PyTorch",
  "Transformers",
  "FAISS",
  "llama.cpp",
  "FastAPI",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Capacitor",
  "Git",
];

export default function Home() {
  return (
    <main className="portfolio">
      <ScrollEffects />

      <header className="site-header">
        <Link className="wordmark" href="#home" aria-label="Tahiya Zareen home">
          <span className="wordmark-mark">TZ</span>
          <span className="wordmark-copy">
            TAHIYA ZAREEN
            <small>AI / ML · SOFTWARE</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <Link href="#work">WORK</Link>
          <Link href="#research">RESEARCH</Link>
          <Link href="#about">ABOUT</Link>
          <Link href="#contact">CONTACT</Link>
        </nav>

        <a
          className="header-link"
          href="https://github.com/Tahiya07"
          target="_blank"
          rel="noreferrer"
        >
          GITHUB <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-grid">
          <div className="hero-copy" data-reveal>
            <div className="hero-kicker">
              <span className="status-dot" />
              BUILDING WITH MODELS, DATA & CODE
            </div>

            <p className="eyebrow">TAHIYA ZAREEN HIYA / 2026</p>

            <h1 className="hero-title">
              <span className="hero-line hero-line-one">AI/ML</span>
              <span className="hero-line hero-line-two">ENGINEER</span>
              <span className="hero-line hero-line-three">&amp; DEVELOPER.</span>
            </h1>

            <p className="hero-description">
              I build intelligent systems where machine learning research,
              software engineering, and human-facing interfaces meet.
            </p>

            <div className="hero-actions">
              <a className="hero-action hero-action-primary" href="#work">
                EXPLORE THE WORK <span>↓</span>
              </a>
              <Link className="hero-action hero-action-secondary" href="/lab">
                ENTER THE 3D LAB <span>↗</span>
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <NeuralOrbit />
            <div className="hero-visual-label hero-visual-label-top">
              <span>NEURAL FIELD</span>
              <span>01 / 01</span>
            </div>
            <div className="hero-visual-label hero-visual-label-bottom">
              <span>MODELS → SYSTEMS</span>
              <span className="hero-visual-pulse" />
              <span>LOCAL · OPEN · EXPERIMENTAL</span>
            </div>
          </div>
        </div>

        <div className="hero-bottomline" data-reveal>
          <span>SELECTED WORK / RESEARCH / EXPERIMENTS</span>
          <span className="hero-scroll">
            <i />
            SCROLL TO EXPLORE
          </span>
          <span>DHAKA, BANGLADESH</span>
        </div>
      </section>

      <section className="intro-section section-wrap" data-reveal>
        <div className="section-marker">
          <span>00</span>
          <i />
          ORIENTATION
        </div>
        <div className="intro-copy">
          <p>
            The portfolio is a map of systems I’ve built — from lightweight
            language models and local retrieval pipelines to real products
            shipped for the web and mobile.
          </p>
        </div>
        <div className="intro-side">
          <span>RESEARCH MINDED</span>
          <span>ENGINEERING LED</span>
        </div>
      </section>

      <section className="work-section section-wrap" id="work">
        <div className="section-header" data-reveal>
          <div>
            <span className="section-marker">
              <span>01</span>
              <i />
              SELECTED SYSTEMS
            </span>
            <h2>
              Things I’ve
              <br />
              <em>built.</em>
            </h2>
          </div>
          <p>
            Three projects across academic AI, retrieval systems, and
            interactive software.
          </p>
        </div>

        <div className="system-stack">
          {projects.map((project, index) => (
            <article
              className="system-project"
              key={project.number}
              data-reveal
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <div className={`system-visual system-visual-${project.accent}`}>
                <div className="system-noise" />
                <div className="system-grid" />
                <div className="system-orbit system-orbit-main" />
                <div className="system-orbit system-orbit-alt" />
                <div className="system-orbit-node" />
                <span className="system-code">{project.number}</span>
                <span className="system-visual-caption">
                  {index === 0
                    ? "LOCAL INTELLIGENCE"
                    : index === 1
                      ? "KNOWLEDGE RETRIEVAL"
                      : "CONVERSATIONAL LOGIC"}
                </span>
              </div>

              <div className="system-content">
                <div className="system-meta">
                  <span>{project.type}</span>
                  <span>{project.number} / 03</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="system-footer">
                  <div className="system-tags">
                    {project.details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                  <a
                    className="system-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    SOURCE <span>↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section" id="research">
        <div className="research-glow" aria-hidden="true" />
        <div className="section-wrap research-layout" data-reveal>
          <div>
            <span className="section-marker">
              <span>02</span>
              <i />
              RESEARCH
            </span>
            <h2>
              Small models.
              <br />
              <em>Real constraints.</em>
            </h2>
          </div>

          <div className="research-body">
            <p className="research-lead">
              My current academic work explores lightweight multimodal
              language-model systems for privacy-conscious academic assistance
              in university environments.
            </p>
            <p>
              The work brings together local inference, document
              understanding, semantic retrieval, Bloom’s taxonomy
              classification, and model evaluation under practical resource
              constraints.
            </p>
            <div className="research-spec">
              <span>THESIS</span>
              <p>
                A Lightweight Multi-Modal Tiny LLM Framework for
                Privacy-Preserving Academic Assistance in University
                Environments
              </p>
            </div>
            <a
              className="hero-action hero-action-secondary"
              href="https://github.com/Tahiya07/Eduguard"
              target="_blank"
              rel="noreferrer"
            >
              VIEW IMPLEMENTATION <span>↗</span>
            </a>
          </div>
        </div>

        <div className="research-orbit" aria-hidden="true">
          <span />
          <span />
          <b>TZ</b>
        </div>
      </section>

      <section className="about-section section-wrap" id="about">
        <div className="section-header" data-reveal>
          <div>
            <span className="section-marker">
              <span>03</span>
              <i />
              CAPABILITIES
            </span>
            <h2>
              From model
              <br />
              <em>to product.</em>
            </h2>
          </div>
          <p>
            I enjoy moving between model behaviour, system architecture, and
            the interface that makes a tool understandable.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability" key={item.index} data-reveal>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>

        <div className="technology-map" data-reveal>
          <span className="section-marker">
            <span>04</span>
            <i />
            TOOLKIT
          </span>
          <div className="technology-list">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-section" data-reveal>
        <div className="lab-section-field" aria-hidden="true">
          <div />
          <div />
          <div />
        </div>
        <div className="section-wrap lab-section-inner">
          <div>
            <span className="section-marker">
              <span>05</span>
              <i />
              IMMERSIVE MODE
            </span>
            <h2>
              Step inside
              <br />
              <em>the lab.</em>
            </h2>
          </div>
          <Link className="lab-launch" href="/lab">
            <span>
              ENTER 3D LAB
              <small>EXPLORE THE PORTFOLIO AS A SPACE</small>
            </span>
            <b>↗</b>
          </Link>
        </div>
      </section>

      <footer className="site-footer section-wrap" id="contact" data-reveal>
        <span className="section-marker">
          <span>06</span>
          <i />
          OPEN CHANNEL
        </span>
        <h2>
          Let’s build
          <br />
          something <em>useful.</em>
        </h2>
        <div className="footer-line">
          <p>
            Interested in AI engineering, research, or building software with
            a real purpose? Let’s connect.
          </p>
          <a
            className="system-link"
            href="https://github.com/Tahiya07"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB <span>↗</span>
          </a>
          <span>TZH © 2026</span>
        </div>
      </footer>
    </main>
  );
}
