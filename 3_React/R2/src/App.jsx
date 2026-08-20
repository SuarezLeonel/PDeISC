import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/molecules/Navbar.jsx'
import ToastContainer from './components/molecules/ToastContainer.jsx'
import Home from './pages/Home.jsx'
import TaskDetail from './pages/TaskDetail.jsx'
import CreateTask from './pages/CreateTask.jsx'
import NotFound from './pages/NotFound.jsx'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main className="container-app py-8 animate-fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tarea/:id" element={<TaskDetail />} />
            <Route path="/crear" element={<CreateTask />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
