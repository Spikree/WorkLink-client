import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Auth from "./pages/Auth"

function App() {
  return (
    <>
      <div>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
