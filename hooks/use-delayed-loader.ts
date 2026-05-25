import { useEffect, useRef, useState } from 'react';

type DelayedLoaderOptions = {
  delayMs?: number;
  minVisibleMs?: number;
};

export function useDelayedLoader(
  loading: boolean,
  { delayMs = 180, minVisibleMs = 280 }: DelayedLoaderOptions = {},
) {
  const [visible, setVisible] = useState(false);
  const shownAtRef = useRef<number | null>(null);

  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    if (loading) {
      delayTimer = setTimeout(() => {
        shownAtRef.current = Date.now();
        setVisible(true);
      }, delayMs);
    } else if (visible) {
      const shownAt = shownAtRef.current ?? Date.now();
      const visibleFor = Date.now() - shownAt;
      const remaining = Math.max(minVisibleMs - visibleFor, 0);

      hideTimer = setTimeout(() => {
        shownAtRef.current = null;
        setVisible(false);
      }, remaining);
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [delayMs, loading, minVisibleMs, visible]);

  return visible;
}
