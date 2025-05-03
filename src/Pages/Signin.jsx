import React,{useEffect, useState} from 'react'
import { UseFirebase } from '../Context/Firebase'
import { Link, useNavigate } from 'react-router-dom'


export const Signin = () => {
    const firebase = UseFirebase();
    const navigate = useNavigate()

    const[email,setemail]=useState("")
    const[password,setpassword]=useState("");

  

    useEffect(()=>{
        if (firebase.isLoggdIn){
            navigate("/")
        }
    },[firebase, navigate])

    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log("login User")
        await firebase.LoginwithEmailandPassword(email, password)
        console.log("User Logged In")

    }
  return (
    <div className='Container  flex items-center justify-center flex-col '>
        <form onSubmit={handleSubmit} className='w-fit flex items-center justify-center flex-col gap-4 p-15 shadow-md'>
            <h1 className='text-5xl mb-10 bolder font-bold'>Log In</h1>
            <div>
                <label > Email </label>
                <input className=' border-b-2 m-2 outline-none focus:border-blue-500 ' onChange={(e)=>setemail(e.target.value)} value={email} type="email" placeholder='Enter Email' required />
            </div>
            <div>
                <label > Password </label>
                <input className=' border-b-2  m-2  outline-none focus:border-blue-500' onChange={(e)=>setpassword(e.target.value)} value={password} type="Password" placeholder='Enter Password' required />
            </div>
            {/* <div>
                <label >Conform Password </label>
                <input className=' border-b-2 justify-center m-2 '  type="Password" placeholder='Re-enter Password' required />
            </div> */}
            <div><button  type='submit' className='flex justify-center items-center bg-red-500 w-full rounded-[20px] cursor-pointer pt-2 pb-2 pl-20 pr-20 text-white text-2xl font-bold hover:bg-red-700'>Sign In</button></div>
                <h3 className='text-1xl'>─────────   OR   ──────────</h3>
            <div>
                
                <div className=' flex gap-4 justify-center items- center '>
                    <button onClick={firebase.SignupwithGoogle} className='bg-red-500 pt-1 pb-1 pl-5 pr-5 rounded-[12px] text-white cursor-pointer'> Login with Google </button>
                    <button className='bg-blue-500 pt-1 pb-1 pl-5 pr-5 rounded-[12px] text-white cursor-pointer'> Login with Facebook </button>
                    <button className='bg-black pt-1 pb-1 pl-5 pr-5 rounded-[12px] text-white cursor-pointer'> Login with Github </button>

                </div>
                <div className='mt-5 '>
                    <label className='mr-5'>Create a New Account</label><Link to="/Signup" className='text-blue-900 hover:underline' >Sign Up</Link>
                </div>

            </div>

        </form>
        

 
    </div>
  )
}
