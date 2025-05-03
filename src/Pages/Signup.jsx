import React,{useState, useEffect} from 'react'
import { UseFirebase } from '../Context/Firebase'
import { Link, useNavigate } from 'react-router-dom'
    

export const Signup = () => {
    const firebase = UseFirebase();
    const navigate = useNavigate()

    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")

    useEffect(()=>{
            if (firebase.isLoggdIn){
                navigate("/")
            }
        },[firebase, navigate])

    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log("SignUp ... User")
        await firebase.SignupwithEmailAndPassword(email, password)
        console.log("User Signed Up")

    }
  return (
    <div className='Container  flex items-center justify-center flex-col '>
        <form onSubmit={handleSubmit} className='w-fit flex items-center justify-center flex-col gap-4 p-15 shadow-md'>
            <h1 className='text-5xl mb-10 bolder font-bold'>Sign In</h1>
            <div>
                <label > Email </label>
                <input className=' border-b-2 m-2 outline-none focus:border-blue-500' onChange={(e)=>setemail(e.target.value)} value={email} type="email" placeholder='Enter Email' required />
            </div>
            <div>
                <label > Password </label>
                <input className=' border-b-2  m-2 outline-none focus:border-blue-500 ' onChange={(e)=>setpassword(e.target.value)} value={password} type="Password" placeholder='Enter Password' required />
            </div>
            {/* <div>
                <label >Conform Password </label>
                <input className=' border-b-2 justify-center m-2 '  type="Password" placeholder='Re-enter Password' required />
            </div> */}
            <div><button  type='submit' className='flex justify-center items-center bg-red-500 w-full rounded-[20px] cursor-pointer pt-2 pb-2 pl-20 pr-20 text-white text-2xl font-bold hover:bg-red-700'>Sign Up</button></div>
                <h3 className='text-1xl'>─────────   OR   ──────────</h3>
            <div>
                
              
                <div className='mt-5 '>
                    <label className='mr-5'>Already have a Account</label><Link to="/Signin" className='text-blue-900 hover:underline' >Log in</Link>
                </div>

            </div>

        </form>
        

 
    </div>
  )
}
