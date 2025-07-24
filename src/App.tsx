import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browser";
import SearchDetails from "./pages/SearchDetails";
import Categorydetails from "./pages/CategoryDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/search" element={<SearchDetails />} />
        <Route path="/category/:slug" element={<Categorydetails />} />
      </Routes>
    </Router>
  )
}

export default App