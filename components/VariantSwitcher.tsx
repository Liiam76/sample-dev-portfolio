import Link from "next/link";
import { VARIANTS } from "@/lib/variants";

// Small fixed bar so the class can jump between the five designs.
// Styled in app/globals.css under .switcher so it looks the same on every variant.

export default function VariantSwitcher({ current }: { current: string }) {
  return (
    <nav className="switcher" aria-label="Design variants">
      <Link href="/" className="switcher-home">All 5</Link>
      {VARIANTS.map((v) => (
        <Link
          key={v.slug}
          href={`/${v.slug}`}
          aria-current={v.slug === current ? "page" : undefined}
          title={v.name}
        >
          {v.number}
        </Link>
      ))}
    </nav>
  );
}
