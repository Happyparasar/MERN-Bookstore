
import { Routes, Route } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'
import BookDetail from './components/BookDetails'
function App() {
 return (
    <Routes path = '/'>
      <Route path= '/home' element = { <Home></Home>}> </Route>
      <Route path = '/contact' element = { <Contact></Contact>}></Route>
      <Route path = '/about' element= {<About></About>}></Route>
      <Route path = '/book/:id' element= {<BookDetail></BookDetail>}></Route>
    </Routes>
  )
}

export default App
