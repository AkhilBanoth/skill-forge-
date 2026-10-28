import { useState, type ReactNode } from 'react'
import { Check, X } from 'lucide-react'
import { ToastContext } from './toast-context'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; tone: 'success' | 'error' } | null>(null)
  const notify = (message: string, tone: 'success' | 'error' = 'success') => {
    setToast({ message, tone })
    window.setTimeout(() => setToast(null), 3200)
  }
  return <ToastContext.Provider value={notify}>{children}{toast && <div className={`toast toast-${toast.tone}`} role="status"><Check size={17} />{toast.message}<button className="icon-button" onClick={() => setToast(null)} aria-label="Dismiss notification"><X size={15} /></button></div>}</ToastContext.Provider>
}
