import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import { getPortfolio } from "@/lib/content";
import ProjectArt from "@/components/ProjectArt";
import ActiveNav from "@/components/split/ActiveNav";
import VariantSwitcher from "@/components/VariantSwitcher";
import "./split.css";

const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--sp-sans", display: "swap" });
const mono = Martian_Mono({ subsets: ["latin"], variable: "--sp-mono", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = { title: "Variant 1, Split" };

const ART = { bg: "oklch(23% 0.01 50)", fg: "oklch(93% 0.008 60)", muted: "oklch(70% 0.012 60)", accent: "oklch(74% 0.15 35)" };

export default function SplitPage() {
  const p = getPortfolio();
  const nav = [
    { id: "about", label: p.about.heading },
    { id: "experience", label: p.experience.heading },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Tools" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className={`sp ${sans.variable} ${mono.variable}`}>
      <a className="sp-skip" href="#about">Skip to content</a>
      <div className="sp-shell">
        <header className="sp-side">
          <div>
            <p className="sp-status"><span aria-hidden="true" className="sp-dot" />{p.hero.status}</p>
            <h1 className="sp-name">{p.hero.name}</h1>
            <p className="sp-role">{p.hero.role}</p>
            <p className="sp-headline">{p.hero.headline}</p>
            <ActiveNav items={nav} />
          </div>
          <ul className="sp-links">
            <li><a href={`mailto:${p.contact.email}`}>Email</a></li>
            {p.contact.links.map((l) => (
              <li key={l.label}><a href={l.href} rel="noreferrer" target="_blank">{l.label}</a></li>
            ))}
          </ul>
        </header>

        <main className="sp-main">
          <section id="about" aria-labelledby="about-h" className="sp-section">
            <h2 id="about-h" className="sp-h2">{p.about.heading}</h2>
            <p className="sp-lede">{p.hero.intro}</p>
            {p.about.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
          </section>

          <section id="experience" aria-labelledby="exp-h" className="sp-section">
            <h2 id="exp-h" className="sp-h2">{p.experience.heading}</h2>
            <ol className="sp-rows">
              {p.experience.roles.map((r) => (
                <li key={r.company} className="sp-row">
                  <p className="sp-when">{r.period}</p>
                  <div>
                    <h3 className="sp-h3">{r.role} <span className="sp-at">at {r.company}</span></h3>
                    <p className="sp-place">{r.place}</p>
                    <ul className="sp-bullets">
                      {r.highlights.map((h) => <li key={h}>{h}</li>)}
                    </ul>
                    <ul className="sp-tags" aria-label="Stack">
                      {r.stack.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="projects" aria-labelledby="proj-h" className="sp-section">
            <h2 id="proj-h" className="sp-h2">{p.projects.heading}</h2>
            <ol className="sp-rows">
              {p.projects.projects.map((pr) => (
                <li key={pr.slug} className="sp-row sp-project">
                  <ProjectArt slug={pr.slug} palette={ART} title={`${pr.name} illustration`} className="sp-art" />
                  <div>
                    <h3 className="sp-h3">{pr.name} <span className="sp-at">{pr.kind}, {pr.year}</span></h3>
                    <p className="sp-pitch">{pr.pitch}</p>
                    <p>{pr.body}</p>
                    <p className="sp-result">{pr.result}</p>
                    <ul className="sp-tags" aria-label="Stack">
                      {pr.stack.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="skills" aria-labelledby="skills-h" className="sp-section">
            <h2 id="skills-h" className="sp-h2">{p.skills.heading}</h2>
            <dl className="sp-skills">
              {p.skills.groups.map((g) => (
                <div key={g.name}>
                  <dt>{g.name}</dt>
                  <dd>{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="contact" aria-labelledby="contact-h" className="sp-section">
            <h2 id="contact-h" className="sp-h2">{p.contact.heading}</h2>
            <p>{p.contact.note}</p>
            <a className="sp-cta" href={`mailto:${p.contact.email}`}>{p.contact.email}</a>
          </section>

          <footer className="sp-foot">
            <p>{p.contact.disclaimer}</p>
          </footer>
        </main>
      </div>
      <VariantSwitcher current="split" />
    </div>
  );
}
