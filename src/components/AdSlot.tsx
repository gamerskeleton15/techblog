import React from 'react';

interface AdSlotProps {
  className?: string;
  adFormat?: string;
  adSlotId?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({
  className = '',
  adFormat = 'auto',
  adSlotId = '',
}) => {
  // TODO: Replace this placeholder with actual AdSense code after approval
  // TODO: Add AdSense script to the root layout (src/app/layout.tsx) before this component

  return (
    <div
      className={`ad-slot-placeholder bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center p-8 ${className}`}
    >
      <div className="text-center text-gray-500">
        <p className="text-sm font-medium">Advertisement Placeholder</p>
        <p className="text-xs mt-1">Google AdSense ad unit will appear here</p>
        {adSlotId && (
          <p className="text-xs mt-2 text-gray-400">Slot ID: {adSlotId}</p>
        )}
      </div>
    </div>
  );
};

export default AdSlot;