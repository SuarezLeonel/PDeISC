import { useNavigate } from 'react-router-dom'
import Card from '../atoms/Card.jsx'
import Badge from '../atoms/Badge.jsx'

const formatDate = (isoString) => {
  try {
    return new Date(isoString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return ''
  }
}

const TaskCard = ({ task }) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.stopPropagation()
    navigate(`/tarea/${task.id}`)
  }

  return (
    <Card hoverable onClick={handleClick} className="overflow-hidden">
      <div className="p-4 xs:p-5">
        <div className="flex items-start justify-between gap-2 xs:gap-3 mb-2 xs:mb-3">
          <h3 className={`text-base xs:text-lg font-semibold line-clamp-1 min-w-0 flex-1 break-words transition-colors ${
            task.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'
          }`}>
            {task.title}
          </h3>
          <Badge variant={task.completed ? 'success' : 'warning'} className="shrink-0 text-[10px] xs:text-xs px-2 py-0.5">
            <span className="hidden xs:inline">{task.completed ? 'Completa' : 'Pendiente'}</span>
            <span className="xs:hidden">{task.completed ? 'OK' : 'Pend.'}</span>
          </Badge>
        </div>

        <p className={`text-xs xs:text-sm mb-3 xs:mb-4 line-clamp-2 ${
          task.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-400'
        }`}>
          {task.shortDescription || task.description.substring(0, 100) + (task.description.length > 100 ? '...' : '')}
        </p>

        <div className="flex items-center justify-between pt-2 xs:pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 xs:gap-1.5 min-w-0 shrink">
            <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{formatDate(task.createdAt)}</span>
          </span>
          <span className="text-[10px] xs:text-xs font-medium text-primary-600 dark:text-primary-400 flex items-center gap-0.5 xs:gap-1 shrink-0">
            <span className="hidden sm:inline">Ver detalle</span>
            <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard
