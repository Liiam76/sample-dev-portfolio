import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { getPortfolio } from "@/lib/content";
import ProjectArt from "@/components/ProjectArt";
import VariantSwitcher from "@/components/VariantSwitcher";
import "./poster.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--ps-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--ps-body", display: "swap" });

export const metadata: Metadata = { title: "Variant 5, Poster" };

const THEMES = ["ps-t-ink", "ps-t-light", "ps-t-tomato", "ps-t-ink"] as const;
const ART = {
  "ps-t-ink": { bg: "oklch(22% 0.03 33)", fg: "oklch(96% 0.012 33)", muted: "oklch(75% 0.04 33)", accent: "oklch(68% 0.2 33)" },
  "ps-t-light": { bg: "oklch(99% 0.004 33)", fg: "oklch(17% 0.03 33)", muted: "oklch(48% 0.05 33)", accent: "oklch(58% 0.21 33)" },
  "ps-t-tomato": { bg: "oklch(51% 0.19 33)", fg: "oklch(99% 0.004 33)", muted: "oklch(88% 0.06 33)", accent: "oklch(17% 0.03 33)" },
};

export default function PosterPage() {
  const p = getPortfolio();
  const tools = p.skills.groups.flatMap((g) => g.items);

  return (
    <div className={`ps ${display.variable} ${body.variable}`}>
      <header className="ps-hero">
        <div className="ps-top">
          <p className="ps-mark">{p.hero.name}</p>
          <p>{p.hero.role}</p>
          <p className="ps-hide-sm">{p.hero.location}</p>
        </div>
        <h1 className="ps-headline">
          {p.hero.headline.split(" ").map((w, i) => (
            <span key={i}><span className="ps-word" style={{ ["--w" as string]: i }}>{w}</span>{" "}</span>
          ))}
        </h1>
        <div className="ps-hero-foot">
          <p className="ps-intro">{p.hero.intro}</p>
          <a className="ps-round" href="#work">
            <span>See the work</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <div className="ps-marquee" aria-label={`Tools: ${tools.join(", ")}`}>
        <div className="ps-track" aria-hidden="true">
          {[...tools, ...tools].map((t, i) => <span key={i}>{t} <b>✺</b></span>)}
        </div>
      </div>

      <main id="work">
        {p.projects.projects.map((pr, i) => {
          const theme = THEMES[i % THEMES.length];
          return (
            <section key={pr.slug} className={`ps-project ${theme}`} aria-labelledby={`ps-${pr.slug}`}>
              <div className="ps-project-inner">
                <div className="ps-project-text">
                  <p className="ps-meta">{pr.kind} · {pr.year} · {i + 1} of {p.projects.projects.length}</p>
                  <h2 id={`ps-${pr.slug}`} className="ps-project-name">{pr.name}</h2>
                  <p className="ps-pitch">{pr.pitch}</p>
                  <p>{pr.body}</p>
                  <p className="ps-result">{pr.result}</p>
                  <p className="ps-stack">{pr.stack.join(" · ")}</p>
                </div>
                <ProjectArt slug={pr.slug} palette={ART[theme]} title={`${pr.name} illustration`} className="ps-art" />
              </div>
            </section>
          );
        })}

        <section className="ps-exp" aria-labelledby="ps-exp">
          <h2 id="ps-exp" className="ps-h2">{p.experience.heading}</h2>
          <ol>
            {p.experience.roles.map((r) => (
              <li key={r.company}>
                <p className="ps-exp-co">{r.company}</p>
                <div>
                  <p className="ps-exp-role">{r.role} · {r.period}</p>
                  <p>{r.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="ps-about" aria-labelledby="ps-about">
          <h2 id="ps-about" className="ps-h2">{p.about.heading}</h2>
          <div>
            {p.about.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </section>

        <section className="ps-contact" aria-labelledby="ps-contact">
          <h2 id="ps-contact" className="ps-h2">{p.contact.heading}</h2>
          <a className="ps-email" href={`mailto:${p.contact.email}`}>{p.contact.email}</a>
          <p>{p.contact.note}</p>
          <ul>
            {p.contact.links.map((l) => (
              <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a></li>
            ))}
          </ul>
          <p className="ps-disclaimer">{p.contact.disclaimer}</p>
        </section>
      </main>
      <VariantSwitcher current="poster" />
    </div>
  );
}
