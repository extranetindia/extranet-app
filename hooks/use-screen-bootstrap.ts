import { useCallback, useEffect, useState } from 'react';

/** Simulates initial data fetch — drives skeleton → content transition */
export function useScreenBootstrap(durationMs = 650) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), durationMs);
    return () => clearTimeout(t);
  }, [durationMs]);

  const refresh = useCallback(async () => {
    setReady(false);
    await new Promise((r) => setTimeout(r, durationMs));
    setReady(true);
  }, [durationMs]);

  return { ready, refresh };
}
