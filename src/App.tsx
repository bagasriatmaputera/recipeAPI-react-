import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browser";
import SearchDetails from "./pages/SearchDetails";
import Categorydetails from "./pages/CategoryDetails";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/search" element={<SearchDetails />} />
        <Route path="/category/:slug" element={<Categorydetails />} />
        <Route path="/recipe/:slug" element={<RecipeDetails />} />
      </Routes>
    </Router>
  )
}

export default App