"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Portfolio } from "@/lib/content";
import { VARIANTS } from "@/lib/variants";

type Entry = { id: number; command: string; output: ReactNode };

const COMMANDS = ["about", "experience", "projects", "skills", "contact", "help", "clear"] as const;

// A small shell. Every answer is built from the same content files as the other variants.
export default function Terminal({ data }: { data: Portfolio }) {
  const [history, setHistory] = useState<Entry[]>(() => [
    { id: 0, command: "whoami", output: <Whoami data={data} /> },
    { id: 1, command: "help", output: <Help /> },
  ]);
  const [value, setValue] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    if (history.length > 2) endRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  function run(raw: string) {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    setPast((p) => [command, ...p].slice(0, 30));
    setCursor(-1);
    if (command === "clear") {
      setHistory([]);
      return;
    }
    const id = nextId.current++;
    setHistory((h) => [...h, { id, command, output: respond(command, data) }]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(value);
    setValue("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" && past.length) {
      e.preventDefault();
      const next = Math.min(cursor + 1, past.length - 1);
      setCursor(next);
      setValue(past[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setValue(next < 0 ? "" : past[next]);
    } else if (e.key === "Tab") {
      const match = COMMANDS.find((c) => value && c.startsWith(value.toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    }
  }

  return (
    <div className="tm-screen" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="tm-log" aria-live="polite">
        {history.map((entry) => (
          <div key={entry.id} className="tm-entry" style={{ ["--i" as string]: entry.id < 2 ? entry.id : 0 }}>
            <p className="tm-cmd"><Prompt /> {entry.command}</p>
            <div className="tm-out">{entry.output}</div>
          </div>
        ))}
      </div>
      <form className="tm-form" onSubmit={onSubmit}>
        <label htmlFor="tm-input"><Prompt /></label>
        <input
          id="tm-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Type a command, for example projects"
          placeholder="type a command, or click one below"
        />
      </form>
      <div className="tm-chips" role="group" aria-label="Quick commands">
        {COMMANDS.filter((c) => c !== "clear").map((c) => (
          <button key={c} type="button" onClick={(e) => { e.stopPropagation(); run(c); }}>{c}</button>
        ))}
      </div>
      <div ref={endRef} />
    </div>
  );
}

function Prompt() {
  return <span className="tm-prompt" aria-hidden="true"><b>kemi@adler</b>:<i>~</i>$</span>;
}

function Whoami({ data }: { data: Portfolio }) {
  return (
    <>
      <h1 className="tm-banner">{data.hero.name}</h1>
      <p className="tm-hi">{data.hero.role} · {data.hero.location}</p>
      <p>{data.hero.headline}</p>
      <p className="tm-dim">{data.hero.intro}</p>
      <p className="tm-ok">[ok] {data.hero.status}</p>
    </>
  );
}

function Help() {
  const rows: Array<[string, string]> = [
    ["about", "who I am and how I work"],
    ["experience", "where I have worked"],
    ["projects", "things I built"],
    ["skills", "tools I use"],
    ["contact", "how to reach me"],
    ["variants", "the other four designs"],
    ["clear", "clear the screen"],
  ];
  return (
    <dl className="tm-table">
      {rows.map(([k, v]) => (
        <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  );
}

function respond(command: string, data: Portfolio): ReactNode {
  switch (command) {
    case "help":
    case "ls":
      return <Help />;
    case "whoami":
      return <Whoami data={data} />;
    case "about":
      return data.about.paragraphs.map((t, i) => <p key={i}>{t}</p>);
    case "experience":
      return data.experience.roles.map((r) => (
        <section key={r.company} className="tm-block">
          <p className="tm-hi">{r.role} @ {r.company} <span className="tm-dim">({r.period}, {r.place})</span></p>
          <ul>{r.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <p className="tm-dim">stack: {r.stack.join(" · ")}</p>
        </section>
      ));
    case "projects":
      return data.projects.projects.map((pr) => (
        <section key={pr.slug} className="tm-block">
          <p className="tm-hi">{pr.name} <span className="tm-dim">[{pr.kind.toLowerCase()}, {pr.year}]</span></p>
          <p>{pr.pitch}</p>
          <p className="tm-dim">{pr.body}</p>
          <p className="tm-ok">&gt; {pr.result}</p>
        </section>
      ));
    case "skills":
      return (
        <dl className="tm-table">
          {data.skills.groups.map((g) => (
            <div key={g.name}><dt>{g.name.toLowerCase()}</dt><dd>{g.items.join(", ")}</dd></div>
          ))}
        </dl>
      );
    case "contact":
      return (
        <>
          <p>{data.contact.note}</p>
          <p>email: <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a></p>
          {data.contact.links.map((l) => (
            <p key={l.label}>{l.label.toLowerCase()}: <a href={l.href} target="_blank" rel="noreferrer">{l.href}</a></p>
          ))}
        </>
      );
    case "variants":
      return (
        <ul>
          {VARIANTS.map((v) => (
            <li key={v.slug}><a href={`/${v.slug}`}>{v.number}. {v.name}</a> <span className="tm-dim">{v.lane}</span></li>
          ))}
        </ul>
      );
    case "sudo hire kemi":
    case "hire":
      return <p className="tm-ok">Permission granted. Send the offer to {data.contact.email}.</p>;
    default:
      return <p className="tm-err">command not found: {command}. Type help to see what works.</p>;
  }
}
