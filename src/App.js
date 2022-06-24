
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Blog from './pages/Blog';


function App() {
  return (
    <Router>


   
    <div className="container">
      <Routes>
          <Route path="/" exact element={
            <Home  />
          }>
          </Route>
          
          <Route path='/blog/:id' element={<Blog />}>
          </Route>

      </Routes>

    </div>
    </Router>
  );
}

export default App;      
