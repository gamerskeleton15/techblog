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

  if (!ADSENSE_CLIENT) {
    return (
      <div
        className={`ad-slot-placeholder bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center p-8 ${className}`}
      >
        <div className="text-center text-gray-500">
          <p className="text-sm font-medium">Advertisement Placeholder</p>
          <p className="text-xs mt-1">Google AdSense ad unit will appear here</p>
          <p className="text-xs mt-2 text-gray-400">
            Set NEXT_PUBLIC_ADSENSE_CLIENT after approval
          </p>
        </div>
      </div>
    );
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