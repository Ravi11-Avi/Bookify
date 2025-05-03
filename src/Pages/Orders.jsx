import React, { useEffect, useState } from 'react'
import { UseFirebase } from '../Context/Firebase'
import BookCard from '../Components/Card'
import { Loading } from '../Components/Loading'

export const Orders = () => {
  const firebase = UseFirebase()
  const [books,setbooks]=useState([])


 useEffect(()=>{
  if(firebase.isLoggdIn)
  firebase.FetchMyBooks(firebase.user.uid)?.then((book) => setbooks(book.docs) )


 },[firebase])


 console.log(books)

 if(!firebase.isLoggdIn)return <><h1>Please Logged in</h1> <Loading/></>

  
  return (
    <div className='flex flex-wrap gap-10 m-10'>
      <div className='w-full flex items-center justify-center'>
        <h1 className='text-5xl font-bold   text-blue-400'>My Books</h1>
      </div>
      {
        books.map((book)=>(
          <BookCard key={book.id} id={book.id} link={`/book/orders/${book.id}`} work={"Show Orders"} {...book.data()}/>))
      }
    </div>
  )
}
