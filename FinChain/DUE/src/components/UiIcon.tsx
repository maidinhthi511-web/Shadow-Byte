import React from 'react'

type IconName = 'home' | 'payment' | 'lending' | 'risk' | 'ledger' | 'logout' | 'user'

const paths: Record<IconName, JSX.Element> = {
  home: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" fill="currentColor" />,
  payment: <path d="M4 7h16v10H4V7Zm2 2v6h12V9H6Zm2 1h8v2H8v-2Z" fill="currentColor" />,
  lending: <path d="M5 18h14v2H5v-2Zm2-10 5-4 5 4v8H7V8Zm2 2v4h6v-4l-3-2.4L9 10Z" fill="currentColor" />,
  risk: <path d="M12 2 3 20h18L12 2Zm0 5.3 4.4 8.7H7.6L12 7.3ZM11 10h2v5h-2v-5Zm0 6h2v2h-2v-2Z" fill="currentColor" />,
  ledger: <path d="M5 4h14a1 1 0 0 1 1 1v14H6a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1Zm1 14h12V6H6v12Zm2-9h8v2H8V9Zm0 4h8v2H8v-2Z" fill="currentColor" />,
  logout: <path d="M10 5h4a1 1 0 0 1 1 1v3h-2V7h-3v10h3v-2h2v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm5.3 5.7 1.4-1.4L20.8 13l-4.1 3.7-1.4-1.4L17 14h-5v-2h5l-1.7-1.3Z" fill="currentColor" />,
  user: <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.3 0-6 2.2-6 5v1h12v-1c0-2.8-2.7-5-6-5Z" fill="currentColor" />
}

export default function UiIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
