import type { HTMLAttributes, ReactNode } from 'react'
import './AppShell.css'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Container({ children, className, ...props }: ContainerProps) {
  return <div {...props} className={['hermes-container', className].filter(Boolean).join(' ')}>{children}</div>
}
