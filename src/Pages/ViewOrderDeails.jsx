import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UseFirebase } from '../Context/Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const ViewOrderDeails = () => {

    const params= useParams();
    const firebase = UseFirebase();
    const [orders, setorders]= useState([])

    const FetchOrder=async()=>{
        await firebase.GetOrders(params.BookID)?.then((order)=>setorders(order.docs))

    }


    useEffect(()=>{
        FetchOrder()
    },[firebase])

    const Aceepted = (OrderID)=>{
        
        firebase.AcceptOrder(OrderID,params.BookID)
        FetchOrder()
    }
    const Rejected = (OrderID)=>{
        
        firebase.RejectOrder(OrderID,params.BookID)
        FetchOrder()
    }
    //  console.log(params.BookID)
    //  console.log(orders)
  return (
    <div className='flex flex-col items-center justify-center mt-15'>
        <div className='w-full flex items-center justify-center'>
            <h1 className='text-4xl font-bold mb-10  text-blue-400  w-90 '>Customers Orders</h1>
        </div>
        {
            orders.map((order)=>{
                const data = order.data()
                return(
                <div key={order.id} className='flex gap-15 w-250 mb-10 items-center justify-center shadow-2xl p-5 bg-white p-10 rounded-[10px]'>

                    <div>
                        <img src={data.coverImg} alt=""  className='w-30'/>
                    </div>
                    <div className='flex flex-col [&>li]:flex [&>li]:justify-between w-1/2 '>
                        <li><span >Order ID:</span> <h1>{order.id} </h1></li>
                        <li><span>Book:</span> <h1>{data.BookName}</h1></li>
                        <li><span>Customer Name:</span> <h1>{data.CustomerName}</h1></li>
                        <li><span>Customer Email:</span> <h1>{data.CustomerEmail}</h1></li>
                        <li><span>Customer UserID:</span> <h1>{data.userID}</h1></li>
                        <li><span>Order Date:</span> <h1>{data.OrderDate?.toDate().toLocaleString()}</h1></li>
                        <li><span>Customer Address:</span> <h1>{data.CustomerAddress}</h1></li>
                        <li><span>Quantity:</span> <h1>{data.Quantity}</h1></li>
                        <li><span>Total Price:</span> <h1>Rs.{data.TotalPrice}</h1></li>
                        <li><span>Sratus: </span><h1>{data.Orderstatus ? "Choose" : "Done"}</h1></li> 
                        
                    </div>
                    <div>
                        <div className='mb-30'>
                            {
                            data.IsCanceled ?(<span className='p-3 px-5  m-5 bg-gray-300 rounded-[8px]'>Cancelled</span>)
                            :(<span className='py-3 px-5 m-5 bg-gray-300 rounded-[8px]'>Ordered</span>)
                            
                            }

                        </div>
                        <div>
                            {
                                data.Orderstatus ?
                            
                                    (<div className='flex gap-5'>
                                        <button onClick={e=>{Aceepted(order.id)}} className='p-2 bg-green-500 text-white rounded-[5px] cursor-pointer'>Accept <FontAwesomeIcon icon="fa-check" /></button>
                                        <button onClick={e=>Rejected(order.id)} className='p-2 bg-red-500 text-white rounded-[5px]  cursor-pointer'>  Reject <FontAwesomeIcon icon="fa-xmark" /></button>
                                    </div>):

                                    (<div className=' w-70 '>
                                        {
                                            data.isAccepted ?( <p className='flex items-center justify-center text-green-500 font-bold gap-2 text-2xl'>Order Accepted <span className='bg-green-500 p-1 rounded-[50%] flex items-center justify-center '><FontAwesomeIcon icon="fa-check" className='bg-white p-2  text-green-500 rounded-[50%] text-2xl'/></span></p>)
                                            :( <p className='flex items-center justify-center text-red-500 font-bold gap-2 text-2xl'>Order Rejected <span className='bg-red-500 p-1 rounded-[50%] flex items-center justify-center '><FontAwesomeIcon icon="fa-xmark"  className='bg-white p-2  rounded-[50%] text-2xl'/></span></p>)
                                        }
                                    </div>)
                            }

                        </div>
                    </div>
                                
                           
                </div>)
            })
        }
    </div>
  )
}
