import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Alerts from './pages/Alerts'
import AddPatient from './pages/AddPatient'
import ExplainAi from './pages/ExplainAi'
import PatientsDeatils from './pages/PatientsDeatils'
import Result from "./pages/Result";
import History from "./pages/History";
import About from "./pages/About";
import './App.css'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/explain-ai" element={<ExplainAi />} />
        <Route path="/patient-details" element={<PatientsDeatils />} />
        <Route path="history" element={<History />} />
        <Route path="result" element={<Result />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
