import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import './App.css'
import AddProduct from './components/addProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
     <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar />
      <div className="flex-1">
        <Routes>
            <Route path="/create" element={<AddProduct />} />
            <Route path="/" element={<AddProduct />} /> {/* Default route */}
        </Routes>
      </div>
     </div>
   </Router>
  )
}

export default App
