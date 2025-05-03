import React, { useState } from 'react'
import { UseFirebase } from '../Context/Firebase';

export const LinstingPage = () => {
    const firebase = UseFirebase()

    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [Minidescription, setMinidescription] = useState("");
    const [price, setprice] = useState("");
    const [isbnNumber, setisbnNumber] = useState("");
    const [author, setauthor] = useState("");
    const [coverImg, setcoverImg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.handleCreateNewLists(name, description, price, author, isbnNumber, Minidescription, coverImg).then((e)=>alert("Book Addded Succesfully"))
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-5/11 ">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Upload New Book</h2>

                <div className="flex flex-col gap-4">
                    <div className='flex  justify-between'>
                        <label className="text-gray-600 ">Enter Book Name</label>
                        <input 
                            className=" border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2" 
                            onChange={(e) => setname(e.target.value)} 
                            value={name} 
                            type="text" 
                            placeholder="Book Name" 
                            required 
                        />
                    </div>

                    <div  className='flex justify-between'>
                        <label className="block text-gray-600 ">Book Mini Description</label>
                        <input 
                            className="border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2" 
                            onChange={(e) => setMinidescription(e.target.value)} 
                            value={Minidescription} 
                            type="text" 
                            placeholder="Mini Description" 
                            required 
                        />
                    </div>

                    <div  className='flex justify-between'>
                        <label className="block text-gray-600 ">Book Description</label>
                        <input 
                            className=" border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2" 
                            onChange={(e) => setdescription(e.target.value)} 
                            value={description} 
                            type="text" 
                            placeholder="Description" 
                            required 
                        />
                    </div>

                    <div  className='flex justify-between'>
                        <label className="block text-gray-600 ">Author</label>
                        <input 
                            className=" border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2" 
                            onChange={(e) => setauthor(e.target.value)} 
                            value={author} 
                            type="text" 
                            placeholder="Author Name" 
                            required 
                        />
                    </div>

                    <div  className='flex justify-between'>
                        <label className="block text-gray-600 ">Price</label>
                        <input 
                            className=" border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2" 
                            onChange={(e) => setprice(e.target.value)} 
                            value={price} 
                            type="text" 
                            placeholder="Price" 
                            required 
                        />
                    </div>

                    <div  className='flex justify-between'>
                        <label className="block text-gray-600">ISBN Number</label>
                        <input 
                            className=" border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2" 
                            onChange={(e) => setisbnNumber(e.target.value)} 
                            value={isbnNumber} 
                            type="text" 
                            placeholder="ISBN" 
                            required 
                        />
                    </div >

                    <div  className='flex  justify-between'>
                        <label className="block text-gray-600">Cover Image URL</label>
                        <input 
                            className=" border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2" 
                            onChange={(e) => setcoverImg(e.target.value)} 
                            value={coverImg} 
                            type="text" 
                            placeholder="Image URL" 
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-all duration-300 font-semibold"
                    >
                        Upload Book
                    </button>
                </div>
            </form>
        </div>
    )
}
