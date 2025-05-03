import React, { useEffect, useState } from 'react'
import { UseFirebase } from '../Context/Firebase'
import {Loading} from '../Components/Loading'
import { useNavigate } from 'react-router-dom'

export const MyOrders = () => {
  const firebase = UseFirebase()
  const [AllOrders, setAllOrders]= useState([])
  const [loading, setloading] = useState(true)
  const navigate= useNavigate()




  const MyOrder= async()=>{
    

   try{
    setloading(true)
    if (!firebase.user?.email){
      console.log("please Login")
    }
    if (firebase.user?.email){
       await firebase.GetMyOrder(firebase.user.email).then((orders)=>setAllOrders(orders))
    }
   }finally{
    setloading(false)
   }
  }
  
  useEffect(()=>{
    MyOrder()
  
    

  },[firebase.user])

  console.log(AllOrders)
  const Cancelhandle=(BookID,OrderID)=>{
    firebase.CancelOrder(BookID,OrderID).then(()=>console.log("Done"))
    MyOrder()
    
  }
  
if (loading)return(<Loading/>)
  return (
    <div>
      <div className='w-full flex items-center justify-center'>
        <h1 className='text-4xl font-bold mt-10  text-blue-400  w-70 '>My Orders</h1>
      </div>
      {
        AllOrders.map((order)=>(
          <div key={order.orderId}className='w-full flex justify-center align-center mt-10 ' >
            <div className='flex gap-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-5/7  shadow-2xl'>
              <div className='flex-shrink-0'>
                  <img 
                      src={order.coverImg} 
                      alt={order.BookName} 
                      className='w-32 h-48 object-cover rounded-lg border border-gray-200'
                  />
              </div>
              
          
              <div className='flex-1 flex flex-col justify-between'>
                  <div className='space-y-2 [&>li]:flex [&>li]:justify-between [&>li]:border-b [&>li]:pb-1 [&>li]:border-gray-100'>
                      <li>
                          <span className='font-medium text-gray-600'>Book Name:</span>
                          <h1 className='font-semibold text-gray-800'>{order.BookName}</h1>  
                      </li>
                      <li>
                          <span className='font-medium text-gray-600'>Book ID:</span>
                          <h1 className='text-gray-700'>{order.BookID}</h1>
                      </li>
                      <li>
                          <span className='font-medium text-gray-600'>Name:</span>
                          <h1 className='text-gray-700'>{order.CustomerName}</h1>
                      </li>
                      <li>
                          <span className='font-medium text-gray-600'>Phone:</span>
                          <h1 className='text-gray-700'>{order.CustomerPhone}</h1>
                      </li>
                      <li>
                          <span className='font-medium text-gray-600'>Address:</span>
                          <h1 className='text-gray-700'>{order.CustomerAddress}</h1>
                      </li>
                      <li>
                          <span className='font-medium text-gray-600'>User ID:</span>
                          <h1 className='text-gray-700'>{order.userID}</h1>
                      </li>
                      <li>
                          <span className='font-medium text-gray-600'>Order Date:</span>
                          <h1 className='text-gray-700'>{order.OrderDate?.toDate().toLocaleString()}</h1>
                      </li>
                      <li>
                          <span className='font-medium text-gray-600'>Order ID:</span>
                          <h1 className='text-gray-700'>{order.orderId}</h1>
                      </li>
                      <li>
                          <span className='font-medium text-gray-600'>Quantity:</span>
                          <h1 className='text-gray-700'>{order.Quantity}</h1>
                      </li>
                      <li>
                          <span className='font-medium text-gray-600'>Total Price:</span>
                          <h1 className='text-gray-700 font-bold'>Rs. {order.TotalPrice}</h1>
                      </li>
                  </div>
                  
                  <div className='flex justify-between items-center'>
                    <div className='w-40'>
                        <button onClick={(e)=>navigate(`/book/Details/${order.BookID}`)} className='bg-blue-600 px-5 py-3 rounded-[8px] hover:bg-blue-500 text-white cursor-pointer'>Show Details</button>

                    </div>
                
                    <div className='mt-4 flex w-full  items-center justify-end'>
                        {
                          !order.isAccepted?(
                            <span className='py-3 px-5  m-5 bg-gray-300 rounded-[8px]'>Rejected</span>
                          ):(
                            <span className='py-3 px-5  m-5 bg-gray-300 rounded-[8px]'>Accepted</span>
                          )
                        }

                        {
                          order.IsCanceled?(
                            <div className='text-red-500 font-semibold flex items-center gap-2'>
                              <span>Canceled</span>
                          </div>
                          ):(<button onClick={(e)=>Cancelhandle(order.BookID,order.orderId)} className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer transition-colors'>
                            Cancel Order
                        </button>)
                        }
                    
                      
                      
                    </div>

                   
                  </div>
                 
              </div>
            </div>
          </div>    
        ))
      }

      
    </div>
  )
}
