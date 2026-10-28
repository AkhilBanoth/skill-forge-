import { createContext, useContext } from 'react'

export const ToastContext = createContext<(message: string, tone?: 'success' | 'error') => void>(() => undefined)

export function useToast() {
  return useContext(ToastContext)
}
