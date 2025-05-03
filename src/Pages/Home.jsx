import React, { useEffect, useState } from 'react';
import { UseFirebase } from '../Context/Firebase';
import BookCard from '../Components/Card';
import { Loading } from '../Components/Loading';


const Home = () => {

  const firebase = UseFirebase()
  const [books, setbooks]= useState([])
  const [loading,setLoading]= useState(true)


  const Fetchbook= async()=>{
    
    try{
      setLoading(true)
      await firebase.AllList().then((book)=> setbooks(book.docs))
    }finally{
      setLoading(false)

    }

  }

  useEffect(()=>{

    Fetchbook()
    

  },[firebase])

  if(loading)  return <Loading/>;
  return (
    <div className='flex flex-col  w-full  m-5'>
      <h1 className='text-left text-3xl'>List of Books</h1>
      <div className="flex flex-wrap gap-5 m-5">
      {
        books.map((book)=>(
          <BookCard key={book.id} id={book.id} link={`/book/Details/${book.id}`} work={"Show Details"} {...book.data()}/>
        ))
      }
      </div>
      
    
    </div>
  )
}

export default Home;