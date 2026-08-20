import { Link } from 'react-router-dom'
import Button from '../components/atoms/Button.jsx'

const NotFound = () => {
  return (
    <div className="animate-fade-in min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8">
        <h1 className="text-[8rem] sm:text-[10rem] font-extrabold leading-none bg-gradient-to-br from-primary-500 via-accent-500 to-primary-700 bg-clip-text text-transparent">
          404
        </h1>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        Página no encontrada
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        La ruta que buscas no existe o fue movida. Utiliza la navegación para volver a la aplicación.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/">
          <Button size="lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Ir al inicio
          </Button>
        </Link>
        <Link to="/crear">
          <Button variant="outline" size="lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Crear tarea
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
