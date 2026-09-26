import Image from "next/image";
import Link from "next/link";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { VARIANTS } from "@/lib/variants";
import { getPortfolio } from "@/lib/content";
import "./index.css";

const sans = Archivo({ subsets: ["latin"], variable: "--ix-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--ix-mono", display: "swap" });

const REPO_URL = "https://github.com/Liiam76/sample-dev-portfolio";

const STEPS: Array<[string, string]> = [
  ["Plan", "Who reads this site, and what should they do next?"],
  ["Documents", "A CV and a LinkedIn profile became six content files."],
  ["References", "Ten real developer portfolios, studied for structure."],
  ["Design rules", "Fonts, colors, and spacing locked per variant before code."],
  ["Connect", "GitHub saves every version. Vercel puts it online."],
  ["Build", "One section at a time, checked in the browser after each."],
  ["Phone check", "Screenshots at 320, 375, 390, and 428 pixels wide."],
  ["Publish", "Staging branch first, then main, then the live address."],
];

export default function Home() {
  const { hero } = getPortfolio();
  return (
    <div className={`ix ${sans.variable} ${mono.variable}`}>
      <header className="ix-head">
        <p className="ix-tag">Class demo · sample portfolio</p>
        <h1>One set of words. Five designs.</h1>
        <p className="ix-lede">
          This is a sample portfolio for <strong>{hero.name}</strong>, a fictional {hero.role.toLowerCase()}.
          Every variant reads the same six content files. Change a sentence once and all five designs update.
        </p>
        <p className="ix-links">
          <a href={REPO_URL} target="_blank" rel="noreferrer">Source on GitHub</a>
          <a href="#how">How it was built</a>
        </p>
      </header>

      <main>
        <ol className="ix-list">
          {VARIANTS.map((v) => (
            <li key={v.slug} className="ix-item">
              <Link href={`/${v.slug}`} className="ix-card">
                <span className="ix-num" aria-hidden="true">{v.number}</span>
                <span className="ix-text">
                  <span className="ix-name">{v.name}</span>
                  <span className="ix-lane">{v.lane}</span>
                  <span className="ix-sum">{v.summary}</span>
                  <span className="ix-ref">Studied: {v.reference}</span>
                </span>
                <span className="ix-shot">
                  <Image
                    src={`/previews/${v.slug}.png`}
                    alt={`Screenshot of the ${v.name} variant`}
                    width={1440}
                    height={900}
                    sizes="(min-width: 900px) 44vw, 100vw"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <section id="how" className="ix-how" aria-labelledby="how-h">
          <h2 id="how-h">How it was built, in eight steps</h2>
          <ol>
            {STEPS.map(([title, text]) => (
              <li key={title}>
                <strong>{title}.</strong> {text}
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="ix-foot">
        <p>Built with Claude Code, Next.js, and Tailwind CSS. Deployed on Vercel. {hero.name} is fictional.</p>
      </footer>
    </div>
  );
}
