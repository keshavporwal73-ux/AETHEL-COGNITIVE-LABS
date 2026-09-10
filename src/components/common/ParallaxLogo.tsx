import React from 'react';
import { AethelLogo } from './AethelLogo';

interface ParallaxLogoProps {
  size?: number | string;
  className?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  isAnimated?: boolean;
  variant?: 'default' | 'accent' | 'monochrome' | 'light' | 'cyan' | 'violet';
}

export const ParallaxLogo: React.FC<ParallaxLogoProps> = ({
  size = 32,
  className = '',
  showWordmark = false,
  showTagline = false,
  isAnimated = true,
  variant = 'default',
}) => {
  return (
    <AethelLogo
      size={size}
      className={className}
      showWordmark={showWordmark}
      showTagline={showTagline}
      isAnimated={isAnimated}
      variant={variant === 'monochrome' ? 'monochrome' : variant === 'accent' ? 'accent' : 'default'}
    />
  );
};

export default ParallaxLogo;

