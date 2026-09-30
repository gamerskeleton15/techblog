'use client';

import { useEffect, useState } from 'react';

/**
 * AdSense publisher ID, e.g. `ca-pub-XXXXXXXXXXXXXXXX`. Reads from env. When
 * unset, no ads load and the component shows a placeholder instead. Set
 * `NEXT_PUBLIC_ADSENSE_CLIENT` once your AdSense account is approved.
 */
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
// Detect if we are in development mode to show visual placeholders
const IS_DEV = process.env.NODE_ENV === 'development';

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!ADSENSE_CLIENT) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* adsbygoogle not loaded — ignore */
    }
  }, []);

  // Show a visual placeholder during development or when client ID is missing
  if (!isMounted || !ADSENSE_CLIENT || IS_DEV) {
    return (
      <div className={`w-full min-h-[100px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 p-4 ${className}`}>
        <span className="font-semibold text-sm">Google AdSense Placeholder</span>
        <span className="text-xs">Client: {ADSENSE_CLIENT || 'Missing'} | Slot: {adSlotId || 'Auto'}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle block w-full"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlotId || undefined}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSlot;