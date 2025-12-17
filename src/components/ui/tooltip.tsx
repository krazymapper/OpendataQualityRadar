import React from 'react'
import { Tooltip as HeadlessTooltip } from '@headlessui/react'
import { cn } from '@/lib/utils/cn'

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

/**
 * Tooltip component
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 0,
}) => {
  const placements = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900',
  }

  return (
    <HeadlessTooltip>
      <HeadlessTooltip.Button as={React.Fragment}>{children}</HeadlessTooltip.Button>
      <HeadlessTooltip.Panel
        className={cn(
          'absolute z-50 rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white shadow-lg',
          placements[placement]
        )}
      >
        {content}
        <div
          className={cn(
            'absolute w-0 h-0 border-4 border-transparent',
            arrows[placement]
          )}
        />
      </HeadlessTooltip.Panel>
    </HeadlessTooltip>
  )
}

