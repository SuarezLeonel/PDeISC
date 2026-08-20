import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTasks } from '../context/TaskContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import Button from '../components/atoms/Button.jsx'
import Input from '../components/atoms/Input.jsx'
import Textarea from '../components/atoms/Textarea.jsx'
import Toggle from '../components/atoms/Toggle.jsx'
import Card from '../components/atoms/Card.jsx'

const CreateTask = () => {
  const navigate = useNavigate()
  const { addTask } = useTasks()
  const { addToast } = useToast()

  const [form, setForm] = useState({
    title: '',
    description: '',
    completed: false
  })

  const [errors, setErrors] = useState({
    title: '',
    description: ''
  })

  const [submitting, setSubmitting] = useState(false)

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = { title: '', description: '' }
    let valid = true

    const title = form.title.trim()
    if (title.length === 0) {
      nextErrors.title = 'El título es requerido'
      valid = false
    } else if (title.length < 3) {
      nextErrors.title = 'El título debe tener al menos 3 caracteres'
      valid = false
    } else if (title.length > 120) {
      nextErrors.title = 'El título no puede superar los 120 caracteres'
      valid = false
    }

    const desc = form.description.trim()
    if (desc.length === 0) {
      nextErrors.description = 'La descripción es requerida'
      valid = false
    } else if (desc.length < 10) {
      nextErrors.description = 'La descripción debe tener al menos 10 caracteres'
      valid = false
    }

    setErrors(nextErrors)
    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      addToast('Por favor corrige los errores del formulario', 'error')
      return
    }

    try {
      setSubmitting(true)
      const newTask = addTask({
        title: form.title,
        description: form.description,
        completed: form.completed
      })

      addToast(`Tarea "${newTask.title}" creada exitosamente`, 'success')
      navigate('/', { replace: true })
    } catch (error) {
      addToast('Ocurrió un error al crear la tarea', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="animate-slide-up max-w-2xl mx-auto space-y-4 xs:space-y-6 py-4 xs:py-8">
      <div className="flex items-center gap-2">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Volver al listado</span>
            <span className="sm:hidden">Volver</span>
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1 xs:mb-2 leading-tight">
          Crear nueva tarea
        </h1>
        <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400">
          Completa el formulario para agregar una tarea a tu lista.
        </p>
      </div>

      <Card className="p-4 xs:p-6 sm:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5 xs:space-y-6">
          <Input
            id="title"
            label="Título"
            placeholder="Ej: Terminar el proyecto de React"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            error={errors.title}
            required
            maxLength={120}
            autoFocus
          />

          <Textarea
            id="description"
            label="Descripción extendida"
            placeholder="Describe detalladamente la tarea, sus objetivos y cualquier nota relevante..."
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            error={errors.description}
            required
            rows={5}
          />

          <div className="p-3 xs:p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Estado inicial
                </h3>
                <p className="text-[11px] xs:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Marca esta opción si la tarea ya se encuentra completada
                </p>
              </div>
              <div className="w-full xs:w-auto flex justify-start xs:justify-end">
                <Toggle
                  checked={form.completed}
                  onChange={(val) => updateField('completed', val)}
                  label={form.completed ? 'Completada' : 'Pendiente'}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse xs:flex-col sm:flex-row sm:justify-end gap-2 xs:gap-3 pt-3 xs:pt-4 border-t border-gray-100 dark:border-gray-700">
            <Link to="/" className="w-full sm:w-auto order-2 sm:order-1">
              <Button variant="secondary" className="w-full sm:w-auto" disabled={submitting}>
                Cancelar
              </Button>
            </Link>
            <Button type="submit" size="md" xs:size="md" className="w-full sm:w-auto order-1 sm:order-2" disabled={submitting}>
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="xs:inline">Crear tarea</span>
                  <span className="xs:hidden">Crear</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default CreateTask
