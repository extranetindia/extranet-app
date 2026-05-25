import { useCallback, useEffect, useState } from 'react';

import { useDelayedLoader } from '@/hooks/use-delayed-loader';

/** Coordinates screen hydration without flashing loaders for instant data. */
export function useScreenBootstrap(durationMs = 650) {
  const [ready, setReady] = useState(false);
  const showLoader = useDelayedLoader(!ready);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), durationMs);
    return () => clearTimeout(t);
  }, [durationMs]);

  const refresh = useCallback(async () => {
    setReady(false);
    await new Promise((r) => setTimeout(r, durationMs));
    setReady(true);
  }, [durationMs]);

  return { ready, showLoader, refresh };
}
