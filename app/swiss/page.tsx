import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import { getPortfolio } from "@/lib/content";
import ProjectArt from "@/components/ProjectArt";
import VariantSwitcher from "@/components/VariantSwitcher";
import "./swiss.css";

const grotesk = Host_Grotesk({ subsets: ["latin"], variable: "--sw-sans", display: "swap" });

export const metadata: Metadata = { title: "Variant 3, Swiss" };

const ART = { bg: "oklch(97% 0 0)", fg: "oklch(15% 0 0)", muted: "oklch(45% 0 0)", accent: "oklch(56% 0.22 27)" };

export default function SwissPage() {
  const p = getPortfolio();
  const [first, ...rest] = p.hero.name.split(" ");

  return (
    <div className={`sw ${grotesk.variable}`}>
      <div className="sw-guides" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
      </div>

      <header className="sw-top sw-grid">
        <p className="sw-c3">{p.hero.name}</p>
        <p className="sw-c4">{p.hero.role}</p>
        <p className="sw-c3">{p.hero.location}</p>
        <p className="sw-c2 sw-right"><a href="#contact">Contact</a></p>
      </header>

      <main>
        <section className="sw-hero sw-grid" aria-labelledby="sw-name">
          <h1 id="sw-name" className="sw-name">
            <span className="sw-line"><span>{first}</span></span>
            <span className="sw-line"><span>{rest.join(" ")}</span></span>
          </h1>
          <p className="sw-headline">
            <span className="sw-square" aria-hidden="true" />
            {p.hero.headline}
          </p>
          <p className="sw-intro">{p.hero.intro}</p>
          <p className="sw-status">{p.hero.status}</p>
        </section>

        <section className="sw-sec sw-grid" aria-labelledby="sw-work">
          <h2 id="sw-work" className="sw-label">{p.projects.heading}</h2>
          <ol className="sw-index">
            <li className="sw-index-head" aria-hidden="true">
              <span>Year</span><span>Project</span><span>Result</span><span>Stack</span>
            </li>
            {p.projects.projects.map((pr) => (
              <li key={pr.slug} className="sw-item" tabIndex={0}>
                <span className="sw-year">{pr.year}</span>
                <div>
                  <h3 className="sw-item-name">{pr.name}</h3>
                  <p className="sw-item-pitch">{pr.pitch}</p>
                  <p className="sw-item-body">{pr.body}</p>
                </div>
                <p className="sw-item-result">{pr.result}</p>
                <p className="sw-item-stack">{pr.stack.join(" / ")}</p>
                <ProjectArt slug={pr.slug} palette={ART} title={`${pr.name} illustration`} className="sw-art" />
              </li>
            ))}
          </ol>
        </section>

        <section className="sw-sec sw-grid" aria-labelledby="sw-exp">
          <h2 id="sw-exp" className="sw-label">{p.experience.heading}</h2>
          <ol className="sw-exp">
            {p.experience.roles.map((r) => (
              <li key={r.company}>
                <p className="sw-exp-period">{r.period}</p>
                <div>
                  <h3 className="sw-exp-co">{r.company}</h3>
                  <p className="sw-exp-role">{r.role}, {r.place}</p>
                </div>
                <ul>{r.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="sw-sec sw-grid" aria-labelledby="sw-about">
          <h2 id="sw-about" className="sw-label">{p.about.heading}</h2>
          <div className="sw-about">
            {p.about.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </section>

        <section className="sw-sec sw-grid" aria-labelledby="sw-tools">
          <h2 id="sw-tools" className="sw-label">{p.skills.heading}</h2>
          <dl className="sw-tools">
            {p.skills.groups.map((g) => (
              <div key={g.name}>
                <dt>{g.name}</dt>
                {g.items.map((it) => <dd key={it}>{it}</dd>)}
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" className="sw-sec sw-grid sw-contact" aria-labelledby="sw-contact">
          <h2 id="sw-contact" className="sw-label">{p.contact.heading}</h2>
          <div className="sw-contact-body">
            <a className="sw-email" href={`mailto:${p.contact.email}`}>{p.contact.email}</a>
            <p>{p.contact.note}</p>
            <ul>
              {p.contact.links.map((l) => (
                <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer">{l.label}</a></li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="sw-foot sw-grid">
        <p>{p.contact.disclaimer}</p>
      </footer>
      <VariantSwitcher current="swiss" />
    </div>
  );
}
