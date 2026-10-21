'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

/**
 * AdSense publisher ID. Reads from env first, then falls back to your ID.
 */
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-3517858716332831';

/** Default ad unit ("adslot"). Override per placement with the adSlotId prop. */
const DEFAULT_AD_SLOT = '6877287505';

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
 * Renders a Google AdSense unit (`ins.adsbygoogle`). Loads the AdSense script
 * once (next/script dedupes by id) and pushes after the ad element mounts.
 */
const AdSlot: React.FC<AdSlotProps> = ({
  className = '',
  adFormat = 'auto',
  adSlotId = DEFAULT_AD_SLOT,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !ADSENSE_CLIENT || IS_DEV) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* adsbygoogle not loaded — ignore */
    }
  }, [isMounted]);

  // Show a visual placeholder during development or before mount
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
      <Script
        id="adsense-loader"
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlotId}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSlot;
