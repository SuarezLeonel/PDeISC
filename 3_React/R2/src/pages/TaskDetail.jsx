import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTasks } from '../context/TaskContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import Button from '../components/atoms/Button.jsx'
import Card from '../components/atoms/Card.jsx'
import Badge from '../components/atoms/Badge.jsx'
import Toggle from '../components/atoms/Toggle.jsx'

const formatFullDate = (isoString) => {
  try {
    return new Date(isoString).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return ''
  }
}

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTaskById, toggleTaskStatus, deleteTask } = useTasks()
  const { addToast } = useToast()

  const task = getTaskById(id)

  if (!task) {
    return (
      <div className="animate-fade-in text-center py-16 xs:py-20 px-3 xs:px-4">
        <div className="mx-auto w-16 h-16 xs:w-20 xs:h-20 mb-4 xs:mb-6 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <svg className="w-8 h-8 xs:w-10 xs:h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 xs:mb-2">
          Tarea no encontrada
        </h2>
        <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 mb-5 xs:mb-6">
          La tarea que buscas no existe o fue eliminada.
        </p>
        <Link to="/" className="inline-block w-full max-w-xs">
          <Button className="w-full">Volver al listado</Button>
        </Link>
      </div>
    )
  }

  const handleToggleStatus = () => {
    toggleTaskStatus(task.id)
    addToast(
      task.completed ? 'Tarea marcada como pendiente' : '¡Tarea completada! 🎉',
      task.completed ? 'info' : 'success'
    )
  }

  const handleDelete = () => {
    if (window.confirm) {
      const ok = window.confirm('¿Estás seguro que deseas eliminar esta tarea? Esta acción no se puede deshacer.')
      if (!ok) return
    }
    deleteTask(task.id)
    addToast('Tarea eliminada correctamente', 'success')
    navigate('/', { replace: true })
  }

  return (
    <div className="animate-slide-up max-w-3xl mx-auto space-y-4 xs:space-y-6 py-4 xs:py-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden xs:inline">Volver</span>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className={`px-4 xs:px-6 py-3 xs:py-4 border-b ${task.completed ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'}`}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
                <Badge variant={task.completed ? 'success' : 'warning'}>
                  {task.completed ? 'Completada' : 'Pendiente'}
                </Badge>
                <span className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden sm:inline">Creada el </span>
                  {formatFullDate(task.createdAt)}
                </span>
              </div>
              <h1 className={`text-xl xs:text-2xl sm:text-3xl font-bold break-words ${task.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'}`}>
                {task.title}
              </h1>
            </div>
            <div className="shrink-0 w-full sm:w-auto flex justify-start sm:justify-end pt-0 sm:pt-1">
              <Toggle
                checked={task.completed}
                onChange={handleToggleStatus}
                label={task.completed ? 'Marcar pendiente' : 'Marcar completada'}
              />
            </div>
          </div>
        </div>

        <div className="p-4 xs:p-6 sm:p-8">
          <h2 className="text-[11px] xs:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 xs:mb-3">
            Descripción
          </h2>
          <div className="max-w-none">
            <p className="text-sm xs:text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed break-words">
              {task.description || 'Sin descripción'}
            </p>
          </div>
        </div>

        <div className="px-4 xs:px-6 py-3 xs:py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-400 order-2 sm:order-1">
            ID: <code className="bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 break-all">{task.id}</code>
          </span>
          <div className="flex flex-col xs:flex-row gap-2 order-1 sm:order-2 w-full sm:w-auto">
            <Button variant="danger" onClick={handleDelete} className="w-full xs:w-auto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="xs:inline">Eliminar tarea</span>
              <span className="xs:hidden">Eliminar</span>
            </Button>
            <Link to="/crear" className="w-full xs:w-auto">
              <Button variant="outline" className="w-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="xs:inline">Crear otra</span>
                <span className="xs:hidden">Nueva</span>
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TaskDetail
