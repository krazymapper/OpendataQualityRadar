import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface LoadingStateProps {
  message?: string
  fullScreen?: boolean
  className?: string
}

/**
 * Loading state component with spinner
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Chargement...',
  fullScreen = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        fullScreen ? 'min-h-screen' : 'py-12',
        className
      )}
    >
      <Loader2 className="animate-spin text-primary-500" size={48} />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  )
}

/**
 * Skeleton loader component
 */
export interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
}) => {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  }

  return (
    <div
      className={cn('animate-pulse bg-gray-200', variants[variant], className)}
      aria-label="Loading"
    />
  )
}

