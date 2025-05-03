import React from 'react'
import { useNavigate } from 'react-router-dom';

const BookCard = (props) => {
    const Navigate = useNavigate()
    // console.log(props)
    // console.log(props.id)
  return (
    <div  className='  flex group '>
      <div  className="w-70 h-100  rounded overflow-hidden rounded-[10px] shadow-2xl p-5 bg-white">
        <div className="flex justify-center">
            <img 
            className="w-60 h-60 object-cover rounded" 
            src={props.coverImg} 
            alt="Book cover" 
            />
        </div>

        <div className="py-2">
            <h1 className="text-xl font-bold">{props.name}</h1>
            <h3 className="text-gray-700 mb-1">by - {props.author}</h3>
        </div>

        <div className="flex justify-between items-center">
            <h3 className="text-green-600 text-lg font-semibold">Price: ₹{props.price}</h3>
            <button onClick={e => Navigate(props.link)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer" >
            {props.work}
            </button>
        </div>
      </div>

      <div className='hidden group-hover:block absolute ml-70 hover:hidden w-50 h-max bg-gray-950 bg-opacity-50 flex items-center justify-center text-white text-center '>
        <h3 className='bg-black w-full py-3 '>{props.name}</h3>
        <h4 className='p-4'>{props.Minidescription}</h4>
      </div>

    </div>
  )
}

export default BookCard;
