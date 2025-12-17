import React, { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import type { SidebarItem } from './Sidebar'

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  items?: SidebarItem[]
}

/**
 * Mobile menu drawer component
 */
export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                      <Dialog.Title className="text-lg font-semibold text-gray-900">
                        Menu
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        aria-label="Close menu"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                      {items && (
                        <nav>
                          <ul className="space-y-1">
                            {items.map((item) => (
                              <li key={item.id}>
                                <button
                                  onClick={() => {
                                    item.onClick?.()
                                    onClose()
                                  }}
                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    item.active
                                      ? 'bg-primary-50 text-primary-700'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  <span className="flex-shrink-0">{item.icon}</span>
                                  <span className="flex-1 text-left">{item.label}</span>
                                  {item.badge && (
                                    <span className="flex-shrink-0 px-2 py-0.5 text-xs font-semibold bg-primary-500 text-white rounded-full">
                                      {item.badge}
                                    </span>
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

