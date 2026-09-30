'use client';

import { useEffect } from 'react';

/**
 * AdSense publisher ID, e.g. `ca-pub-XXXXXXXXXXXXXXXX`. Reads from env. When
 * unset, no ads load and the component shows a placeholder instead. Set
 * `NEXT_PUBLIC_ADSENSE_CLIENT` once your AdSense account is approved.
 */
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  className?: string;
  adFormat?: string;
  adSlotId?: string;
}

/**
 * Renders a Google AdSense unit (`ins.adsbygoogle`) when a publisher ID is
 * configured, or a neutral placeholder otherwise. The `(adsbygoogle).push({})`
 * call must happen after each ad element is mounted.
 */
const AdSlot: React.FC<AdSlotProps> = ({
  className = '',
  adFormat = 'auto',
  adSlotId = '',
}) => {
  useEffect(() => {
    if (!ADSENSE_CLIENT) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* adsbygoogle not loaded — ignore */
    }
  }, []);

  // Return nothing if AdSense is not configured to avoid "Low-Value Content" flags on placeholders
  if (!ADSENSE_CLIENT) {
    return null;
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlotId || undefined}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSlot;