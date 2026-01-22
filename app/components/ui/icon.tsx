import React from 'react';
import type { LucideProps } from 'lucide-react';
import { cn } from '~/lib/utils';

interface IconProps extends Omit<LucideProps, 'name'> {
  name: React.ElementType;
}

export function Icon({ name: IconComponent, className, ...props }: IconProps) {
  return <IconComponent className={cn('w-6 h-6', className)} {...props} />;
}
