"use client"

import type React from "react"
export const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => {
  return <label htmlFor={htmlFor}>{children}</label>
}

export const Textarea = ({
  value,
  onChange,
  placeholder,
  rows = 4,
  ...props
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
} & React.HTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} {...props} />
}

