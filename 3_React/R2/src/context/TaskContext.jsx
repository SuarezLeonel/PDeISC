import { createContext, useContext, useEffect, useState } from 'react'

const TaskContext = createContext(null)

const STORAGE_KEY = 'taskflow_tareas'

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

const getInitialTasks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (error) {
    console.error('Error al cargar tareas:', error)
  }

  return [
    {
      id: generateId(),
      title: 'Bienvenido a TaskFlow',
      shortDescription: 'Explora la aplicación de gestión de tareas.',
      description:
        'Esta es una tarea de ejemplo. TaskFlow te permite organizar tus actividades diarias de forma sencilla y eficiente. Puedes crear nuevas tareas, ver sus detalles, marcar el estado y exportar tus datos en formato JSON.',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      title: 'Crear tu primera tarea',
      shortDescription: 'Haz clic en el botón "Crear nueva tarea".',
      description:
        'Para agregar una nueva tarea, navega a la página de creación y completa el formulario con el título, descripción y estado inicial.',
      completed: false,
      createdAt: new Date().toISOString()
    }
  ]
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(getInitialTasks)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('Error al guardar tareas:', error)
    }
  }, [tasks])

  const addTask = (taskData) => {
    const newTask = {
      id: generateId(),
      title: taskData.title.trim(),
      shortDescription: taskData.description.substring(0, 100).trim() + (taskData.description.length > 100 ? '...' : ''),
      description: taskData.description.trim(),
      completed: Boolean(taskData.completed),
      createdAt: new Date().toISOString()
    }
    setTasks(prev => [newTask, ...prev])
    return newTask
  }

  const getTaskById = (id) => {
    return tasks.find(task => task.id === id) || null
  }

  const toggleTaskStatus = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tareas_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        getTaskById,
        toggleTaskStatus,
        deleteTask,
        exportTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks debe usarse dentro de TaskProvider')
  }
  return context
}
