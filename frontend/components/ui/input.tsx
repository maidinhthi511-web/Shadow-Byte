"use client"
import React from "react"

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={"mt-1 block w-full rounded border px-3 py-2 bg-background text-foreground " + (props.className || "")}
    />
  )
}
