import { useEffect, useMemo, useState } from "react";

const GITHUB_USERNAME = "sumitnode";

const styles = `
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
  }

  .pf {
    --ink: #0e1013;
    --panel: #15181f;
    --panel-2: #1b1f28;
    --line: #292f3a;
    --paper: #ece9e2;
    --mist: #8b92a0;
    --signal: #4fd1c5;
    --amber: #f0b24a;
    --danger: #ff7b7b;
    --max: 1180px;

    min-height: 100vh;
    background: var(--ink);
    color: var(--paper);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.5;
  }

  .pf * {
    box-sizing: border-box;
  }

  .pf a {
    color: inherit;
    text-decoration: none;
  }

  .pf button,
  .pf input,
  .pf select {
    font: inherit;
  }

  /* BACKGROUND */

  .pf-bg-grid {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(236, 233, 226, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(236, 233, 226, 0.025) 1px, transparent 1px);
    background-size: 45px 45px;
    mask-image: radial-gradient(
      ellipse 80% 60% at 50% 0%,
      black 20%,
      transparent 90%
    );
  }

  .pf section {
    max-width: var(--max);
    margin: 0 auto;
    padding: 100px 24px;
    position: relative;
    z-index: 1;
  }

  .pf-eyebrow {
    color: var(--signal);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 13px;
    margin: 0 0 18px;
    letter-spacing: 0.04em;
  }

  .pf-section-title {
    font-size: clamp(30px, 4vw, 48px);
    margin: 0 0 16px;
    letter-spacing: -0.04em;
  }

  .pf-section-description {
    color: var(--mist);
    max-width: 650px;
    margin: 0;
    font-size: 16px;
  }

  /* NAVBAR */

  .pf-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    background: rgba(14, 16, 19, 0.82);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--line);
  }

  .pf-nav__mark {
    font-weight: 700;
    letter-spacing: -0.03em;
    font-size: 18px;
  }

  .pf-nav__dot {
    color: var(--signal);
  }

  .pf-nav__links {
    display: flex;
    gap: 30px;
    color: var(--mist);
    font-size: 14px;
  }

  .pf-nav__links a:hover {
    color: var(--paper);
  }

  .pf-nav__cta {
    border: 1px solid var(--line);
    padding: 9px 16px;
    border-radius: 6px;
    font-size: 14px;
    transition: 0.2s;
  }

  .pf-nav__cta:hover {
    border-color: var(--signal);
    color: var(--signal);
  }

  .pf-nav__toggle {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--paper);
    font-size: 22px;
  }

  .pf-mobile-menu {
    display: none;
  }

  /* HERO */

  .pf-hero {
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .pf-hero__badge {
    width: fit-content;
    color: var(--signal);
    border: 1px solid rgba(79, 209, 197, 0.3);
    background: rgba(79, 209, 197, 0.06);
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 13px;
    margin-bottom: 28px;
  }

  .pf-hero__title {
    font-size: clamp(48px, 7vw, 82px);
    line-height: 1.02;
    letter-spacing: -0.06em;
    max-width: 900px;
    margin: 0 0 25px;
  }

  .pf-hero__title span {
    color: var(--signal);
  }

  .pf-hero__lede {
    max-width: 680px;
    color: var(--mist);
    font-size: 18px;
    line-height: 1.7;
    margin: 0 0 32px;
  }

  .pf-hero__actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 55px;
  }

  .pf-btn {
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 14px;
    transition: 0.2s;
  }

  .pf-btn--primary {
    background: var(--signal);
    color: var(--ink);
    font-weight: 700;
  }

  .pf-btn--primary:hover {
    transform: translateY(-2px);
  }

  .pf-btn--ghost {
    border: 1px solid var(--line);
    color: var(--paper);
  }

  .pf-btn--ghost:hover {
    border-color: var(--mist);
  }

  .pf-hero__facts {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
    margin: 0;
  }

  .pf-hero__facts div {
    min-width: 120px;
  }

  .pf-hero__facts dt {
    color: var(--mist);
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .pf-hero__facts dd {
    margin: 0;
    font-size: 15px;
  }

  .pf-status-live {
    color: var(--signal);
  }

  /* STACK */

  .pf-stack__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-top: 40px;
  }

  .pf-stack__group {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 24px;
  }

  .pf-stack__group h3 {
    color: var(--signal);
    font-size: 13px;
    margin: 0 0 18px;
    font-family: ui-monospace, monospace;
    font-weight: 500;
  }

  .pf-stack__group ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .pf-stack__group li {
    padding: 8px 0;
    color: var(--paper);
    font-size: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .pf-stack__group li:last-child {
    border-bottom: none;
  }

  /* PROJECTS */

  .pf-project-controls {
    display: flex;
    gap: 12px;
    margin: 40px 0 28px;
    flex-wrap: wrap;
  }

  .pf-search,
  .pf-filter {
    background: var(--panel);
    border: 1px solid var(--line);
    color: var(--paper);
    border-radius: 7px;
    padding: 12px 14px;
    outline: none;
  }

  .pf-search {
    flex: 1;
    min-width: 220px;
  }

  .pf-filter {
    min-width: 160px;
  }

  .pf-search:focus,
  .pf-filter:focus {
    border-color: var(--signal);
  }

  .pf-project-count {
    color: var(--mist);
    font-size: 14px;
    margin-bottom: 22px;
  }

  .pf-projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  .pf-project {
    display: flex;
    flex-direction: column;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .pf-project:hover {
    transform: translateY(-4px);
    border-color: rgba(79, 209, 197, 0.5);
  }

  .pf-project__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 18px;
    background: var(--panel-2);
    border-bottom: 1px solid var(--line);
  }

  .pf-project__id {
    color: var(--mist);
    font-family: ui-monospace, monospace;
    font-size: 11px;
  }

  .pf-project__status {
    color: var(--signal);
    font-size: 11px;
    border: 1px solid rgba(79, 209, 197, 0.25);
    padding: 4px 9px;
    border-radius: 999px;
  }

  .pf-project__body {
    padding: 22px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .pf-project__body h3 {
    font-size: 22px;
    letter-spacing: -0.02em;
    margin: 0 0 10px;
  }

  .pf-project__body p {
    color: var(--mist);
    font-size: 14px;
    line-height: 1.7;
    margin: 0 0 24px;
    min-height: 72px;
  }

  .pf-project__stats {
    display: flex;
    gap: 16px;
    color: var(--mist);
    font-size: 13px;
    margin-bottom: 20px;
  }

  .pf-project__stats span {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .pf-project__links {
    display: flex;
    gap: 18px;
    margin-top: auto;
    padding-top: 18px;
    border-top: 1px solid var(--line);
  }

  .pf-link-arrow {
    color: var(--signal);
    font-size: 14px;
  }

  .pf-link-arrow::after {
    content: " →";
  }

  .pf-link-arrow:hover {
    text-decoration: underline;
  }

  .pf-message {
    grid-column: 1 / -1;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 30px;
    color: var(--mist);
    text-align: center;
  }

  .pf-error {
    color: var(--danger);
  }

  /* ABOUT */

  .pf-about__grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 60px;
    margin-top: 35px;
  }

  .pf-about__text {
    color: var(--mist);
    font-size: 16px;
    line-height: 1.8;
    margin: 0;
  }

  .pf-timeline {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .pf-timeline li {
    display: flex;
    gap: 16px;
    padding: 16px 0;
    border-top: 1px solid var(--line);
    color: var(--paper);
    font-size: 14px;
  }

  .pf-timeline__year {
    color: var(--signal);
    min-width: 85px;
    font-family: ui-monospace, monospace;
  }

  /* CONTACT */

  .pf-contact__title {
    font-size: clamp(30px, 4vw, 46px);
    max-width: 650px;
    margin: 0 0 40px;
    letter-spacing: -0.04em;
  }

  .pf-contact__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
    flex-wrap: wrap;
    border-top: 1px solid var(--line);
    padding-top: 28px;
  }

  .pf-contact__primary {
    color: var(--signal);
    font-size: 19px;
    font-family: ui-monospace, monospace;
  }

  .pf-contact__socials {
    display: flex;
    gap: 24px;
    color: var(--mist);
    font-size: 14px;
  }

  .pf-contact__socials a:hover {
    color: var(--paper);
  }

  /* FOOTER */

  .pf-footer {
    max-width: var(--max);
    margin: 0 auto;
    padding: 30px 24px 50px;
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    gap: 15px;
    color: var(--mist);
    font-size: 13px;
    position: relative;
    z-index: 1;
  }

  /* RESPONSIVE */

  @media (max-width: 900px) {
    .pf-stack__grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .pf-projects-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .pf section {
      padding: 75px 20px;
    }

    .pf-nav {
      padding: 0 20px;
    }

    .pf-nav__links,
    .pf-nav__cta {
      display: none;
    }

    .pf-nav__toggle {
      display: block;
    }

    .pf-mobile-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      z-index: 99;
      background: var(--panel);
      border-bottom: 1px solid var(--line);
      flex-direction: column;
    }

    .pf-mobile-menu.open {
      display: flex;
    }

    .pf-mobile-menu a {
      padding: 16px 20px;
      border-bottom: 1px solid var(--line);
      color: var(--mist);
    }

    .pf-about__grid {
      grid-template-columns: 1fr;
      gap: 35px;
    }
  }

  @media (max-width: 520px) {
    .pf-stack__grid {
      grid-template-columns: 1fr;
    }

    .pf-hero__title {
      font-size: 46px;
    }

    .pf-hero__facts {
      gap: 25px;
    }

    .pf-footer {
      flex-direction: column;
    }
  }
`;

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const navLinks = [
    { href: "#work", label: "Projects" },
    { href: "#stack", label: "Stack" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );

        if (!response.ok) {
          throw new Error("Could not load GitHub projects.");
        }

        const data = await response.json();

        // Only show original public repositories, not forks.
        const originalProjects = data.filter((repo) => !repo.fork);

        setRepos(originalProjects);
      } catch (err) {
        setError("Unable to load GitHub projects right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  const languages = useMemo(() => {
    const uniqueLanguages = [
      ...new Set(
        repos
          .map((repo) => repo.language)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueLanguages.sort()];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        (repo.description || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesLanguage =
        selectedLanguage === "All" ||
        repo.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    });
  }, [repos, search, selectedLanguage]);

  return (
    <div className="pf">
      <style>{styles}</style>

      <div className="pf-bg-grid" aria-hidden="true" />

      {/* NAVBAR */}
      <header className="pf-nav">
        <a href="#top" className="pf-nav__mark">
          SUMIT<span className="pf-nav__dot">.</span>
        </a>

        <nav className="pf-nav__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="pf-nav__cta">
          Get in touch
        </a>

        <button
          className="pf-nav__toggle"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </header>

      <div className={`pf-mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>

      <main id="top">
        {/* HERO */}
        <section className="pf-hero">
          <div className="pf-hero__badge">
            ● Available for internship opportunities
          </div>

          <h1 className="pf-hero__title">
            Building reliable <span>backend systems</span> for the web.
          </h1>

          <p className="pf-hero__lede">
            I'm Sumit Kumar, a backend-focused developer building practical web
            applications with Node.js, Express, MongoDB, and React.
          </p>

          <div className="pf-hero__actions">
            <a href="#work" className="pf-btn pf-btn--primary">
              Explore my projects
            </a>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="pf-btn pf-btn--ghost"
            >
              View GitHub
            </a>
          </div>

          <dl className="pf-hero__facts">
            <div>
              <dt>location</dt>
              <dd>India</dd>
            </div>

            <div>
              <dt>focus</dt>
              <dd>Backend / MERN</dd>
            </div>

            <div>
              <dt>GitHub</dt>
              <dd>{repos.length || "—"} projects</dd>
            </div>
          </dl>
        </section>

        {/* STACK */}
        <section id="stack">
          <p className="pf-eyebrow">// stack.json</p>

          <h2 className="pf-section-title">
            Technologies I work with.
          </h2>

          <div className="pf-stack__grid">
            <div className="pf-stack__group">
              <h3>runtime & server</h3>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>REST APIs</li>
                <li>Authentication</li>
              </ul>
            </div>

            <div className="pf-stack__group">
              <h3>database</h3>
              <ul>
                <li>MongoDB</li>
                <li>Mongoose</li>
                <li>Schema Design</li>
                <li>Database Queries</li>
              </ul>
            </div>

            <div className="pf-stack__group">
              <h3>frontend</h3>
              <ul>
                <li>React</li>
                <li>JavaScript</li>
                <li>React Router</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>

            <div className="pf-stack__group">
              <h3>tooling</h3>
              <ul>
                <li>Git & GitHub</li>
                <li>Postman</li>
                <li>VS Code</li>
                <li>Deployment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="work">
          <p className="pf-eyebrow">// github.projects()</p>

          <h2 className="pf-section-title">
            Things I've built.
          </h2>

          <p className="pf-section-description">
            These projects are loaded directly from my GitHub profile. New public
            repositories can automatically appear here.
          </p>

          <div className="pf-project-controls">
            <input
              className="pf-search"
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="pf-filter"
              value={selectedLanguage}
              onChange={(event) =>
                setSelectedLanguage(event.target.value)
              }
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          {!loading && !error && (
            <p className="pf-project-count">
              Showing {filteredRepos.length} of {repos.length} projects
            </p>
          )}

          <div className="pf-projects-grid">
            {loading && (
              <div className="pf-message">
                Loading projects from GitHub...
              </div>
            )}

            {error && (
              <div className="pf-message pf-error">
                {error}
              </div>
            )}

            {!loading &&
              !error &&
              filteredRepos.map((repo, index) => (
                <article className="pf-project" key={repo.id}>
                  <div className="pf-project__meta">
                    <span className="pf-project__id">
                      PROJECT_{String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="pf-project__status">
                      {repo.language || "Repository"}
                    </span>
                  </div>

                  <div className="pf-project__body">
                    <h3>{repo.name}</h3>

                    <p>
                      {repo.description ||
                        "A project available on my GitHub profile."}
                    </p>

                    <div className="pf-project__stats">
                      <span>★ {repo.stargazers_count}</span>
                      <span>⑂ {repo.forks_count}</span>
                      <span>
                        Updated{" "}
                        {new Date(
                          repo.updated_at
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="pf-project__links">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="pf-link-arrow"
                      >
                        View source
                      </a>

                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="pf-link-arrow"
                        >
                          Live demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}

            {!loading &&
              !error &&
              filteredRepos.length === 0 && (
                <div className="pf-message">
                  No projects found. Try a different search.
                </div>
              )}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <p className="pf-eyebrow">// about.md</p>

          <h2 className="pf-section-title">
            Learning by building.
          </h2>

          <div className="pf-about__grid">
            <p className="pf-about__text">
              I'm a B.Tech AI & Data Science student with a strong interest in
              backend and software development. I enjoy understanding how
              applications work behind the scenes—from APIs and authentication
              to databases and application logic. My goal is to become a backend
              engineer who can build reliable systems that companies want to use.
            </p>

            <ol className="pf-timeline">
              <li>
                <span className="pf-timeline__year">2024 —</span>
                <span>
                  Started B.Tech and began exploring web development.
                </span>
              </li>

              <li>
                <span className="pf-timeline__year">2025–26 —</span>
                <span>
                  Built MERN projects and developed backend fundamentals.
                </span>
              </li>

              <li>
                <span className="pf-timeline__year">Now —</span>
                <span>
                  Focused on backend engineering, DSA, and internship preparation.
                </span>
              </li>
            </ol>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <p className="pf-eyebrow">// contact.send()</p>

          <h2 className="pf-contact__title">
            Interested in working together? Let's connect.
          </h2>

          <div className="pf-contact__row">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="pf-contact__primary"
            >
              github.com/{GITHUB_USERNAME}
            </a>

            <div className="pf-contact__socials">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/sumit-kumar-07681a2a0/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a href="#work">Projects</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="pf-footer">
        <span>SUMIT KUMAR, India</span>
        <span>Built with React · Powered by GitHub API</span>
      </footer>
    </div>
  );
}