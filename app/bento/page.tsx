import type { Metadata } from "next";
import { Rethink_Sans, Red_Hat_Mono } from "next/font/google";
import { getPortfolio } from "@/lib/content";
import ProjectArt from "@/components/ProjectArt";
import LocalClock from "@/components/bento/LocalClock";
import ActivityGraph from "@/components/bento/ActivityGraph";
import VariantSwitcher from "@/components/VariantSwitcher";
import "./bento.css";

const sans = Rethink_Sans({ subsets: ["latin"], variable: "--bt-sans", display: "swap" });
const mono = Red_Hat_Mono({ subsets: ["latin"], variable: "--bt-mono", display: "swap" });

export const metadata: Metadata = { title: "Variant 4, Bento" };

const ART_ON_COBALT = { bg: "oklch(42% 0.19 263)", fg: "oklch(98% 0.01 263)", muted: "oklch(84% 0.06 263)", accent: "oklch(90% 0.19 125)" };
const ART_ON_WHITE = { bg: "oklch(96% 0.01 262)", fg: "oklch(22% 0.03 262)", muted: "oklch(50% 0.03 262)", accent: "oklch(47% 0.2 263)" };

export default function BentoPage() {
  const p = getPortfolio();
  const [featured, ...others] = p.projects.projects;
  let d = 0;
  const delay = () => ({ ["--d" as string]: d++ });

  return (
    <div className={`bt ${sans.variable} ${mono.variable}`}>
      <main className="bt-grid">
        <section className="bt-cell bt-intro" style={delay()} aria-labelledby="bt-name">
          <p className="bt-pill"><span aria-hidden="true" />{p.hero.status}</p>
          <div>
            <h1 id="bt-name" className="bt-name">{p.hero.name}</h1>
            <p className="bt-role">{p.hero.role}</p>
          </div>
          <p className="bt-headline">{p.hero.headline}</p>
        </section>

        <section className="bt-cell bt-time" style={delay()} aria-label="Local time">
          <p className="bt-k">Local time in Lagos</p>
          <LocalClock />
          <p className="bt-small">{p.hero.location}. Replies within two working days.</p>
        </section>

        <section className="bt-cell bt-lime bt-tools" style={delay()} aria-labelledby="bt-tools">
          <h2 id="bt-tools" className="bt-k">{p.skills.heading}</h2>
          <ul>
            {p.skills.groups.flatMap((g) => g.items).map((it) => <li key={it}>{it}</li>)}
          </ul>
        </section>

        <article className="bt-cell bt-cobalt bt-featured" style={delay()} aria-labelledby={`bt-${featured.slug}`}>
          <div className="bt-featured-text">
            <p className="bt-k">Featured · {featured.kind}, {featured.year}</p>
            <h2 id={`bt-${featured.slug}`} className="bt-h">{featured.name}</h2>
            <p>{featured.pitch}</p>
            <p className="bt-result">{featured.result}</p>
          </div>
          <ProjectArt slug={featured.slug} palette={ART_ON_COBALT} title={`${featured.name} illustration`} className="bt-art" />
        </article>

        <section className="bt-cell bt-exp" style={delay()} aria-labelledby="bt-exp">
          <h2 id="bt-exp" className="bt-k">{p.experience.heading}</h2>
          <ol>
            {p.experience.roles.map((r) => (
              <li key={r.company}>
                <p className="bt-exp-co">{r.company}</p>
                <p className="bt-exp-role">{r.role} · {r.period}</p>
                <p className="bt-exp-sum">{r.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        {others.map((pr, i) => (
          <article key={pr.slug} className={`bt-cell bt-project${i === others.length - 1 ? " bt-wide" : ""}`} style={delay()} aria-labelledby={`bt-${pr.slug}`}>
            <ProjectArt slug={pr.slug} palette={ART_ON_WHITE} title={`${pr.name} illustration`} className="bt-art" />
            <div>
              <p className="bt-k">{pr.kind}, {pr.year}</p>
              <h2 id={`bt-${pr.slug}`} className="bt-h bt-h-sm">{pr.name}</h2>
              <p>{pr.pitch}</p>
              <p className="bt-result">{pr.result}</p>
            </div>
          </article>
        ))}

        <section className="bt-cell bt-activity" style={delay()} aria-labelledby="bt-act">
          <h2 id="bt-act" className="bt-k">Shipping rhythm</h2>
          <ActivityGraph />
          <p className="bt-small">Sample data for the demo. Darker squares mean more commits that day.</p>
        </section>

        <section className="bt-cell bt-about" style={delay()} aria-labelledby="bt-about">
          <h2 id="bt-about" className="bt-k">{p.about.heading}</h2>
          {p.about.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
        </section>

        <section className="bt-cell bt-ink bt-contact" style={delay()} aria-labelledby="bt-contact">
          <div>
            <h2 id="bt-contact" className="bt-h">{p.contact.heading}</h2>
            <p>{p.contact.note}</p>
          </div>
          <div className="bt-contact-actions">
            <a className="bt-btn" href={`mailto:${p.contact.email}`}>Email Kemi <span aria-hidden="true">→</span></a>
            <ul>
            {p.contact.links.map((l) => (
                <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer">{l.label}</a></li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer className="bt-foot"><p>{p.contact.disclaimer}</p></footer>
      <VariantSwitcher current="bento" />
    </div>
  );
}
