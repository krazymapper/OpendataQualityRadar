import React from 'react'
import { Switch } from '@headlessui/react'
import { cn } from '@/lib/utils/cn'

export interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  size?: 'sm' | 'md'
}

/**
 * Toggle switch component
 */
export const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
}) => {
  const sizes = {
    sm: {
      switch: 'h-4 w-7',
      dot: 'h-3 w-3',
      translate: 'translate-x-3',
    },
    md: {
      switch: 'h-6 w-11',
      dot: 'h-5 w-5',
      translate: 'translate-x-5',
    },
  }

  const sizeConfig = sizes[size]

  return (
    <Switch.Group>
      <div className="flex items-center justify-between">
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <Switch.Label className="text-sm font-medium text-gray-700 cursor-pointer">
                {label}
              </Switch.Label>
            )}
            {description && (
              <Switch.Description className="text-xs text-gray-500 mt-0.5">
                {description}
              </Switch.Description>
            )}
          </div>
        )}
        <Switch
          checked={enabled}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            enabled ? 'bg-primary-500' : 'bg-gray-200',
            disabled && 'opacity-50 cursor-not-allowed',
            sizeConfig.switch
          )}
        >
          <span
            className={cn(
              'inline-block transform rounded-full bg-white transition-transform',
              enabled ? sizeConfig.translate : 'translate-x-0.5',
              sizeConfig.dot
            )}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}

