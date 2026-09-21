import React from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'

export interface CtaProps extends Omit<ButtonProps, 'children'> {
  ctaEnabled?: boolean
  text?: string
  link?: string
}

export function Cta({ cta }: { cta: CtaProps }) {
  const { text, link, ctaEnabled, ...props } = cta

  if (!ctaEnabled) return null

  if (link) {
    return (
      <Button asChild {...props}>
        <a href={link}>{text}</a>
      </Button>
    )
  }

  return <Button {...props}>{text}</Button>
}
