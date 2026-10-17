/* eslint-disable react-refresh/only-export-components */
import ReactDOM from 'react-dom/client'
import { CheckCircle2, XCircle, AlertTriangleIcon } from '@/assets/icons'

export type PopMessageType = 'success' | 'error' | 'warning'

interface ToastProps {
  text: string
  type: PopMessageType
}

const Toast: React.FC<ToastProps> = ({ text, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
      case 'error':
        return <XCircle className="size-5 text-rose-400 shrink-0" />
      case 'warning':
        return <AlertTriangleIcon className="size-5 text-amber-400 shrink-0" />
    }
  }

  const getStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-slate-900/95 text-white border-emerald-500/50 shadow-emerald-500/10'
      case 'error':
        return 'bg-slate-900/95 text-white border-rose-500/50 shadow-rose-500/10'
      case 'warning':
        return 'bg-slate-900/95 text-white border-amber-500/50 shadow-amber-500/10'
    }
  }

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-200 pointer-events-auto ${getStyle()}`}
    >
      {getIcon()}
      <span>{text}</span>
    </div>
  )
}

export class PopMessage {
  static fadeTime = 3000

  static success(text: string) {
    this.createMessage(text, 'success')
  }

  static error(text: string) {
    this.createMessage(text, 'error')
  }

  static warning(text: string) {
    this.createMessage(text, 'warning')
  }

  private static createMessage(text: string, type: PopMessageType) {
    if (typeof document === 'undefined') return

    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.inset = '0'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '99999'
    document.body.appendChild(container)

    const root = ReactDOM.createRoot(container)
    root.render(<Toast text={text} type={type} />)

    setTimeout(() => {
      root.unmount()
      container.remove()
    }, this.fadeTime)
  }
}

export default PopMessage
