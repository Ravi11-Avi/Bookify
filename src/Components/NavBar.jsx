import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseFirebase } from '../Context/Firebase';
import BookCard from "../Components/Card";



export const NavBar = () => {
    const firebase = UseFirebase()
    const Navigate =useNavigate()
    const [SearchResult,setSearchResult]=useState({})
    const [SearchComponent,setSearchComponent] =useState(false)
    const [InputeSearch, setInputesearch] = useState('')

   

    const handleSearch =(SearchWord)=>{
        setInputesearch(SearchWord)
        if(SearchWord.length>0){
        firebase.Searchbook(SearchWord).then((e)=>setSearchResult(e))

        setSearchComponent(true)
        
        }
        else{
            setSearchComponent(false)
        }

    }
    const handleSearchOnSymbol =()=>{
        if(InputeSearch.length>0){
            // Navigate('/book/searchbook/${encodeURIComponent(inputSearch.trim())}')
            Navigate('/book/searchbook/'+InputeSearch)
            setSearchComponent(false)
        }
    }


    const handleSignOut = async()=>{
        await firebase.SignOut();
    }

  return (
    <div>
        <nav className='  shadow-2xl flex bg-sky-400 px-20 py-5 justify-between itms-center rounded-[10px]'>
            <div onClick={e=>Navigate('/')}>
                <h1 className='font-bold text-3xl text-white'><Link to="/">Bookify <FontAwesomeIcon icon="book-open-reader" /></Link></h1>
            </div>
            <div className='flex gap-6 list-none justify-center items-center'>
                <li className='text-xl text-white font-bold hover:text-blue-900'><Link to="/" >Home</Link></li>
                <li className='text-xl text-white font-bold hover:text-blue-900' ><Link to="/book/list">Add Listing</Link></li>
                <li className='text-xl text-white font-bold hover:text-blue-900'><Link  to="/book/orders">Orders</Link></li>
                <li className='text-xl text-white font-bold hover:text-blue-900'><Link  to="/book/Myorders"> My Orders</Link></li>
                
            </div>
            <div className='flex  list-none justify-center items-center'>
                <li className='border-b-1 text-white '>
                    <input type='text'
                    // onFocus={() => searchTerm && setShowSuggestions(true)}
                    onChange={e=>handleSearch(e.target.value)}  
                    placeholder='Enter to search' 
                    className='outline-none focus:border-blue-500'/>
                    </li>
                <li
                 onClick={handleSearchOnSymbol}
                 className='cursor-pointer text-1xl text-white '><FontAwesomeIcon icon="magnifying-glass" />
                </li>
            </div>
            <div>
                {
                    firebase.isLoggdIn ? 
                    <div className=' flex gap-5 items-center justify-center '>
                    <img className='w-10 h-10 rounded-[50%]'  src={firebase.user.photoURL|| "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106"}/>
                    <button onClick={handleSignOut} className='bg-blue-500 text-2xl  text-white px-5 py-2 rounded-[10px] cursor-pointer hover:bg-blue-800'>Log out </button> </div>
                    :   <button className='bg-blue-500 text-2xl text-white px-5 py-2 rounded-[10px] cursor-pointer hover:bg-blue-800'> <Link to="/Signin">Sign In </Link></button>

                }
            </div>
        </nav>

        {
            SearchComponent &&(
                <div className='w-full h-[100vh] bg-black/80 absolute  '>
                    <div className='m-15 flex gap-10 flex-wrap'>

                        {Object.entries(SearchResult).map(([key, book]) => (
                            <BookCard key={book.id} id={book.id}  link={`/book/Details/${book.id}`}  work={"Show Details"} {...book}/>
                        ))}
                    </div>
                </div>
            )
        }
        
    </div>
  )
}
