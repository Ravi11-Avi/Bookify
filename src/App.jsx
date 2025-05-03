import { Route, Routes, useLocation } from 'react-router-dom'
//css
import './App.css'
import './Library/Fontawsome';
//pages
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import Home from './Pages/Home'
import { LinstingPage } from './Pages/List';
import { BookDetailpage } from './Pages/Details';
import { Orders } from './Pages/Orders';
import { ViewOrderDeails } from './Pages/ViewOrderDeails';
import { MyOrders } from './Pages/MyOrders';
import SearchPage from './Pages/SearchPage';


//componesnts
import { NavBar } from './Components/NavBar';



function App() {

  const location = useLocation()
  const isAuthpage = location.pathname==="/Signin"|| location.pathname==="/Signup"


  return (
    <>
    {
      !isAuthpage && <NavBar/>
    }
    <Routes>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/book/list" element={<LinstingPage/>}/>
        <Route path="/book/Details/:BookID" element={<BookDetailpage/>}/>
        <Route path="/book/orders" element={<Orders/>}/>
        <Route path="/book/orders/:BookID" element={<ViewOrderDeails/>}/>
        <Route path="/book/Myorders" element={<MyOrders/>}/>
        <Route path="/book/SearchBook/:Bookname" element={<SearchPage/>}/>
    </Routes>
    </>
  )
}

export default App
