import React from 'react'
import { cn } from '@/lib/utils/cn'

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: React.ReactNode
}

/**
 * Badge component for displaying labels and status
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-primary-100 text-primary-700',
      secondary: 'bg-secondary-100 text-secondary-700',
      success: 'bg-success-50 text-success-700 border border-success-200',
      warning: 'bg-warning-50 text-warning-700 border border-warning-200',
      error: 'bg-error-50 text-error-700 border border-error-200',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

