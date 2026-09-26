import type { Metadata } from "next";
import { VT323, Fragment_Mono } from "next/font/google";
import { getPortfolio } from "@/lib/content";
import Terminal from "@/components/terminal/Terminal";
import VariantSwitcher from "@/components/VariantSwitcher";
import "./terminal.css";

const banner = VT323({ subsets: ["latin"], weight: "400", variable: "--tm-banner", display: "swap" });
const mono = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--tm-mono", display: "swap" });

export const metadata: Metadata = { title: "Variant 2, Terminal" };

export default function TerminalPage() {
  const data = getPortfolio();
  return (
    <div className={`tm ${banner.variable} ${mono.variable}`}>
      <main className="tm-window">
        <div className="tm-bar" aria-hidden="true">
          <span /><span /><span />
          <p>kemi@adler: ~ (zsh)</p>
        </div>
        <p className="tm-boot" aria-hidden="true">
          Last login: Sat Sep 26 on ttys001 · portfolio v1.0 · type <b>help</b>
        </p>
        <Terminal data={data} />
        <p className="tm-foot">{data.contact.disclaimer}</p>
      </main>
      <VariantSwitcher current="terminal" />
    </div>
  );
}
