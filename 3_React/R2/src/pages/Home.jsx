import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTasks } from '../context/TaskContext.jsx'
import TaskCard from '../components/molecules/TaskCard.jsx'
import Button from '../components/atoms/Button.jsx'
import Badge from '../components/atoms/Badge.jsx'

const Home = () => {
  const { tasks } = useTasks()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === 'completed' && !task.completed) return false
      if (filter === 'pending' && task.completed) return false

      if (search.trim()) {
        const term = search.toLowerCase().trim()
        return (
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term) ||
          (task.shortDescription && task.shortDescription.toLowerCase().includes(term))
        )
      }
      return true
    })
  }, [tasks, filter, search])

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  }), [tasks])

  const filterButtons = [
    { key: 'all', label: 'Todas', count: stats.total },
    { key: 'pending', label: 'Pendientes', count: stats.pending },
    { key: 'completed', label: 'Completadas', count: stats.completed }
  ]

  return (
    <div className="animate-slide-up space-y-6 xs:space-y-8 py-4 xs:py-8">
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 xs:gap-4">
        <div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1 xs:mb-2 leading-tight">
            Mis Tareas
          </h1>
          <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400">
            Organiza tu día y alcanza tus objetivos.
          </p>
        </div>
        <Link to="/crear" className="shrink-0 w-full md:w-auto">
          <Button size="md" xs:size="lg" className="w-full md:w-auto shadow-lg shadow-primary-500/20">
            <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="xs:inline">Crear nueva tarea</span>
            <span className="xs:hidden">Nueva tarea</span>
          </Button>
        </Link>
      </section>

      <section className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4">
        <div className="p-4 xs:p-5 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/30 border border-primary-200 dark:border-primary-800">
          <div className="flex items-center justify-between">
            <p className="text-xs xs:text-sm font-medium text-primary-700 dark:text-primary-300">Total</p>
            <Badge variant="primary">{stats.total}</Badge>
          </div>
          <p className="mt-1 xs:mt-2 text-2xl xs:text-3xl font-bold text-primary-800 dark:text-primary-200">
            {stats.total}
          </p>
          <p className="text-[10px] xs:text-xs text-primary-600 dark:text-primary-400 mt-0.5 xs:mt-1">tareas registradas</p>
        </div>
        <div className="p-4 xs:p-5 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/30 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-between">
            <p className="text-xs xs:text-sm font-medium text-amber-700 dark:text-amber-300">Pendientes</p>
            <Badge variant="warning">{stats.pending}</Badge>
          </div>
          <p className="mt-1 xs:mt-2 text-2xl xs:text-3xl font-bold text-amber-800 dark:text-amber-200">
            {stats.pending}
          </p>
          <p className="text-[10px] xs:text-xs text-amber-600 dark:text-amber-400 mt-0.5 xs:mt-1">por completar</p>
        </div>
        <div className="p-4 xs:p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/30 border border-emerald-200 dark:border-emerald-800 xs:col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-xs xs:text-sm font-medium text-emerald-700 dark:text-emerald-300">Completadas</p>
            <Badge variant="success">{stats.completed}</Badge>
          </div>
          <p className="mt-1 xs:mt-2 text-2xl xs:text-3xl font-bold text-emerald-800 dark:text-emerald-200">
            {stats.completed}
          </p>
          <p className="text-[10px] xs:text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 xs:mt-1">
            {stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}% de avance` : '¡Comienza ahora!'}
          </p>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row gap-2 xs:gap-3 items-stretch sm:items-center">
        <div className="relative flex-1 w-full">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-gray-400 dark:text-gray-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tareas..."
            className="w-full pl-9 xs:pl-11 pr-3 xs:pr-4 py-2 xs:py-2.5 text-sm xs:text-base rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
          />
        </div>

        <div className="flex w-full sm:w-auto overflow-x-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-0.5 sm:p-1 shrink-0 no-scrollbar">
          {filterButtons.map(btn => (
            <button
              key={btn.key}
              type="button"
              onClick={() => setFilter(btn.key)}
              className={`flex-1 sm:flex-none whitespace-nowrap px-2 xs:px-3 py-1.5 xs:py-1.5 rounded-md text-xs xs:text-sm font-medium transition-all duration-200 ${
                filter === btn.key
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="sm:hidden xs:inline line-clamp-1">{btn.label}</span>
              <span className="xs:inline">{btn.label}</span>
              <span className={`ml-1 text-[10px] xs:text-xs ${filter === btn.key ? 'text-primary-100' : 'text-gray-400 dark:text-gray-500'}`}>
                ({btn.count})
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 xs:py-16 sm:py-20 px-2 xs:px-4">
            <div className="mx-auto w-16 h-16 xs:w-20 xs:h-20 mb-4 xs:mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg
                className="w-8 h-8 xs:w-10 xs:h-10 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1 xs:mb-2">
              {tasks.length === 0 ? 'No hay tareas todavía' : 'Sin resultados'}
            </h3>
            <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 mb-5 xs:mb-6 max-w-md mx-auto">
              {tasks.length === 0
                ? 'Comienza tu productividad creando tu primera tarea.'
                : 'Prueba cambiando los filtros o el término de búsqueda.'}
            </p>
            {tasks.length === 0 && (
              <Link to="/crear" className="inline-block w-full max-w-xs mx-auto">
                <Button className="w-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Crear primera tarea
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5">
            {filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
