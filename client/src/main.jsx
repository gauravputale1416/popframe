import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './views/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import NotFound from './components/Not_Found.jsx'
import MoviesDetails from './views/MoviesDetails.jsx'
import NewMovies from './views/NewMovies.jsx' 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
       <Route path="/movie/:id" element= {<MoviesDetails />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/newMovie' element={<NewMovies />} />
    </Routes>
  </BrowserRouter>
)
