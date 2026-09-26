import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sample developer portfolio, five variants",
    template: "%s · Sample developer portfolio",
  },
  description:
    "A sample software developer portfolio for a fictional engineer, built five ways from one set of content files. Made for a class on building portfolios with Claude Code.",
  // Fictional person: keep this sample out of search results.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
