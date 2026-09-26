import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Reads the markdown files in /content. Every variant calls getPortfolio(),
// so the words live in one place and the five designs never disagree.

const CONTENT_DIR = path.join(process.cwd(), "content");
const LEADING_COMMENT = /^\s*<!--[\s\S]*?-->\s*/;

export type Role = {
  company: string;
  role: string;
  period: string;
  place: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: number;
  pitch: string;
  result: string;
  body: string;
  stack: string[];
};

export type SkillGroup = { name: string; items: string[] };
export type Link = { label: string; href: string };

export type Portfolio = {
  hero: {
    name: string;
    role: string;
    location: string;
    status: string;
    headline: string;
    intro: string;
  };
  about: { heading: string; paragraphs: string[] };
  experience: { heading: string; roles: Role[] };
  projects: { heading: string; projects: Project[] };
  skills: { heading: string; groups: SkillGroup[] };
  contact: {
    heading: string;
    email: string;
    links: Link[];
    disclaimer: string;
    note: string;
  };
};

function read(file: string) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw.replace(LEADING_COMMENT, ""));
  return { data, body: content.trim() };
}

function paragraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function required<T>(value: T | undefined, field: string, file: string): T {
  if (value === undefined || value === null) {
    throw new Error(`content/${file} is missing the "${field}" field`);
  }
  return value;
}

export function getPortfolio(): Portfolio {
  const hero = read("01-hero.md");
  const about = read("02-about.md");
  const experience = read("03-experience.md");
  const projects = read("04-projects.md");
  const skills = read("05-skills.md");
  const contact = read("06-contact.md");

  return {
    hero: {
      name: required(hero.data.name, "name", "01-hero.md"),
      role: required(hero.data.role, "role", "01-hero.md"),
      location: required(hero.data.location, "location", "01-hero.md"),
      status: required(hero.data.status, "status", "01-hero.md"),
      headline: required(hero.data.headline, "headline", "01-hero.md"),
      intro: paragraphs(hero.body).join(" "),
    },
    about: {
      heading: required(about.data.heading, "heading", "02-about.md"),
      paragraphs: paragraphs(about.body),
    },
    experience: {
      heading: required(experience.data.heading, "heading", "03-experience.md"),
      roles: required(experience.data.roles, "roles", "03-experience.md"),
    },
    projects: {
      heading: required(projects.data.heading, "heading", "04-projects.md"),
      projects: required(projects.data.projects, "projects", "04-projects.md"),
    },
    skills: {
      heading: required(skills.data.heading, "heading", "05-skills.md"),
      groups: required(skills.data.groups, "groups", "05-skills.md"),
    },
    contact: {
      heading: required(contact.data.heading, "heading", "06-contact.md"),
      email: required(contact.data.email, "email", "06-contact.md"),
      links: required(contact.data.links, "links", "06-contact.md"),
      disclaimer: required(contact.data.disclaimer, "disclaimer", "06-contact.md"),
      note: paragraphs(contact.body).join(" "),
    },
  };
}
