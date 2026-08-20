import { useToast } from '../../context/ToastContext.jsx'

const typeStyles = {
  success: {
    container: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-700',
    icon: 'text-emerald-500 dark:text-emerald-400',
    text: 'text-emerald-800 dark:text-emerald-200'
  },
  error: {
    container: 'bg-red-50 dark:bg-red-900/30 border-red-400 dark:border-red-700',
    icon: 'text-red-500 dark:text-red-400',
    text: 'text-red-800 dark:text-red-200'
  },
  warning: {
    container: 'bg-amber-50 dark:bg-amber-900/30 border-amber-400 dark:border-amber-700',
    icon: 'text-amber-500 dark:text-amber-400',
    text: 'text-amber-800 dark:text-amber-200'
  },
  info: {
    container: 'bg-primary-50 dark:bg-primary-900/30 border-primary-400 dark:border-primary-700',
    icon: 'text-primary-500 dark:text-primary-400',
    text: 'text-primary-800 dark:text-primary-200'
  }
}

const ToastIcon = ({ type }) => {
  const styles = typeStyles[type] || typeStyles.info
  const cls = `w-5 h-5 ${styles.icon}`

  switch (type) {
    case 'success':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'error':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'warning':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    default:
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
  }
}

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 flex flex-col gap-2 sm:gap-3 w-[calc(100%-1rem)] sm:w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const styles = typeStyles[toast.type] || typeStyles.info
        return (
          <div
            key={toast.id}
            className={`
              flex items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border shadow-xl
              pointer-events-auto animate-slide-in-right
              backdrop-blur-sm
              ${styles.container}
            `}
            role="alert"
          >
            <div className="shrink-0 pt-0.5">
              <ToastIcon type={toast.type} />
            </div>
            <p className={`flex-1 text-xs sm:text-sm font-medium break-words ${styles.text}`}>
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className={`shrink-0 -mr-1 -mt-0.5 rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${styles.icon}`}
              aria-label="Cerrar notificación"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default ToastContainer
