"use client";

import { useEffect, useState } from "react";

const FORMAT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

// Live time in Lagos, so a recruiter in another timezone knows when to expect a reply.
export default function LocalClock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(FORMAT.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className="bt-clock" suppressHydrationWarning>
      {now ?? "--:--"}
    </time>
  );
}
