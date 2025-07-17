import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Browse />} />
      </Routes>
    </Router>
  )
}

export default App